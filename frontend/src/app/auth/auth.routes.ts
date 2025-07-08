import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const AUTH_ROUTES = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
