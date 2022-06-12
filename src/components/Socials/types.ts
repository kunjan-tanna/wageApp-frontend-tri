import { Nullable } from '../../types';

export interface IProps {
  offer: ISocialsOffer;
}

export interface ISocialsOffer {
  id: number;
  title: string;
  coverPhotoUrl: Nullable<string>;
  description: string;
  offerType?: string;
  type?: string;
}
