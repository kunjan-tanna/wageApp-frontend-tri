import { combineReducers } from 'redux';

import { Actions, ActionTypes } from './actions';
import { ICategoriesStoreState, ICategory } from './types';

const initialState: ICategory[] = [
  {
    id: 0,
    name: 'All categories',
    description: 'All categories',
    iconUrl: ''
  }
];

function list(state: ICategory[] = initialState, action: Actions): ICategory[] {
  switch (action.type) {
    case ActionTypes.CATEGORIES_SUCCESS:
      const { categories } = action.payload;
      return [...initialState, ...categories];
    case ActionTypes.CATEGORIES_REQUEST:
    case ActionTypes.CATEGORIES_ERROR:
      return state;
    default:
      return state;
  }
}

function requesting(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.CATEGORIES_REQUEST:
      return true;
    case ActionTypes.CATEGORIES_ERROR:
    case ActionTypes.CATEGORIES_SUCCESS:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.CATEGORIES_ERROR:
      return true;
    case ActionTypes.CATEGORIES_REQUEST:
    case ActionTypes.CATEGORIES_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers<ICategoriesStoreState, Actions>({
  list,
  requesting,
  error
});
