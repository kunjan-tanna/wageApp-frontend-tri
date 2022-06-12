import { RouteComponentProps } from 'react-router';
import { setUserLocation } from '../../modules/UserPreferences/actions';

export interface IProps extends RouteComponentProps {
  setUserLocation: typeof setUserLocation;
}
