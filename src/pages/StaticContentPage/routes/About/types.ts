export interface IProps {
  aboutData: IAbout
}

export interface IAbout {
  img: string,
  text: string
}

export interface IState {
  videoModalOpened: boolean;
  videoUrl: string;
}