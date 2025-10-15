import { Component, computed, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TopbarService } from './topbar.service';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  imports: [FaIconComponent, RouterLink, NgOptimizedImage],
})
export class TopbarComponent {
  private readonly _authService = inject(AuthService);
  private readonly _topbarService = inject(TopbarService);

  pageTitle = computed(() => this._topbarService.pageTitle());
  loggedInUser = computed(() => this._authService.loggedInUser());
  isLoggedIn = computed(() => this._authService.isLoggedIn());

  logout() {}
}
