import { UserDTO } from './models/userDTO.interface';
import { UserEntity } from './models/userEntity.interface';

export class UserMapper {
  static toDTO(entity: UserEntity): UserDTO {
    const { id, username, email, created_at } = entity;

    return {
      id: id,
      username: username,
      email: email,
      created_at: created_at,
    } as UserDTO;
  }
}
