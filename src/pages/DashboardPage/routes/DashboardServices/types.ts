import { userOffersOffersCountRequest, userOffersRequest } from '../../../../modules/UserOffers/actions';
import { IUserPreferencesUserLocation } from '../../../../modules/UserPreferences/types';
import { IOffersList } from '../../../../types/offers';

export interface IProps extends IDispatchProps, IExternalProps {
}

export interface IState {
}

export interface IDispatchProps {
  userOffersRequest: typeof userOffersRequest;
  userOffersOffersCountRequest: typeof userOffersOffersCountRequest;
}

export interface IExternalProps {
  isRequesting: boolean;
  isError: boolean;
  offers: IOffersList;
  ownerId: string;
  servicesCount: number;
  userLocation: IUserPreferencesUserLocation;
}
