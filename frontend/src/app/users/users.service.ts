import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
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
}
