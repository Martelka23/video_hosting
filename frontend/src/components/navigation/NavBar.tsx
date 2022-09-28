import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MyInput from '../UI/inputs/MyInput';
import MyButton from '../UI/buttons/MyButton';
import User from '../../@types/models/user';


interface NavBarProps {
  user: User | undefined
}

function NavBar({ user }: NavBarProps) {
  const [search, setSearch] = useState('');

  let Buttons: JSX.Element;
  let UserElement: JSX.Element;

  if (user) {
    console.log(user);
    UserElement = (
      <React.Fragment>
        <Link to={`/users/profile/${user.id}`}>
          <div className='navbar-user-image'>
            <img src={'http://localhost:3005/api/images/' + user.img} />
          </div>
        </Link>
        <span>{user.username}</span>
      </React.Fragment>
    );
    Buttons = (
      <React.Fragment>
        <Link to={'/auth/logout'}>
          <MyButton onClick={event => { }}>Logout</MyButton>
        </Link>
      </React.Fragment>
    );
  } else {
    UserElement = (<></>);
    Buttons = (
      <React.Fragment>
        <Link to={'/auth/signup'}>
          <MyButton onClick={event => { }}>Sign Up</MyButton>
        </Link>
        <Link to={'/auth/login'}>
          <MyButton onClick={event => { }}>Login</MyButton>
        </Link>
      </React.Fragment>
    );
  }

  return (
    <nav className='navbar'>
      <div className='navbar__logo'>
        <Link to='/users'>
          <FontAwesomeIcon className='navbar__img' icon={faVideo} />
        </Link>
      </div>
      <div className='navbar__search'>
        <MyInput
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder='Search'
        />
      </div>
      <div className='navbar__right'>
        <div className='navbar__user'>
          {UserElement}
        </div>
        <div className='navbar__buttons'>
          {Buttons}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;