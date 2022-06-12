export interface IProps {
  toggleTooltip: (name: string) => void;
  tooltips: {
    [key: string]: boolean;
  }
}