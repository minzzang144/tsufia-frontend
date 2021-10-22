type ColorProp = 'black' | 'white';

export interface LinkProps {
  to: string;
  displayprop?: 'inline-block';
  paddingprop?: string[];
  widthprop?: string;
  colorprop?: ColorProp;
  hoveropacityprop?: string;
}
