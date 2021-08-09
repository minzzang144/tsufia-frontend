export enum FontSizeProp {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum ColorProp {
  Black = 'black',
  White = 'white',
  Red = 'red',
}

export interface ParagraphProps {
  fontFamilyProp?: string;
  fontSizeProp?: FontSizeProp;
  colorProp?: ColorProp;
}
