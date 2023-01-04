import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChannelList from '../../components/channels/ChannelList';
import Hr from '../../components/UI/Hr';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ChannelsGetAllThunk } from '../../store/channelsSlice/thunks';
import { UsersGetUserProfileThunk } from '../../store/usersSlice/thunks';


interface UserProfileProps {

}

function UserProfile(props: UserProfileProps) {
  const { id } = useParams();
  const user = useAppSelector(state => state.usersReducer.userProfile);
  const channels = useAppSelector(state => state.channelsReducer.channels);
  const currentUser = useAppSelector(state => state.usersReducer.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UsersGetUserProfileThunk(Number(id)));
    dispatch(ChannelsGetAllThunk({userId: Number(id)}))
  }, [id]);

  if (!user) {
    return (
      <div className='user-profile-page'>
        Loading...
      </div>
    );
  } else {
    return (
      <div className='user-profile'>
        <div className='user-profile__head'>
          <div className='user-profile__img'>
            <img
              src={`http://localhost:3005/api/images/${user.img}`}
              alt="user-photo"
            />
          </div>
          <div className='user-profile__info'>
            <span id='user-profile__username'>
              {user.username}
            </span>
            <span className='user-profile__email'>
              {user.email}
            </span>
            <span className='user-profile__ban'>
              {user.isBanned ? 'User blocked' : 'User has no block'}
            </span>
            <span className='user-profile__you'>
              {user.id === currentUser?.id ? 'It\'s you!' : null}
            </span>
          </div>
        </div>
        <Hr />
        {channels ? <ChannelList channels={channels} /> : null}
      </div>
    );
  }

}

export default UserProfile;