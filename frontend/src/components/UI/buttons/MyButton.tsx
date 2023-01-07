import { MouseEvent } from "react";

interface MyButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  children: JSX.Element | string
}

function MyButton({ onClick, children }: MyButtonProps) {
  return (
    <button onClick={onClick} className="my-button">{children}</button>
  );
}

export default MyButton;