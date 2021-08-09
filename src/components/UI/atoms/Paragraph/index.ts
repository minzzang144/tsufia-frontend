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
  fontFamilyProp?: string;
  fontSizeProp?: FontSizeProp;
  colorProp?: ColorProp;
}
