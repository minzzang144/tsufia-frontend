export enum ColorProp {
  Black,
  White,
}

export interface ButtonProps {
  colorProp?: ColorProp;
  marginProp?: string[];
  paddingProp?: string[];
}
