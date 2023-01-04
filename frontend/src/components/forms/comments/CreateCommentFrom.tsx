import { MouseEvent, useState } from "react";
import MyButton from "../../UI/buttons/MyButton";
import MyInput from "../../UI/inputs/MyInput";

interface CreateCommentFormProps {
  submit: (commentText: string) => void
}

function CreateCommentForm({ submit }: CreateCommentFormProps) {
  const [commentText, setCommentText] = useState('');
  const onSubmitClick = () => {
    submit(commentText);
    setCommentText('')
  };

  return (
    <form className="create-comment-form" onSubmit={event => event.preventDefault()}>
      <MyInput 
        onChange={event => { setCommentText(event.target.value) }}
        value={commentText}
        placeholder='comment'
      />
      <MyButton onClick={onSubmitClick}>Send</MyButton>
    </form>
  );
}

export default CreateCommentForm;