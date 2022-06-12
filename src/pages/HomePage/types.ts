import { RouteComponentProps } from 'react-router';

import { offersRequest } from '../../modules/Offers/actions';
import { setUserLocation } from '../../modules/UserPreferences/actions';
import { IUserPreferencesUserLocation } from '../../modules/UserPreferences/types';
import { Nullable } from '../../types';
import { IOffersList, OfferType } from '../../types/offers';
import { IDashboardOfferTypes } from '../../data/static/dashboard-offer-types';
import { RequestPayload as GetUserOffersRequestPayload } from '../../modules/UserOffers/types';

export interface IExternalProps {
  offers: IOffersList;
  isRequesting: boolean;
  userLocation: IUserPreferencesUserLocation;
}

export interface IDispatchProps {
  offersRequest: typeof offersRequest;
  setUserLocation: typeof setUserLocation;
}

export interface IProps extends IExternalProps, IDispatchProps, RouteComponentProps {}

export interface IPageProps {
  offers: IOffersList;
  isRequesting: boolean;
  loadPage: (options: any) => void;
  userLocation: IUserPreferencesUserLocation;
  setUserLocation: typeof setUserLocation;
  selectedOfferType: Nullable<OfferType>;
  categories?: any;
  states?: any;
  getsortDetails: any;
  offersRequest: typeof offersRequest;
}
export interface IStateData {
  sortBy: any;
  displayType: DisplayTypes.GRID;
  offers: any;
}
export interface IState {
  locationPermission: boolean;
  selectedOfferId: number;
  filters: {
    [key: string]: any;

    sortBy: string;
    categoryId?: number;
    priceFrom?: number;
    priceTo?: number;
    offerType?: any;
  };
  offers: any;
}
export interface IPropsData {
  offerTypeSignature: IDashboardOfferTypes;
  isRequesting: boolean;
  isError: boolean;
  offerLocation?: string;
  offers: IOffersList;
  ownerId: string;
  offersCount: number;
  userOffersRequest: (payload: GetUserOffersRequestPayload) => void;
  userOffersOffersCountRequest: (payload: string) => void;
  userLocation: IUserPreferencesUserLocation;
  multiOffer?: boolean;
}
export enum DisplayTypes {
  GRID = 'grid',
  LIST = 'list',
  MAP = 'map'
}

export type DisplayType = DisplayTypes.GRID | DisplayTypes.LIST | DisplayTypes.MAP;
