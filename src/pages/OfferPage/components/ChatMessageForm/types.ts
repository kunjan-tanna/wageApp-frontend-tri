export interface IFormValues {
  message: string;
}

export interface IFormProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
}
