/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toast';

import * as I from '.';
import * as S from '@organisms/Game/style';

import NightAudio from '@assets/night-audio.mp3';
import AfternoonAudio from '@assets/afternoon-audio.mp3';
import EveningAudio from '@assets/evening-audio.mp3';
import { Audio } from '@atoms/Audio/Audio';
import { Button } from '@atoms/Button/Button';
import { Span } from '@atoms/Span/Span';
import { Cycle } from '@game';
import { ChatForm } from '@molecules/ChatForm/ChatForm';
import { ChatList } from '@molecules/ChatList/ChatList';
import { FormModal } from '@molecules/FormModal/FormModal';
import { GameResult } from '@molecules/GameResult/GameResult';
import { Notification } from '@molecules/Notification/Notification';
import { UserList } from '@molecules/UserList/UserList';
import { RootState } from '@modules';
import { useRoomPageContext, useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';
import { Status } from '@room';

export const Game: React.FC<I.GameProps> = ({ children, ...rest }) => {
  const { chatListRef, audioRef, onAudioBtnClick, muted } = useRoomPageContext();
  const updateRoomFormContext = useUpdateRoomFormContext();
  const { roomLoading, roomError, room } = useSelector(
    (state: RootState) => ({
      roomLoading: state.room.loading,
      roomError: state.room.error,
      room: state.room.data,
    }),
    shallowEqual,
  );

  const setAudioSource = React.useCallback((): string | undefined => {
    if (room?.game) {
      switch (room.game.cycle) {
        case null:
          break;
        case Cycle.밤:
          return NightAudio;
        case Cycle.낮:
          return AfternoonAudio;
        case Cycle.저녁:
          return EveningAudio;
        default:
          break;
      }
    }
  }, [room?.game?.cycle]);

  return (
    <React.Fragment>
      {roomLoading === false && room ? (
        <S.Wrapper {...rest}>
          <FormModal
            roomFormContext={updateRoomFormContext}
            title="방 수정하기"
            defaultValue={{ input: room.title, radio: String(room.totalHeadCount) }}
          />
          <ToastContainer delay={1500} position="top-center" />
          {room.status !== Status.완료 ? <Notification /> : <GameResult />}
          <ChatList ref={chatListRef} />
          <UserList />
          <ChatForm />
          <Audio ref={audioRef} src={setAudioSource()} />
          {room?.game && muted && <S.VolumeOffOutline onClick={() => onAudioBtnClick()} />}
          {room?.game && !muted && <S.VolumeUpOutline onClick={() => onAudioBtnClick()} />}
        </S.Wrapper>
      ) : (
        <Span displayProp="inline-block" levelProp={3}>
          {roomError}
        </Span>
      )}
    </React.Fragment>
  );
};
