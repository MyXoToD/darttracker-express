import { UserDTO } from './models/userDTO.interface';
import { UserEntity } from './models/userEntity.interface';

export class UserMapper {
  static toDTO(entity: UserEntity): UserDTO {
    const { id, username, email, theme, created_at } = entity;

    return {
      id: id,
      username: username,
      email: email,
      theme: theme,
      created_at: created_at,
    } as UserDTO;
  }
}
