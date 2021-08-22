type ColorProp = 'black' | 'transparent';

export interface HeaderProps {
  isLoggedIn: boolean;
  onToggleModal?: () => void;
  colorProp?: ColorProp;
}
