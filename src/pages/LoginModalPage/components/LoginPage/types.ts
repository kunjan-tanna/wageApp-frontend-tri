import H from 'history';

export interface IFormValues {
  login: string;
  password: string;
}

export interface IFormProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
  handleForgotPassword: () => void;
}

export interface IPageProps {
  history: H.History;
  handleSubmit: (values: IFormValues, actions: any) => void;
  handleForgotPassword: () => void;
}

export interface IState {
  captcha: boolean;
}
