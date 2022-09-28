import { ChangeEvent } from "react";


interface MyInputProps {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string,
}

function MyInput({ value, onChange, placeholder }: MyInputProps) {
  return (
    <input className="my-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default MyInput;