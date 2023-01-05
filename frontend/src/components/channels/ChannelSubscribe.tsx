import React, { useEffect } from "react";
import { SubscribeCheckDto } from "../../@types/dto/channel.dto";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ChannelsGetSubscribedCheckThunk, ChannelsSubscribeThunk } from "../../store/channelsSlice/thunks";
import RoundButton from "../UI/buttons/RoundButton";

interface ChannelSubscribeProps {
  subscribeCheckDto: SubscribeCheckDto
}

export default function ChannelSubscribe({ subscribeCheckDto }: ChannelSubscribeProps) {
  const dispatch = useAppDispatch();
  const subscribed = useAppSelector(state => state.channelsReducer.subscribed)

  const updateInfo = async () => {
    await dispatch(ChannelsGetSubscribedCheckThunk(subscribeCheckDto));
  };

  const onSubscribe = async () => {
    console.log('sub');
    await dispatch(ChannelsSubscribeThunk({ channelId: subscribeCheckDto.channelId }));
    console.log('update')
    await updateInfo();
  };

  useEffect(() => {
    updateInfo();
  }, []);

  return (
    <RoundButton onClick={onSubscribe}>
      {subscribed ? 'Unsubscribe' : 'Subscribe'}
    </RoundButton>
  );
}