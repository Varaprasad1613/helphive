import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Category, HelpPost, HelpPostInput, PostStats, PostStatus, PostType } from './help-post.model';
import { HelpPostService } from './help-post.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly service = inject(HelpPostService);
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);

  readonly posts = signal<HelpPost[]>([]);
  readonly stats = signal<PostStats>({ total: 0, open: 0, offers: 0, requests: 0, completed: 0 });
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly toast = signal('');
  readonly modalOpen = signal(false);
  readonly selectedPost = signal<HelpPost | null>(null);
  readonly editingId = signal<number | null>(null);
  readonly authModalOpen = signal(false);
  readonly authMode = signal<'login' | 'register'>('login');
  readonly authenticating = signal(false);
  readonly authError = signal('');
  readonly search = signal('');
  readonly category = signal<Category | ''>('');
  readonly type = signal<PostType | ''>('');
  readonly status = signal<PostStatus | ''>('');
  readonly resultLabel = computed(() => `${this.posts().length} ${this.posts().length === 1 ? 'match' : 'matches'}`);

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

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  readonly registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
  });

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set('');
    this.service.list({ search: this.search(), category: this.category(), type: this.type(), status: this.status() })
      .subscribe({
        next: posts => { this.posts.set(posts); this.loading.set(false); },
        error: () => { this.error.set('The community board is taking a little longer to wake up. Please try again.'); this.loading.set(false); },
      });
    this.service.stats().subscribe({ next: stats => this.stats.set(stats) });
  }

  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
    this.refresh();
  }

  setCategory(value: Category | ''): void {
    this.category.set(value);
    this.refresh();
  }

  setType(value: string): void {
    this.type.set(value as PostType | '');
    this.refresh();
  }

  setStatus(value: string): void {
    this.status.set(value as PostStatus | '');
    this.refresh();
  }

  clearFilters(): void {
    this.search.set(''); this.category.set(''); this.type.set(''); this.status.set('');
    this.refresh();
  }

  openCreate(type: PostType = 'REQUEST'): void {
    if (!this.auth.authenticated()) {
      this.openAuth('register');
      this.showToast('Create an account or sign in to publish');
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
        this.showToast(this.editingId() ? 'Post updated successfully' : 'Your post is live');
        this.refresh();
      },
      error: (response: HttpErrorResponse) => {
        this.saving.set(false);
        this.showToast(response.error?.message ?? 'Could not save the post');
      },
    });
  }

  view(post: HelpPost): void { this.selectedPost.set(post); }

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

  openAuth(mode: 'login' | 'register' = 'login'): void {
    this.authMode.set(mode);
    this.authError.set('');
    this.authModalOpen.set(true);
  }

  closeAuth(): void {
    if (!this.authenticating()) this.authModalOpen.set(false);
  }

  switchAuthMode(mode: 'login' | 'register'): void {
    this.authMode.set(mode);
    this.authError.set('');
  }

  submitAuth(): void {
    const isLogin = this.authMode() === 'login';
    const form = isLogin ? this.loginForm : this.registerForm;
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    this.authenticating.set(true);
    this.authError.set('');
    const request = isLogin
      ? this.auth.login(this.loginForm.getRawValue())
      : this.auth.register(this.registerForm.getRawValue());
    request.subscribe({
      next: response => {
        this.authenticating.set(false);
        this.authModalOpen.set(false);
        this.showToast(`Welcome${isLogin ? ' back' : ''}, ${response.user.name.split(' ')[0]}`);
        this.refresh();
      },
      error: (response: HttpErrorResponse) => {
        this.authenticating.set(false);
        this.authError.set(response.error?.message ?? 'Authentication failed. Please try again.');
      },
    });
  }

  logout(): void {
    this.auth.logout();
    this.selectedPost.set(null);
    this.showToast('You are signed out');
    this.refresh();
  }

  private showToast(message: string): void {
    this.toast.set(message);
    window.setTimeout(() => this.toast.set(''), 2800);
  }
}
