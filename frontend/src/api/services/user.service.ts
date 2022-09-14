import { AxiosResponse } from "axios";

import $api from "..";
import User from "../../@types/models/user";

class UserService {
  async getAll(): Promise<AxiosResponse<User[]>> {
    return await $api.get('/users/all');
  }
}

const userService = new UserService();

export default userService;