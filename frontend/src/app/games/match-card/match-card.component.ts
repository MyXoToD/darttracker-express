import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { tap } from 'rxjs';
import { UserDTO } from '../../users/models/userDTO.interface';
import { GamesService } from '../games.service';
import { GamesWithPlayers } from '../models/gamesWithPlayers.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [FaIconComponent, RouterLink, NgOptimizedImage],
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent {
  private readonly _gamesService = inject(GamesService);

  gameId = input.required<string>();
  game: GamesWithPlayers | null = null;
  gamePlayers: UserDTO[] = [];

  constructor() {
    effect(() => {
      this._gamesService
        .getById(this.gameId())
        .pipe(
          tap((result) => {
            this.game = result as GamesWithPlayers;
            this.gamePlayers = this.game.players;
          }),
        )
        .subscribe();
    });
  }
}
