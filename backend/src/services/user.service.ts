import fs from 'fs';

import userDal from "../dal/user.dal";
import User, { CreateUserDb } from "../@types/models/user.model";
import { FindUsersDto, UpdateUserDto } from "../@types/dto/user.dto";

class UserService {
  async create(createUserDb: CreateUserDb): Promise<User> {
    return await userDal.create(createUserDb);
  }

  async find(findUsersDb: FindUsersDto, withPassword: boolean = false): Promise<User[]> {
    const users = await userDal.find(findUsersDb);
    if (!withPassword) {
      users.forEach(user => user.password = undefined);
    }

    return users;
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const users: User[] = await userDal.find({ id: userId });
    if (updateUserDto.img && !users[0].img.endsWith('default_image.jpg')) {
      fs.rmSync('/Users/martelka/Documents/Study/fullstack/projects/videos/backend/content/' + users[0].img);
    }

    return await userDal.update(userId, updateUserDto);
  }
}

const userService = new UserService();

export default userService;