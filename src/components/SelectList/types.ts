import { ISelectOption } from '../../types';

export interface IProps {
  data: ISelectOption[];
  name: string;
  multiple: boolean;
  selected?: ISelectOption;
  perColumn?: number,
  maxColumns?: number;
  onChange?: (value: string) => void;
}

export type ItemType = 'radio' | 'checkbox';
