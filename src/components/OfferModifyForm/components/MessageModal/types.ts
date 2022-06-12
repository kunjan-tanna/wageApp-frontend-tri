export interface IProps {
  title: string;
  requesting: boolean;
  message: string;
  error: boolean;
  onCloseSuccess: () => void;
  onCloseError: () => void;
}