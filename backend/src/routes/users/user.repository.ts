import db from '../../config/database';
import { BaseRepository } from '../../shared/base.repository';
import { UserEntity } from './models/userEntity.interface';

export class UserRepository extends BaseRepository<UserEntity> {
  protected tableName = 'users';

  async findByEmail(email: string): Promise<UserEntity | null> {
    const [rows] = await db.query<UserEntity[]>(
      `SELECT * FROM ${this.tableName} WHERE email = ?`,
      [email],
    );
    return rows[0] ?? null;
  }
}
