import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, HelpPost, HelpPostInput, PostStats, PostStatus, PostType } from '../../help-post.model';
import { HelpPostService } from '../../help-post.service';
import { AuthService } from '../../auth.service';
import { HelpResponseService } from '../../help-response.service';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-community-page',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './community-page.html',
  styleUrl: '../../app.scss',
})
export class CommunityPage {
  private readonly service = inject(HelpPostService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly responseService = inject(HelpResponseService);
  private readonly chatService = inject(ChatService);
  readonly auth = inject(AuthService);

  readonly posts = signal<HelpPost[]>([]);
  readonly stats = signal<PostStats>({ total: 0, open: 0, offers: 0, requests: 0, completed: 0 });
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly toast = signal('');
  readonly responseMessage = signal('');
  readonly responding = signal(false);
  readonly modalOpen = signal(false);
  readonly selectedPost = signal<HelpPost | null>(null);
  readonly editingId = signal<number | null>(null);
  readonly search = signal('');
  readonly location = signal('');
  readonly category = signal<Category | ''>('');
  readonly type = signal<PostType | ''>('');
  readonly status = signal<PostStatus | ''>('');
  readonly pageIndex = signal(0);
  readonly pageSize = signal(9);
  readonly totalElements = signal(0);
  readonly totalPages = signal(0);
  readonly resultLabel = computed(() => {
    const total = this.totalElements();
    if (total === 0) return '0 posts';
    const first = this.pageIndex() * this.pageSize() + 1;
    const last = first + this.posts().length - 1;
    return `Showing ${first}–${last} of ${total} posts`;
  });

  readonly categories: { value: Category; label: string; icon: string }[] = [
    { value: 'EDUCATION', label: 'Education', icon: '✦' },
    { value: 'TECHNOLOGY', label: 'Technology', icon: '⌘' },
    { value: 'HOME_AND_GARDEN', label: 'Home & garden', icon: '⌂' },
    { value: 'TRANSPORTATION', label: 'Transportation', icon: '↗' },
    { value: 'WELLNESS', label: 'Wellness', icon: '♡' },
    { value: 'OTHER', label: 'Other', icon: '•' },
  ];

  readonly postForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(90)]],
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(800)]],
    location: ['', [Validators.required, Validators.maxLength(80)]],
    category: ['EDUCATION' as Category, Validators.required],
    type: ['REQUEST' as PostType, Validators.required],
  });

  constructor() {
    this.refresh();
    this.route.queryParamMap.subscribe(params => {
      const create = params.get('create');
      if (create === 'request' || create === 'offer') {
        this.openCreate(create === 'offer' ? 'OFFER' : 'REQUEST');
        void this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
      }
    });
  }

  refresh(): void {
    if (!this.auth.authenticated()) {
      this.posts.set([]);
      this.totalElements.set(0);
      this.totalPages.set(0);
      this.stats.set({ total: 0, open: 0, offers: 0, requests: 0, completed: 0 });
      this.loading.set(false);
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.service.list(
      {
        search: this.search(),
        location: this.location(),
        category: this.category(),
        type: this.type(),
        status: this.status(),
      },
      this.pageIndex(),
      this.pageSize(),
    )
      .subscribe({
        next: result => {
          if (this.pageIndex() > 0 && this.pageIndex() >= result.totalPages) {
            this.pageIndex.set(Math.max(0, result.totalPages - 1));
            this.refresh();
            return;
          }
          this.posts.set(result.content);
          this.totalElements.set(result.totalElements);
          this.totalPages.set(result.totalPages);
          this.loading.set(false);
        },
        error: (response: HttpErrorResponse) => {
          if (response.status === 401) {
            this.restrictAccess('Your session expired. Sign in again to continue.');
            return;
          }
          this.error.set('The community board is taking a little longer to wake up. Please try again.');
          this.loading.set(false);
        },
      });
    this.service.stats().subscribe({ next: stats => this.stats.set(stats) });
  }

  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
    this.pageIndex.set(0);
    this.refresh();
  }

  onLocation(event: Event): void {
    this.location.set((event.target as HTMLInputElement).value);
    this.pageIndex.set(0);
    this.refresh();
  }

  setCategory(value: Category | ''): void {
    this.category.set(value);
    this.pageIndex.set(0);
    this.refresh();
  }

  setType(value: string): void {
    this.type.set(value as PostType | '');
    this.pageIndex.set(0);
    this.refresh();
  }

  setStatus(value: string): void {
    this.status.set(value as PostStatus | '');
    this.pageIndex.set(0);
    this.refresh();
  }

  clearFilters(): void {
    this.search.set(''); this.location.set(''); this.category.set(''); this.type.set(''); this.status.set('');
    this.pageIndex.set(0);
    this.refresh();
  }

  setPage(page: number): void {
    if (page < 0 || page >= this.totalPages() || page === this.pageIndex()) return;
    this.pageIndex.set(page);
    this.refresh();
  }

  setPageSize(size: number): void {
    if (![9, 18, 36].includes(size)) return;
    this.pageSize.set(size);
    this.pageIndex.set(0);
    this.refresh();
  }

  openCreate(type: PostType = 'REQUEST'): void {
    if (!this.auth.authenticated()) {
      void this.router.navigate(['/auth/login']);
      return;
    }
    this.editingId.set(null);
    this.postForm.reset({ title: '', description: '', location: '', category: 'EDUCATION', type });
    this.modalOpen.set(true);
  }

  openEdit(post: HelpPost): void {
    if (!post.ownedByCurrentUser) {
      this.showToast('Only the post owner can edit it');
      return;
    }
    this.selectedPost.set(null);
    this.editingId.set(post.id);
    this.postForm.setValue({
      title: post.title, description: post.description,
      location: post.location, category: post.category, type: post.type,
    });
    this.modalOpen.set(true);
  }

  closeModal(): void {
    if (!this.saving()) this.modalOpen.set(false);
  }

  submit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const input = this.postForm.getRawValue() as HelpPostInput;
    const request = this.editingId() ? this.service.update(this.editingId()!, input) : this.service.create(input);
    request.subscribe({
      next: () => {
        this.saving.set(false); this.modalOpen.set(false);
        if (this.editingId() === null) this.pageIndex.set(0);
        this.showToast(this.editingId() ? 'Post updated successfully' : 'Your post is live');
        this.refresh();
      },
      error: (response: HttpErrorResponse) => {
        this.saving.set(false);
        this.showToast(response.error?.message ?? 'Could not save the post');
      },
    });
  }

  view(post: HelpPost): void { this.responseMessage.set(''); this.selectedPost.set(post); }

  sendResponse(post: HelpPost): void {
    const message = this.responseMessage().trim();
    if (message.length < 10) { this.showToast('Add a message of at least 10 characters'); return; }
    this.responding.set(true);
    this.responseService.create(post.id, message).subscribe({
      next: () => { this.responding.set(false); this.selectedPost.set(null); this.responseMessage.set(''); this.showToast('Your response was sent'); },
      error: (response: HttpErrorResponse) => { this.responding.set(false); this.showToast(response.error?.message ?? 'Could not send your response'); },
    });
  }

  requestChat(post: HelpPost): void {
    if (!post.ownerId) return;
    this.chatService.createRequest(post.ownerId, post.id, null).subscribe({
      next: () => this.showToast('Chat request sent. You can message after the post owner accepts.'),
      error: (response: HttpErrorResponse) => this.showToast(
        response.error?.message ?? 'Could not send the chat request. Set up secure messages first.',
      ),
    });
  }

  advanceStatus(post: HelpPost): void {
    if (!post.ownedByCurrentUser) {
      this.showToast('Only the post owner can update its status');
      return;
    }
    const next: PostStatus = post.status === 'OPEN' ? 'IN_PROGRESS' : 'COMPLETED';
    this.service.updateStatus(post.id, next).subscribe({
      next: updated => {
        this.selectedPost.set(updated);
        this.showToast(next === 'IN_PROGRESS' ? 'Help is on the way' : 'Marked as completed');
        this.refresh();
      },
      error: () => this.showToast('Could not update the status'),
    });
  }

  remove(post: HelpPost): void {
    if (!post.ownedByCurrentUser) {
      this.showToast('Only the post owner can delete it');
      return;
    }
    if (!confirm(`Delete “${post.title}”?`)) return;
    this.service.delete(post.id).subscribe({
      next: () => { this.selectedPost.set(null); this.showToast('Post deleted'); this.refresh(); },
      error: () => this.showToast('Could not delete the post'),
    });
  }

  categoryLabel(value: Category): string {
    return this.categories.find(category => category.value === value)?.label ?? value;
  }

  categoryIcon(value: Category): string {
    return this.categories.find(category => category.value === value)?.icon ?? '•';
  }

  private restrictAccess(message: string): void {
    this.auth.logout();
    this.posts.set([]);
    this.stats.set({ total: 0, open: 0, offers: 0, requests: 0, completed: 0 });
    this.loading.set(false);
    void this.router.navigate(['/auth/login'], { queryParams: { notice: message } });
  }

  private showToast(message: string): void {
    this.toast.set(message);
    window.setTimeout(() => this.toast.set(''), 2800);
  }
}
