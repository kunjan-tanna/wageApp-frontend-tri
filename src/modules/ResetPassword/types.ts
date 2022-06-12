import { ActionTypes } from './actions';

export type ResetPasswordRequestPayload = {
  values: {
    token: string,
    newPassword: string,
    email: string
  },
  actions: any;
};

export interface IResetPasswordRequest {
  readonly type: ActionTypes.RESET_PASSWORD_REQUEST;
  payload: ResetPasswordRequestPayload;
}
