import { Actions, ActionTypes } from './actions';
import { IUserPreferencesState } from './types';

const initialState: IUserPreferencesState = {
  lat: 0,
  lng: 0
};

const userPreferences = (state: IUserPreferencesState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.USER_PREFERENCES_SET_LOCATION: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default userPreferences;
