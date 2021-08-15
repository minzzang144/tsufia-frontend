import { LoginFormInput } from '@atoms/Input';
import { LogoutHomeContainer } from '@pages/LogoutHome/LogoutHomeContainer';

export default LogoutHomeContainer;

export interface LogoutHomeProps {
  onLogin: (body: LoginFormInput) => Promise<void>;
}
