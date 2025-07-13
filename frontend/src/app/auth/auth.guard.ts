import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return authService.refresh().pipe(
    switchMap((result: any) => {
      // If refresh succeeds, allow navigation
      if (localStorage.getItem('accessToken')) {
        return of(true);
      } else {
        router.navigate(['/auth/login']);
        return of(false);
      }
    }),
    catchError(() => {
      // If refresh fails, redirect to login
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
