export interface IProps {
  name: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  value: string;
  touched?: boolean;
  error?: string;
  id?: string;
  placeholder?: string;
  placeholderDescription?: string;
  iconName?: string;
  maxHeight?: number;
  minRows?: number;
}
