import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  private readonly gamesService = inject(GamesService);

  games: any[] = [];

  constructor() {
    this.gamesService
      .getAll()
      .pipe(tap((result) => (this.games = result as any[])))
      .subscribe();
  }
}
