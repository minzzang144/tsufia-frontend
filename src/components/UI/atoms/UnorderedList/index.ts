type FlexDirectionProp = 'row' | 'column';
type JustifyContentProp = 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-evenly';
type AlignItemsProp = 'flex-start' | 'center' | 'flex-end';

export interface UnorderedListProps {
  flexDirection?: FlexDirectionProp;
  justifyContentProp?: JustifyContentProp;
  alignItemsProp?: AlignItemsProp;
  widthProp?: string;
}
