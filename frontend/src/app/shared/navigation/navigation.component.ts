import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  imports: [RouterLink, FaIconComponent, RouterLinkActive],
  standalone: true,
})
export class NavigationComponent {
  private readonly authService = inject(AuthService);

  isLoggedIn = computed(() => this.authService.isLoggedIn());
  activeLinkClass = 'navigation__link--active';

  logout() {
    this.authService.logout().subscribe();
  }
}
