import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

import userDal from "../dal/user.dal";
import tokenService from './token.service';
import User, { LoginUserDb } from "../@types/models/user";
import { CreateUserDto } from "../@types/dto/user.dto";
import { CreatedUserDb, CreateUserDb } from "../@types/models/user";
import Token, { CreateTokenDb, JwtTokens, TokenPayload } from '../@types/models/token.types';
import emailService from './email.service';
import ApiError from '../exceptions/api-error';
import tokenDal from '../dal/token.dal';

class AuthService {
  async signup(createUserDto: CreateUserDto): Promise<CreatedUserDb> {
    const candidate: User[] = await userDal.find({ email: createUserDto.email });
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
    const newUser: User = await userDal.create(createUserDb);

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
    await emailService.sendActivationMail(newUser.email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

    return { user: newUser, tokens: jwtTokens };
  }

  async login(loginUser: LoginUserDb): Promise<CreatedUserDb> {
    const result: User[] = await userDal.find({ email: loginUser.email });
    const candidate: User = result[0];
    if (!candidate) {
      throw ApiError.BadRequest('Wrong email');
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
      console.log(refreshToken);
      throw ApiError.UnauthorizedError();
    }

    const userData: TokenPayload | null = tokenService.validateRefreshToken(refreshToken);
    const token: Token = await tokenService.find({ refreshToken });

    if (!userData || !token) {
      console.log(userData)
      console.log(token)
      throw ApiError.UnauthorizedError();
    }

    const users: User[] = await userDal.find({ id: userData.id });
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

    const user: User = await userDal.update(candidate.id, { isActivated: true });

    return user;
  }

  async logout(refreshToken: string): Promise<void> {
    await tokenDal.removeToken(refreshToken);
  }
}

const authService = new AuthService();

export default authService;