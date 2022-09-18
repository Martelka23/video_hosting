import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/token.service";
import { TokenPayload } from "../@types/models/token";

function isAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData: TokenPayload | null = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    res.locals.tokenPayload = userData;
    console.log('Auth succ')
    next();
  } catch (err) {
    next(err);
  }
}

export default isAuth;