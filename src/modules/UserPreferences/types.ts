import { ActionTypes } from './actions';

export interface IUserPreferencesState extends IUserPreferencesUserLocation {
}

export interface IUserPreferencesUserLocation {
  lat: number;
  lng: number;
}

export interface IUserPreferencesSetLocation {
  readonly type: ActionTypes.USER_PREFERENCES_SET_LOCATION,
  payload: IUserPreferencesUserLocation
}
