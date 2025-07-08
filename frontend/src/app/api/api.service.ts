import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    'https://ominous-enigma-vrwp6r79xjhw6r6-3000.app.github.dev/api';

  get(endpoint: string) {
    return this.http.get(this.apiUrl + endpoint);
  }

  post(endpoint: string, data: any) {
    return this.http.post(this.apiUrl + endpoint, data);
  }
}
