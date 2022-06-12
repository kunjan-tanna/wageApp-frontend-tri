import {
  IUserPreferencesSetLocation,
  IUserPreferencesUserLocation
} from './types';

export enum ActionTypes {
  USER_PREFERENCES_SET_LOCATION = '[USER PREFERENCES] - set location',
}

export type Actions = IUserPreferencesSetLocation;

export const setUserLocation = (payload: IUserPreferencesUserLocation) => {
  return {
    type: ActionTypes.USER_PREFERENCES_SET_LOCATION,
    payload
  };
};
