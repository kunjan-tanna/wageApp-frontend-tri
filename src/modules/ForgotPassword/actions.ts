import {
  ForgotPasswordRequestPayload,
  IForgotPasswordRequest,
} from './types';

export enum ActionTypes {
  FORGOT_PASSWORD_REQUEST = '[FORGOT PASSWORD] - request',
}

export type Actions = IForgotPasswordRequest;

export function forgotPasswordRequest(payload: ForgotPasswordRequestPayload): IForgotPasswordRequest {
  return {
    type: ActionTypes.FORGOT_PASSWORD_REQUEST,
    payload,
  };
}
