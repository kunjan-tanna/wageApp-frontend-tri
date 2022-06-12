import { IAddTaskError, IEditTaskError } from '../../OfferForm/types';
import {
  IOfferModifyModalClose,
  IOfferModifyModalOpen,
  IOfferModifyModalResetValues,
  IOfferModifyModalShowMessage,
  OfferModifyModalShowMessagePayload
} from './types';

export enum ActionTypes {
  OFFER_MODIFY_MODAL_OPEN = '[MODALS] - Offer Modify - open',
  OFFER_MODIFY_MODAL_SHOW_MESSAGE = '[MODALS] - Offer Modify - show message',
  OFFER_MODIFY_MODAL_CLOSE = '[MODALS] - Offer Modify - close',
  OFFER_MODIFY_MODAL_RESET = '[MODALS] - Offer Modify - reset values'
}

export type Actions =
  | IOfferModifyModalClose
  | IOfferModifyModalShowMessage
  | IOfferModifyModalOpen
  | IOfferModifyModalResetValues
  | IAddTaskError
  | IEditTaskError;


export const offerModifyModalOpen = (): IOfferModifyModalOpen => {
  return {
    type: ActionTypes.OFFER_MODIFY_MODAL_OPEN
  };
};

export const offerModifyModalShowMessage = (payload: OfferModifyModalShowMessagePayload): IOfferModifyModalShowMessage => {
  return {
    type: ActionTypes.OFFER_MODIFY_MODAL_SHOW_MESSAGE,
    payload
  };
};

export const offerModifyModalClose = (): IOfferModifyModalClose => {
  return {
    type: ActionTypes.OFFER_MODIFY_MODAL_CLOSE
  };
};

export const offerModifyModalReset = (): IOfferModifyModalResetValues => {
  return {
    type: ActionTypes.OFFER_MODIFY_MODAL_RESET
  };
};