import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  isLoggedIn: boolean = false; // TODO: Make hard reload work as well

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
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp && Date.now() < decoded.exp * 1000) {
        return true;
      }

      // Expired
      this.logout();
      return false;
    } catch (error) {
      // Invalid token
      this.logout();
      return false;
    }
  }
}
