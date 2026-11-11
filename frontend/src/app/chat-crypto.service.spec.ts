// @vitest-environment node
import { ChatCryptoService } from './chat-crypto.service';

function encode(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

describe('ChatCryptoService', () => {
  it('encrypts message text and rejects ciphertext under a different conversation id', async () => {
    const service = new ChatCryptoService();
    const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    const plaintext = 'A private message that the server must never receive.';

    const encrypted = await service.encryptMessage(7, key, plaintext);

    expect(encrypted.ciphertext).not.toContain(plaintext);
    await expect(service.decryptMessage(7, key, {
      id: 1, senderId: 2, ...encrypted, createdAt: new Date().toISOString(),
    })).resolves.toBe(plaintext);
    await expect(service.decryptMessage(8, key, {
      id: 1, senderId: 2, ...encrypted, createdAt: new Date().toISOString(),
    })).rejects.toThrow();
  });

  it('wraps a conversation key so only the recipient private key can recover it', async () => {
    const service = new ChatCryptoService();
    const recipient = await crypto.subtle.generateKey({
      name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256',
    }, true, ['encrypt', 'decrypt']);
    const publicKey = encode(new Uint8Array(await crypto.subtle.exportKey('spki', recipient.publicKey)));

    const wrapped = await service.wrapConversationKey(publicKey);
    const recoveredRawKey = await crypto.subtle.decrypt(
      { name: 'RSA-OAEP' }, recipient.privateKey, decode(wrapped.envelope),
    );
    const recoveredKey = await crypto.subtle.importKey(
      'raw', recoveredRawKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'],
    );
    const encrypted = await service.encryptMessage(9, recoveredKey, 'Only the conversation members can read this.');

    await expect(service.decryptMessage(9, wrapped.key, {
      id: 4, senderId: 3, ...encrypted, createdAt: new Date().toISOString(),
    })).resolves.toBe('Only the conversation members can read this.');
  });
});

function decode(value: string): ArrayBuffer {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/');
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes.buffer;
}
