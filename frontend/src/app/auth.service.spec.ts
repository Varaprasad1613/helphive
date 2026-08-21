import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthUser } from './auth.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('registers without signing the user in', () => {
    const response: AuthUser = { id: 1, name: 'Alex Kim', email: 'alex@example.com', role: 'MEMBER' };

    service.register({ name: 'Alex Kim', email: 'alex@example.com', password: 'strong-pass-123' })
      .subscribe(result => expect(result).toEqual(response));

    const request = http.expectOne('/api/auth/register');
    expect(request.request.method).toBe('POST');
    request.flush(response);

    expect(service.user()).toBeNull();
    expect(service.authenticated()).toBe(false);
    expect(sessionStorage.getItem('helphive_token')).toBeNull();
  });

  it('clears the session on logout', () => {
    sessionStorage.setItem('helphive_token', 'token');
    sessionStorage.setItem('helphive_user', JSON.stringify({ id: 1, name: 'Alex', email: 'alex@example.com', role: 'MEMBER' }));

    service.logout();

    expect(service.user()).toBeNull();
    expect(sessionStorage.getItem('helphive_token')).toBeNull();
  });
});
