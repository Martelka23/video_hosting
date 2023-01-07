import { ChangeEvent, useState } from "react";
import { UpdateUserDto } from "../../../@types/dto/user.dto";
import User from "../../../@types/models/user.model";
import { useAppDispatch } from "../../../hooks/redux";
import { UsersPutCurrentUserThunk } from "../../../store/usersSlice/thunks";
import EditInput from "../../UI/inputs/EditInput";
import EditImage from "../../UI/uploaders/EditImage";

interface EditUserForm {
  user: User,
  fields: Array<keyof UpdateUserDto>
}

export default function EditUserForm({ user, fields }: EditUserForm) {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File>();

  const onSubmit = (field: keyof UpdateUserDto) => {
    return async (newValue: number | string | Date) => {
      await dispatch(UsersPutCurrentUserThunk({
        updateUserDto: { [field]: newValue }
      }));
    }
  };

  const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImage(event.target.files[0]);
    }
  };

  const onImageSubmit = async () => {
    await dispatch(UsersPutCurrentUserThunk({
      updateUserDto: {},
      newImage: image
    }));
    setImage(undefined);
  };

  return (
    <form className="edit-user-form">
      {fields.map((field, i) => (
        <EditInput
          value={user[field].toString()}
          label={field}
          onSubmit={onSubmit(field)}
          key={i}
        />)
      )}
      <EditImage
        isImageLoaded={image !== undefined}
        onChange={onImageUpload}
        onSubmit={onImageSubmit}
      />
    </form>
  );
}