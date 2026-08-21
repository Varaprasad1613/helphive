import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse, AuthUser, LoginInput, RegisterInput } from './auth.model';

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
