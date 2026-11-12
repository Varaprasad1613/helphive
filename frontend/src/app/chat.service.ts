import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ChatBlock, ChatConversation, ChatKeyRecord, ChatKeyUpload, ChatNotificationSummary, ChatReport, ChatRequest,
  EncryptedChatMessage,
} from './chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/chat';

  myKey(): Observable<ChatKeyRecord | null> {
    return this.http.get<ChatKeyRecord | null>(`${this.base}/keys/me`);
  }

  saveKey(key: ChatKeyUpload): Observable<ChatKeyRecord> {
    return this.http.put<ChatKeyRecord>(`${this.base}/keys/me`, key);
  }

  publicKey(userId: number): Observable<ChatKeyRecord> {
    return this.http.get<ChatKeyRecord>(`${this.base}/keys/${userId}`);
  }

  requests(): Observable<ChatRequest[]> {
    return this.http.get<ChatRequest[]>(`${this.base}/requests`);
  }

  notifications(): Observable<ChatNotificationSummary> {
    return this.http.get<ChatNotificationSummary>(`${this.base}/notifications`);
  }

  createRequest(recipientId: number, postId: number | null, responseId: number | null): Observable<ChatRequest> {
    return this.http.post<ChatRequest>(`${this.base}/requests`, { recipientId, postId, responseId });
  }

  decideRequest(
    requestId: number,
    accept: boolean,
    requesterKeyEnvelope?: string,
    recipientKeyEnvelope?: string,
  ): Observable<ChatRequest> {
    return this.http.patch<ChatRequest>(`${this.base}/requests/${requestId}`, {
      accept, requesterKeyEnvelope, recipientKeyEnvelope,
    });
  }

  cancelRequest(requestId: number): Observable<ChatRequest> {
    return this.http.delete<ChatRequest>(`${this.base}/requests/${requestId}`);
  }

  conversations(archived = false): Observable<ChatConversation[]> {
    return this.http.get<ChatConversation[]>(`${this.base}/conversations`, { params: { archived } });
  }

  messages(conversationId: number): Observable<EncryptedChatMessage[]> {
    return this.http.get<EncryptedChatMessage[]>(`${this.base}/conversations/${conversationId}/messages`);
  }

  markRead(conversationId: number, messageId: number): Observable<void> {
    return this.http.post<void>(`${this.base}/conversations/${conversationId}/read`, { messageId });
  }

  sendMessage(conversationId: number, ciphertext: string, iv: string): Observable<EncryptedChatMessage> {
    return this.http.post<EncryptedChatMessage>(
      `${this.base}/conversations/${conversationId}/messages`, { ciphertext, iv },
    );
  }

  archive(conversationId: number, archived: boolean): Observable<void> {
    return this.http.patch<void>(`${this.base}/conversations/${conversationId}/archive`, { archived });
  }

  blockedUsers(): Observable<ChatBlock[]> {
    return this.http.get<ChatBlock[]>(`${this.base}/blocks`);
  }

  block(userId: number): Observable<void> {
    return this.http.post<void>(`${this.base}/blocks/${userId}`, {});
  }

  unblock(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/blocks/${userId}`);
  }

  report(conversationId: number, reason: string, optionalEvidence: string | null): Observable<void> {
    return this.http.post<void>(`${this.base}/conversations/${conversationId}/report`, { reason, optionalEvidence });
  }

  reports(): Observable<ChatReport[]> {
    return this.http.get<ChatReport[]>('/api/admin/chat-reports');
  }

  updateReport(reportId: number, status: ChatReport['status']): Observable<ChatReport> {
    return this.http.patch<ChatReport>(`/api/admin/chat-reports/${reportId}`, { status });
  }
}
