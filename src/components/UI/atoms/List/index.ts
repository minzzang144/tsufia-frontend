export type ColorProp = 'black' | 'white';

export interface ListProps {
  to?: string;
  onClick?: () => void;
  paddingProp?: string[];
  colorProp?: ColorProp;
}
