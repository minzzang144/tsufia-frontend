type ColorProp = 'black' | 'transparent';

type Where = 'CREATE' | 'UPDATE';

export interface HeaderProps {
  isLoggedIn: boolean;
  where?: Where;
  onToggleModal?: () => void;
  colorProp?: ColorProp;
}
