export interface CreateUserDto {
  username: string,
  email: string,
  password: string
}

export interface LoginUserDto {
  email: string,
  password: string
}

export interface FindUsersDto {
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