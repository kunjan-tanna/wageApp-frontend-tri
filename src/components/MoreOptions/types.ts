import { ReactNode } from 'react';

export interface IMoreOptions {
  label: string;
  method?: (params?: any) => void;
  iconName?: string;
  customComponent?: ReactNode;
}

export interface IProps {
  items: IMoreOptions[];
  classModifiers: string[];
}
