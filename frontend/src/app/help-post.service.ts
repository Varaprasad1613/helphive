import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, HelpPost, HelpPostInput, HelpPostPage, PostStats, PostStatus, PostType } from './help-post.model';

@Injectable({ providedIn: 'root' })
export class HelpPostService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/posts';

  list(
    filters: { search?: string; location?: string; category?: Category | ''; type?: PostType | ''; status?: PostStatus | '' },
    page: number,
    size: number,
  ): Observable<HelpPostPage> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });
    params = params.set('page', page).set('size', size);
    return this.http.get<HelpPostPage>(this.baseUrl, { params });
  }

  stats(): Observable<PostStats> {
    return this.http.get<PostStats>(`${this.baseUrl}/stats`);
  }

  mine(): Observable<HelpPost[]> {
    return this.http.get<HelpPost[]>(`${this.baseUrl}/mine`);
  }

  create(input: HelpPostInput): Observable<HelpPost> {
    return this.http.post<HelpPost>(this.baseUrl, input);
  }

  update(id: number, input: HelpPostInput): Observable<HelpPost> {
    return this.http.put<HelpPost>(`${this.baseUrl}/${id}`, input);
  }

  updateStatus(id: number, status: PostStatus): Observable<HelpPost> {
    return this.http.patch<HelpPost>(`${this.baseUrl}/${id}/status`, { status });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
