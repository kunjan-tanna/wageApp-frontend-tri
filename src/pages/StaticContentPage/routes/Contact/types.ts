import { contactFormRequest } from '../../../../modules/ContactForm/actions';
import { RequestPayload } from '../../../../modules/ContactForm/types';

export interface IProps {
  contactFormRequest: (payload: RequestPayload) => void;
}

export interface IFormValues {
  name: string;
  email: string;
  content: string;
}

export interface IDispatchProps {
  contactFormRequest: typeof contactFormRequest;
}

export interface IFormProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
}

export interface IState {
  isSubmit: boolean;
}