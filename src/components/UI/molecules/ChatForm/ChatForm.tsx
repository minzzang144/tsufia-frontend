import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/ChatForm/style';

import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Input } from '@atoms/Input/Input';
import { User, UserRole } from '@auth';
import { RootState } from '@modules';
import { useChatFormContext } from '@pages/RoomPage/RoomPageContainer';
import { Circle } from '@game';

export const ChatForm: React.FC = () => {
  const { handleSubmit, control, onValid, isValid } = useChatFormContext();
  const { user, room } = useSelector(
    (state: RootState) => ({
      user: state.authentication.user,
      room: state.room.data,
    }),
    shallowEqual,
  );
  let currentUser: User | undefined;
  if (user && room) currentUser = room.userList.find((listUser) => listUser.id === user.id);

  function inputDisabled() {
    if (room && room.game) {
      switch (room.game.circle) {
        case Circle.밤:
          if (currentUser?.role === UserRole.Citizen) {
            return true;
          }
          break;
        default:
          return false;
      }
    }
  }

  return (
    <S.Wrapper>
      <Form
        onSubmit={handleSubmit(onValid)}
        flexDirectionProp="row"
        alignItemsProp="center"
        justifyContentProp="center"
        widthProp="100%"
      >
        <Input
          name="content"
          control={control}
          defaultValue=""
          type="text"
          label="채팅을 입력하세요"
          variant="outlined"
          disabled={inputDisabled()}
          flexprop={['1', '1', '0']}
          marginprop={['0']}
        />
        <Button
          isValid={isValid}
          colorProp="black"
          marginProp={['0', '0', '0', '1rem']}
          paddingProp={['1rem', '1rem']}
        >
          전송하기
        </Button>
      </Form>
    </S.Wrapper>
  );
};
