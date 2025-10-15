import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../auth/auth.service';
import { TopbarService } from './topbar.service';

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

  themeToggle = viewChild<ElementRef>('themeToggle');
  pageTitle = computed(() => this._topbarService.pageTitle());
  loggedInUser = computed(() => this._authService.loggedInUser());
  isLoggedIn = computed(() => this._authService.isLoggedIn());
  button = computed(() => this.themeToggle());

  constructor() {
    effect(() => {
      console.log(this.themeToggle());
    });
  }

  toggleTheme() {
    console.log(this.themeToggle()!.nativeElement.checked);

    const root = document.documentElement;

    document.startViewTransition(() => {
      root.classList.toggle('dark');
    });

    const { top, left, width, height } =
      this.button()?.nativeElement.getBoundingClientRect();
    console.log({ top, left, width, height });
    const x = Math.round(left + width / 2);
    const y = Math.round(top + height / 2);

    root.style.setProperty('--theme-x', x + 'px');
    root.style.setProperty('--theme-y', y + 'px');
    root.style.setProperty('--theme-r', this.getCircleRadius(x, y) + 'px');
  }

  getCircleRadius(x: number, y: number) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const distances = [
      Math.hypot(x, y),
      Math.hypot(x - width, y),
      Math.hypot(x, y - height),
      Math.hypot(x - width, y - height),
    ];

    return Math.max(...distances);
  }

  logout() {}
}
