export type ColorProp = 'black' | 'white';

type BorderProp = {
  'line-width': string;
  'line-style': 'solid';
  color: string;
};

export interface ListProps {
  to?: string;
  onClick?: () => void;
  displayprop?: 'flex';
  flexDirectionprop?: 'row' | 'column';
  justifyContentprop?: 'flex-start' | 'center' | 'flex-end';
  alignItemsprop?: 'flex-start' | 'center' | 'flex-end';
  alignSelfprop?: 'flex-start' | 'center' | 'flex-end';
  maxWidthprop?: string;
  marginprop?: string[];
  paddingProp?: string[];
  borderprop?: BorderProp;
  borderRadiusprop?: string;
  colorProp?: ColorProp;
}
