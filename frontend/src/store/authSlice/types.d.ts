import RequestError from "../../@types/axios/error";
import User from "../../@types/models/user.model";

export interface AuthState {
  user: User | null,
  isLoading: boolean,
  error: RequestError | null
}