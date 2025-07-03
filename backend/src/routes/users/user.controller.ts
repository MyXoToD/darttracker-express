import { Request, Response } from 'express';
import userService, { UserService } from './user.service';

class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response) => {
    res.status(200).send(await this.userService.getUsers());
  };

  getUser = async (req: Request, res: Response) => {
    res.send(await this.userService.getUser(+req.params.id));
  };
}

export default new UserController(userService);
