import { ChangeEvent, MouseEvent } from "react";
import MyButton from "../UI/buttons/MyButton";
import MyInput from "../UI/inputs/MyInput";

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
    <form className="registration-form" onSubmit={event => event.preventDefault()}>
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
      <MyButton onClick={submit}>Sign up</MyButton>
    </form>
  );
}

export default RegistrationForm;