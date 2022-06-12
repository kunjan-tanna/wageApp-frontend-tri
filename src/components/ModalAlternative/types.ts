import { ReactNode } from 'react';

export interface IProps {
  isOpen: boolean;
  children: ReactNode;
  extraClass?: string;
}
