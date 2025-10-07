import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { GamesService } from './games.service';
import { GamesWithPlayers } from './models/gamesWithPlayers.interface';

@Component({
  selector: 'app-games',
  imports: [DatePipe],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  private readonly gamesService = inject(GamesService);

  games: GamesWithPlayers[] = [];
  upcomingGames: GamesWithPlayers[] = [];

  constructor() {
    this.gamesService
      .getUpcoming()
      .subscribe(
        (result) => (this.upcomingGames = result as GamesWithPlayers[]),
      );

    // Debug
    this.gamesService
      .getAll()
      .pipe(tap((result) => (this.games = result as any[])))
      .subscribe();
  }
}
