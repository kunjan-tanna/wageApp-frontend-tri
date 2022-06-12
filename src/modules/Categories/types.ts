import { ActionTypes } from './actions';

export type ResponsePayload = {
  categories: ICategory[];
};

export interface ICategory {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
}

export interface ICategoriesStoreState {
  list: ICategory[];
  requesting: boolean;
  error: boolean;
}

export interface ICategoriesRequest {
  readonly type: ActionTypes.CATEGORIES_REQUEST;
}

export interface ICategoriesSuccess {
  readonly type: ActionTypes.CATEGORIES_SUCCESS;
  payload: ResponsePayload;
}

export interface ICategoriesError {
  readonly type: ActionTypes.CATEGORIES_ERROR;
}
