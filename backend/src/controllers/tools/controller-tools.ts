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

export function prepareQueryParams(query: any) {
  const result: {[index: string]: any} = {};
  console.log(query)

  for (let key of (Object.keys(query) as string[])) {
    console.log(key)
    if (query[key].includes(',')) {
      result[key] = query[key].split(',');
    } else {
      result[key] = query[key];
    }
  }

  return result;
}