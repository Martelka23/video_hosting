import { MouseEvent } from "react";

interface MyButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  children: string
}

function MyButton({ onClick, children }: MyButtonProps) {
  return (
    <button onClick={onClick}>{children}</button>
  );
}

export default MyButton;