import { AccountType } from '../../types';

import { ActionTypes } from './actions';

export type RequestPayload = {
  values: {
    email: string;
    firstName: string;
    lastName: string;
    businessName: string;
    businessAddressCity: string;
    businessAddressStreet: string;
    businessWebAddress: string;
    password: string;
    accountType: AccountType;
  }
  actions: any
};

export type ResponsePayload = {};

export interface ISignUpRequest {
  readonly type: ActionTypes.REQUEST;
  payload: RequestPayload;
}

export interface ISignUpSuccess {
  readonly type: ActionTypes.SUCCESS;
  payload: ResponsePayload;
}

export interface ISignUpError {
  readonly type: ActionTypes.ERROR;
}
