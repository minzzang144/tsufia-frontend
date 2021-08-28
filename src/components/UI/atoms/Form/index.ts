export interface FormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  flexDirectionProp?: 'row' | 'column';
  justifyContentProp?: 'flex-start' | 'center' | 'flex-end';
  alignItemsProp?: 'flex-start' | 'center' | 'flex-end';
  widthProp?: string;
}
