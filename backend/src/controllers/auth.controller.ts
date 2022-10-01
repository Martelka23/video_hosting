import { Request, Response, NextFunction, CookieOptions } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

import ApiError from "../exceptions/api-error";
import authService from "../services/auth.service";
import { CreateUserDto } from "../@types/dto/user.dto";
import { CreatedUserDb, LoginUserDb } from "../@types/models/user.model";
import { ControllerErrorHandler } from "./tools/controller-tools";

class AuthController {
  private getTokenParams(val: string): [ string, string, CookieOptions ] {
    return  ['refreshToken', val, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true
      // secure: true
    }];
  }

  @ControllerErrorHandler()
  async signup(req: Request, res: Response, _: NextFunction) {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.BadRequest('Wrong login or password');
    }

    const createUserDto: CreateUserDto = req.body;
    const newUser: CreatedUserDb = await authService.signup(createUserDto);
    res.cookie(...this.getTokenParams(newUser.tokens.refreshToken));
    res.status(201).json(newUser).redirect(process.env.SITE_URL as string);
  }

  @ControllerErrorHandler()
  async login(req: Request, res: Response, _: NextFunction) {
    const loginUser: LoginUserDb = req.body;
    const user: CreatedUserDb = await authService.login(loginUser);
    res.cookie(...this.getTokenParams(user.tokens.refreshToken));
    res.json(user).redirect(process.env.SITE_URL as string);
  }

  @ControllerErrorHandler()
  async refresh(req: Request, res: Response, _: NextFunction) {
    const refreshToken: string = req.cookies.refreshToken;
    const user: CreatedUserDb = await authService.refresh(refreshToken);
    res.cookie(...this.getTokenParams(user.tokens.refreshToken));
    res.json(user.tokens);
  }

  @ControllerErrorHandler()
  async activate(req: Request, res: Response, _: NextFunction) {
    const activationLink: string = req.params.link;
    await authService.activate(activationLink);
    res.redirect(process.env.SITE_URL as string);
  }

  @ControllerErrorHandler()
  async logout(req: Request, res: Response, _: NextFunction) {
    const refreshToken: string = req.cookies.refreshToken;
    await authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.json('Logout success');
  }
}

const authController = new AuthController();

export default authController;