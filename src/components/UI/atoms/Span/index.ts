type ColorProp = 'black' | 'white' | 'red';

type LevelProp = 1 | 2 | 3 | 4 | 5 | 6;
type DisplayProp = 'inline' | 'inline-block' | 'inline-flex';
type AlignSelfProp = 'flex-start' | 'center' | 'flex-end';

export interface SpanProps {
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  positionprop?: 'relation' | 'absolute' | 'fixed';
  topprop?: string;
  displayProp?: DisplayProp;
  alignSelfProp?: AlignSelfProp;
  justifyContentprop?: 'flex-start' | 'center' | 'flex-end';
  widthprop?: string;
  levelProp?: LevelProp;
  marginProp?: string[];
  colorProp?: ColorProp;
  lineHeightprop?: string;
  highlightProp?: boolean;
  fontweightprop?: string;
  opacityprop?: string;
}
