export interface IProps {
  label: string;
  isActive: boolean;
  isSelected?: boolean;
  onClick: () => void;
  onClear: () => void;
}
