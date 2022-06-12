import {
  IMultiOfferError,
  IMultiOfferPayload,
  IMultiOfferRequest,
  IMultiOfferReset,
  IMultiOfferSuccess,
  IMultiOfferTemplateRequest,
  IMultiOfferTemplateRequestError,
  IMultiOfferTemplateRequestSuccess
} from './types';

export enum ActionTypes {
  MULTI_OFFER_REQUEST = '[MULTIUPLOAD OFFERS] - file request',
  MULTI_OFFER_REQUEST_ERROR = '[MULTIUPLOAD OFFERS] - file request error',
  MULTI_OFFER_REQUEST_SUCCESS = '[MULTIUPLOAD OFFERS] - file request success',
  MULTI_OFFER_REQUEST_RESET = '[MULTIUPLOAD OFFERS] - file request reset',
  MULTI_OFFER_TEMPLATE_REQUEST = '[MULTIUPLOAD OFFERS] - template request',
  MULTI_OFFER_TEMPLATE_REQUEST_SUCCESS = '[MULTIUPLOAD OFFERS] - template request success',
  MULTI_OFFER_TEMPLATE_REQUEST_ERROR = '[MULTIUPLOAD OFFERS] - template request error'
}

export type Actions =
  | IMultiOfferRequest
  | IMultiOfferError
  | IMultiOfferSuccess
  | IMultiOfferReset
  | IMultiOfferTemplateRequest
  | IMultiOfferTemplateRequestSuccess
  | IMultiOfferTemplateRequestError;

export function multiOfferRequest(payload: IMultiOfferPayload): IMultiOfferRequest {
  return {
    type: ActionTypes.MULTI_OFFER_REQUEST,
    payload
  };
}

export function multiOfferRequestError(errorMessage: string): IMultiOfferError {
  return {
    type: ActionTypes.MULTI_OFFER_REQUEST_ERROR,
    payload: errorMessage
  };
}

export function multiOfferRequestSuccess(): IMultiOfferSuccess {
  return {
    type: ActionTypes.MULTI_OFFER_REQUEST_SUCCESS
  };
}

export function multiOfferRequestReset(): IMultiOfferReset {
  return {
    type: ActionTypes.MULTI_OFFER_REQUEST_RESET
  };
}

export function multiOfferTemplateRequest(): IMultiOfferTemplateRequest {
  return {
    type: ActionTypes.MULTI_OFFER_TEMPLATE_REQUEST
  };
}

export function multiOfferTemplateRequestError(): IMultiOfferTemplateRequestError {
  return {
    type: ActionTypes.MULTI_OFFER_TEMPLATE_REQUEST_ERROR
  };
}

export function multiOfferTemplateRequestSuccess(payload: any): IMultiOfferTemplateRequestSuccess {
  return {
    type: ActionTypes.MULTI_OFFER_TEMPLATE_REQUEST_SUCCESS,
    payload
  };
}
