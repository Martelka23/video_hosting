import { faHouse, faUsers, faVideo, faHouseUser, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import User from '../../@types/models/user.model';
import Chevron from '../UI/Chevron';

interface SideBarProps {
  user: User | undefined
}

function SideBar({ user }: SideBarProps) {
  return (
    <nav className='sidebar'>
      <div className='sidebar__content'>
        <Link to={'/videos/subscriptions'}>
          <FontAwesomeIcon className='sidebar__content__img' icon={faHouse} />
          <span>Subscriptions</span>
        </Link>
        <Link to={'/users'}>
          <FontAwesomeIcon className='sidebar__content__img' icon={faUsers} />
          <span>Users</span>
        </Link>
        <Link to={user ? `/users/profile/${user.id}` : '/auth/unauthorized'}>
          <FontAwesomeIcon className='sidebar__content__img' icon={faHouseUser} />
          <span>My Profile</span>
        </Link>
        <Link to={'/channels'}>
          <FontAwesomeIcon className='sidebar__content__img' icon={faTv} />
          <span>Channels</span>
        </Link>
        <Link to={'/videos'}>
          <FontAwesomeIcon className='sidebar__content__img' icon={faVideo} />
          <span>Videos</span>
        </Link>
      </div>
      <Chevron />
    </nav>
  );
}

export default SideBar;