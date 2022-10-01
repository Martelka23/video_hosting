import { AxiosResponse } from "axios";

import $api from "..";
import { FindUsersDto } from "../../@types/dto/user.dto";
import User from "../../@types/models/user.model";
import { objectToQueryString } from "../tools";

class UserService {
  async find(conditions: FindUsersDto = {}): Promise<AxiosResponse<User[]>> {
    return await $api.get(`/users/${objectToQueryString(conditions)}`);
  }

  async getCurrentUser(): Promise<AxiosResponse<User>> {
    return await $api.get('/users/current');
  }
}

const userService = new UserService();

export default userService;