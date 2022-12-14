import { ChangeEvent, MouseEvent } from "react";
import MyButton from "../../UI/buttons/MyButton";
import MyInput from "../../UI/inputs/MyInput";
import { Link } from 'react-router-dom';


interface LoginFormProps {
  email: string,
  setEmail: (event: ChangeEvent<HTMLInputElement>) => void,
  password: string,
  setPassword: (event: ChangeEvent<HTMLInputElement>) => void,
  submit: (event: MouseEvent<HTMLElement>) => void
}

function LoginForm({
  email, setEmail,
  password, setPassword,
  submit
}: LoginFormProps) {
  return (
    <form className="auth__form" onSubmit={event => event.preventDefault()}>
      <div className="auth__inputs">
        <MyInput
          value={email}
          placeholder="email"
          onChange={setEmail}
        />
        <MyInput
          value={password}
          placeholder="password"
          onChange={setPassword}
        />
      </div>
      <div className="auth__buttons">
        <MyButton onClick={submit}>Login</MyButton>
        <div className="auth__links">
          <Link to="/auth/signup">
            <MyButton onClick={(_) => { }}>I don't have an account</MyButton>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;