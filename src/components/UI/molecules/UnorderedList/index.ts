export enum FlexDirectionProp {
  Row,
  Column,
}

type JustifyContentProp = 'flex-start' | 'center' | 'flex-end';
type AlignItemsProp = 'flex-start' | 'center' | 'flex-end';

export interface UnorderedListProps {
  flexDirection?: FlexDirectionProp;
  justifyContentProp?: JustifyContentProp;
  alignItemsProp?: AlignItemsProp;
}
