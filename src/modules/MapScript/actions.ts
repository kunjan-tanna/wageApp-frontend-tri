import {
  IMapScriptLoaded
} from './types';

export enum ActionTypes {
  LOADED = '[MAP SCRIPT] - loaded'
}

export type Actions = IMapScriptLoaded;

export const markMapScriptAsLoaded = (): IMapScriptLoaded => {
  return {
    type: ActionTypes.LOADED
  };
};