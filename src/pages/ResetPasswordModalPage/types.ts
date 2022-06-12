import { RouteComponentProps } from 'react-router';
import { IWithModalProps } from '../../components/Modal/types';
import { resetPasswordRequest } from '../../modules/ResetPassword/actions';

export interface IExternalProps {
}

export interface IDispatchProps {
  resetPasswordRequest: typeof resetPasswordRequest;
}

export interface IProps extends IExternalProps, IDispatchProps, RouteComponentProps, IWithModalProps {
}
