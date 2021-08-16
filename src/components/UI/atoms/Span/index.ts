type ColorProp = 'black' | 'white';

export interface SpanProps {
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  marginProp?: string[];
  colorProp?: ColorProp;
  highlightProp?: boolean;
}
