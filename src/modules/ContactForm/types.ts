import { ActionTypes } from './actions';


export type RequestPayload = {
  values: {
    name: string;
    email: string;
    content: string;
  }
  actions: any
};

export type ResponsePayload = {};


export interface IContactFormStoreState {
  requesting: boolean;
  error: boolean;
}

export interface IContactFormRequest {
  readonly type: ActionTypes.REQUEST;
  payload: RequestPayload;
}

export interface IContactFormSuccess {
  readonly type: ActionTypes.SUCCESS;
  payload: ResponsePayload;
}

export interface IContactFormError {
  readonly type: ActionTypes.ERROR;
}
