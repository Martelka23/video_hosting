import { JwtTokens } from "./token";

interface User {
  id: number,
  username: string,
  email: string,
  password: string,
  isBanned: boolean,
  banReason: string,
  createdAt: Date,
  isActivated: boolean,
  role: string
}

interface CreateUserDto {
  username: string,
  email: string,
  password: string
}

interface CreatedUserDb { 
  user: User, 
  tokens: JwtTokens 
}

interface LoginUserDto {
  email: string,
  password: string
}

export default User;
export {
  CreateUserDto,
  CreatedUserDb,
  LoginUserDto
}