import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./users/users.routes').then((r) => r.USERS_ROUTES),
  },
  {
    path: 'games',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./games/games.routes').then((r) => r.GAMES_ROUTES),
  },
];
