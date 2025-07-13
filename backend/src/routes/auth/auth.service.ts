import dotenv from 'dotenv';
import { Request } from 'express';
import { comparePassword, hashPassword } from '../../utils/hash';
import {
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

  login = async (loginDTO: LoginDTO, req: Request) => {
    const user = await this.userRepository.findByEmail(loginDTO.email);
    if (!user || !(await comparePassword(loginDTO.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });
    const ipAddress = req.headers['x-forwarded-for'] || req.ip;
    const userAgent = req.headers['user-agent'];

    const sessionEntity = {
      user_id: user.id,
      refresh_token: refreshToken,
      ip_address: ipAddress,
      user_agent: userAgent,
      expires_at: getExpirationDate(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ),
    } as Partial<SessionEntity>;

    this.authRepository.create(sessionEntity);

    return { accessToken, refreshToken };
  };

  refresh = async (refreshToken: string, req: Request) => {
    // Check if refreshtoken still valid
    // Check if user has active session with same refresh token
    const session =
      await this.authRepository.findByRefreshTokenAndRefreshTokenNotExpired(
        refreshToken,
      );

    if (!session) {
      throw new Error('Could not refresh session, no active session found');
    }

    const newAccessToken = generateAccessToken({ id: session.user_id });
    const newRefreshToken = generateRefreshToken({ id: session.user_id });
    const ipAddress = req.headers['x-forwarded-for'] || req.ip;
    const userAgent = req.headers['user-agent'];

    let updatedSessionEntity = {
      refresh_token: newRefreshToken,
      ip_address: ipAddress,
      user_agent: userAgent,
      expires_at: getExpirationDate(
        newRefreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ),
    } as Partial<SessionEntity>;

    // Update session in database with new refresh token and set updated at
    this.authRepository.update(session.id, updatedSessionEntity);

    // Return new tokens
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  };
}
