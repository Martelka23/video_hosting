import { NextFunction, Request, Response } from "express";

export type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function ControllerErrorHandler() {
  return (
    target: Object,
    _: string | symbol,
    descriptor: TypedPropertyDescriptor<ControllerFunction>
  ): TypedPropertyDescriptor<ControllerFunction> | void => {
    const method = descriptor.value;
    descriptor.value = async (req, res, next) => {
      try {
        return await method?.call(target, req, res, next);
      } catch (err) {
        if (err instanceof Error) {
          next(err);
        }
      }
    };
  };
}