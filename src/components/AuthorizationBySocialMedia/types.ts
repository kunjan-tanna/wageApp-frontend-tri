import { RouteComponentProps } from 'react-router';
import { loginExternalRequest } from '../../modules/Login/actions';

export interface ISocialItem {
  text: string;
}

export interface IProps extends IDispatchProps, RouteComponentProps {
  title: string;
  facebook: ISocialItem;
  google: ISocialItem;
}

export interface IDispatchProps {
  loginExternalRequest: typeof loginExternalRequest;
}

export interface IState {
  lat: String;
  long: String;
  platform: String;
  zipcode: String;
}
