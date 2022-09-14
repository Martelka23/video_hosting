import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../@types/models/token";
import ApiError from "../exceptions/api-error";

function checkRole(roles: string[]) {
  function inner(req: Request, res: Response, next: NextFunction) {
    const tokenPayload = res.locals.tokenPayload as TokenPayload;
    if (roles.includes(tokenPayload.role)) {
      next();
    } else {
      next(ApiError.Forbidden());
    }
  }

  return inner;
}

export default checkRole;