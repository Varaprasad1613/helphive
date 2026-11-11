import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HelpResponse, ResponseStatus } from '../../help-response.model';
import { HelpResponseService } from '../../help-response.service';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-my-responses-page',
  imports: [DatePipe],
  templateUrl: './my-responses-page.html',
  styleUrl: './my-responses-page.scss',
})
export class MyResponsesPage {
  private readonly service = inject(HelpResponseService);
  private readonly chatService = inject(ChatService);
  readonly sent = signal<HelpResponse[]>([]);
  readonly received = signal<HelpResponse[]>([]);
  readonly tab = signal<'received' | 'sent'>('received');
  readonly loading = signal(true);
  readonly error = signal('');
  readonly toast = signal('');
  readonly visible = computed(() => this.tab() === 'received' ? this.received() : this.sent());
  private completedLoads = 0;

  constructor() { this.load(); }
  load(): void {
    this.loading.set(true); this.error.set(''); this.completedLoads = 0;
    this.service.received().subscribe({ next: items => { this.received.set(items); this.finished(); }, error: () => this.failed() });
    this.service.sent().subscribe({ next: items => { this.sent.set(items); this.finished(); }, error: () => this.failed() });
  }
  review(response: HelpResponse, status: ResponseStatus): void {
    this.service.updateStatus(response.id, status).subscribe({
      next: updated => { this.received.update(items => items.map(item => item.id === updated.id ? updated : item)); this.show(`Response ${status.toLowerCase()}.`); this.load(); },
      error: () => this.show('Could not review this response.'),
    });
  }
  withdraw(response: HelpResponse): void {
    if (!confirm('Withdraw this response?')) return;
    this.service.withdraw(response.id).subscribe({
      next: () => { this.sent.update(items => items.filter(item => item.id !== response.id)); this.show('Response withdrawn.'); },
      error: () => this.show('Could not withdraw this response.'),
    });
  }
  requestChat(response: HelpResponse): void {
    const recipientId = response.received ? response.responderId : response.postOwnerId;
    if (recipientId === null) return;
    this.chatService.createRequest(recipientId, null, response.id).subscribe({
      next: () => this.show('Chat request sent. You can message after they accept.'),
      error: (error) => this.show(error.error?.message ?? 'Could not send the chat request. Set up secure messages first.'),
    });
  }
  private finished(): void { this.completedLoads += 1; if (this.completedLoads === 2) this.loading.set(false); }
  private failed(): void { this.loading.set(false); this.error.set('Could not load your responses.'); }
  private show(message: string): void { this.toast.set(message); window.setTimeout(() => this.toast.set(''), 2500); }
}
