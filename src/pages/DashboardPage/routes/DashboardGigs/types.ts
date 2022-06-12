import { multiOfferRequest } from '../../../../modules/MultiuploadOffers/actions';
import { Actions as MultiOfferActions } from '../../../../modules/MultiuploadOffers/actions';
import {
  userOffersOffersCountRequest,
  userOffersRequest
} from '../../../../modules/UserOffers/actions';
import { Actions as UserOffersActions } from '../../../../modules/UserOffers/actions';
import { IUserPreferencesUserLocation } from '../../../../modules/UserPreferences/types';
import { IOffersList } from '../../../../types/offers';

export interface IProps extends IDispatchProps, IExternalProps {}

export interface IState {}

export interface IDispatchProps {
  userOffersRequest: typeof userOffersRequest;
  userOffersOffersCountRequest: typeof userOffersOffersCountRequest;
  multiOfferRequest: typeof multiOfferRequest;
}

export type Actions = UserOffersActions | MultiOfferActions;

export interface IExternalProps {
  isRequesting: boolean;
  isError: boolean;
  offers: IOffersList;
  ownerId: string;
  accountType: string;
  gigsCount: number;
  userLocation: IUserPreferencesUserLocation;
}
