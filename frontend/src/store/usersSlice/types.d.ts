import User from "../../@types/models/user";

export interface UsersState {
  users: User[],
  userProfile: User | undefined,
  currentUser: User | undefined
}