import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import MafiaPoster from '@assets/mafia.png';
import CitizenPoster from '@assets/citizen.png';
import { User, UserRole } from '@auth';
import { Circle } from '@game';
import { RootState } from '@modules';
import { Game } from '@organisms/Game/Game';
import { Header } from '@organisms/Header/Header';
import { useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';
import { Centralization } from '@templates/Centralization/Centralization';

export const RoomPagePresenter: React.FC = () => {
  const { onToggleModal } = useUpdateRoomFormContext();
  const { user, room } = useSelector(
    (state: RootState) => ({
      user: state.authentication.user,
      room: state.room.data,
    }),
    shallowEqual,
  );
  let currentUser: User | undefined;
  if (user && room) currentUser = room.userList.find((listUser) => listUser.id === user.id);

  function setBackground(): { image: string; size: string } | undefined {
    if (room && room.game) {
      switch (room.game.circle) {
        case Circle.밤:
          if (currentUser?.role === UserRole.Mafia) {
            return { image: MafiaPoster, size: 'contain' };
          } else if (currentUser?.role === UserRole.Citizen) {
            return { image: CitizenPoster, size: 'contain' };
          }
          break;
        default:
          break;
      }
    }
  }

  return (
    <Centralization
      header={
        <Header isLoggedIn={true} where="UPDATE" colorProp="black" onToggleModal={onToggleModal} />
      }
      center={<Game backgroundImgprop={setBackground()} />}
      isBackground={false}
    />
  );
};
