import {
  IContactFormError,
  IContactFormRequest,
  IContactFormSuccess,
  RequestPayload,
  ResponsePayload,
} from './types';

export enum ActionTypes {
  REQUEST = '[CONTACT FORM] - request',
  SUCCESS = '[CONTACT FORM] - success',
  ERROR = '[CONTACT FORM] - error',
}

export type Actions = IContactFormRequest |
  IContactFormSuccess |
  IContactFormError;

export const contactFormRequest = (payload: RequestPayload): IContactFormRequest => {
  return {
    type: ActionTypes.REQUEST,
    payload
  };
};

export const contactFormSuccess = (payload: ResponsePayload): IContactFormSuccess => {
  return {
    type: ActionTypes.SUCCESS,
    payload
  };
};

export const contactFormError = (): IContactFormError => {
  return {
    type: ActionTypes.ERROR
  };
};
  