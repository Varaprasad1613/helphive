import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { ChatNotificationSummary } from './chat.model';
import { ChatService } from './chat.service';

const POLL_INTERVAL_MS = 12000;

@Injectable({ providedIn: 'root' })
export class ChatNotificationsService {
  private readonly auth = inject(AuthService);
  private readonly chat = inject(ChatService);
  private pollHandle: ReturnType<typeof setInterval> | null = null;
  private refreshPromise: Promise<void> | null = null;
  private refreshQueued = false;
  private session = 0;

  readonly summary = signal<ChatNotificationSummary>({ unreadMessages: 0, pendingRequests: 0 });
  readonly total = computed(() => this.summary().unreadMessages + this.summary().pendingRequests);
  readonly error = signal('');

  start(): void {
    if (this.pollHandle !== null) return;
    this.session += 1;
    void this.refresh();
    this.pollHandle = setInterval(() => void this.refresh(), POLL_INTERVAL_MS);
  }

  stop(): void {
    this.session += 1;
    if (this.pollHandle !== null) clearInterval(this.pollHandle);
    this.pollHandle = null;
    this.summary.set({ unreadMessages: 0, pendingRequests: 0 });
    this.error.set('');
  }

  async markConversationRead(conversationId: number, messageId: number): Promise<void> {
    try {
      await firstValueFrom(this.chat.markRead(conversationId, messageId));
    } catch (error) {
      this.error.set('Could not mark this conversation as read. The unread count may be out of date.');
      throw error;
    }
    await this.refresh();
  }

  async refresh(): Promise<void> {
    this.refreshQueued = true;
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = (async () => {
      while (this.refreshQueued) {
        this.refreshQueued = false;
        const userId = this.auth.user()?.id;
        const session = this.session;
        if (!userId) return;
        try {
          const summary = await firstValueFrom(this.chat.notifications());
          if (session === this.session && userId === this.auth.user()?.id) {
            this.summary.set(summary);
            this.error.set('');
          }
        } catch {
          if (session === this.session && userId === this.auth.user()?.id) {
            this.error.set('Could not update message notifications. Try opening Messages to refresh.');
          }
        }
      }
    })().finally(() => {
      this.refreshPromise = null;
      if (this.refreshQueued) void this.refresh();
    });

    return this.refreshPromise;
  }
}
