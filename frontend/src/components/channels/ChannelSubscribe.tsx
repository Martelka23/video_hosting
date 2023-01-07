import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ChannelsGetSubscribedCheckThunk, ChannelsSubscribeThunk } from "../../store/channelsSlice/thunks";
import RoundButton from "../UI/buttons/RoundButton";

interface ChannelSubscribeProps {
  channelId: number,
  userId?: number
}

export default function ChannelSubscribe({ channelId, userId }: ChannelSubscribeProps) {
  const dispatch = useAppDispatch();
  const subscribed = useAppSelector(state => state.channelsReducer.subscribed)

  const updateInfo = async () => {
    if (userId) {
      await dispatch(ChannelsGetSubscribedCheckThunk({ channelId, userId }));
    }
  };

  const onSubscribe = async () => {
    await dispatch(ChannelsSubscribeThunk({ channelId: channelId }));
    await updateInfo();
  };

  useEffect(() => {
    updateInfo();
  }, []);

  return (
    <>
      {
        userId
          ? <RoundButton onClick={onSubscribe}>
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </RoundButton>
          : <Link to={'/auth/login'}>
            <RoundButton onClick={() => { }}>
              Subscribe
            </RoundButton>
          </Link>
      }
    </>
  );
}