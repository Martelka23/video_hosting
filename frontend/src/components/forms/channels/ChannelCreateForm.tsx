import { MouseEvent, useState } from "react";
import MyButton from "../../UI/buttons/MyButton";
import MyInput from "../../UI/inputs/MyInput";

interface ChannelCreateFormProps {
  onSubmit: (name: string, description: string) => Promise<void>
}

function ChannelCreateForm({ onSubmit }: ChannelCreateFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onClick = async (event: MouseEvent<HTMLElement>): Promise<void> => {
    await onSubmit(name, description);
    setName('');
    setDescription('');
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
      <MyButton onClick={onClick}>Create</MyButton>
    </form>
  );
}

export default ChannelCreateForm;