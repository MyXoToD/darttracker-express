import db from '../../config/database';
import { BaseRepository } from '../../shared/base.repository';
import { SessionEntity } from './models/sessionEntity.interface';

export class AuthRepository extends BaseRepository<SessionEntity> {
  protected tableName = 'sessions';

  async findByUserIdAndRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<SessionEntity | null> {
    const [rows] = await db.query<SessionEntity[]>(
      `SELECT * FROM ${this.tableName} WHERE user_id = ? AND refresh_token = ?`,
      [userId, refreshToken],
    );
    return rows[0] ?? null;
  }
}
