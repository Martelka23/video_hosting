import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import Token, { TokenPayload, JwtTokens, CreateTokenDb, UpdateTokenDb, FindTokenDb } from "../@types/models/token.types";
import tokenDal from '../dal/token.dal';
import User from '../@types/models/user';
import userDal from '../dal/user.dal';

config({path: './.env'});

class TokenService {
  generateTokens(payload: TokenPayload): JwtTokens {
    const refreshToken = jwt.sign(payload, process.env.JWT_REF_SEC as string, { expiresIn: '30d' });
    const accessToken = jwt.sign(payload, process.env.JWT_ACC_SEC as string, { expiresIn: '15m' });

    return { refreshToken, accessToken };
  }

  validateRefreshToken(refreshToken: string): TokenPayload | null {
    let userData: TokenPayload | null = null;

    try {
      userData = jwt.verify(refreshToken, process.env.JWT_REF_SEC as string) as TokenPayload;
    } catch (err) { }

    return userData;
  }

  validateAccessToken(accessToken: string): TokenPayload | null {
    let userData: TokenPayload | null = null;

    try {
      userData = jwt.verify(accessToken, process.env.JWT_ACC_SEC as string) as TokenPayload;
    } catch (err) { }

    return userData;
  }

  async find(conditions: FindTokenDb): Promise<Token> {
    const token: Token = await tokenDal.find(conditions);

    return token;
  }

  async saveToken(createTokenDb: CreateTokenDb): Promise<Token> {
    const token: Token = await tokenDal.create(createTokenDb);

    return token;
  }

  async updateToken(updateTokenDb: UpdateTokenDb): Promise<Token> {
    let token: Token = await tokenDal.update(updateTokenDb);

    return token;
  }

  async findUserByActivationLink(activationLink: string): Promise<User | null> {
    const token: Token = await tokenDal.find({ activationLink });
    if (!token) {
      return null;
    }
    const users: User[] = await userDal.find({ id: token.userId });

    return users[0];
  }
}

const tokenService: TokenService = new TokenService();

export default tokenService;