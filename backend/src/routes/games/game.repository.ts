import db from '../../config/database';
import { BaseRepository } from '../../shared/base.repository';
import { GameEntity } from './models/gameEntity.interface';

export class GameRepository extends BaseRepository<GameEntity> {
  protected tableName = 'games';

  async findAllWithPlayersAndWinner() {
    const [rows] = await db.query(
      `SELECT
        g.*,
        w.id AS winner_id, w.username AS winner_username, w.email AS winner_email,
        p.id AS player_id, p.username AS player_username, p.email AS player_email
      FROM games g
      LEFT JOIN users w ON g.winner_id = w.id
      LEFT JOIN users_games ug ON g.id = ug.game_id
      LEFT JOIN users p ON ug.user_id = p.id
      ORDER BY g.id`,
    );

    return rows;
  }
}
