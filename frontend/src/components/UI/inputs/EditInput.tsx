import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, useState } from "react";
import MyButton from "../buttons/MyButton";
import TransparentInput from "./TransparentInput";

interface EditInputProps {
  value: string,
  label: string,
  onSubmit: (newValue: any) => Promise<void>,
}

export default function EditInput({ value, label, onSubmit }: EditInputProps) {
  const [newValue, setNewValue] = useState(value);
  const [unlocked, setUnlocked] = useState(false);

  const onUnlock = (newUnlock: boolean, cancelChanges: boolean = false) => {
    return (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setUnlocked(newUnlock);
      if (cancelChanges) {
        setNewValue(value);
      }
    }
  }

  const onSubmitHandler = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await onSubmit(newValue);
    setUnlocked(false)
  };

  const Buttons = (
    unlocked
      ? <React.Fragment>
        <MyButton onClick={onSubmitHandler}><FontAwesomeIcon icon={faCheck} /></MyButton>
        <MyButton onClick={onUnlock(false, true)}><FontAwesomeIcon icon={faXmark} /></MyButton>
      </React.Fragment>
      : <MyButton onClick={onUnlock(true)}><FontAwesomeIcon icon={faPen} /></MyButton>
  );

  return (
    <div className="edit-input">
      <TransparentInput
        value={newValue}
        onChange={event => setNewValue(event.target.value)}
        disabled={!unlocked}
        label={label}
      />
      <div className="edit-buttons">
        {Buttons}
      </div>
    </div>
  );
}