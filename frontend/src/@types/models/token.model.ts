export default interface Token {
  id: number,
  refreshToken: string,
  userId: number,
  activationLink: string
}

export interface JwtTokens {
  refreshToken: string,
  accessToken: string
}