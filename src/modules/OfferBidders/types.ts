import { AccountType } from '../../types';
import { ActionTypes } from './actions';

export type RequestPayload = {
  offerId: string;
};

export type ResponsePayload = {
  bidders: IOfferBidder[]
};

export interface IOfferBiddersList {
  list: IOfferBidder[]
}

export interface IOfferBidder {
  id: string;
  rating: number;
  accountType: AccountType;
  firstName: string;
  lastName: string;
  businessName: string;
  businessAddressCity: string;
  businessAddressStreet: string;
  businessPhoneNumber: string;
  businessWebAddress: string;
  avatarUrl: string;
  communicationBlocked: boolean;
  isBlocked: boolean;
  conversationId: number;
}

export interface IOfferBiddersStoreState {
  bidders: IOfferBiddersList;
  requesting: boolean;
  error: boolean;
}

export interface IOfferBiddersRequest {
  readonly type: ActionTypes.OFFER_BIDDERS_REQUEST;
  payload: RequestPayload;
}

export interface IOfferBiddersSuccess {
  readonly type: ActionTypes.OFFER_BIDDERS_SUCCESS;
  payload: ResponsePayload;
}

export interface IOfferBiddersError {
  readonly type: ActionTypes.OFFER_BIDDERS_ERROR;
}
