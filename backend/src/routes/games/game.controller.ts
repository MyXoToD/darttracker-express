import { NextFunction, Request, Response } from 'express';
import { GameService } from './game.service';

export class GameController {
  constructor(private gameService: GameService) {
    this.gameService = gameService;
  }

  getGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const games = await this.gameService.getGames();
      res.send(games);
    } catch (error) {
      next(error);
      // res
      //   .status(500)
      //   .send({ error: error, message: 'Failed to get all games' });
    }
  };

  getUpcomingGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const games = await this.gameService.getUpcomingGames();
      res.send(games);
    } catch (error) {
      next(error);
    }
  };

  // getGame = async (req: Request, res: Response) => {
  //   const gameId = parseInt(req.params.id);

  //   try {
  //     const game = await this.gameService.getGame(gameId);

  //     if (!game) {
  //       res.status(404).send({ error: 'Not found', message: 'Game not found' });
  //     } else {
  //       res.send(game);
  //     }
  //   } catch (error) {
  //     res.status(500).send({
  //       error: error,
  //       message: `Failed to fetch game with id ${gameId}`,
  //     });
  //   }
  // };
}
