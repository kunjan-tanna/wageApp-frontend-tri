import { ActionTypes } from './actions';

export type ForgotPasswordRequestPayload = {
  values: any,
  actions: any;
};

export interface IForgotPasswordRequest {
  readonly type: ActionTypes.FORGOT_PASSWORD_REQUEST;
  payload: ForgotPasswordRequestPayload;
}
