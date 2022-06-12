import { SyntheticEvent } from 'react';

export interface IRaterProps {
  interactive?: boolean;
  total?: number;
  rating?: number;
  onRate?: (event: SyntheticEvent) => void;
  onRating?: () => void;
}

export interface IProps {
  rater: IRaterProps;
}