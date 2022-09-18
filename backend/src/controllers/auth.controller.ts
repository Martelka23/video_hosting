import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import ApiError from "../exceptions/api-error";

import authService from "../services/auth.service";
import { CreateUserDto } from "../@types/dto/user.dto";
import { CreatedUserDb, LoginUserDb } from "../@types/models/user";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Wrong login or password');
      }

      const createUserDto: CreateUserDto = req.body;
      const newUser: CreatedUserDb = await authService.signup(createUserDto);
      res.cookie('refreshToken', newUser.tokens.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true
        // secure: true
      });
      res.status(201).json(newUser).redirect(process.env.SITE_URL as string);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginUser: LoginUserDb = req.body;
      const user: CreatedUserDb = await authService.login(loginUser);
      res.cookie('refreshToken', user.tokens.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true
        // secure: true
      });
      res.json(user).redirect(process.env.SITE_URL as string);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken: string = req.cookies.refreshToken;
      const user: CreatedUserDb = await authService.refresh(refreshToken);
      res.cookie('refreshToken', user.tokens.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true
        // secure: true
      });
      res.json(user.tokens);
    } catch (err) {
      next(err);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink: string = req.params.link;
      await authService.activate(activationLink);
      res.redirect(process.env.SITE_URL as string);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken: string = req.cookies.refreshToken;
      // await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.json('Logout success');
    } catch (err) {
      next(err);
    }
  }
}

const authController = new AuthController();

export default authController;