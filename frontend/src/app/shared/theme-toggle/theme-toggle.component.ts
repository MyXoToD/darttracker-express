import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserDTO } from '../../users/models/userDTO.interface';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  standalone: true,
  imports: [FaIconComponent],
})
export class ThemeToggleComponent {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UsersService);
  private readonly _defaultTheme = 'system';

  themeToggle = viewChild<ElementRef>('themeToggle');
  currentTheme = signal<'light' | 'dark' | 'system'>(this._defaultTheme);

  constructor() {
    effect(() => {
      if (this._authService.isLoggedIn()) {
        // Get logged in user theme preference
        const userId: string = this._authService.loggedInUser()?.id.toString()!;
        this._userService
          .getById(userId)
          .pipe(
            tap((user: UserDTO) => {
              this.currentTheme.set(user.theme);
            }),
          )
          .subscribe();
      } else {
        this.currentTheme.set(this._defaultTheme);
      }
    });

    effect(() => {
      this.setTheme(this.currentTheme());
    });
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    if (theme === 'system') {
      // Detect system theme preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      theme = prefersDark.matches ? 'dark' : 'light';
    }

    // Update user theme preference if logged in
    if (this._authService.isLoggedIn()) {
      this._userService
        .updateTheme(this._authService.loggedInUser()!.id.toString(), theme)
        .subscribe();
    }

    if (this.themeToggle()!.nativeElement)
      this.themeToggle()!.nativeElement.checked = theme === 'light';
    const root = document.documentElement;
    root.classList.remove('light');
    root.classList.add(theme);
  }

  toggleTheme(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    if (event.target.checked) {
      this.currentTheme.set('light');
    } else {
      this.currentTheme.set('dark');
    }

    // console.log(this.themeToggle()!.nativeElement.checked);

    // const root = document.documentElement;
  }
}
