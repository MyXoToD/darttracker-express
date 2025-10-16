import { CustomError } from '../../shared/error-handler/custom-error.class';
import { UserDTO } from './models/userDTO.interface';
import { UserEntity } from './models/userEntity.interface';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getUsers = async (): Promise<UserDTO[]> => {
    const userEntities: UserEntity[] = await this.userRepository.findAll();
    const users: UserDTO[] = userEntities.map((user) => UserMapper.toDTO(user));
    return users;
  };

  getUser = async (userId: number): Promise<UserDTO> => {
    const userEntity: UserEntity | null =
      await this.userRepository.findById(userId);
    if (userEntity) {
      const user = UserMapper.toDTO(userEntity);
      return user;
    } else {
      throw new CustomError(`Could not find user with id '${userId}'.`, 404);
    }
  };

  updateTheme = async (
    userId: number,
    theme: 'light' | 'dark' | 'system',
  ): Promise<void> => {
    const userEntity: UserEntity | null =
      await this.userRepository.findById(userId);
    if (!userEntity) {
      throw new CustomError(`Could not find user with id '${userId}'.`, 404);
    }
    await this.userRepository.update(userId, { theme } as Partial<UserEntity>);
  };
}
