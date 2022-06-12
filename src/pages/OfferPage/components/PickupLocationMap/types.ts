import { ILocation } from '../../../../types';
import { OfferType } from '../../../../types/offers/';

export interface IProps {
  id: number;
  location: ILocation,
  address?: string;
  title: string;
  type?: OfferType;
}
