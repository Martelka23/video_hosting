export default interface Token {
  id: number,
  refreshToken: string,
  userId: number,
  activationLink: string
}

export interface TokenPayload {
  id: number,
  email: string,
  isBanned: boolean,
  isActivated: boolean,
  role: string
}

export interface TokenDecoded {
  id: number,
  email: string,
  isBanned: boolean,
  isActivated: boolean,
  role: string,
  iat: Date,
  exp: Date
}

export interface JwtTokens {
  refreshToken: string,
  accessToken: string
}

export interface FindTokenDb {
  id?: number,
  refreshToken?: string,
  userId?: number,
  activationLink?: string
}

export interface CreateTokenDb {
  userId: number,
  refreshToken: string,
  activationLink: string
}

export interface UpdateTokenDb {
  userId: number,
  refreshToken: string
}