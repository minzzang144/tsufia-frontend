type ColorProp = 'black' | 'white';

type LevelProp = 1 | 2 | 3 | 4 | 5 | 6;

export interface SpanProps {
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  levelProp?: LevelProp;
  marginProp?: string[];
  colorProp?: ColorProp;
  highlightProp?: boolean;
}
