import { MouseEvent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CreateCommentForm from "../forms/comments/CreateCommentFrom";
import CommentsList from "./CommentsList";
import { CommentsCreateAsyncThunk, CommentsFindAsyncThunk } from '../../store/commentsSlice/thunks';

interface VideoCommentsProps {
  videoId: number,
  addCreateComment: boolean
}

function VideoComments({ videoId, addCreateComment }: VideoCommentsProps) {
  const comments = useAppSelector(state => state.commentsReducer.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(CommentsFindAsyncThunk({ videoId }));
  }, [dispatch]);

  const createCommentHandler = async (commentText: string) => {
    await dispatch(CommentsCreateAsyncThunk({ videoId: Number(videoId), text: commentText }))
    await dispatch(CommentsFindAsyncThunk({ videoId }));
  }

  const LoginRequirement = (
    <div className="login-requirement">
      Login or Sign up to add comment
    </div>
  );

  return (
    <div className="video-comments">
      {(addCreateComment) ? <CreateCommentForm submit={createCommentHandler} /> : LoginRequirement}
      <CommentsList comments={comments ? comments.concat().reverse() : null} />
    </div>
  );
}

export default VideoComments;