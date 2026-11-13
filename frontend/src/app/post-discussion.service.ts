import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDiscussion, PostProgressUpdate, PostProgressUpdateInput } from './post-discussion.model';

@Injectable({ providedIn: 'root' })
export class PostDiscussionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/posts';

  get(postId: number): Observable<PostDiscussion> {
    return this.http.get<PostDiscussion>(`${this.baseUrl}/${postId}/updates`);
  }

  create(postId: number, input: PostProgressUpdateInput): Observable<PostProgressUpdate> {
    return this.http.post<PostProgressUpdate>(`${this.baseUrl}/${postId}/updates`, input);
  }
}
