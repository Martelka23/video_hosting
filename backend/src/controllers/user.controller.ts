import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import User, { FindUsersDb } from "../@types/models/user";

class UserController {
  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = res.locals.tokenPayload.id;
      const user = await userService.getOne({ id });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await userService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const findUsersDb: FindUsersDb = req.body;
      const user: User = await userService.getOne(findUsersDb);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const findUsersDb: FindUsersDb = { id };
      const user: User = await userService.getOne(findUsersDb);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

const userController: UserController = new UserController();

export default userController;