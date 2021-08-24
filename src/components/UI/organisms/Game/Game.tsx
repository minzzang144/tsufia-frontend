import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@organisms/Game/style';

import { FormModal } from '@molecules/FormModal/FormModal';
import { useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';
import { RootState } from '@modules';

export const Game: React.FC = () => {
  const updateRoomFormContext = useUpdateRoomFormContext();
  const { loading, room } = useSelector(
    (state: RootState) => ({ loading: state.room.loading, room: state.room.data }),
    shallowEqual,
  );

  return (
    <React.Fragment>
      {loading === false && room ? (
        <S.Wrapper>
          <FormModal
            roomFormContext={updateRoomFormContext}
            title="방 수정하기"
            defaultValue={{ input: room.title, radio: String(room.totalHeadCount) }}
          />
        </S.Wrapper>
      ) : null}
    </React.Fragment>
  );
};
