import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './models/loginDTO.interface';
import { SignUpDTO } from './models/signUpDTO.interface';

export class AuthController {
  constructor(private authService: AuthService) {}

  signup = async (req: Request, res: Response) => {
    try {
      const signUpDTO: SignUpDTO = req.body;
      const user = await this.authService.signup(signUpDTO);
      res.status(201).send({ message: 'User created', user });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginDTO: LoginDTO = req.body;
      const tokens = await this.authService.login(loginDTO, req);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: false, // set to true if using HTTPS (TODO)
        sameSite: 'strict', // prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days TODO: Same as refresh token expiration
      });

      res.status(200).send({ token: tokens.accessToken });
    } catch (error: any) {
      res.status(401).send({ error: error.message });
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        const tokens = await this.authService.refresh(refreshToken, req);

        res.cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: false, // set to true if using HTTPS (TODO)
          sameSite: 'strict', // prevent CSRF attacks
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days TODO: Same as refresh token expiration
        });

        res.status(200).send({ token: tokens.accessToken });
      } else {
        throw new Error('No refresh token provided');
      }
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      await this.authService.logout(refreshToken);

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // TODO: Set secure
        sameSite: 'strict',
      });

      res.send({ logout: true });
    } catch (error) {
      next(error);
    }
  };
}
