export interface CreateUserDto {
  username: string,
  email: string,
  password: string
}

export interface UserProfileDto {
  id: number,
  username: string,
  email: string,
  img: string,
  isBanned: boolean,
  banReason: string,
  createdAt: Date,
  isActivated: boolean
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

export interface UpdateUserDto {
  username?: string,
  email?: string,
  password?: string,
  img?: string,
  banned?: boolean,
  banReason?: string,
  isActivated?: boolean,
  role?: string
}