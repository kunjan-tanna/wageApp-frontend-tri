import {
  IUserCountReset,
  IUserOffersAppendSuccess,
  IUserOffersCountRequest,
  IUserOffersCountSuccess,
  IUserOffersCountSuccessPayload,
  IUserOffersError,
  IUserOffersRequest,
  IUserOffersSuccess,
  RequestPayload,
  ResponsePayload
} from './types';

export enum ActionTypes {
  USER_OFFERS_REQUEST = '[USER OFFERS] - request',
  USER_OFFERS_SUCCESS = '[USER OFFERS] - success',
  USER_OFFERS_APPEND_SUCCESS = '[USER OFFERS] - append success',
  USER_OFFERS_ERROR = '[USER OFFERS] - error',
  USER_OFFERS_COUNT_REQUEST = '[USER OFFERS] - offers count - request',
  USER_OFFERS_COUNT_SUCCESS = '[USER OFFERS] - offers count - success',
  USER_OFFERS_COUNT_RESET = '[USER OFFERS] - offers count - reset'
}

export type Actions =
  | IUserOffersRequest
  | IUserOffersSuccess
  | IUserOffersAppendSuccess
  | IUserOffersError
  | IUserOffersCountRequest
  | IUserOffersCountSuccess
  | IUserCountReset;

export function userOffersRequest(payload: RequestPayload): IUserOffersRequest {
  return {
    type: ActionTypes.USER_OFFERS_REQUEST,
    payload
  };
}

export function userOffersSuccess(payload: ResponsePayload): IUserOffersSuccess {
  return {
    type: ActionTypes.USER_OFFERS_SUCCESS,
    payload
  };
}

export function userOffersAppendSuccess(payload: ResponsePayload): IUserOffersAppendSuccess {
  return {
    type: ActionTypes.USER_OFFERS_APPEND_SUCCESS,
    payload
  };
}

export function userOffersError(): IUserOffersError {
  return {
    type: ActionTypes.USER_OFFERS_ERROR
  };
}

export function userOffersOffersCountRequest(payload: string): IUserOffersCountRequest {
  return {
    type: ActionTypes.USER_OFFERS_COUNT_REQUEST,
    payload
  };
}

export function userOffersOffersCountSuccess(
  payload: IUserOffersCountSuccessPayload
): IUserOffersCountSuccess {
  return {
    type: ActionTypes.USER_OFFERS_COUNT_SUCCESS,
    payload
  };
}

export function userOffersOffersCountReset(): IUserCountReset {
  return {
    type: ActionTypes.USER_OFFERS_COUNT_RESET
  };
}
