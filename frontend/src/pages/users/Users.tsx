import { useEffect } from "react";

import User from "../../@types/models/user.model";
import { UsersGetAllThunk } from "../../store/usersSlice/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import UserList from "../../components/users/UserList";


function Users() {
  const dispatch = useAppDispatch();

  const users: User[] = useAppSelector(state => state.usersReducer.users);

  useEffect(() => {
    dispatch(UsersGetAllThunk())
  }, [dispatch]);

  return (
    <div className="users-page">
      {users ? <UserList users={users} /> : null}
    </div>
  );
}

export default Users;