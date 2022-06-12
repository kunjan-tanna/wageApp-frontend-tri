import { logoutRequest } from '../../modules/Login/actions';
import { ICurrentUser } from '../../modules/CurrentUser/types';

export interface IDispatchProps {
  logoutRequest: typeof logoutRequest;
}

export interface IProps extends IDispatchProps, IExternalProps {}

export interface IExternalProps {
  user: ICurrentUser;
}
