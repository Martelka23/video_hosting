import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

import tokenService from './token.service';
import User, { LoginUserDb } from "../@types/models/user.model";
import { CreateUserDto } from "../@types/dto/user.dto";
import { CreatedUserDb, CreateUserDb } from "../@types/models/user.model";
import Token, { CreateTokenDb, JwtTokens, TokenDecoded, TokenPayload } from '../@types/models/token.model';
import ApiError from '../exceptions/api-error';
import tokenDal from '../dal/token.dal';
import userService from './user.service';

class AuthService {
  async signup(createUserDto: CreateUserDto): Promise<CreatedUserDb> {
    const candidate: User[] = await userService.find({ email: createUserDto.email });
    if (candidate[0]) {
      throw ApiError.BadRequest('Email already used');
    }

    const hashPassword: string = await bcrypt.hash(createUserDto.password, 3);
    const createUserDb: CreateUserDb = {
      ...createUserDto,
      password: hashPassword,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const activationLink: string = v4();
    // await emailService.sendActivationMail(createUserDb.email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

    const newUser: User = await userService.create(createUserDb);

    const tokenPayload: TokenPayload = {
      id: newUser.id,
      email: newUser.email,
      isActivated: false,
      isBanned: false,
      role: newUser.role
    };
    const jwtTokens: JwtTokens = tokenService.generateTokens(tokenPayload);
    const createTokenDb: CreateTokenDb = {
      userId: newUser.id,
      refreshToken: jwtTokens.refreshToken,
      activationLink
    };
    await tokenService.saveToken(createTokenDb);

    return { user: newUser, tokens: jwtTokens };
  }

  async login(loginUser: LoginUserDb): Promise<CreatedUserDb> {
    const result: User[] = await userService.find({ email: loginUser.email }, true);
    const candidate: User = result[0];
    if (!candidate) {
      throw ApiError.BadRequest('Wrong email');
    }

    if (!candidate.password) {
      throw ApiError.BadRequest();
    }

    const isPasswordValid: boolean = await bcrypt.compare(loginUser.password, candidate.password);
    if (!isPasswordValid) {
      throw ApiError.BadRequest('Wrong password');
    }

    const tokenPayload: TokenPayload = {
      id: candidate.id,
      email: candidate.email,
      isActivated: candidate.isActivated,
      isBanned: candidate.isBanned,
      role: candidate.role
    };
    const jwtTokens: JwtTokens = tokenService.generateTokens(tokenPayload);
    await tokenService.updateToken({ userId: candidate.id, refreshToken: jwtTokens.refreshToken });

    return { user: candidate, tokens: jwtTokens };
  }

  async refresh(refreshToken: string): Promise<CreatedUserDb> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData: TokenDecoded | null = tokenService.validateRefreshToken(refreshToken);
    const token: Token | null = userData ? await tokenService.find({ userId: userData.id }) : null;
    const tokenData: TokenDecoded | null = token ? tokenService.validateRefreshToken(token.refreshToken) : null;

    if (!userData || !tokenData) {
      throw ApiError.UnauthorizedError();
    }

    // console.log(new Date().valueOf());
    // console.log(tokenData.iat.valueOf() * 1000);

    if (new Date().valueOf() - tokenData.iat.valueOf() * 1000 < 10000) {
      throw ApiError.TooManyRequests();
    }

    const users: User[] = await userService.find({ id: userData.id });
    const user: User = users[0];
    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      isActivated: user.isActivated,
      isBanned: user.isBanned,
      role: user.role
    };
    const jwtTokens: JwtTokens = tokenService.generateTokens(tokenPayload);
    await tokenService.updateToken({ userId: user.id, refreshToken: jwtTokens.refreshToken });

    return { user, tokens: jwtTokens };
  }

  async activate(activationLink: string): Promise<User> {
    const candidate: User | null = await tokenService.findUserByActivationLink(activationLink);
    if (!candidate) {
      console.log(activationLink)
      throw ApiError.BadRequest('Wrong activation link');
    }

    const user: User = await userService.update(candidate.id, { isActivated: true });

    return user;
  }

  async logout(refreshToken: string): Promise<void> {
    await tokenDal.removeToken(refreshToken);
  }
}

const authService = new AuthService();

export default authService;