import { useEffect } from "react";
import { Link } from 'react-router-dom';

import User from "../../@types/models/user.model";
import { UsersGetAllThunk } from "../../store/usersSlice/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import MyButton from "../../components/UI/buttons/MyButton";


function Users() {
  const dispatch = useAppDispatch();

  const users: User[] = useAppSelector(state => state.usersReducer.users);

  useEffect(() => {
    dispatch(UsersGetAllThunk())
  }, [dispatch]);

  const Users: JSX.Element[] = users.map(user => (
    <div className="users-page-user" key={user.id}>
      <div className="users-page-user-info">
        <img src={`http://localhost:3005/api/images/${user.img}`} />
        <span>{user.id} {user.username}</span>
      </div>
      <div className="users-page-user-buttons">
        <Link to={`/users/profile/${user.id}`}>
          <MyButton onClick={event => { }}>View profile</MyButton>
        </Link>
      </div>
    </div>
  ));

  return (
    // <div className="users-page">
      <div className="users-page-container">
        {Users}
      </div>
    // </div>
  );
}

export default Users;