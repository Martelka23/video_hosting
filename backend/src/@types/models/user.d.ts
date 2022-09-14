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

interface FindUsersDb {
  id?: number,
  username?: string,
  email?: string,
  password?: string,
  banned?: boolean,
  banReason?: string,
  createdAt?: Date,
  isActivated?: boolean,
  role?: string
}

interface UpdateUserDb {
  username?: string,
  email?: string,
  password?: string,
  banned?: boolean,
  banReason?: string,
  isActivated?: boolean,
  role?: string
}

interface CreateUserDb {
  username: string,
  email: string,
  password: string,
  createdAt: string
}

interface CreatedUserDb { 
  user: User, 
  tokens: JwtTokens 
};

interface LoginUserDb {
  email: string,
  password: string
}

export default User;
export { 
  CreateUserDb, 
  FindUsersDb,
  CreatedUserDb,
  UpdateUserDb,
  LoginUserDb
};