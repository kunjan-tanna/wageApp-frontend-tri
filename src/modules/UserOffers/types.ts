import { IOffersCount, IOffersList } from '../../types/offers';
import { ActionTypes } from './actions';

export type RequestPayload = {
  [key: string]: any;
  ownerId: any;
  priceFrom?: number;
  priceTo?: number;
  categoryId?: number;
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
  type?: string;
  append?: boolean;
};

export type OffersCountRequestPayload = {
  userId: string;
  type: string;
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

export type IUserOffersCountSuccessPayload = {
  offersCount: number;
  offerType: string;
};

export interface IUserOffersStoreState {
  list: IOffersList;
  offersCount: IOffersCount;
  requesting: boolean;
  error: boolean;
}

export interface IUserOffersRequest {
  readonly type: ActionTypes.USER_OFFERS_REQUEST;
  payload: RequestPayload;
}

export interface IUserOffersSuccess {
  readonly type: ActionTypes.USER_OFFERS_SUCCESS;
  payload: ResponsePayload;
}

export interface IUserOffersAppendSuccess {
  readonly type: ActionTypes.USER_OFFERS_APPEND_SUCCESS;
  payload: ResponsePayload;
}

export interface IUserOffersError {
  readonly type: ActionTypes.USER_OFFERS_ERROR;
}

export interface IUserOffersCountRequest {
  readonly type: ActionTypes.USER_OFFERS_COUNT_REQUEST;
  payload: string;
}

export interface IUserOffersCountSuccess {
  readonly type: ActionTypes.USER_OFFERS_COUNT_SUCCESS;
  payload: IUserOffersCountSuccessPayload;
}

export interface IUserCountReset {
  readonly type: ActionTypes.USER_OFFERS_COUNT_RESET;
}
