interface Token {
  id: number,
  refreshToken: string,
  userId: number,
  activationLink: string
}

interface JwtTokens {
  refreshToken: string,
  accessToken: string
}

export default Token;
export {
  JwtTokens
}