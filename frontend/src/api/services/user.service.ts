import { AxiosResponse } from "axios";

import $api from "..";
import User from "../../@types/models/user";

class UserService {
  async getAll(): Promise<AxiosResponse<User[]>> {
    return await $api.get('/users/all');
  }

  async getById(id: number): Promise<AxiosResponse<User>> {
    return await $api.get(`/users/profile/${id}`);
  }

  async getCurrentUser(): Promise<AxiosResponse<User>> {
    return await $api.get('/users/current');
  }
}

const userService = new UserService();

export default userService;