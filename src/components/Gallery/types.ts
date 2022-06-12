import { IGalleryItem } from '../../types';

export interface IProps {
  items: IGalleryItem[];
  userData: IUserType;
  offerType: any;
}

export interface IState {
  initActive: boolean;
  loadedImages: number[];
  open: boolean;
  url: string;
  selectedIndex: number;
}

export interface ISettings {
  customPaging: () => void;
}

export interface IUserType {
  accountType?: string;
}
