import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import MafiaPoster from '@assets/mafia.png';
import MafiaWinPoster from '@assets/mafia-win.jpg';
import CitizenPoster from '@assets/citizen.png';
import CitizenWinPoster from '@assets/citizen-win.png';
import KillPoster from '@assets/kill.png';
import LivePoster from '@assets/live.png';
import VotePoster from '@assets/vote.png';
import { User, UserRole } from '@auth';
import { Cycle } from '@game';
import { RootState } from '@modules';
import { Game } from '@organisms/Game/Game';
import { Header } from '@organisms/Header/Header';
import { useRoomPageContext, useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';
import { Centralization } from '@templates/Centralization/Centralization';
import { Status } from '@room';

export const RoomPagePresenter: React.FC = () => {
  const { selectCitizenId, mafiaCount, citizenCount } = useRoomPageContext();
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
    if (room && room.status === Status.완료) {
      if (mafiaCount === 0) {
        return { image: CitizenWinPoster, size: 'contain' };
      }
      if (mafiaCount >= citizenCount) {
        return { image: MafiaWinPoster, size: 'cover' };
      }
    }
    if (room && room.game) {
      switch (room.game.cycle) {
        case Cycle.밤:
          if (currentUser?.role === UserRole.Mafia) {
            return { image: MafiaPoster, size: 'contain' };
          } else if (currentUser?.role === UserRole.Citizen) {
            return { image: CitizenPoster, size: 'contain' };
          }
          break;
        case Cycle.낮:
          if (selectCitizenId) {
            return { image: KillPoster, size: 'contain' };
          } else {
            return { image: LivePoster, size: 'contain' };
          }
        case Cycle.저녁:
          return { image: VotePoster, size: 'contain' };
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
