import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import User from "../@types/models/user";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await userService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
}

const userController: UserController = new UserController();

export default userController;