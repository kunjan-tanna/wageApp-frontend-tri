import { ICurrentUser } from '../../../../../../modules/CurrentUser/types';

export type IChangePersonalDataFormValues =
  | IChangeBusinessDataFormValues
  | IChangeInternalDataFormValues;

export interface IProps extends IFormProps {
  editMode: boolean;
  currentUser: ICurrentUser;
  toggleEditMode: () => void;
}

export interface IChangeInternalDataFormValues {
  email: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  phoneNumber: string;
}

export interface IChangeBusinessDataFormValues {
  email: string;
  businessName: string;
  businessAddressStreet: string;
  businessAddressCity?: string;
  businessPhoneNumber: string;
  businessWebAddress: string;
  zipCode: string;
  Latitude?: string;
  Longitude?: string;
}

export interface IFormProps {
  handleSubmit: (values: IChangePersonalDataFormValues, actions: any) => void;
}
