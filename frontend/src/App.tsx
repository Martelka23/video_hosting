import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Users from './pages/users/Users';
import Login from './pages/auth/login/Login';
import Channels from './pages/channels/Channels';
import Signup from './pages/auth/signup/Signup';
import Logout from './pages/auth/logout/Logout';
import UserProfile from './pages/users/UserProfile';
import ChannelPage from './pages/channels/ChannelPage';
import VideoPage from './pages/videos/video-page/VideoPage';

import NavBar from './components/navigation/NavBar';
import SideBar from './components/navigation/SideBar';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { usersGetCurrentUserThunk } from './store/usersSlice/thunks';
import ChannelCreatePage from './pages/channels/ChannelCreatePage';



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

          <Route path='/channels' element={<Channels />} />
          <Route path='/channels/create' element={<ChannelCreatePage />} />
          <Route path='/channels/channel/:id' element={<ChannelPage />} />

          <Route path='/videos/watch/:id' element={<VideoPage />} />

          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/logout' element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
