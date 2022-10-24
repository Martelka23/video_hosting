import { MouseEvent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CreateCommentForm from "../forms/comments/CreateCommentFrom";
import CommentsList from "./CommentsList";
import { CommentsCreateAsyncThunk, CommentsFindAsyncThunk } from '../../store/commentsSlice/thunks';

interface VideoCommentsProps {
  videoId: number
}

function VideoComments({ videoId }: VideoCommentsProps) {
  const comments = useAppSelector(state => state.commentsReducer.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(CommentsFindAsyncThunk({ videoId }));
  }, [dispatch]);

  const createCommentHandler = (commentText: string) => {
    dispatch(CommentsCreateAsyncThunk({ videoId: Number(videoId), text: commentText }))
  }

  return (
    <div className="video-comments">
      <CreateCommentForm submit={createCommentHandler} />
      <CommentsList comments={comments} />
    </div>
  );
}

export default VideoComments;