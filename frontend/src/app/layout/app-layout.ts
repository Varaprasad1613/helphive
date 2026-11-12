import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { ChatCryptoService } from '../chat-crypto.service';
import { ChatNotificationsService } from '../chat-notifications.service';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout implements OnDestroy {
  readonly auth = inject(AuthService);
  private readonly chatCrypto = inject(ChatCryptoService);
  readonly chatNotifications = inject(ChatNotificationsService);
  private readonly router = inject(Router);

  constructor() {
    this.chatNotifications.start();
  }

  ngOnDestroy(): void {
    this.chatNotifications.stop();
  }

  logout(): void {
    this.chatCrypto.lock();
    this.chatNotifications.stop();
    this.auth.logout();
    void this.router.navigate(['/auth/login'], { queryParams: { notice: 'You are signed out.' } });
  }
}
