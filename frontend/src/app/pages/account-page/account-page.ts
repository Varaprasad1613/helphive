import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-account-page',
  imports: [ReactiveFormsModule],
  templateUrl: './account-page.html',
  styleUrl: './account-page.scss',
})
export class AccountPage {
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  readonly savingProfile = signal(false);
  readonly savingPassword = signal(false);
  readonly profileMessage = signal('');
  readonly passwordMessage = signal('');
  readonly error = signal('');

  readonly profileForm = this.fb.nonNullable.group({
    name: [this.auth.user()?.name ?? '', [Validators.required, Validators.maxLength(60)]],
    email: [this.auth.user()?.email ?? '', [Validators.required, Validators.email, Validators.maxLength(120)]],
  });
  readonly passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
    confirmPassword: ['', Validators.required],
  });

  saveProfile(): void {
    if (this.profileForm.invalid) { this.profileForm.markAllAsTouched(); return; }
    this.savingProfile.set(true); this.error.set(''); this.profileMessage.set('');
    this.auth.updateProfile(this.profileForm.getRawValue()).subscribe({
      next: () => { this.savingProfile.set(false); this.profileMessage.set('Profile updated successfully.'); },
      error: (response: HttpErrorResponse) => { this.savingProfile.set(false); this.error.set(response.error?.message ?? 'Could not update your profile.'); },
    });
  }

  savePassword(): void {
    const value = this.passwordForm.getRawValue();
    if (this.passwordForm.invalid || value.newPassword !== value.confirmPassword) {
      this.passwordForm.markAllAsTouched(); this.error.set('New password and confirmation must match.'); return;
    }
    this.savingPassword.set(true); this.error.set(''); this.passwordMessage.set('');
    this.auth.changePassword({ currentPassword: value.currentPassword, newPassword: value.newPassword }).subscribe({
      next: () => { this.savingPassword.set(false); this.passwordForm.reset(); this.passwordMessage.set('Password changed successfully.'); },
      error: (response: HttpErrorResponse) => { this.savingPassword.set(false); this.error.set(response.error?.message ?? 'Could not change your password.'); },
    });
  }
}
