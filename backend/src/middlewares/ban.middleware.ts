import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../@types/models/token.types";
import ApiError from "../exceptions/api-error";

function isBanned(req: Request, res: Response, next: NextFunction) {
  const tokenPayload = res.locals.tokenPayload as TokenPayload;
  if (!tokenPayload.isBanned) {
    next();
  } else {
    next(ApiError.Forbidden('User is banned'));
  }
}

export default isBanned;