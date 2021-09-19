export type ColorProp = 'black' | 'white';

export type BorderProp = {
  'line-width': string;
  'line-style': 'solid';
  color: string;
};

export interface ListProps {
  to?: string;
  onClick?: (var1?: string) => void;
  positionprop?: 'relative' | 'absolute';
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
  cursorprop?: boolean;
}
