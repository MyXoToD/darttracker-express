import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  signup(signupData: any) {
    return this.apiService.post('/auth/signup', signupData);
  }
}
