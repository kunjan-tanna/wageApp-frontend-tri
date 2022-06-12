import {
  EditFormRequestPayload,
  IAddTaskError,
  IAddTaskRequest,
  IAddTaskSuccess,
  IEditTaskError,
  IEditTaskRequest,
  IEditTaskSuccess,
  OfferFormRequestPayload
} from './types';

export enum ActionTypes {
  ADD_TASK_REQUEST = '[OFFER FORM] - add task - request',
  ADD_TASK_SUCCESS = '[OFFER FORM] - add task - success',
  ADD_TASK_ERROR = '[OFFER FORM] - add task - error',
  EDIT_TASK_REQUEST = '[OFFER FORM] - edit task - request',
  EDIT_TASK_SUCCESS = '[OFFER FORM] - edit task - success',
  EDIT_TASK_ERROR = '[OFFER FORM] - edit task - error',
}

export type Actions =
  | IAddTaskRequest
  | IAddTaskSuccess
  | IAddTaskError
  | IEditTaskRequest
  | IEditTaskSuccess
  | IEditTaskError;

export const addTaskRequest = (payload: OfferFormRequestPayload): IAddTaskRequest => {
  return {
    type: ActionTypes.ADD_TASK_REQUEST,
    payload
  };
};

export const addTaskSuccess = (): IAddTaskSuccess => {
  return {
    type: ActionTypes.ADD_TASK_SUCCESS
  };
};

export const addTaskError = (): IAddTaskError => {
  return {
    type: ActionTypes.ADD_TASK_ERROR
  };
};

export const editTaskRequest = (payload: EditFormRequestPayload): IEditTaskRequest => {
  return {
    type: ActionTypes.EDIT_TASK_REQUEST,
    payload
  };
};

export const editTaskSuccess = (): IEditTaskSuccess => {
  return {
    type: ActionTypes.EDIT_TASK_SUCCESS
  };
};

export const editTaskError = (): IEditTaskError => {
  return {
    type: ActionTypes.EDIT_TASK_ERROR
  };
};

