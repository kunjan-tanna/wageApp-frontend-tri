import { IFormValues } from '../../components/OfferModifyForm/types';
import { ActionTypes } from './actions';

export type OfferFormRequestPayload = {
  values: IFormValues
  actions: any
};

export type EditFormRequestPayload =
  OfferFormRequestPayload & { offerId: number }

export type ResponsePayload = {};

export interface IAddTaskRequest {
  readonly type: ActionTypes.ADD_TASK_REQUEST;
  payload: OfferFormRequestPayload;
}

export interface IAddTaskSuccess {
  readonly type: ActionTypes.ADD_TASK_SUCCESS
}

export interface IAddTaskError {
  readonly type: ActionTypes.ADD_TASK_ERROR;
}

export interface IEditTaskRequest {
  readonly type: ActionTypes.EDIT_TASK_REQUEST;
  payload: EditFormRequestPayload;
}

export interface IEditTaskSuccess {
  readonly type: ActionTypes.EDIT_TASK_SUCCESS
}

export interface IEditTaskError {
  readonly type: ActionTypes.EDIT_TASK_ERROR
}
