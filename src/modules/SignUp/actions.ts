import {
  ISignUpError,
  ISignUpRequest,
  ISignUpSuccess,
  RequestPayload,
  ResponsePayload,
} from './types';

export enum ActionTypes {
  REQUEST = '[SIGN UP] - request',
  SUCCESS = '[SIGN UP] - success',
  ERROR = '[SIGN UP] - error',
}

export type Actions = ISignUpRequest |
  ISignUpSuccess |
  ISignUpError;

export const signUpRequest = (payload: RequestPayload): ISignUpRequest => {
  return {
    type: ActionTypes.REQUEST,
    payload
  };
};

export const signUpSuccess = (payload: ResponsePayload): ISignUpSuccess => {
  return {
    type: ActionTypes.SUCCESS,
    payload
  };
};

export const signUpError = (): ISignUpError => {
  return {
    type: ActionTypes.ERROR
  };
};
  