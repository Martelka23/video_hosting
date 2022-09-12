import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../@types/models/token.types";
import ApiError from "../exceptions/api-error";

function isActivate(req: Request, res: Response, next: NextFunction) {
  const tokenPayload = res.locals.tokenPayload as TokenPayload;
  if (tokenPayload.isActivated) {
    next();
  } else {
    next(ApiError.BadRequest('User is not activated'));
  }
}

export default isActivate;