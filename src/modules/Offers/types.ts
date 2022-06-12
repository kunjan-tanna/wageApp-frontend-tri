import { IOffersList } from '../../types/offers';
import { ActionTypes } from './actions';

export type RequestPayload = {
  [key: string]: any;
  priceFrom?: number;
  priceTo?: number;
  categoryId?: number;
  ownerId?: string;
  status?: string;
  negotiatedPrice?: boolean;
  lat?: number;
  lng?: number;
  distance?: number;
  filter?: string;
  page?: number;
  itemsPerPage?: number;
  sortBy?: string;
  sortDir?: string;
  offerType?: string;
  type?: string;
  append?: boolean;
};

export type ResponsePayloadRaw = {
  offers: any[];
  totalOffers: number;
};

export type ResponsePayload = {
  offers: any[];
  totalOffers: number;
  page: number;
  itemsPerPage: number;
};

export interface IOffersStoreState {
  list: IOffersList;
  requesting: boolean;
  error: boolean;
}

export interface IUserOffersStoreState {
  list: IOffersList;
  requesting: boolean;
  error: boolean;
}

export interface IOffersRequest {
  readonly type: ActionTypes.OFFERS_REQUEST;
  payload: RequestPayload;
}

export interface IOffersResetPage {
  readonly type: ActionTypes.RESET_PAGE;
}

export interface IOffersSuccess {
  readonly type: ActionTypes.OFFERS_SUCCESS;
  payload: ResponsePayload;
}

export interface IOffersAppendSuccess {
  readonly type: ActionTypes.OFFERS_APPEND_SUCCESS;
  payload: ResponsePayload;
}

export interface IOffersError {
  readonly type: ActionTypes.OFFERS_ERROR;
}
