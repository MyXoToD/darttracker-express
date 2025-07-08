import { BaseRepository } from '../../shared/base.repository';

export class AuthRepository extends BaseRepository<any> {
  protected tableName = 'users';
}
