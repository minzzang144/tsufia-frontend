export enum FlexDirectionProp {
  Row,
  Column,
}

export interface ButtonListProps {
  flexDirectionProp?: FlexDirectionProp;
  gapProp?: string[];
}
