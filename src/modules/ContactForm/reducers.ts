import { combineReducers } from 'redux';
import { Actions, ActionTypes } from './actions';
import { IContactFormStoreState } from './types';


const requesting = (state: boolean = false, action: Actions): boolean => {
  switch (action.type) {
    case ActionTypes.REQUEST:
      return true;
    case ActionTypes.ERROR:
    case ActionTypes.SUCCESS:
      return false;
    default:
      return state;
  }
};

const error = (state: boolean = false, action: Actions): boolean => {
  switch (action.type) {
    case ActionTypes.ERROR:
      return true;
    case ActionTypes.REQUEST:
    case ActionTypes.SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers<IContactFormStoreState, Actions>({
  requesting,
  error,
});
