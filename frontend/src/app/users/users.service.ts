import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { UserDTO } from './models/userDTO.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly _endpoint = '/users';
  private readonly _apiService = inject(ApiService);

  getAll() {
    return this._apiService.get(this._endpoint);
  }

  getById(id: string): Observable<UserDTO> {
    return this._apiService.get<UserDTO>(`${this._endpoint}/${id}`);
  }

  updateTheme(id: string, theme: 'light' | 'dark' | 'system') {
    return this._apiService.patch(`${this._endpoint}/${id}/theme`, { theme });
  }
}
