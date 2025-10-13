import { GamesComponent } from './games.component';
import { MatchCardComponent } from './match-card/match-card.component';

export const GAMES_ROUTES = [
  {
    path: '',
    component: GamesComponent,
  },
  {
    path: ':gameId',
    component: MatchCardComponent,
  },
];
