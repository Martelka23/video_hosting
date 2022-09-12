interface Token {
  id: number,
  refreshToken: string,
  userId: number,
  activationLink: string
}

interface TokenPayload {
  id: number,
  email: string,
  isBanned: boolean,
  isActivated: boolean,
  role: string
}

interface JwtTokens {
  refreshToken: string,
  accessToken: string
}

interface FindTokenDb {
  id?: number,
  refreshToken?: string,
  userId?: number,
  activationLink?: string
}

interface CreateTokenDb {
  userId: number,
  refreshToken: string,
  activationLink: string
}

interface UpdateTokenDb {
  userId: number,
  refreshToken: string
}

export default Token;
export { 
  TokenPayload, 
  JwtTokens, 
  CreateTokenDb, 
  UpdateTokenDb,
  FindTokenDb
};