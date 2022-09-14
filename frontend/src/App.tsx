import { MouseEvent, useEffect, useState } from 'react';
import './App.css';
import RegistrationForm from './components/forms/RegistrationForm';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { authSignupThunk } from './store/authSlice/thunks';
import { UsersGetAllThunk } from './store/usersSlice/thunks';
import User from './@types/models/user';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const users: User[] = useAppSelector(state => state.usersReducer.users);
  const user: User | null = useAppSelector(state => state.authReducer.user);

  const dispatch = useAppDispatch();

  const submit = (event: MouseEvent<HTMLElement>) => {
    dispatch(authSignupThunk({ username, email, password }));
    // setUsername('');
    // setEmail('');
    // setPassword('');
  }

  useEffect(() => {
    dispatch(UsersGetAllThunk())
  }, [dispatch]);

  return (
    <div>
      <RegistrationForm
        username={username}
        setUsername={event => setUsername(event.target.value)}
        email={email}
        setEmail={event => setEmail(event.target.value)}
        password={password}
        setPassword={event => setPassword(event.target.value)}
        submit={submit}
      />
      <div>{users.length ? users.map(user => <h3 key={user.id}>{user.email}</h3>) : "Авторизуйтесь!"}</div>
    </div>
  );
}

export default App;
