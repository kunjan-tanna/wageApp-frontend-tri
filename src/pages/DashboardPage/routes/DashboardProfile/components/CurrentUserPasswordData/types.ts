export interface IProps extends IFormProps {
  editMode: boolean;
  changePasswordSuccessDisplay: boolean;
  toggleEditMode: () => void;
}

export interface IChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export interface IFormProps {
  handleSubmit: (values: IChangePasswordFormValues, actions: any) => void;
}
