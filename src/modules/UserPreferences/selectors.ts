import { IUserPreferencesState, IUserPreferencesUserLocation } from '../UserPreferences/types';

export const getUserLocation = (state: IUserPreferencesState): IUserPreferencesUserLocation => {
  return {
    lat: state.lat,
    lng: state.lng
  }
};