import { Request, Response } from 'express';
import authService, { AuthService } from '../services/authService';

class AuthController {
  authService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await this.authService.login(username, password);
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(401).json({ message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await this.authService.register(userData);
      res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ message });
    }
  }
  async logout(req: Request, res: Response) {
    try {
      const user = req.body;
      await this.authService.logout(user);
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message });
    }
  }
}

export default new AuthController(authService);
