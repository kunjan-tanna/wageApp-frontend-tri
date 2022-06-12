import { setUserLocation } from '../../../../modules/UserPreferences/actions';
import { IUserPreferencesUserLocation } from '../../../../modules/UserPreferences/types';
import { ILocation, Nullable } from '../../../../types';
import { OfferType } from '../../../../types/offers';

export interface IFormProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
}

export interface IFormValues {
  location: ILocation;
  filter: string;
  distance: string;
  offerType: Nullable<OfferType>;
}

export interface IProps {
  selectedOfferType: Nullable<OfferType>;
  setUserLocation: typeof setUserLocation;
  userLocation: IUserPreferencesUserLocation;
  locationPermission: boolean;
}
