import EditInput from "../../UI/inputs/EditInput";
import Channel from "../../../@types/models/channel.model";
import { useAppDispatch } from "../../../hooks/redux";
import { ChannelsUpdateThunk } from "../../../store/channelsSlice/thunks";
import { UpdateChannelDto } from "../../../@types/dto/channel.dto";
import ImageUploader from "../../UI/uploaders/ImageUploader";
import { ChangeEvent, useState } from "react";
import MyButton from "../../UI/buttons/MyButton";
import EditImage from "../../UI/uploaders/EditImage";

interface EditChannelForm {
  channel: Channel,
  fields: Array<keyof UpdateChannelDto>
}

export default function EditChannelForm({ channel, fields }: EditChannelForm) {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File>();

  const onSubmit = (field: keyof UpdateChannelDto) => {
    return async (newValue: string) => {
      await dispatch(ChannelsUpdateThunk({ 
        channelId: channel.id, 
        updateChannelDto: { [field]: newValue }
      }))
    }
  };

  const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImage(event.target.files[0]);
    }
  };

  const onImageSubmit = async () => {
    await dispatch(ChannelsUpdateThunk({
      channelId: channel.id,
      updateChannelDto: { },
      newImage: image
    }));
    setImage(undefined);
  };

  return (
    <form className="edit-channel-form">
      {fields.map((field, i) => (
        <EditInput
          value={channel[field].toString()}
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