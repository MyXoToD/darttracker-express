import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  isLoggedIn: boolean = false;

  signup(signupData: any) {
    return this.apiService.post('/auth/signup', signupData);
  }

  login(loginData: any) {
    return this.apiService
      .post<{ token: string }>('/auth/login', loginData)
      .pipe(
        tap((result) => {
          const { token } = result as { token: string };
          if (token) {
            localStorage.setItem('accessToken', token);
            this.isLoggedIn = true;
            this.router.navigate(['/users']);
          }
        })
      );
  }

  refresh() {
    return this.apiService.post<{ token: string }>('/auth/refresh').pipe(
      tap((result) => {
        const { token } = result as { token: string };
        if (token) {
          localStorage.setItem('accessToken', token);
          this.isLoggedIn = true;
        }
      })
    );
  }

  logout() {
    return this.apiService.post('/auth/logout').pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        this.isLoggedIn = false;
        this.router.navigate(['auth', 'login']);
      })
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
        this.isLoggedIn = true;
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
