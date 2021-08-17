import { GoogleLoginRequest, KakaoLoginRequest } from '@api-types';
import { LoginFormInput, SignUpFormInput } from '@atoms/Input';
import { LogoutHomeContainer } from '@pages/LogoutHome/LogoutHomeContainer';

export default LogoutHomeContainer;

export interface LogoutHomeProps {
  onLogin: (body: LoginFormInput) => Promise<void>;
  onGoogleLogin: (body: GoogleLoginRequest) => Promise<void>;
  onKakaoLogin: (body: KakaoLoginRequest) => Promise<void>;
  onSignUp: (body: SignUpFormInput) => Promise<void>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
