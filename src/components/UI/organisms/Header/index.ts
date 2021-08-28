import { User } from '@auth';

type ColorProp = 'black' | 'transparent';

type Where = 'CREATE' | 'UPDATE';

export interface HeaderProps {
  isLoggedIn: boolean;
  where?: Where;
  onToggleModal?: () => void;
  colorProp?: ColorProp;
}

export interface IRoomPageContext {
  selfUserInRoom?: User;
  onLeaveRoomListClick?: () => void;
}
