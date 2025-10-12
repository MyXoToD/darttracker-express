import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getUsers();
      res.send(users);
    } catch (error) {
      next(error);
      // res
      //   .status(500)
      //   .send({ error: error, message: 'Failed to get all users' });
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);

    try {
      const user = await this.userService.getUser(userId);

      res.send(user);
    } catch (error) {
      next(error);
    }
  };
}
