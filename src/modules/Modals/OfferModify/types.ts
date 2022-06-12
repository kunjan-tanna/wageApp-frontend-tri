import { ActionTypes } from './actions';

export interface IOfferModifyModalState {
  visible: boolean;
  message: string;
  requesting: boolean;
  error: boolean;
}

export interface IOfferModifyModalOpen {
  readonly type: ActionTypes.OFFER_MODIFY_MODAL_OPEN
}

export interface OfferModifyModalShowMessagePayload {
  message: string;
}

export interface IOfferModifyModalShowMessage {
  readonly type: ActionTypes.OFFER_MODIFY_MODAL_SHOW_MESSAGE;
  payload: OfferModifyModalShowMessagePayload;
}

export interface IOfferModifyModalClose {
  readonly type: ActionTypes.OFFER_MODIFY_MODAL_CLOSE
}

export interface IOfferModifyModalResetValues {
  readonly type: ActionTypes.OFFER_MODIFY_MODAL_RESET
}