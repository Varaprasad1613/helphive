import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HelpPost, PostStatus } from '../../help-post.model';
import { HelpPostService } from '../../help-post.service';

@Component({
  selector: 'app-my-posts-page',
  imports: [DatePipe, RouterLink],
  templateUrl: './my-posts-page.html',
  styleUrl: './my-posts-page.scss',
})
export class MyPostsPage {
  private readonly postsService = inject(HelpPostService);
  readonly posts = signal<HelpPost[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly toast = signal('');

  constructor() { this.load(); }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.postsService.mine().subscribe({
      next: posts => { this.posts.set(posts); this.loading.set(false); },
      error: () => { this.loading.set(false); this.error.set('Could not load your posts.'); },
    });
  }

  setStatus(post: HelpPost, status: PostStatus): void {
    this.postsService.updateStatus(post.id, status).subscribe({
      next: updated => { this.posts.update(items => items.map(item => item.id === updated.id ? updated : item)); this.show('Post status updated.'); },
      error: () => this.show('Could not update this post.'),
    });
  }

  remove(post: HelpPost): void {
    if (!confirm(`Delete “${post.title}”?`)) return;
    this.postsService.delete(post.id).subscribe({
      next: () => { this.posts.update(items => items.filter(item => item.id !== post.id)); this.show('Post deleted.'); },
      error: () => this.show('Could not delete this post.'),
    });
  }

  private show(message: string): void {
    this.toast.set(message); window.setTimeout(() => this.toast.set(''), 2500);
  }
}
