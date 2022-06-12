import {
  IMapScriptState,
} from './types';

const isLoadedSelector = (state: IMapScriptState): boolean => {
  return state.loaded;
};

export {
  isLoadedSelector
};
