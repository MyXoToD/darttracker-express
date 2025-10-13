import db from '../../config/database';
import { BaseRepository } from '../../shared/base.repository';
import { GameWithRelationsRow } from './game.mapper';
import { GameEntity } from './models/gameEntity.interface';

export class GameRepository extends BaseRepository<GameEntity> {
  protected tableName = 'games';

  async findAllWithPlayersAndWinner(): Promise<GameWithRelationsRow[]> {
    const [rows] = await db.query<GameWithRelationsRow[]>(
      `SELECT
        g.*,
        w.id AS winner_id, w.username AS winner_username, w.email AS winner_email,
        w.created_at AS winner_created_at, w.updated_at AS winner_updated_at,
        p.id AS player_id, p.username AS player_username, p.email AS player_email,
        p.created_at AS player_created_at, p.updated_at AS player_updated_at
      FROM games g
      LEFT JOIN users w ON g.winner_id = w.id
      LEFT JOIN users_games ug ON g.id = ug.game_id
      LEFT JOIN users p ON ug.user_id = p.id
      ORDER BY g.id, p.id`,
    );

    return rows;
  }

  async findByIdWithPlayersAndWinner(
    gameId: number,
  ): Promise<GameWithRelationsRow[]> {
    const [rows] = await db.query<GameWithRelationsRow[]>(
      `SELECT
        g.*,
        w.id AS winner_id, w.username AS winner_username, w.email AS winner_email,
        w.created_at AS winner_created_at, w.updated_at AS winner_updated_at,
        p.id AS player_id, p.username AS player_username, p.email AS player_email,
        p.created_at AS player_created_at, p.updated_at AS player_updated_at
      FROM games g
      LEFT JOIN users w ON g.winner_id = w.id
      LEFT JOIN users_games ug ON g.id = ug.game_id
      LEFT JOIN users p ON ug.user_id = p.id
      WHERE g.id = ?
      ORDER BY g.id, p.id`,
      [gameId],
    );

    return rows;
  }
}
