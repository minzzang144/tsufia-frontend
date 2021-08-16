import { LoginFormInput, SignUpFormInput } from '@atoms/Input';
import { LogoutHomeContainer } from '@pages/LogoutHome/LogoutHomeContainer';

export default LogoutHomeContainer;

export interface LogoutHomeProps {
  onLogin: (body: LoginFormInput) => Promise<void>;
  onSignUp: (body: SignUpFormInput) => Promise<void>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
