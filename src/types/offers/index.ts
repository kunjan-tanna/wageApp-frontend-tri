import { AccountType, ILocation, Nullable } from '../index';
import { offersRequest } from '../../modules/Offers/actions';
import { setUserLocation } from '../../modules/UserPreferences/actions';

export type OfferType = 'gig' | 'service';

export enum OfferTypes {
  GIG = 'gig',
  SERVICE = 'service'
}

export enum OfferStatuses {
  PENDING = 'pending',
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed'
}

export type OfferStatus =
  | OfferStatuses.PENDING
  | OfferStatuses.INPROGRESS
  | OfferStatuses.COMPLETED;

export interface IOffer {
  id: number;
  dateCreated: any;
  location: ILocation;
  title: string;
  price: number;
  coverPhotoUrl: Nullable<string>;
  distance: number;
  ownerRating: number;
  ownerAccountType: AccountType;
  offerType: OfferType;
  type: OfferType;
  name: any;
}

export interface IOffersList {
  data: IOffer[];
  totalOffers: number;
  page: number;
  itemsPerPage: number;
}

export interface IOffersCount {
  gig: number;
  service: number;
}
export interface IDispatchProps {
  offersRequest: typeof offersRequest;
}
