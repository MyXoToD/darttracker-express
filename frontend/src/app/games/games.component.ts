import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { GamesService } from './games.service';
import { GamesWithPlayers } from './models/gamesWithPlayers.interface';
import { TopbarService } from '../shared/topbar/topbar.service';

@Component({
  selector: 'app-games',
  imports: [DatePipe, RouterLink],
  standalone: true,
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  private readonly _gamesService = inject(GamesService);
  private readonly _topbarService = inject(TopbarService);

  games: GamesWithPlayers[] = [];
  upcomingGames: GamesWithPlayers[] = [];

  constructor() {
    this._topbarService.pageTitle.set('Games');

    this._gamesService
      .getUpcoming()
      .subscribe(
        (result) => (this.upcomingGames = result as GamesWithPlayers[]),
      );

    // Debug
    this._gamesService
      .getAll()
      .pipe(tap((result) => (this.games = result as GamesWithPlayers[])))
      .subscribe();

    // Debug 2
    // this.gamesService.getById(6).subscribe((result) => console.log(result));
  }
}
