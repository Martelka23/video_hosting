import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { UsersGetByIdThunk } from '../../store/usersSlice/thunks';


interface UserProfileProps {

}

function UserProfile(props: UserProfileProps) {
  const { id } = useParams();
  const user = useAppSelector(state => state.usersReducer.userProfile);
  const currentUser = useAppSelector(state => state.usersReducer.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UsersGetByIdThunk(Number(id)));
  }, [id]);

  if (!user) {
    return (
      <div className='user-profile-page'>
        Loading...
      </div>
    );
  } else {
    return (
      <div className='user-profile-page'>
        <div className='user-profile-head'>
          <div className='user-profile-img'>
            <img
              src={`http://localhost:3005/api/images/${user.img}`}
              alt="user-photo"
            />
          </div>
          <div className='user-profile-info'>
            <span 
             id='user-profile-username'
            >{user.username}
            </span>
            <span 
             className='user-profile-email'
            >{user.email}
            </span>
            <span 
             className='user-profile-ban'
            >{user.isBanned ? 'User blocked' : 'User has no block'}
            </span>
            <span 
             className='user-profile-you'
            >{user.id === currentUser?.id ? 'It\'s you!' : null}
            </span>
          </div>
        </div>
      </div>
    );
  }

}

export default UserProfile;