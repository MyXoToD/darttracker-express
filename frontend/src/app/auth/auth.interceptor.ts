import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, of, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

// TODO: Move to better place
function isJwtExpired(token: string): boolean {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp;
  // exp is in seconds, Date.now() is in milliseconds
  return Date.now() >= exp * 1000;
}

let refreshInProgress = false;
const refreshSubject = new BehaviorSubject<string | null>(null);
const WHITELIST_URLS = ['/auth/login', '/auth/signup', '/auth/refresh'];

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  if (WHITELIST_URLS.some((url) => req.url.includes(url))) {
    return next(req);
  }

  const authService = inject(AuthService);
  const authToken = localStorage.getItem('accessToken');

  if (authToken && isJwtExpired(authToken)) {
    if (!refreshInProgress) {
      refreshInProgress = true;
      authService
        .refresh()
        .pipe(catchError(() => of(null)))
        .subscribe((newToken: any) => {
          refreshInProgress = false;
          refreshSubject.next(newToken);
        });
    }
    return refreshSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((newToken: any) => {
        if (!newToken) {
          // Handle failed refresh (e.g., redirect to login)
          return next(req);
        }
        const newReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        return next(newReq);
      })
    );
  }

  if (authToken) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(newReq);
  } else {
    return next(req);
  }
}
