import User from "../../@types/models/user";

export interface AuthState {
  user: User | null,
  isLoading: boolean,
  error: string | null
}