import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  imports: [RouterLink, NgIf, FaIconComponent],
  standalone: true,
})
export class NavigationComponent {
  private readonly authService = inject(AuthService);

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
