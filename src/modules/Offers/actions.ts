import {
  IOffersAppendSuccess,
  IOffersError,
  IOffersRequest,
  IOffersResetPage,
  IOffersSuccess,
  RequestPayload,
  ResponsePayload
} from './types';

export enum ActionTypes {
  OFFERS_REQUEST = '[OFFERS] - request',
  OFFERS_SUCCESS = '[OFFERS] - success',
  OFFERS_APPEND_SUCCESS = '[OFFERS] - append success',
  RESET_PAGE = '[OFFERS] - reset page',
  OFFERS_ERROR = '[OFFERS] - error'
}

export type Actions =
  | IOffersRequest
  | IOffersSuccess
  | IOffersAppendSuccess
  | IOffersError
  | IOffersResetPage;

export function offersResetPage(): IOffersResetPage {
  return { type: ActionTypes.RESET_PAGE };
}

export function offersRequest(payload: RequestPayload): IOffersRequest {
  console.log('PAYLOAD', payload);
  return {
    type: ActionTypes.OFFERS_REQUEST,
    payload
  };
}

export function offersSuccess(payload: ResponsePayload): IOffersSuccess {
  return {
    type: ActionTypes.OFFERS_SUCCESS,
    payload
  };
}

export function offersAppendSuccess(payload: ResponsePayload): IOffersAppendSuccess {
  return {
    type: ActionTypes.OFFERS_APPEND_SUCCESS,
    payload
  };
}

export function offersError(): IOffersError {
  return {
    type: ActionTypes.OFFERS_ERROR
  };
}
