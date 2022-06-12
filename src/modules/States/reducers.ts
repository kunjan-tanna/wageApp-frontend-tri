import { combineReducers } from 'redux';
import { Actions, ActionTypes } from './actions';
import { IState, IStatesState } from './types';

const initialState: IState[] = [];

function list(state: IState[] = initialState, action: Actions): IState[] {
  switch (action.type) {
    case ActionTypes.STATES_SUCCESS:
      const { states } = action.payload;
      return states;
    case ActionTypes.STATES_REQUEST:
    case ActionTypes.STATES_ERROR:
      return state;
    default:
      return state;
  }
}

function requesting(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.STATES_REQUEST:
      return true;
    case ActionTypes.STATES_ERROR:
    case ActionTypes.STATES_SUCCESS:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.STATES_ERROR:
      return true;
    case ActionTypes.STATES_REQUEST:
    case ActionTypes.STATES_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers<IStatesState, Actions>({
  list,
  requesting,
  error,
});
