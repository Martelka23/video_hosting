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

export interface CreateUserDb {
  username: string,
  email: string,
  password: string,
  createdAt: string
}

export interface CreatedUserDb { 
  user: User, 
  tokens: JwtTokens 
};

export interface LoginUserDb {
  email: string,
  password: string
}