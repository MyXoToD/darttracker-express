import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private readonly apiService = inject(ApiService);
  private readonly endpoint = '/games';

  getAll() {
    return this.apiService.get(this.endpoint);
  }

  getUpcoming() {
    return this.apiService.get(`${this.endpoint}/upcoming`);
  }

  getById(id: string) {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }
}
