export interface ISelectOptions {
  value: string;
  label: string;
}

export interface IProps {
  currentValue: any; 
  options: any,
  onChange: (value: any) => void;
}
