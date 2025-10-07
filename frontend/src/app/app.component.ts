import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NotificationsComponent } from "./shared/notifications/notifications.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly authService = inject(AuthService);

  logout() {
    this.authService.logout().subscribe();
  }
}
