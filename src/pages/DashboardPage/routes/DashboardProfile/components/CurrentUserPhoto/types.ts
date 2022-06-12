export interface IProps {
  avatarError: boolean;
  avatarRequesting: boolean;
  avatarUrl: string;
  onImageSelect: (file: File) => void;
}

export interface IState { 
  imgBuffering: boolean;
}
