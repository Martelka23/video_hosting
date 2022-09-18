import { faHouse, faUsers, faVideo, faHouseUser, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import User from '../../@types/models/user';
import './sidebar.css';

interface SideBarProps {
  user: User | undefined
}

function SideBar({ user }: SideBarProps) {
  return (
    <nav className='sidebar'>
      <div className='sidebar-content'>
        <Link to={'/'}>
          <FontAwesomeIcon className='sidebar-content-img' icon={faHouse} />
          <span>Home</span>
        </Link>
        <Link to={'/users'}>
          <FontAwesomeIcon className='sidebar-content-img' icon={faUsers} />
          <span>Users</span>
        </Link>
        <Link to={user ? `/users/profile/${user.id}` : '/auth/unauthorized'}>
          <FontAwesomeIcon className='sidebar-content-img' icon={faHouseUser} />
          <span>My Profile</span>
        </Link>
        <Link to={'/channels'}>
          <FontAwesomeIcon className='sidebar-content-img' icon={faTv} />
          <span>Channels</span>
        </Link>
        <Link to={'/videos'}>
          <FontAwesomeIcon className='sidebar-content-img' icon={faVideo} />
          <span>Videos</span>
        </Link>
      </div>
      <div className='sidebar-chevron'>
        <div className='sidebar-chevron-line1' />
        <div className='sidebar-chevron-line2' />
      </div>
    </nav>
  );
}

export default SideBar;