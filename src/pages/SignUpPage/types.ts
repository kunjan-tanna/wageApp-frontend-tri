import H from 'history';
import { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';
import { ICheckEmailState } from '../../modules/Modals/CheckEmail/types';
import { signUpRequest } from '../../modules/SignUp/actions';
import { AccountType } from '../../types';

export interface IExternalProps {}

export interface IDispatchProps {
  signUpRequest: typeof signUpRequest;
}

export interface IProps extends IExternalProps, IDispatchProps, RouteComponentProps {
  checkEmail: ICheckEmailState;
}

export interface IFormValues {
  [key: string]: string | boolean;

  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessAddressCity: string;
  businessAddressStreet: string;
  businessPhoneNumber: string;
  businessWebAddress: string;
  password: string;
  agreement: boolean;
  accountType: AccountType;
}

export interface IFormProps {
  history?: H.History;
  handleSubmit: (values: IFormValues, actions: any) => void;
}

export interface IPageProps {
  history: H.History;
  handleSubmit: (values: IFormValues, actions: any) => void;
  visible: boolean;
  email: string;
}

export interface IRenderedInput {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string | ReactNode;
  iconName?: string;
}

export interface IState {
  captcha: boolean;
}
