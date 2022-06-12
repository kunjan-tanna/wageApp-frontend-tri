import { ActionTypes } from './actions';

export interface IMultiUploadOffer {
  title: string;
  description: string;
  price: string;
}

export interface IMultiOfferPayload {
  values: IFormValues;
  actions: any;
}

export interface IFormValues {
  categoryId?: number;
  media: string;
  offers: IOffer[];
}

export interface IOffer {
  title: string;
  price: number;
  description: string;
}

export interface IMultiOffersState {
  requesting: boolean;
  errorMessage: string;
  success: boolean;
}

export interface IMultiOfferRequest {
  readonly type: ActionTypes.MULTI_OFFER_REQUEST;
  payload: IMultiOfferPayload;
}

export interface IMultiOfferError {
  readonly type: ActionTypes.MULTI_OFFER_REQUEST_ERROR;
  payload: string;
}

export interface IMultiOfferSuccess {
  readonly type: ActionTypes.MULTI_OFFER_REQUEST_SUCCESS;
}

export interface IMultiOfferReset {
  readonly type: ActionTypes.MULTI_OFFER_REQUEST_RESET;
}

export interface IMultiOfferTemplateRequest {
  readonly type: ActionTypes.MULTI_OFFER_TEMPLATE_REQUEST;
}

export interface IMultiOfferTemplateRequestSuccess {
  readonly type: ActionTypes.MULTI_OFFER_TEMPLATE_REQUEST_SUCCESS;
  payload: any;
}

export interface IMultiOfferTemplateRequestError {
  readonly type: ActionTypes.MULTI_OFFER_TEMPLATE_REQUEST_ERROR;
}
