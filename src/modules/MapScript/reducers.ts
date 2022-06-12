import { combineReducers } from 'redux';
import { Actions, ActionTypes } from './actions';
import { IMapScriptState } from './types';


const loaded = (state: boolean = false, action: Actions): boolean => {
  switch (action.type) {
    case ActionTypes.LOADED:
      return true;
    default:
      return state;
  }
};

export default combineReducers<IMapScriptState, Actions>({
  loaded
});
