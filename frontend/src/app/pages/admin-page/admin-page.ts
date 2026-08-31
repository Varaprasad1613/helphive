import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminOverview, AdminPost, AdminUser } from '../../admin.model';
import { AdminService } from '../../admin.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-page',
  imports: [DatePipe],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})
export class AdminPage {
  private readonly service = inject(AdminService);
  readonly auth = inject(AuthService);
  readonly overview = signal<AdminOverview>({ users: 0, activeUsers: 0, posts: 0, responses: 0, pendingResponses: 0 });
  readonly users = signal<AdminUser[]>([]);
  readonly posts = signal<AdminPost[]>([]);
  readonly tab = signal<'overview' | 'members' | 'posts'>('overview');
  readonly loading = signal(true);
  readonly error = signal('');
  readonly toast = signal('');

  constructor() { this.load(); }
  load(): void {
    this.loading.set(true); this.error.set('');
    forkJoin({ overview: this.service.overview(), users: this.service.users(), posts: this.service.posts() }).subscribe({
      next: result => { this.overview.set(result.overview); this.users.set(result.users); this.posts.set(result.posts); this.loading.set(false); },
      error: () => { this.loading.set(false); this.error.set('Could not load the admin dashboard.'); },
    });
  }
  changeRole(user: AdminUser, role: string): void {
    this.service.setRole(user.id, role as 'MEMBER' | 'ADMIN').subscribe({
      next: updated => { this.replaceUser(updated); this.show('Member role updated.'); },
      error: response => this.show(response.error?.message ?? 'Could not update the role.'),
    });
  }
  toggleActive(user: AdminUser): void {
    this.service.setActive(user.id, !user.active).subscribe({
      next: updated => { this.replaceUser(updated); this.show(updated.active ? 'Account reactivated.' : 'Account suspended.'); this.refreshOverview(); },
      error: response => this.show(response.error?.message ?? 'Could not update the account.'),
    });
  }
  deletePost(post: AdminPost): void {
    if (!confirm(`Remove “${post.title}” from HelpHive?`)) return;
    this.service.deletePost(post.id).subscribe({
      next: () => { this.posts.update(items => items.filter(item => item.id !== post.id)); this.show('Post removed.'); this.refreshOverview(); },
      error: () => this.show('Could not remove the post.'),
    });
  }
  private replaceUser(updated: AdminUser): void { this.users.update(items => items.map(item => item.id === updated.id ? updated : item)); }
  private refreshOverview(): void { this.service.overview().subscribe(value => this.overview.set(value)); }
  private show(message: string): void { this.toast.set(message); window.setTimeout(() => this.toast.set(''), 2600); }
}
