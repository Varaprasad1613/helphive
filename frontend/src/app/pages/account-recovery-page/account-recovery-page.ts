import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-account-recovery-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './account-recovery-page.html',
  styleUrl: './account-recovery-page.scss',
})
export class AccountRecoveryPage {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  readonly mode = this.route.snapshot.url.at(-1)?.path ?? 'forgot-password';
  readonly busy = signal(this.mode === 'verify-email');
  readonly message = signal('');
  readonly error = signal('');
  readonly emailForm = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]] });
  readonly resetForm = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
    confirmPassword: ['', Validators.required],
  });

  constructor() {
    if (this.mode === 'verify-email') this.verify();
  }
  requestReset(): void {
    if (this.emailForm.invalid) { this.emailForm.markAllAsTouched(); return; }
    this.busy.set(true); this.error.set('');
    this.auth.forgotPassword(this.emailForm.controls.email.value).subscribe({
      next: response => { this.busy.set(false); this.message.set(response.message); },
      error: () => { this.busy.set(false); this.error.set('Could not request a reset email.'); },
    });
  }
  resetPassword(): void {
    const value = this.resetForm.getRawValue();
    if (this.resetForm.invalid || value.password !== value.confirmPassword) {
      this.resetForm.markAllAsTouched(); this.error.set('Passwords must match and contain at least 8 characters.'); return;
    }
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!token) { this.error.set('This reset link is missing its token.'); return; }
    this.busy.set(true); this.error.set('');
    this.auth.resetPassword(token, value.password).subscribe({
      next: response => { this.busy.set(false); this.message.set(response.message); this.resetForm.reset(); },
      error: (response: HttpErrorResponse) => { this.busy.set(false); this.error.set(response.error?.message ?? 'Could not reset the password.'); },
    });
  }
  private verify(): void {
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!token) { this.busy.set(false); this.error.set('This verification link is missing its token.'); return; }
    this.auth.verifyEmail(token).subscribe({
      next: response => { this.busy.set(false); this.message.set(response.message); },
      error: (response: HttpErrorResponse) => { this.busy.set(false); this.error.set(response.error?.message ?? 'Could not verify this email.'); },
    });
  }
}
