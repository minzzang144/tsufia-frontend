type ColorProp = 'black' | 'white' | 'yellow';

export interface ButtonProps {
  isValid?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  colorProp?: ColorProp;
  marginProp?: string[];
  paddingProp?: string[];
  borderRadiusProp?: string;
  widthProp?: string;
  heightProp?: string;
  hoverProp?: boolean;
}
