export type ColorProp = 'black' | 'white';

export interface ListProps {
  to?: string;
  onClick?: () => void;
  displayprop?: 'flex';
  flexDirectionprop?: 'row' | 'column';
  justifyContentprop?: 'flex-start' | 'center' | 'flex-end';
  alignItemsprop?: 'flex-start' | 'center' | 'flex-end';
  paddingProp?: string[];
  colorProp?: ColorProp;
}
