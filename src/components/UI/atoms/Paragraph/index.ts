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
}
