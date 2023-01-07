import { UpdateUserDto } from "../../@types/dto/user.dto";
import User from "../../@types/models/user.model";
import EditUserForm from "../../components/forms/users/EditUserForm";
import { useAppSelector } from "../../hooks/redux";

export default function UserEdit() {
  const user: User | undefined = useAppSelector(state => state.usersReducer.currentUser);
  const fields: Array<keyof UpdateUserDto> = ['username', 'email'];
  
  if (!user) {
    return (
      <div className="">
        Login or sign up to edit your profile
      </div>
    );
  }

  return (
    <div className="user-edit">
      <EditUserForm user={user} fields={fields} />
    </div>
  );
}