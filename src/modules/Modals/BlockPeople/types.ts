import { Nullable } from '../../../types';
import { IBlockedUser } from '../../CurrentUser/types';
import { ActionTypes } from './actions';

export enum BlockTypes {
  BLOCK = 'block',
  UNBLOCK = 'unblock'
}

export type BlockType = BlockTypes.BLOCK | BlockTypes.UNBLOCK;

export interface IBlockPeopleModalState {
  visible: boolean;
  type: Nullable<BlockType>;
  requesting: boolean;
  error: boolean;
  success: boolean;
  userId: Nullable<string>;
  userName: string;
}

export interface IBlockingUserResponsePayload {
  userId: string;
}

export interface IBlockPeopleModalBlockUserRequest {
  readonly type: ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_REQUEST;
  payload: IBlockingUserResponsePayload;
}

export interface IBlockPeopleModalBlockUserSuccess {
  readonly type: ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS;
  payload: IBlockedUser;
}

export interface IBlockPeopleModalBlockUserError {
  readonly type: ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_ERROR;
}

export interface IBlockPeopleModalUnblockUserRequest {
  readonly type: ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_REQUEST;
  payload: IBlockingUserResponsePayload;
}

export interface IBlockPeopleModalUnblockUserSuccess {
  readonly type: ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS;
  payload: IBlockedUser;
}

export interface IBlockPeopleModalUnblockUserError {
  readonly type: ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_ERROR;
}

export type BlockPeopleModalVisibilityChangePayload = {
  type: Nullable<BlockType>;
  visible: boolean;
  userId: Nullable<string>;
  userName: string;
}

export interface IBlockPeopleModalVisibilityChange {
  readonly type: ActionTypes.BLOCK_PEOPLE_MODAL_VISIBILITY_CHANGE;
  payload: BlockPeopleModalVisibilityChangePayload;
}

export interface IBlockPeopleModalReset {
  readonly type: ActionTypes.BLOCK_PEOPLE_MODAL_RESET;
}