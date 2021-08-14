export enum ColorProp {
  Black,
  White,
}

export interface ButtonProps {
  isValid?: boolean;
  colorProp?: ColorProp;
  marginProp?: string[];
  paddingProp?: string[];
}
