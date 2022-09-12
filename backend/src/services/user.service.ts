import userDal from "../dal/user.dal";
import User from "../@types/models/user";

class UserService {
  async getAll(): Promise<User[]> {
    const users: User[] = await userDal.find();

    return users;
  }
}

const userService: UserService = new UserService();

export default userService;