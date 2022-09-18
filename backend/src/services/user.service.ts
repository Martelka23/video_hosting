import userDal from "../dal/user.dal";
import User, { FindUsersDb } from "../@types/models/user";

class UserService {
  async getAll(): Promise<User[]> {
    const users: User[] = await userDal.find();

    return users;
  }

  async getOne(findUsersDb: FindUsersDb): Promise<User> {
    const users = await userDal.find(findUsersDb);
    const user = users[0];

    return user;
  }
}

const userService: UserService = new UserService();

export default userService;