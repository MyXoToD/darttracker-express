import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private readonly apiService = inject(ApiService);

  getAll() {
    return this.apiService.get('/games');
  }
}
