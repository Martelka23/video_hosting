import { Routes, Route } from 'react-router-dom';

import Users from './pages/users/Users';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import NavBar from './components/navbar/NavBar';
import Logout from './pages/auth/logout/Logout';
import UserProfile from './pages/users/user-profile/UserProfile';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { usersGetCurrentUserThunk } from './store/usersSlice/thunks';

import './App.css';
import SideBar from './components/sidebar/SideBar';


function App() {
  const user = useAppSelector(state => state.usersReducer.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersGetCurrentUserThunk());
  }, []);

  return (
    <div className='background'>
      <NavBar user={user} />
      <SideBar user={user} />
      <div className='pages'>
        <Routes>
          <Route path='/users' element={<Users />} />
          <Route path='/users/profile/:id' element={<UserProfile />} />

          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/logout' element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
