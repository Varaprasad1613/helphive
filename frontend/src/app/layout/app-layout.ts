import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { ChatCryptoService } from '../chat-crypto.service';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {
  readonly auth = inject(AuthService);
  private readonly chatCrypto = inject(ChatCryptoService);
  private readonly router = inject(Router);

  logout(): void {
    this.chatCrypto.lock();
    this.auth.logout();
    void this.router.navigate(['/auth/login'], { queryParams: { notice: 'You are signed out.' } });
  }
}
