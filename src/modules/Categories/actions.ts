import {
  ICategoriesError,
  ICategoriesRequest,
  ICategoriesSuccess,
  ResponsePayload,
} from './types';

export enum ActionTypes {
  CATEGORIES_REQUEST = '[CATEGORIES] - request',
  CATEGORIES_SUCCESS = '[CATEGORIES] - success',
  CATEGORIES_ERROR = '[CATEGORIES] - error',
}

export type Actions = ICategoriesRequest |
  ICategoriesSuccess |
  ICategoriesError;

export function categoriesRequest(): ICategoriesRequest {
  return {
    type: ActionTypes.CATEGORIES_REQUEST,
  };
}

export function categoriesSuccess(payload: ResponsePayload): ICategoriesSuccess {
  return {
    type: ActionTypes.CATEGORIES_SUCCESS,
    payload,
  };
}

export function categoriesError(): ICategoriesError {
  return {
    type: ActionTypes.CATEGORIES_ERROR,
  };
}
  