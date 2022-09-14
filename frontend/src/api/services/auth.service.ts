import { AxiosResponse } from "axios";

import $api from "..";
import { JwtTokens } from "../../@types/models/token";
import { CreatedUserDb, CreateUserDto, LoginUserDto } from "../../@types/models/user";

class AuthService {
  async signup(createUserDto: CreateUserDto): Promise<AxiosResponse<CreatedUserDb>> {
    return await $api.post<CreatedUserDb>('/auth/signup', createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<AxiosResponse<CreatedUserDb>> {
    return await $api.post<CreatedUserDb>('/auth/login', loginUserDto);
  }

  async refresh(): Promise<AxiosResponse<JwtTokens>> {
    return await $api.get<JwtTokens>('/auth/refresh');
  }

  async logout(): Promise<AxiosResponse<string>> {
    return await $api.get<string>('/auth/logout');
  }
}

const authService = new AuthService();

export default authService;