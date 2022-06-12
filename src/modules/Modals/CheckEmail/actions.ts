import {
  ICheckEmailModalClose,
  ICheckEmailModalOpen,
  ICheckEmailModalResend,
  ICheckEmailModalResendPayload,
  ICheckEmailModalResetValues
} from './types';

export enum ActionTypes {
  CHECK_EMAIL_MODAL_OPEN = '[MODALS] - Check Email - open',
  CHECK_EMAIL_MODAL_CLOSE = '[MODALS] - Check Email - close',
  CHECK_EMAIL_MODAL_RESET = '[MODALS] - Check Email - reset values',
  CHECK_EMAIL_MODAL_RESEND = '[MODALS] - Check Email - resend'
}

export type Actions =
  | ICheckEmailModalClose
  | ICheckEmailModalResend
  | ICheckEmailModalOpen
  | ICheckEmailModalResetValues
  ;

export const checkEmailModalOpen = (payload: ICheckEmailModalResendPayload): ICheckEmailModalOpen => {
  return {
    type: ActionTypes.CHECK_EMAIL_MODAL_OPEN,
    payload
  };
};

export const checkEmailModalClose = (): ICheckEmailModalClose => {
  return {
    type: ActionTypes.CHECK_EMAIL_MODAL_CLOSE
  };
};

export const checkEmailModalResetValues = (): ICheckEmailModalResetValues => {
  return {
    type: ActionTypes.CHECK_EMAIL_MODAL_RESET
  };
};

export const checkEmailModalResend = (payload: ICheckEmailModalResendPayload): ICheckEmailModalResend => {
  return {
    type: ActionTypes.CHECK_EMAIL_MODAL_RESEND,
    payload
  }
};
