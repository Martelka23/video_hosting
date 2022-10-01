import { Request } from "express";
import { TokenPayload } from "../models/token.model";

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