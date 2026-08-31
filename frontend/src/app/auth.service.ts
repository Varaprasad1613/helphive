import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse, AuthUser, LoginInput, MessageResponse, PasswordChangeInput, ProfileInput, RegisterInput } from './auth.model';

const TOKEN_KEY = 'helphive_token';
const USER_KEY = 'helphive_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  readonly user = signal<AuthUser | null>(this.readUser());
  readonly authenticated = computed(() => this.user() !== null && !!this.token());

  register(input: RegisterInput): Observable<AuthUser> {
    return this.http.post<AuthUser>('/api/auth/register', input);
  }

  login(input: LoginInput): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', input).pipe(tap(response => this.save(response)));
  }

  currentUser(): Observable<AuthUser> {
    return this.http.get<AuthUser>('/api/users/me').pipe(tap(user => this.replaceUser(user)));
  }

  updateProfile(input: ProfileInput): Observable<AuthUser> {
    return this.http.put<AuthUser>('/api/users/me', input).pipe(tap(user => this.replaceUser(user)));
  }

  changePassword(input: PasswordChangeInput): Observable<void> {
    return this.http.patch<void>('/api/users/me/password', input);
  }

  verifyEmail(token: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>('/api/auth/verify-email', { token });
  }

  resendVerification(email: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>('/api/auth/resend-verification', { email });
  }

  forgotPassword(email: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>('/api/auth/forgot-password', { email });
  }

  resetPassword(token: string, password: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>('/api/auth/reset-password', { token, password });
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.user.set(null);
  }

  token(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  private save(response: AuthResponse): void {
    sessionStorage.setItem(TOKEN_KEY, response.token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(response.user));
    this.user.set(response.user);
  }

  private replaceUser(user: AuthUser): void {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.user.set(user);
  }

  private readUser(): AuthUser | null {
    try {
      const value = sessionStorage.getItem(USER_KEY);
      return value ? JSON.parse(value) as AuthUser : null;
    } catch {
      sessionStorage.removeItem(USER_KEY);
      return null;
    }
  }
}
