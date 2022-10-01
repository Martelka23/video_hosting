import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import MyButton from '../../../components/UI/buttons/MyButton';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { authLogoutThunk } from '../../../store/authSlice/thunks';


function Logout() {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async (event: MouseEvent<HTMLButtonElement>) => {
    await dispatch(authLogoutThunk());
    setAgree(true);
    navigate('/users');
    navigate(0);
  };

  const title = agree
    ? 'Logout success'
    : 'Are you sure you want to logout?';
  const Button = !agree && (
    <MyButton
      onClick={logout}
    >I'm sure</MyButton>
  );

  return (
    <div className='logout-container'>
      <h2>
        {title}
      </h2>
      <div className='logout-buttons'>
        {Button}
      </div>
    </div>
  );
}

export default Logout;