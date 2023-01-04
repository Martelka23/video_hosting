import User from "../../@types/models/user.model";
import UserElem from "./UserElem";

interface UserListProps {
  users: User[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="user-list">
      {users.map(user => <UserElem user={user} />)}
    </div>
  );
}