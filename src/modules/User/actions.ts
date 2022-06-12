import {
  IGetUserError,
  IGetUserRequest,
  IGetUserSuccess,
  RequestPayload,
  ResponsePayload
} from './types';

import { IBlockPeopleModalBlockUserSuccess, IBlockPeopleModalUnblockUserSuccess } from '../Modals/BlockPeople/types';

export enum ActionTypes {
  GET_USER_REQUEST = '[USER] - Get user - request',
  GET_USER_SUCCESS = '[USER] - Get user - success',
  GET_USER_ERROR = '[USER] - Get user - error',
}

export type Actions = IGetUserRequest |
  IGetUserSuccess |
  IGetUserError |
  IBlockPeopleModalBlockUserSuccess |
  IBlockPeopleModalUnblockUserSuccess
  ;

export const getUserRequest = (payload: RequestPayload): IGetUserRequest => {
  return {
    type: ActionTypes.GET_USER_REQUEST,
    payload
  };
};

export const getUserSuccess = (payload: ResponsePayload): IGetUserSuccess => {
  return {
    type: ActionTypes.GET_USER_SUCCESS,
    payload
  };
};

export const getUserError = (): IGetUserError => {
  return {
    type: ActionTypes.GET_USER_ERROR
  };
};
  