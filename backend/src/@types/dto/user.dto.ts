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