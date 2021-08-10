export enum ColorProp {
  Black,
  White,
}

export interface ListProps {
  to?: string;
  paddingProp?: string[];
  colorProp?: ColorProp;
}
