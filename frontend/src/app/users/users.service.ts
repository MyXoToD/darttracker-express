import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly _endpoint = '/users';
  private readonly _apiService = inject(ApiService);

  getAll() {
    return this._apiService.get(this._endpoint);
  }

  getById(id: string) {
    return this._apiService.get(`${this._endpoint}/${id}`);
  }
}
