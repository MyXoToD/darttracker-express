import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log('cookies', req.cookies.refreshToken);
    console.log('signedCookies', req.signedCookies);
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

  getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    try {
      const user = await this.userService.getUser(userId);

      if (!user) {
        res.status(404).send({ error: 'Not found', message: 'User not found' });
      } else {
        res.send(user);
      }
    } catch (error) {
      res.status(500).send({
        error: error,
        message: `Failed to fetch user with id ${userId}`,
      });
    }
  };
}
