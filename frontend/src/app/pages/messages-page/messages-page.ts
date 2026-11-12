import { DatePipe } from '@angular/common';
import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth.service';
import { ChatCryptoService } from '../../chat-crypto.service';
import { ChatNotificationsService } from '../../chat-notifications.service';
import { ChatService } from '../../chat.service';
import { ChatBlock, ChatConversation, ChatKeyRecord, ChatMessage, ChatRequest } from '../../chat.model';

type MessageTab = 'inbox' | 'requests' | 'archived' | 'blocked';
type SetupState = 'loading' | 'setup' | 'confirm' | 'unlock' | 'ready' | 'error';

@Component({
  selector: 'app-messages-page',
  imports: [DatePipe, FormsModule],
  templateUrl: './messages-page.html',
  styleUrl: './messages-page.scss',
})
export class MessagesPage implements OnDestroy {
  private readonly service = inject(ChatService);
  private readonly crypto = inject(ChatCryptoService);
  private readonly chatNotifications = inject(ChatNotificationsService);
  readonly auth = inject(AuthService);

  readonly state = signal<SetupState>('loading');
  readonly tab = signal<MessageTab>('inbox');
  readonly keyRecord = signal<ChatKeyRecord | null>(null);
  readonly recoveryCode = signal('');
  readonly confirmation = signal('');
  readonly unlockCode = signal('');
  readonly requests = signal<ChatRequest[]>([]);
  readonly conversations = signal<ChatConversation[]>([]);
  readonly archived = signal<ChatConversation[]>([]);
  readonly blocked = signal<ChatBlock[]>([]);
  readonly active = signal<ChatConversation | null>(null);
  readonly messages = signal<ChatMessage[]>([]);
  readonly draft = signal('');
  readonly reportReason = signal('');
  readonly reportEvidence = signal(false);
  readonly loading = signal(false);
  readonly sending = signal(false);
  readonly error = signal('');
  readonly toast = signal('');
  readonly incomingRequests = computed(() => this.requests().filter(
    request => request.recipientId === this.auth.user()?.id && request.status === 'PENDING',
  ));
  readonly outgoingRequests = computed(() => this.requests().filter(
    request => request.requesterId === this.auth.user()?.id && request.status === 'PENDING',
  ));
  private pollHandle: ReturnType<typeof setInterval> | null = null;
  private pendingUpload: Awaited<ReturnType<ChatCryptoService['finishSetup']>> | null = null;

  constructor() {
    void this.initialize();
  }

  ngOnDestroy(): void {
    if (this.pollHandle !== null) clearInterval(this.pollHandle);
  }

  async generateRecoveryCode(): Promise<void> {
    this.error.set('');
    this.loading.set(true);
    try {
      this.recoveryCode.set(await this.crypto.beginSetup());
      this.state.set('confirm');
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not create your secure chat key.');
    } finally {
      this.loading.set(false);
    }
  }

  retrySetup(): void {
    void this.initialize();
  }

  async saveSecureKey(): Promise<void> {
    const userId = this.auth.user()?.id;
    if (!userId) return;
    this.error.set('');
    this.loading.set(true);
    try {
      if (!this.pendingUpload) {
        this.pendingUpload = await this.crypto.finishSetup(userId, this.confirmation());
      }
      this.keyRecord.set(await firstValueFrom(this.service.saveKey(this.pendingUpload)));
      this.recoveryCode.set('');
      this.confirmation.set('');
      this.state.set('ready');
      this.startChat();
      this.show('Secure messaging is ready on this device.');
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not save your secure chat key.');
    } finally {
      this.loading.set(false);
    }
  }

  async unlockWithRecoveryCode(): Promise<void> {
    const userId = this.auth.user()?.id;
    const key = this.keyRecord();
    if (!userId || !key) return;
    this.loading.set(true);
    this.error.set('');
    try {
      await this.crypto.unlock(userId, key, this.unlockCode());
      this.unlockCode.set('');
      this.state.set('ready');
      this.startChat();
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not unlock secure messages.');
    } finally {
      this.loading.set(false);
    }
  }

  async accept(request: ChatRequest): Promise<void> {
    const userId = this.auth.user()?.id;
    const myKey = this.keyRecord();
    if (!userId || !myKey) return;
    this.loading.set(true);
    this.error.set('');
    try {
      const peerKey = await firstValueFrom(this.service.publicKey(request.requesterId));
      const ownWrapped = await this.crypto.wrapConversationKey(myKey.publicKey);
      const requesterEnvelope = await this.crypto.wrapKeyForAnotherUser(peerKey.publicKey, ownWrapped.key);
      await firstValueFrom(this.service.decideRequest(
        request.id, true, requesterEnvelope, ownWrapped.envelope,
      ));
      this.show('Chat request accepted. Messages are end-to-end encrypted.');
      await this.loadData(false);
      await this.chatNotifications.refresh();
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not accept this chat request.');
    } finally {
      this.loading.set(false);
    }
  }

  async decline(request: ChatRequest): Promise<void> {
    await this.changeRequest(request, false);
  }

  async cancel(request: ChatRequest): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await firstValueFrom(this.service.cancelRequest(request.id));
      await this.loadData(false);
      await this.chatNotifications.refresh();
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not cancel this chat request.');
    } finally {
      this.loading.set(false);
    }
  }

  async select(conversation: ChatConversation): Promise<void> {
    this.active.set(conversation);
    this.messages.set([]);
    await this.loadMessages(conversation);
  }

  async sendMessage(): Promise<void> {
    const conversation = this.active();
    const userId = this.auth.user()?.id;
    const message = this.draft().trim();
    if (!conversation || !userId || !message || message.length > 2000) return;
    this.sending.set(true);
    this.error.set('');
    try {
      const key = await this.crypto.unlockConversationKey(
        userId, conversation.id, conversation.encryptedKeyEnvelope,
      );
      const encrypted = await this.crypto.encryptMessage(conversation.id, key, message);
      await firstValueFrom(this.service.sendMessage(conversation.id, encrypted.ciphertext, encrypted.iv));
      this.draft.set('');
      await this.loadData(false);
      const updated = this.conversations().find(item => item.id === conversation.id);
      if (updated) this.active.set(updated);
      await this.loadMessages(this.active() ?? conversation);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not send this encrypted message.');
    } finally {
      this.sending.set(false);
    }
  }

  async archive(conversation: ChatConversation, archived: boolean): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await firstValueFrom(this.service.archive(conversation.id, archived));
      if (this.active()?.id === conversation.id) this.active.set(null);
      await this.loadData(false);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not update this conversation.');
    } finally {
      this.loading.set(false);
    }
  }

  async blockPeer(conversation: ChatConversation): Promise<void> {
    if (!confirm(`Block ${conversation.peerName}? This immediately stops chat requests and messages between you.`)) return;
    this.loading.set(true);
    this.error.set('');
    try {
      await firstValueFrom(this.service.block(conversation.peerId));
      this.active.set(null);
      this.show(`${conversation.peerName} was blocked.`);
      await this.loadData(false);
      this.tab.set('blocked');
      await this.chatNotifications.refresh();
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not block this member.');
    } finally {
      this.loading.set(false);
    }
  }

  async unblock(user: ChatBlock): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await firstValueFrom(this.service.unblock(user.userId));
      await this.loadData(false);
      await this.chatNotifications.refresh();
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not unblock this member.');
    } finally {
      this.loading.set(false);
    }
  }

  async reportPeer(conversation: ChatConversation): Promise<void> {
    const reason = this.reportReason().trim();
    if (!reason) {
      this.error.set('Add a reason before submitting a report.');
      return;
    }
    const evidence = this.reportEvidence() ? this.messages().at(-1)?.plaintext ?? null : null;
    if (evidence && !confirm('This voluntarily shares the selected latest message with HelpHive admins. Continue?')) return;
    this.loading.set(true);
    this.error.set('');
    try {
      await firstValueFrom(this.service.report(conversation.id, reason, evidence));
      this.reportReason.set('');
      this.reportEvidence.set(false);
      this.show('Report sent to the HelpHive moderation team.');
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not submit this report.');
    } finally {
      this.loading.set(false);
    }
  }

  statusLabel(request: ChatRequest): string {
    if (request.status !== 'PENDING') return request.status.toLowerCase();
    return request.recipientId === this.auth.user()?.id ? 'Waiting for your decision' : 'Waiting for their decision';
  }

  private async initialize(): Promise<void> {
    this.loading.set(true);
    try {
      const key = await firstValueFrom(this.service.myKey());
      this.keyRecord.set(key);
      if (!key) {
        this.state.set('setup');
        return;
      }
      const userId = this.auth.user()?.id;
      if (!userId) throw new Error('Sign in again to unlock secure messaging.');
      if (await this.crypto.loadDeviceKey(userId)) {
        this.state.set('ready');
        await this.loadData(false);
        this.startPolling();
      } else {
        this.state.set('unlock');
      }
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not initialize secure messaging.');
      this.state.set('error');
    } finally {
      this.loading.set(false);
    }
  }

  private startChat(): void {
    void this.loadData(false);
    this.startPolling();
  }

  private startPolling(): void {
    if (this.pollHandle !== null) clearInterval(this.pollHandle);
    this.pollHandle = setInterval(() => {
      void this.loadData(false);
      const active = this.active();
      if (active) void this.loadMessages(active);
    }, 12000);
  }

  private async loadData(showLoading: boolean): Promise<void> {
    if (showLoading) this.loading.set(true);
    this.error.set('');
    try {
      const [requests, conversations, archived, blocked] = await Promise.all([
        firstValueFrom(this.service.requests()),
        firstValueFrom(this.service.conversations()),
        firstValueFrom(this.service.conversations(true)),
        firstValueFrom(this.service.blockedUsers()),
      ]);
      this.requests.set(requests);
      this.conversations.set(conversations);
      this.archived.set(archived);
      this.blocked.set(blocked);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not load messages.');
    } finally {
      if (showLoading) this.loading.set(false);
    }
  }

  private async loadMessages(conversation: ChatConversation): Promise<void> {
    const userId = this.auth.user()?.id;
    if (!userId) return;
    try {
      const key = await this.crypto.unlockConversationKey(
        userId, conversation.id, conversation.encryptedKeyEnvelope,
      );
      const encrypted = await firstValueFrom(this.service.messages(conversation.id));
      const decrypted = await Promise.all(encrypted.map(async message => ({
        ...message,
        plaintext: await this.crypto.decryptMessage(conversation.id, key, message),
      })));
      if (this.active()?.id === conversation.id) {
        const previousLastId = this.messages().at(-1)?.id ?? 0;
        this.messages.set(decrypted);
        const latest = decrypted.at(-1);
        if (latest && latest.id > previousLastId) {
          try {
            await this.chatNotifications.markConversationRead(conversation.id, latest.id);
          } catch {
            this.error.set('Messages loaded, but the unread status could not be updated. Please try again.');
          }
        }
      }
    } catch (error) {
      this.error.set(error instanceof Error
        ? error.message
        : 'Some messages could not be decrypted. Check that the correct chat key is unlocked.');
    }
  }

  private async changeRequest(request: ChatRequest, accept: boolean): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await firstValueFrom(this.service.decideRequest(request.id, accept));
      this.show(accept ? 'Chat request accepted.' : 'Chat request declined.');
      await this.loadData(false);
      await this.chatNotifications.refresh();
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not update this chat request.');
    } finally {
      this.loading.set(false);
    }
  }

  private show(message: string): void {
    this.toast.set(message);
    window.setTimeout(() => this.toast.set(''), 2800);
  }
}
