import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authToken = localStorage.getItem('accessToken');

  // TODO: Check if valid and refresh if needed

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
