export enum FontSizeProp {
  Small,
  Medium,
  Large,
}

export enum ColorProp {
  Black,
  White,
  Red,
}

export interface ParagraphProps {
  marginprop?: string[];
  fontFamilyProp?: string;
  fontSizeProp?: FontSizeProp;
  colorProp?: ColorProp;
  wordbreakprop?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  whitespaceprop?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  textalignprop?: 'start' | 'center' | 'end';
}
