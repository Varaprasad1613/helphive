import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelpResponse, ResponseStatus } from './help-response.model';

@Injectable({ providedIn: 'root' })
export class HelpResponseService {
  private readonly http = inject(HttpClient);
  create(postId: number, message: string): Observable<HelpResponse> {
    return this.http.post<HelpResponse>(`/api/posts/${postId}/responses`, { message });
  }
  sent(): Observable<HelpResponse[]> { return this.http.get<HelpResponse[]>('/api/responses/mine'); }
  received(): Observable<HelpResponse[]> { return this.http.get<HelpResponse[]>('/api/responses/received'); }
  updateStatus(id: number, status: ResponseStatus): Observable<HelpResponse> {
    return this.http.patch<HelpResponse>(`/api/responses/${id}/status`, { status });
  }
  withdraw(id: number): Observable<void> { return this.http.delete<void>(`/api/responses/${id}`); }
}
