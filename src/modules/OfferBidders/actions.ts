import {
  IOfferBiddersError,
  IOfferBiddersRequest,
  IOfferBiddersSuccess,
  RequestPayload,
  ResponsePayload
} from './types';

import { IBlockPeopleModalBlockUserSuccess, IBlockPeopleModalUnblockUserSuccess } from '../Modals/BlockPeople/types';

export enum ActionTypes {
  OFFER_BIDDERS_REQUEST = '[OFFER BIDDERS] - request',
  OFFER_BIDDERS_SUCCESS = '[OFFER BIDDERS] - success',
  OFFER_BIDDERS_ERROR = '[OFFER BIDDERS] - error',
}

export type Actions = IOfferBiddersRequest |
  IOfferBiddersSuccess |
  IOfferBiddersError |
  IBlockPeopleModalBlockUserSuccess |
  IBlockPeopleModalUnblockUserSuccess;

export function offerBiddersRequest(payload: RequestPayload): IOfferBiddersRequest {
  return {
    type: ActionTypes.OFFER_BIDDERS_REQUEST,
    payload
  };
}

export function offerBiddersSuccess(payload: ResponsePayload): IOfferBiddersSuccess {
  return {
    type: ActionTypes.OFFER_BIDDERS_SUCCESS,
    payload
  };
}

export function offerBiddersError(): IOfferBiddersError {
  return {
    type: ActionTypes.OFFER_BIDDERS_ERROR
  };
}
  