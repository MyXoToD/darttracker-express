import { Router } from 'express';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

const gamesRouter = Router();

const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);
const gameController = new GameController(gameService);

gamesRouter.get('/', gameController.getGames);
// gamesRouter.get('/:id', gameController.getGame);

export default gamesRouter;
