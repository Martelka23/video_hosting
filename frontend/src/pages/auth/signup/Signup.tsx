import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import RegistrationForm from "../../../components/forms/auth/signup/RegistrationForm";
import MyButton from "../../../components/UI/buttons/MyButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { authSignupThunk } from "../../../store/authSlice/thunks";

import '../auth-page.css';


interface SignupProps {

}

function Signup(props: SignupProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const user = useAppSelector(state => state.authReducer.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      navigate('/users');
      navigate(0);
    }
  }, [user]);

  const submit = (event: MouseEvent<HTMLElement>) => {
    dispatch(authSignupThunk({ username, email, password }));
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <h1>Sign up</h1>
        <RegistrationForm
          username={username}
          setUsername={event => setUsername(event.target.value)}
          email={email}
          setEmail={event => setEmail(event.target.value)}
          password={password}
          setPassword={event => setPassword(event.target.value)}
          submit={submit}
        />
      </div>
    </div>
  );
}

export default Signup;