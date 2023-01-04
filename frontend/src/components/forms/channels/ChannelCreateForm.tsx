import { ChangeEvent, MouseEvent, useState } from "react";
import { CreateChannelDto } from "../../../@types/dto/channel.dto";
import MyButton from "../../UI/buttons/MyButton";
import MyInput from "../../UI/inputs/MyInput";
import ImageUploader from "../../UI/uploaders/ImageUploader";

interface ChannelCreateFormProps {
  onSubmit: (createChannelDto: CreateChannelDto) => Promise<void>
}

function ChannelCreateForm({ onSubmit }: ChannelCreateFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File>()

  const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files?.length) {
      setImage(event.target.files[0]);
    }
  }

  const onClick = async (event: MouseEvent<HTMLElement>): Promise<void> => {
    await onSubmit({name, description, image});
    setName('');
    setDescription('');
    setImage(undefined);
  }

  return (
    <form className="channel-create__form" onSubmit={event => event.preventDefault()}>
      <MyInput 
        onChange={event => setName(event.target.value)}
        value={name}
        placeholder="Name"
      />
      <MyInput 
        onChange={event => setDescription(event.target.value)}
        value={description}
        placeholder="Description"
      />
      <ImageUploader
        label="Channel Image"
        onChange={onImageUpload}
      />
      <MyButton onClick={onClick}>Create</MyButton>
    </form>
  );
}

export default ChannelCreateForm;