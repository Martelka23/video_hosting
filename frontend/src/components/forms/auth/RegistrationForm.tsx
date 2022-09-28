import { ChangeEvent, MouseEvent } from "react";
import MyButton from "../../UI/buttons/MyButton";
import MyInput from "../../UI/inputs/MyInput";
import { Link } from 'react-router-dom';


interface RegistrationFormProps {
  username: string,
  setUsername: (event: ChangeEvent<HTMLInputElement>) => void,
  email: string,
  setEmail: (event: ChangeEvent<HTMLInputElement>) => void,
  password: string,
  setPassword: (event: ChangeEvent<HTMLInputElement>) => void,
  submit: (event: MouseEvent<HTMLElement>) => void
}

function RegistrationForm({
  username, setUsername,
  email, setEmail,
  password, setPassword,
  submit
}: RegistrationFormProps) {
  return (
    <form className="auth__form" onSubmit={event => event.preventDefault()}>
      <div className="auth__inputs">
        <MyInput
          value={username}
          placeholder="username"
          onChange={setUsername}
        />
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
        <MyButton onClick={submit}>Sign up</MyButton>
        <div className="auth__links">
          <Link to="/auth/login">
            <MyButton onClick={(_) => { }}>I have an account</MyButton>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;