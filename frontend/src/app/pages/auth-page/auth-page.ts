import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})
export class AuthPage {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly mode = signal<'login' | 'register'>(this.route.snapshot.url.at(-1)?.path === 'register' ? 'register' : 'login');
  readonly busy = signal(false);
  readonly error = signal('');
  readonly notice = signal(this.route.snapshot.queryParamMap.get('notice') ?? '');

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]], password: ['', Validators.required],
  });
  readonly registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
  });

  switchMode(mode: 'login' | 'register'): void {
    this.mode.set(mode); this.error.set(''); this.notice.set('');
    void this.router.navigate(['/auth', mode], { replaceUrl: true });
  }

  submit(): void {
    const form = this.mode() === 'login' ? this.loginForm : this.registerForm;
    if (form.invalid) { form.markAllAsTouched(); return; }
    this.busy.set(true); this.error.set('');
    if (this.mode() === 'login') {
      this.auth.login(this.loginForm.getRawValue()).subscribe({
        next: () => {
          this.busy.set(false);
          const requested = this.route.snapshot.queryParamMap.get('returnUrl');
          void this.router.navigateByUrl(requested?.startsWith('/') ? requested : '/community');
        },
        error: (response: HttpErrorResponse) => { this.busy.set(false); this.error.set(response.error?.message ?? 'Sign in failed.'); },
      });
      return;
    }
    this.auth.register(this.registerForm.getRawValue()).subscribe({
      next: user => {
        this.busy.set(false); this.loginForm.setValue({ email: user.email, password: '' });
        this.registerForm.reset(); this.mode.set('login');
        this.notice.set(user.emailVerified === false
          ? 'Account created. Check your email and verify it before signing in.'
          : 'Account created successfully. Sign in with your new password.');
        void this.router.navigate(['/auth/login'], { replaceUrl: true });
      },
      error: (response: HttpErrorResponse) => { this.busy.set(false); this.error.set(response.error?.message ?? 'Could not create the account.'); },
    });
  }

  resendVerification(): void {
    const email = this.loginForm.controls.email.value;
    if (!email || this.loginForm.controls.email.invalid) { this.error.set('Enter your account email first.'); return; }
    this.busy.set(true);
    this.auth.resendVerification(email).subscribe({
      next: response => { this.busy.set(false); this.error.set(''); this.notice.set(response.message); },
      error: () => { this.busy.set(false); this.error.set('Could not resend the verification email.'); },
    });
  }
}
