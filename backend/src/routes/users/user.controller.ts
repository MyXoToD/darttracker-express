import { Request, Response } from 'express';
import userService, { UserService } from './user.service';

class UserController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUsers();
      res.send(users);
    } catch (error) {
      res
        .status(500)
        .send({ error: error, message: 'Failed to get all users' });
    }
  };

  getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    try {
      const user = await this.userService.getUser(userId);

      if (!user) {
        res.status(404).send({ error: 'Not found', message: 'User not found' });
      }

      res.send(user);
    } catch (error) {
      res.status(500).send({
        error: error,
        message: `Failed to fetch user with id ${userId}`,
      });
    }
  };
}

export default new UserController(userService);
