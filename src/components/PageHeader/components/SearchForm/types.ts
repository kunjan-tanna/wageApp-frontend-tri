import { RouteComponentProps } from 'react-router';
import { setUserLocation } from '../../../../modules/UserPreferences/actions';

import { ILocation, ISelectOption } from '../../../../types';

export interface IProps extends RouteComponentProps {
  setUserLocation: typeof setUserLocation;
}

export interface IState {
  filter: string;
  distance: ISelectOption;
  location: ILocation;
  locationPermission: boolean;
}
