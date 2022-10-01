import userDal from "../dal/user.dal";
import User from "../@types/models/user.model";
import { FindUsersDto } from "../@types/dto/user.dto";

class UserService {
  async find(findUsersDb: FindUsersDto): Promise<User[]> {
    return await userDal.find(findUsersDb);
  }
}

const userService = new UserService();

export default userService;