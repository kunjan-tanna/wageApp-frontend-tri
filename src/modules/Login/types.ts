import { ActionTypes } from './actions';

export type LoginRequestPayload = {
  values: any;
  actions: any;
};

export type LoginExternalRequestPayload = {
  accessToken: string;
  provider: string;
  Latitude: string;
  Longitude: string;
  loginDeviceType: string;
  zipCode: string;
};

export type LoginErrorPayload = {
  error: string;
};

export interface ILoginStoreState {
  fetched: boolean;
  requesting: boolean;
  success: boolean;
  error: boolean;
}

export interface ILoginRequest {
  readonly type: ActionTypes.LOGIN_REQUEST;
  payload: LoginRequestPayload;
}

export interface ILoginExternalRequest {
  readonly type: ActionTypes.LOGIN_EXTERNAL_REQUEST;
  payload: LoginExternalRequestPayload;
}

export interface ILoginSuccess {
  readonly type: ActionTypes.LOGIN_SUCCESS;
}

export interface ILoginError {
  readonly type: ActionTypes.LOGIN_ERROR;
}

export interface ILogoutRequest {
  readonly type: ActionTypes.LOGOUT_REQUEST;
}
