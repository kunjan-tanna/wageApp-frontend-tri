import { ICurrentUser } from '../../../../../../../../modules/CurrentUser/types';

export interface IProps extends IFormProps {
  isOpen: boolean;
  currentUser: ICurrentUser;
  closeModal: () => void;
}

export interface IChangeBusinessDataFormValues {
  email: string;
  businessName: string;
  businessAddressStreet: string;
  businessAddressCity?: string;
  businessPhoneNumber: string;
  businessWebAddress: string;
  zipCode: string;
}

export interface IFormProps {
  handleSubmit: (values: IChangeBusinessDataFormValues, actions: any) => void;
}
