import { ActionTypes } from './actions';


export type RequestPayload = {
  loaded: boolean;
};

export type ResponsePayload = {};


export interface IMapScriptState {
  loaded: boolean;
}

export interface IMapScriptLoaded {
  readonly type: ActionTypes.LOADED;
}