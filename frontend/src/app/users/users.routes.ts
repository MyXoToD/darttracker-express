import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users.component';

export const USERS_ROUTES = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':userId',
    component: ProfileComponent,
  },
];
