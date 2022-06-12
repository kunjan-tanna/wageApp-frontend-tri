import { AccountType, Nullable } from '../../types';

import { ActionTypes } from './actions';

export type RequestPayload = {
  userId: string;
};

export type ResponsePayload = Partial<IUserDetails>;

export interface IUserDetails {
  id: string;
  businessName: Nullable<string>;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  rating: number;
  ratingCount: number;
  verifiedBy: string;
  accountType: AccountType;
  isBlocked: boolean;
  communicationBlocked: boolean;
  joinedDate: string;
  isDeleted: boolean;
}

export interface IUserStoreState {
  user: IUserDetails;
  requesting: boolean;
  error: boolean;
}

export interface IGetUserRequest {
  readonly type: ActionTypes.GET_USER_REQUEST;
  payload: RequestPayload;
}

export interface IGetUserSuccess {
  readonly type: ActionTypes.GET_USER_SUCCESS;
  payload: ResponsePayload;
}

export interface IGetUserError {
  readonly type: ActionTypes.GET_USER_ERROR;
}
