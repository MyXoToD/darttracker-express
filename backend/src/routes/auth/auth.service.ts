import dotenv from 'dotenv';
import { comparePassword, hashPassword } from '../../utils/hash';
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
  getExpirationDate,
} from '../../utils/jwt';
import { UserEntity } from '../users/models/userEntity.interface';
import { UserMapper } from '../users/user.mapper';
import { UserRepository } from '../users/user.repository';
import { AuthRepository } from './auth.repository';
import { LoginDTO } from './models/loginDTO.interface';
import { SessionEntity } from './models/sessionEntity.interface';
import { SignUpDTO } from './models/signUpDTO.interface';
dotenv.config();

export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {}

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
    if (!user || !(await comparePassword(loginDTO.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    const sessionEntity = {
      user_id: user.id,
      refresh_token: refreshToken,
      ip_address: 'NOT IMPLEMENTED',
      user_agent: 'NOT IMPLEMENTED',
      expires_at: getExpirationDate(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ),
    } as Partial<SessionEntity>;

    this.authRepository.create(sessionEntity);

    return { accessToken, refreshToken };
  };

  refresh = async (refreshToken: string) => {
    const decoded = decodeToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as { id: number };

    // Check if refreshtoken still valid

    if (decoded) {
      this.authRepository.findByUserIdAndRefreshToken(decoded.id, refreshToken);
      // TODO: Check if user has active session with same user id and refresh token
      // Update session in database with new refresh token and set updated at
      // Return new tokens
      return 'NOT IMPLEMENTED';
    }
  };
}
