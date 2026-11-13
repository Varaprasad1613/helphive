import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpTestingController;
  let client: HttpClient;

  beforeEach(() => {
    sessionStorage.clear();
    document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/';
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    http.verify();
    document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/';
  });

  it('fetches a CSRF cookie before the first unsafe API request', () => {
    sessionStorage.setItem('helphive_token', 'jwt-token');
    client.post('/api/auth/register', {}).subscribe();

    const bootstrap = http.expectOne('/api/csrf');
    expect(bootstrap.request.method).toBe('GET');
    document.cookie = 'XSRF-TOKEN=csrf-token; path=/';
    bootstrap.flush(null, { status: 204, statusText: 'No Content' });

    const request = http.expectOne('/api/auth/register');
    expect(request.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    expect(request.request.headers.get('X-XSRF-TOKEN')).toBe('csrf-token');
    request.flush({});
  });

  it('does not request a CSRF token for safe API reads', () => {
    sessionStorage.setItem('helphive_token', 'jwt-token');
    client.get('/api/posts').subscribe();

    const request = http.expectOne('/api/posts');
    expect(request.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    expect(request.request.headers.has('X-XSRF-TOKEN')).toBe(false);
    request.flush([]);
  });
});
