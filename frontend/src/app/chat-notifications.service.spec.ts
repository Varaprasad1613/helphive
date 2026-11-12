import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ChatNotificationsService } from './chat-notifications.service';

describe('ChatNotificationsService', () => {
  let service: ChatNotificationsService;
  let http: HttpTestingController;

  beforeEach(() => {
    sessionStorage.setItem('helphive_user', JSON.stringify({
      id: 7, name: 'Alex Kim', email: 'alex@example.com', role: 'MEMBER',
    }));
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChatNotificationsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    service.stop();
    http.verify();
    sessionStorage.clear();
  });

  it('refreshes the unread and pending request counts after a conversation is read', async () => {
    const initialRefresh = service.refresh();
    http.expectOne('/api/chat/notifications').flush({ unreadMessages: 3, pendingRequests: 1 });
    await initialRefresh;
    expect(service.total()).toBe(4);

    const markRead = service.markConversationRead(12, 45);
    const readRequest = http.expectOne('/api/chat/conversations/12/read');
    expect(readRequest.request.method).toBe('POST');
    expect(readRequest.request.body).toEqual({ messageId: 45 });
    readRequest.flush(null);

    await new Promise(resolve => setTimeout(resolve, 0));
    const refreshedSummary = http.expectOne('/api/chat/notifications');
    refreshedSummary.flush({ unreadMessages: 0, pendingRequests: 1 });
    await markRead;

    expect(service.summary()).toEqual({ unreadMessages: 0, pendingRequests: 1 });
    expect(service.total()).toBe(1);
  });
});
