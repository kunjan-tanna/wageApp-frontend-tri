import { ActionTypes } from './actions';

export interface ICheckEmailState {
  visible: boolean;
  userEmail: string;
}

export interface ICheckEmailModalOpen {
  readonly type: ActionTypes.CHECK_EMAIL_MODAL_OPEN;
  payload: ICheckEmailModalResendPayload;
}

export interface ICheckEmailModalClose {
  readonly type: ActionTypes.CHECK_EMAIL_MODAL_CLOSE;
}

export interface ICheckEmailModalResetValues {
  readonly type: ActionTypes.CHECK_EMAIL_MODAL_RESET;
}

export interface ICheckEmailModalResend {
  readonly type: ActionTypes.CHECK_EMAIL_MODAL_RESEND;
  payload: ICheckEmailModalResendPayload;
}

export interface ICheckEmailModalResendPayload {
  userEmail: string;
}
