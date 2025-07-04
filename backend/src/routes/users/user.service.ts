import { UserEntity } from './models/userEntity.model';
import userRepository, { UserRepository } from './user.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getUsers = async (): Promise<UserEntity[]> => {
    return await this.userRepository.findAll();
  };

  getUser = async (userId: number): Promise<UserEntity | null> => {
    return await this.userRepository.findById(userId);
  };
}

export default new UserService(userRepository);
