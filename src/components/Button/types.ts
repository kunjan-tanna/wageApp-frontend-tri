export interface IProps {
  type?: 'submit' | 'reset' | 'button';
  label: string;
  variant: 'default' | 'fixed-width' | 'drop' | 'add' | 'clear-right' | 'clear-reset' | 'clear' | 'clear2';
  disabled?: boolean;
  onClick?: (e: any) => void;
}
