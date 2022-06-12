export interface IProps {
  caption: string;
  onImageSelect: (file: File) => void;
  avatarUrlPresent: boolean;
}
