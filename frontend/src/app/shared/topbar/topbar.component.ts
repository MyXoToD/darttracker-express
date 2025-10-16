import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../auth/auth.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TopbarService } from './topbar.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  imports: [
    FaIconComponent,
    RouterLink,
    NgOptimizedImage,
    ThemeToggleComponent,
  ],
})
export class TopbarComponent {
  private readonly _authService = inject(AuthService);
  private readonly _topbarService = inject(TopbarService);

  pageTitle = computed(() => this._topbarService.pageTitle());
  loggedInUser = computed(() => this._authService.loggedInUser());
  isLoggedIn = computed(() => this._authService.isLoggedIn());

  logout() {}
}
