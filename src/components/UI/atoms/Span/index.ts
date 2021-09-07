type ColorProp = 'black' | 'white' | 'red';

type LevelProp = 1 | 2 | 3 | 4 | 5 | 6;
type DisplayProp = 'inline' | 'inline-block';
type AlignSelfProp = 'flex-start' | 'center' | 'flex-end';

export interface SpanProps {
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  displayProp?: DisplayProp;
  alignSelfProp?: AlignSelfProp;
  levelProp?: LevelProp;
  marginProp?: string[];
  colorProp?: ColorProp;
  lineHeightprop?: string;
  highlightProp?: boolean;
}
