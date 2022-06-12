import { ActionTypes } from './actions';

export type ResponsePayload = {
  states: IState[];
};

export interface IState {
  stateShortName: string,
  stateFullName: string
}

export interface IStatesState {
  list: IState[];
  requesting: boolean;
  error: boolean;
}

export interface IStatesRequest {
  readonly type: ActionTypes.STATES_REQUEST;
}

export interface IStatesSuccess {
  readonly type: ActionTypes.STATES_SUCCESS;
  payload: ResponsePayload;
}

export interface IStatesError {
  readonly type: ActionTypes.STATES_ERROR;
}
