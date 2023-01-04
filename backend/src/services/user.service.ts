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

  async update(userId: number, updateUserDb: UpdateUserDto): Promise<User> {
    return await userDal.update(userId, updateUserDb);
  }
}

const userService = new UserService();

export default userService;