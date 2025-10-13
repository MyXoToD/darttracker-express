import { GameMapper, GameWithRelationsRow } from './game.mapper';
import { GameRepository } from './game.repository';
import { GameDTO } from './models/gameDTO.interface';

export class GameService {
  constructor(private gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  getGames = async (): Promise<GameDTO[]> => {
    const rows: GameWithRelationsRow[] =
      await this.gameRepository.findAllWithPlayersAndWinner();

    const gamesWithRelations = GameMapper.groupGameRows(rows);
    return gamesWithRelations.map((game) => GameMapper.toGameDTO(game));
  };

  getUpcomingGames = async (): Promise<GameDTO[]> => {
    const allGames: GameDTO[] = await this.getGames();

    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const upcomingGames = allGames.filter(
      (game) => game.played_at >= todayMidnight,
    );

    return upcomingGames;
  };

  getGame = async (gameId: number): Promise<GameDTO> => {
    const rows: GameWithRelationsRow[] =
      await this.gameRepository.findByIdWithPlayersAndWinner(gameId);

    if (rows.length === 0) {
      throw new Error('Game not found');
    }

    const gamesWithRelations = GameMapper.groupGameRows(rows);
    return GameMapper.toGameDTO(gamesWithRelations[0]);
  };
}
