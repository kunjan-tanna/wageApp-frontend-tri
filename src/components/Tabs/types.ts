import { ReactNode } from 'react';

export type ContentType = string | ReactNode;

export interface ITabItem {
  title: string;
  content: ContentType;
}

export interface IProps {
  className?: string;
  items: any;
  onSelect?: (tabIndex: number) => void;
}
