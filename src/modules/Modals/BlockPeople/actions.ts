import { IBlockedUser } from '../../CurrentUser/types';
import {
  BlockPeopleModalVisibilityChangePayload,
  IBlockingUserResponsePayload,
  IBlockPeopleModalBlockUserError,
  IBlockPeopleModalBlockUserRequest,
  IBlockPeopleModalBlockUserSuccess,
  IBlockPeopleModalReset,
  IBlockPeopleModalUnblockUserError,
  IBlockPeopleModalUnblockUserRequest,
  IBlockPeopleModalUnblockUserSuccess,
  IBlockPeopleModalVisibilityChange
} from './types';

export enum ActionTypes {
  BLOCK_PEOPLE_MODAL_BLOCK_USER_REQUEST = '[MODALS] - Block People - block user - request',
  BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS = '[MODALS] - Block People - block user - success',
  BLOCK_PEOPLE_MODAL_BLOCK_USER_ERROR = '[MODALS] - Block People - block user - error',
  BLOCK_PEOPLE_MODAL_UNBLOCK_USER_REQUEST = '[MODALS] - Block People - unblock user - request',
  BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS = '[MODALS] - Block People - unblock user - success',
  BLOCK_PEOPLE_MODAL_UNBLOCK_USER_ERROR = '[MODALS] - Block People - unblock user - error',
  BLOCK_PEOPLE_MODAL_VISIBILITY_CHANGE = '[MODALS] - Block People - visibility change',
  BLOCK_PEOPLE_MODAL_RESET = '[MODALS] - Block People - reset state values',
}

export type Actions = IBlockPeopleModalBlockUserRequest |
  IBlockPeopleModalBlockUserSuccess |
  IBlockPeopleModalBlockUserError |
  IBlockPeopleModalUnblockUserRequest |
  IBlockPeopleModalUnblockUserSuccess |
  IBlockPeopleModalUnblockUserError |
  IBlockPeopleModalVisibilityChange |
  IBlockPeopleModalReset;


export const blockUserRequest = (payload: IBlockingUserResponsePayload): IBlockPeopleModalBlockUserRequest => {
  return {
    type: ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_REQUEST,
    payload
  };
};

export const blockUserSuccess = (payload: IBlockedUser): IBlockPeopleModalBlockUserSuccess => {
  return {
    type: ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS,
    payload
  };
};

export const blockUserError = (): IBlockPeopleModalBlockUserError => {
  return {
    type: ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_ERROR
  };
};

export const unblockUserRequest = (payload: IBlockingUserResponsePayload): IBlockPeopleModalUnblockUserRequest => {
  return {
    type: ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_REQUEST,
    payload
  };
};

export const unblockUserSuccess = (payload: IBlockedUser): IBlockPeopleModalUnblockUserSuccess => {
  return {
    type: ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS,
    payload
  };
};

export const unblockUserError = (): IBlockPeopleModalUnblockUserError => {
  return {
    type: ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_ERROR
  };
};

export const blockPeopleModalVisibilityChange = (payload: BlockPeopleModalVisibilityChangePayload): IBlockPeopleModalVisibilityChange => {
  return {
    type: ActionTypes.BLOCK_PEOPLE_MODAL_VISIBILITY_CHANGE,
    payload
  };
};

export const blockPeopleModalReset = (): IBlockPeopleModalReset => {
  return {
    type: ActionTypes.BLOCK_PEOPLE_MODAL_RESET
  };
};