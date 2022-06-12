import {
  IResetPasswordRequest,
  ResetPasswordRequestPayload
} from './types';

export enum ActionTypes {
  RESET_PASSWORD_REQUEST = '[RESET PASSWORD] - request',
}

export type Actions = IResetPasswordRequest;

export function resetPasswordRequest(payload: ResetPasswordRequestPayload): IResetPasswordRequest {
  return {
    type: ActionTypes.RESET_PASSWORD_REQUEST,
    payload
  };
}
