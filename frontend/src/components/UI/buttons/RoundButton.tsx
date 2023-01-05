import { MouseEvent } from "react";

interface RoundButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  children: string
}

export default function RoundButton({ onClick, children }: RoundButtonProps) {
  return (
    <button className="round-button" onClick={onClick}>
      {children}
    </button>
  );
}