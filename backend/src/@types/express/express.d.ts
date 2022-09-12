import { Request } from "express";
import { TokenPayload } from "../models/token.types";

// declare global {
//   namespace Express {
//     interface Request {
//       tokenPayload: TokenPayload;
//     }
//   }
// }

declare namespace Express {
  export interface Request {
    tokenPayload: TokenPayload
  }
}