export interface IProps {
  [x: string]: any 
  data: ISelectOption[];
}

export interface ISelectOption {
  value?: string | number | string[];
  label: string;
}
