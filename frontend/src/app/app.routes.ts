import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.routes').then((r) => r.USERS_ROUTES),
  },
];
