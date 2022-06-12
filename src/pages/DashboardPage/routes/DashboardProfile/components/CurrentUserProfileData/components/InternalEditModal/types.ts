import { ICurrentUser } from '../../../../../../../../modules/CurrentUser/types';

export interface IProps extends IFormProps {
  currentUser: ICurrentUser;
  isOpen: boolean;
  closeModal: () => void;
}

export interface IChangeInternalDataFormValues {
  email: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  phoneNumber: string;
}

export interface IFormProps {
  handleSubmit: (values: IChangeInternalDataFormValues, actions: any) => void;
}
