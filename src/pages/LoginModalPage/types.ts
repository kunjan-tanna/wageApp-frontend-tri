import { RouteComponentProps, StaticContext } from 'react-router';

import { IWithModalProps } from '../../components/Modal/types';
import {
  Actions as ForgotPasswordActions,
  forgotPasswordRequest
} from '../../modules/ForgotPassword/actions';
import { Actions as LoginActions, loginRequest } from '../../modules/Login/actions';
import { ICheckEmailState } from '../../modules/Modals/CheckEmail/types';

export interface IExternalProps {
  success: boolean;
  checkEmail: ICheckEmailState;
  userData: any;
}

export interface IDispatchProps {
  loginRequest: typeof loginRequest;
  forgotPasswordRequest: typeof forgotPasswordRequest;
}

export interface IState {
  forgotPasswordEmail: string;
}

export interface ILocationState {
  from: string;
  var: string;
}

export interface IProps
  extends IExternalProps,
    IDispatchProps,
    RouteComponentProps<{}, StaticContext, ILocationState>,
    IWithModalProps {
  checkEmail: ICheckEmailState;
}

export type Actions = ForgotPasswordActions | LoginActions;
