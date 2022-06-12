import { combineReducers } from 'redux';
import { Actions, ActionTypes } from './actions';
import { ILoginStoreState } from './types';

function fetched(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.LOGIN_ERROR:
      return true;
    default:
      return state;
  }
}

function requesting(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return true;
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.LOGIN_ERROR:
      return false;
    default:
      return state;
  }
}

function success(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.LOGIN_ERROR:
      return true;
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.LOGIN_SUCCESS:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return true;
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.LOGIN_ERROR:
      return false;
    default:
      return state;
  }
}

export default combineReducers<ILoginStoreState, Actions>({
  fetched,
  requesting,
  success,
  error,
});
