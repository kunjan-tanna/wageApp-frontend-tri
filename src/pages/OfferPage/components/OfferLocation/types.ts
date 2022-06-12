import { ILocation } from '../../../../types';
import { OfferType } from '../../../../types/offers';

export interface IProps {
  location: ILocation;
  offerType: OfferType;
}