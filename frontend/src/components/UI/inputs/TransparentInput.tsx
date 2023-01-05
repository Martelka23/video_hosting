import { ChangeEvent } from "react";

interface TransparentInputProps {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string,
}

function TransparentInput({ value, onChange, placeholder }: TransparentInputProps) {
  return (
    <input className="transparent-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default TransparentInput;