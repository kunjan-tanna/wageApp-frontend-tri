import {
  ILoginError,
  ILoginExternalRequest,
  ILoginRequest,
  ILoginSuccess,
  ILogoutRequest,
  LoginExternalRequestPayload,
  LoginRequestPayload
} from './types';

export enum ActionTypes {
  LOGIN_EXTERNAL_REQUEST = '[LOGIN] - external - request',
  LOGIN_REQUEST = '[LOGIN] - request',
  LOGIN_SUCCESS = '[LOGIN] - success',
  LOGIN_ERROR = '[LOGIN] - error',
  LOGOUT_REQUEST = '[LOGOUT] - request'
}

export type Actions =
  | ILoginRequest
  | ILoginError
  | ILoginSuccess
  | ILogoutRequest
  | ILoginExternalRequest;

export function loginRequest(payload: LoginRequestPayload): ILoginRequest {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload
  };
}

export function loginExternalRequest(payload: LoginExternalRequestPayload): ILoginExternalRequest {
  console.log('55555555555555555555555555555');
  return {
    type: ActionTypes.LOGIN_EXTERNAL_REQUEST,
    payload
  };
}

export function loginSuccess(): ILoginSuccess {
  return {
    type: ActionTypes.LOGIN_SUCCESS
  };
}

export function loginError(): ILoginError {
  return {
    type: ActionTypes.LOGIN_ERROR
  };
}

export function logoutRequest(): ILogoutRequest {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
}
