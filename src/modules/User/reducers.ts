import { combineReducers } from 'redux';

import { ActionTypes as BlockPeopleActionTypes } from '../../modules/Modals/BlockPeople/actions';
import { AccountTypes } from '../../types';
import { Actions, ActionTypes } from './actions';
import { IUserDetails, IUserStoreState } from './types';

const initialState: IUserDetails = {
  rating: 0,
  id: '',
  accountType: AccountTypes.INTERNAL,
  firstName: '',
  lastName: '',
  businessName: '',
  avatarUrl: '',
  communicationBlocked: false,
  isBlocked: false,
  ratingCount: 0,
  verifiedBy: '',
  joinedDate: '',
  isDeleted: false
};

const user = (state: IUserDetails = initialState, action: Actions): IUserDetails => {
  switch (action.type) {
    case ActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ActionTypes.GET_USER_REQUEST:
    case ActionTypes.GET_USER_ERROR: {
      return state;
    }
    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS:
    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS: {
      const isBlocked =
        action.type === BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS;

      if (state.hasOwnProperty('id') && state.id.toString() === action.payload.id) {
        return {
          ...state,
          isBlocked,
          communicationBlocked: isBlocked
        };
      }

      return state;
    }
    default: {
      return state;
    }
  }
};

const requesting = (state: boolean = false, action: Actions): boolean => {
  switch (action.type) {
    case ActionTypes.GET_USER_REQUEST:
      return true;
    case ActionTypes.GET_USER_ERROR:
    case ActionTypes.GET_USER_SUCCESS:
      return false;
    default:
      return state;
  }
};

const error = (state: boolean = false, action: Actions): boolean => {
  switch (action.type) {
    case ActionTypes.GET_USER_ERROR:
      return true;
    case ActionTypes.GET_USER_REQUEST:
    case ActionTypes.GET_USER_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers<IUserStoreState, Actions>({
  user,
  requesting,
  error
});
