import { Request, Response } from 'express';
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
      const token = await this.authService.login(loginDTO);
      res.status(200).send(token);
    } catch (error: any) {
      res.status(401).send({ error: error.message });
    }
  };
}
