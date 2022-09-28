import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../../components/forms/auth/LoginForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { authLoginThunk } from "../../../store/authSlice/thunks";


interface LoginProps {

}

function Login(props: LoginProps) {
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
    dispatch(authLoginThunk({ email, password }));
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <h1>Login</h1>
        <LoginForm
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

export default Login;