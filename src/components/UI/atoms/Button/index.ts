type ColorProp = 'black' | 'white';

export interface ButtonProps {
  isValid?: boolean;
  colorProp?: ColorProp;
  marginProp?: string[];
  paddingProp?: string[];
}
