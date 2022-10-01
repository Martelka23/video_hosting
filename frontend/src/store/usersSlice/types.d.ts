import RequestError from "../../@types/axios/error";
import User from "../../@types/models/user.model";

export interface UsersState {
  users: User[],
  userProfile: User | undefined,
  currentUser: User | undefined,
  isLoading: boolean,
  error: RequestError | null
}