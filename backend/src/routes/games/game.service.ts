import { GameMapper } from './game.mapper';
import { GameRepository } from './game.repository';

export class GameService {
  constructor(private gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  getGames = async (): Promise<any[]> => {
    const rawGames =
      (await this.gameRepository.findAllWithPlayersAndWinner()) as Array<any>;

    const gamesMap = new Map<number, any>();
    rawGames.forEach((row) => {
      if (!gamesMap.has(row.id)) {
        gamesMap.set(row.id, {
          ...row,
          players: [],
          winner: row.winner_id
            ? {
                id: row.winner_id,
                username: row.winner_username,
                email: row.winner_email,
              }
            : null,
        });
      }

      if (row.player_id) {
        gamesMap.get(row.id).players.push({
          id: row.player_id,
          username: row.player_username,
          email: row.player_email,
        });
      }
    });

    return Array.from(gamesMap.values()).map((game) =>
      GameMapper.toGameDTO(game, game.players, game.winner),
    );
  };

  // getGame = async (gameId: number): Promise<GameDTO> => {
  //   const gameEntity: GameEntity | null =
  //     await this.gameRepository.findById(gameId);
  //   if (gameEntity) {
  //     const game = GameMapper.toDTO(gameEntity);
  //     return game;
  //   } else {
  //     throw new Error('Game not found');
  //   }
  // };
}
