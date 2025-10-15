import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { NotificationsService } from '../shared/notifications/services/notifications.service';
import { UserDTO } from '../users/models/userDTO.interface';
import { UsersService } from '../users/users.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _userService = inject(UsersService);

  isLoggedIn = signal<boolean>(false);
  loggedInUser = signal<UserDTO | null>(null);

  signup(signupData: any) {
    return this.apiService.post('/auth/signup', signupData);
  }

  login(loginData: any) {
    return this.apiService
      .post<{ token: string }>('/auth/login', loginData)
      .pipe(
        tap((result) => {
          const { user, token } = result as { user: UserDTO, token: string };
          if (token) {
            localStorage.setItem('accessToken', token);
            this.isLoggedIn.set(true);
            this.loggedInUser.set(user);
            this.router.navigate(['/dashboard']);
            this._notificationsService.addSuccessNotification(
              'You have logged in successfully.',
            );
          }
        }),
      );
  }

  refresh() {
    return this.apiService.post<{ token: string }>('/auth/refresh').pipe(
      tap((result) => {
        const { token } = result as { token: string };
        if (token) {
          localStorage.setItem('accessToken', token);
          this.isLoggedIn.set(true);
        }
      }),
    );
  }

  logout() {
    return this.apiService.post('/auth/logout').pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        this.isLoggedIn.set(false);
        this.router.navigate(['auth', 'login']);
        this._notificationsService.addSuccessNotification(
          'You have logged out successfully.',
        );
      }),
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp && Date.now() < decoded.exp * 1000) {
        this.isLoggedIn.set(true);
        this._userService.getById(decoded.id).pipe(
          tap((user: UserDTO) => {
            this.loggedInUser.set(user);
          })
        ).subscribe();
        return true;
      }

      // Expired
      // this.logout();
      return false;
    } catch (error) {
      // Invalid token
      // this.logout();
      return false;
    }
  }
}
