import { BaseRepository } from '../../shared/base.repository';
import { UserEntity } from './models/userEntity.model';

export class UserRepository extends BaseRepository<UserEntity> {
  protected tableName = 'users';
}

export default new UserRepository();
