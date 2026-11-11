import { Injectable } from '@angular/core';
import { ChatKeyRecord, ChatKeyUpload, EncryptedChatMessage } from './chat.model';

const DATABASE_NAME = 'helphive-encrypted-chat';
const DATABASE_VERSION = 1;
const STORE_NAME = 'device-keys';
const PBKDF2_ITERATIONS = 600_000;

interface DeviceKeyRecord {
  userId: number;
  privateKey: CryptoKey;
}

interface PendingKeySetup {
  privateKey: CryptoKey;
  upload: ChatKeyUpload;
  recoveryCode: string;
}

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
}

@Injectable({ providedIn: 'root' })
export class ChatCryptoService {
  private readonly privateKeys = new Map<number, CryptoKey>();
  private readonly conversationKeys = new Map<number, CryptoKey>();
  private pendingSetup: PendingKeySetup | null = null;

  async beginSetup(): Promise<string> {
    const pair = await crypto.subtle.generateKey({
      name: 'RSA-OAEP',
      modulusLength: 3072,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    }, true, ['encrypt', 'decrypt']);
    const privateBytes = await crypto.subtle.exportKey('pkcs8', pair.privateKey);
    const publicBytes = await crypto.subtle.exportKey('spki', pair.publicKey);
    const recoveryCode = encodeBase64Url(crypto.getRandomValues(new Uint8Array(24)));
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const wrappingKey = await deriveRecoveryKey(recoveryCode, salt);
    const encryptedPrivateKey = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, wrappingKey, privateBytes);
    const privateKey = await crypto.subtle.importKey(
      'pkcs8', privateBytes, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['decrypt'],
    );
    this.pendingSetup = {
      privateKey,
      recoveryCode,
      upload: {
        publicKey: encodeBase64Url(new Uint8Array(publicBytes)),
        encryptedPrivateKey: encodeBase64Url(new Uint8Array(encryptedPrivateKey)),
        salt: encodeBase64Url(salt),
        iv: encodeBase64Url(iv),
      },
    };
    return recoveryCode;
  }

  async finishSetup(userId: number, confirmation: string): Promise<ChatKeyUpload> {
    if (!this.pendingSetup || confirmation !== this.pendingSetup.recoveryCode) {
      throw new Error('Enter the recovery code exactly as shown to confirm you saved it.');
    }
    await this.storeDeviceKey(userId, this.pendingSetup.privateKey);
    this.privateKeys.set(userId, this.pendingSetup.privateKey);
    const upload = this.pendingSetup.upload;
    this.pendingSetup = null;
    return upload;
  }

  cancelSetup(): void {
    this.pendingSetup = null;
  }

  async unlock(userId: number, record: ChatKeyRecord, recoveryCode: string): Promise<void> {
    if (!record.encryptedPrivateKey || !record.salt || !record.iv) {
      throw new Error('The encrypted account key backup is incomplete.');
    }
    const wrappingKey = await deriveRecoveryKey(recoveryCode, decodeBase64Url(record.salt));
    let privateBytes: ArrayBuffer;
    try {
      privateBytes = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: decodeBase64Url(record.iv) },
        wrappingKey,
        decodeBase64Url(record.encryptedPrivateKey),
      );
    } catch {
      throw new Error('That recovery code could not unlock this account’s chat key.');
    }
    const privateKey = await crypto.subtle.importKey(
      'pkcs8', privateBytes, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['decrypt'],
    );
    await this.storeDeviceKey(userId, privateKey);
    this.privateKeys.set(userId, privateKey);
  }

  async loadDeviceKey(userId: number): Promise<boolean> {
    const stored = await readDeviceKey(userId);
    if (!stored) return false;
    this.privateKeys.set(userId, stored.privateKey);
    return true;
  }

  async wrapConversationKey(recipientPublicKey: string): Promise<{ key: CryptoKey; envelope: string }> {
    const recipientKey = await crypto.subtle.importKey(
      'spki', decodeBase64Url(recipientPublicKey), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt'],
    );
    const conversationKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    const raw = await crypto.subtle.exportKey('raw', conversationKey);
    const wrapped = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, recipientKey, raw);
    return { key: conversationKey, envelope: encodeBase64Url(new Uint8Array(wrapped)) };
  }

  async wrapKeyForAnotherUser(recipientPublicKey: string, conversationKey: CryptoKey): Promise<string> {
    const recipientKey = await crypto.subtle.importKey(
      'spki', decodeBase64Url(recipientPublicKey), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt'],
    );
    const raw = await crypto.subtle.exportKey('raw', conversationKey);
    const wrapped = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, recipientKey, raw);
    return encodeBase64Url(new Uint8Array(wrapped));
  }

  async unlockConversationKey(userId: number, conversationId: number, envelope: string): Promise<CryptoKey> {
    const cached = this.conversationKeys.get(conversationId);
    if (cached) return cached;
    const privateKey = await this.getPrivateKey(userId);
    const raw = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, decodeBase64Url(envelope));
    const key = await crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
    this.conversationKeys.set(conversationId, key);
    return key;
  }

  async encryptMessage(conversationId: number, key: CryptoKey, plaintext: string): Promise<EncryptedPayload> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt({
      name: 'AES-GCM', iv, additionalData: new TextEncoder().encode(`helphive-chat:${conversationId}`),
    }, key, new TextEncoder().encode(plaintext));
    return { ciphertext: encodeBase64Url(new Uint8Array(ciphertext)), iv: encodeBase64Url(iv) };
  }

  async decryptMessage(
    conversationId: number,
    key: CryptoKey,
    message: EncryptedChatMessage,
  ): Promise<string> {
    const plaintext = await crypto.subtle.decrypt({
      name: 'AES-GCM',
      iv: decodeBase64Url(message.iv),
      additionalData: new TextEncoder().encode(`helphive-chat:${conversationId}`),
    }, key, decodeBase64Url(message.ciphertext));
    return new TextDecoder().decode(plaintext);
  }

  lock(): void {
    this.privateKeys.clear();
    this.conversationKeys.clear();
    this.pendingSetup = null;
  }

  private async getPrivateKey(userId: number): Promise<CryptoKey> {
    const key = this.privateKeys.get(userId);
    if (key) return key;
    if (await this.loadDeviceKey(userId)) return this.privateKeys.get(userId)!;
    throw new Error('Unlock your encrypted messages before opening this conversation.');
  }

  private async storeDeviceKey(userId: number, privateKey: CryptoKey): Promise<void> {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put({ userId, privateKey } satisfies DeviceKeyRecord);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('Could not save this device key.'));
      transaction.onabort = () => reject(transaction.error ?? new Error('Saving this device key was cancelled.'));
    });
    db.close();
  }
}

async function deriveRecoveryKey(code: string, salt: BufferSource): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: PBKDF2_ITERATIONS },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

function openDatabase(): Promise<IDBDatabase> {
  if (!globalThis.indexedDB) return Promise.reject(new Error('This browser does not support secure device-key storage.'));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME, { keyPath: 'userId' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not open secure device-key storage.'));
    request.onblocked = () => reject(new Error('Close other HelpHive tabs to finish secure-key setup.'));
  });
}

function readDeviceKey(userId: number): Promise<DeviceKeyRecord | null> {
  return openDatabase().then(db => new Promise<DeviceKeyRecord | null>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const request = transaction.objectStore(STORE_NAME).get(userId);
    request.onsuccess = () => resolve((request.result as DeviceKeyRecord | undefined) ?? null);
    request.onerror = () => reject(request.error ?? new Error('Could not read the secure device key.'));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => {
      db.close();
      reject(transaction.error ?? new Error('Could not read the secure device key.'));
    };
  }));
}

function encodeBase64Url(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function decodeBase64Url(value: string): ArrayBuffer {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes.buffer;
}
