import { Link } from "react-router-dom";
import User from "../../@types/models/user.model";

interface UserElemProps {
  user: User
}

export default function UserElem({ user }: UserElemProps) {
  return (
    <div className="user" key={user.id}>
      <Link to={`/users/profile/${user.id}`} className='user__info'>
        <img src={`http://localhost:3005/api/images/${user.img}`} />
        <span>{user.id} {user.username}</span>
      </Link>
    </div>
  );
}