export type ColorProp = 'black' | 'white';

export type BorderProp = {
  'line-width': string;
  'line-style': 'solid';
  color: string;
};

export interface ListProps {
  onClick?: (var1?: string) => void;
  positionprop?: 'relative' | 'absolute';
  displayprop?: 'flex' | 'none';
  flexDirectionprop?: 'row' | 'column';
  justifyContentprop?: 'flex-start' | 'center' | 'flex-end';
  alignItemsprop?: 'flex-start' | 'center' | 'flex-end';
  alignSelfprop?: 'flex-start' | 'center' | 'flex-end';
  widthprop?: string;
  maxWidthprop?: string;
  marginprop?: string[];
  paddingProp?: string[];
  borderprop?: BorderProp;
  borderRadiusprop?: string;
  colorprop?: ColorProp;
  textalignprop?: 'start' | 'center' | 'end';
  cursorprop?: boolean;
  shadowprop?: boolean;
  hovershadowprop?: boolean;
  liststyleprop?: string;
  lineheightprop?: string;
}
