import { NextFunction, Request, Response } from "express";

import userService from "../services/user.service";
import User from "../@types/models/user.model";
import { ControllerErrorHandler } from "./tools/controller-tools";
import { UpdateUserDto } from "../@types/dto/user.dto";
import { TokenPayload } from "../@types/models/token.model";


class UserController {
  @ControllerErrorHandler()
  async getCurrentUser(req: Request, res: Response, _: NextFunction) {
    const id: number = res.locals.tokenPayload.id;
    const users = await userService.find({ id });
    const status = users.length ? 200 : 204;
    res.status(status).json(users[0]);
  }

  @ControllerErrorHandler()
  async find(req: Request, res: Response, _: NextFunction) {
    const users: User[] = await userService.find(req.query);
    const status = users.length ? 200 : 204;
    res.status(status).json(users);
  }

  @ControllerErrorHandler()
  async update(req: Request, res: Response, _: NextFunction) {
    const updateUserDto: UpdateUserDto = JSON.parse(req.body.updateUserDto);
    const tokenPayload: TokenPayload = res.locals.tokenPayload;
    if (req.file) {
      updateUserDto.img = 'user_images/' + req.file.filename;
    }

    const updatedUser = await userService.update(tokenPayload.id, updateUserDto);
    res.json(updatedUser);
  }
}

const userController: UserController = new UserController();

export default userController;