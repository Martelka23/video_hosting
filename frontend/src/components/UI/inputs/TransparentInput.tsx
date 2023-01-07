import React, { ChangeEvent } from "react";

interface TransparentInputProps {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string,
  disabled?: boolean,
  label?: string
}

function TransparentInput({ value, onChange, placeholder, disabled = false, label }: TransparentInputProps) {
  const id = Math.random().toString();

  return (
    <div className="transparent-input">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
      />
    </div>
  );
}

export default TransparentInput;