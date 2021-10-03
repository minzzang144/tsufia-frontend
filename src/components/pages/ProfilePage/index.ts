import { ProfilePageContainer } from '@pages/ProfilePage/ProfilePageContainer';

export default ProfilePageContainer;

export interface IProfileContext {
  onProfileUpdateClick: (userId: number) => void;
}
