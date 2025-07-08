import { comparePasswords, hashPassword } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';
import { UserEntity } from '../users/models/userEntity.interface';
import { UserMapper } from '../users/user.mapper';
import { UserRepository } from '../users/user.repository';
import { LoginDTO } from './models/loginDTO.interface';
import { SignUpDTO } from './models/signUpDTO.interface';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signup = async (signUpDTO: SignUpDTO): Promise<any> => {
    const existing = await this.userRepository.findByEmail(signUpDTO.email);
    if (existing) {
      throw new Error('User with email already exists');
    }

    const hashed = await hashPassword(signUpDTO.password);
    const newUserEntity = {
      username: signUpDTO.username,
      password: hashed,
      email: signUpDTO.email,
    } as Partial<UserEntity>;
    const user = await this.userRepository.create(newUserEntity);
    return UserMapper.toDTO(user);
  };

  login = async (loginDTO: LoginDTO) => {
    const user = await this.userRepository.findByEmail(loginDTO.email);
    if (!user || !(await comparePasswords(loginDTO.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ id: user.id });
    return { token };
  };
}
