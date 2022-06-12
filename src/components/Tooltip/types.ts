export interface IProps {
  isOpen: boolean;
  fixedWidth?: boolean;
  onClickOutside?: (e: any) => void;
  extraClassName?: string;
}