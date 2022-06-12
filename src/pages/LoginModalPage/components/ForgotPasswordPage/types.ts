export interface IFormValues {
  email: string;
}

export interface IFormProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
}

export interface IPageProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
  goBack: () => void;
}
