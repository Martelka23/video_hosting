import { JwtTokens } from "./token.model";

export default interface User {
  id: number,
  username: string,
  email: string,
  password: string,
  img: string,
  isBanned: boolean,
  banReason: string,
  createdAt: Date,
  isActivated: boolean,
  role: string
}

export interface CreatedUserDb { 
  user: User, 
  tokens: JwtTokens 
}