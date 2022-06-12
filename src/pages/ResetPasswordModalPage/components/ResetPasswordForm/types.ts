export interface IFormValues {
  email?: string;
  password: string;
  passwordConfirmation: string;
  token?: string;
}

export interface IFormProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
}

export interface IPageProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
  handleForgotPassword: () => void;
}
