import { ICurrentUser } from '../../modules/CurrentUser/types';

export interface IExternalProps {
  currentUser: ICurrentUser;
}

export interface IDispatchProps {
}

export interface IProps extends IExternalProps, IDispatchProps {
  accountType: string;
}

export interface IPageProps {
  accountType: string;
}
