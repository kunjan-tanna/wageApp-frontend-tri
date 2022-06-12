import {
  IStatesError,
  IStatesRequest,
  IStatesSuccess,
  ResponsePayload,
} from './types';

export enum ActionTypes {
  STATES_REQUEST = '[STATES] - request',
  STATES_SUCCESS = '[STATES] - success',
  STATES_ERROR = '[STATES] - error',
}

export type Actions = IStatesRequest |
  IStatesSuccess |
  IStatesError;

export function statesRequest(): IStatesRequest {
  return { type: ActionTypes.STATES_REQUEST };
}

export function statesSuccess(payload: ResponsePayload): IStatesSuccess {
  return { type: ActionTypes.STATES_SUCCESS, payload };
}

export function statesError(): IStatesError {
  return { type: ActionTypes.STATES_ERROR };
}
