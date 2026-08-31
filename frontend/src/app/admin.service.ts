import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminOverview, AdminPost, AdminUser } from './admin.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  overview(): Observable<AdminOverview> { return this.http.get<AdminOverview>('/api/admin/overview'); }
  users(): Observable<AdminUser[]> { return this.http.get<AdminUser[]>('/api/admin/users'); }
  posts(): Observable<AdminPost[]> { return this.http.get<AdminPost[]>('/api/admin/posts'); }
  setRole(id: number, role: 'MEMBER' | 'ADMIN'): Observable<AdminUser> {
    return this.http.patch<AdminUser>(`/api/admin/users/${id}/role`, { role });
  }
  setActive(id: number, active: boolean): Observable<AdminUser> {
    return this.http.patch<AdminUser>(`/api/admin/users/${id}/status`, { active });
  }
  deletePost(id: number): Observable<void> { return this.http.delete<void>(`/api/admin/posts/${id}`); }
}
