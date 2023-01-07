import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, MouseEvent } from "react";
import MyButton from "../buttons/MyButton";
import ImageUploader from "./ImageUploader";

interface EditImageProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  isImageLoaded: boolean,
  onSubmit: () => void
}

export default function EditImage({ onChange, isImageLoaded, onSubmit }: EditImageProps) {
  const onSubmitHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="edit-image">
      <ImageUploader label="Load new image" onChange={onChange} />
      {
        isImageLoaded
          ? <MyButton onClick={onSubmitHandler}><FontAwesomeIcon icon={faCheck} /></MyButton>
          : null
      }
    </div>
  );
}