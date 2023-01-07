import { AxiosResponse } from "axios";

import $api from "..";
import { FindUsersDto, UpdateUserDto } from "../../@types/dto/user.dto";
import User from "../../@types/models/user.model";
import { objectToQueryString } from "../tools";

class UserService {
  async find(conditions: FindUsersDto = {}): Promise<AxiosResponse<User[]>> {
    return await $api.get(`/users/${objectToQueryString(conditions)}`);
  }

  async getCurrentUser(): Promise<AxiosResponse<User>> {
    return await $api.get('/users/current');
  }

  async updateUser(conditions: UpdateUserDto, newImage?: File): Promise<AxiosResponse<User>> {
    const data = new FormData();
    if (newImage) {
      data.append('image', newImage);
    }
    data.append('updateUserDto', JSON.stringify(conditions));

    return await $api.put('/users', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async getSubscrptions(userId: number): Promise<AxiosResponse<number[]>> {
    return await $api.get(`/users/subscriptions/?userId=${userId}`);
  }
}

const userService = new UserService();

export default userService;