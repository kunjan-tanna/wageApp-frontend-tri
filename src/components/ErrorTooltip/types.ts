export interface IProps {
  message: string;
  position?: TooltipPosition;
}

export type TooltipPosition = 'left' | 'right';
