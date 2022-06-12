import { categoriesRequest } from '../../../../modules/Categories/actions';
import { ISelectOption } from '../../../../types';

export interface IProps extends IDispatchProps, IExternalProps {
  setFieldValue: (name: string, value: string | number) => void;
  error: string;
  touched: string;
  value?: string;
  defaultCategoryName?: string;
}

export interface ISelectValue {
  value: string;
  label: string;
}

export interface IDispatchProps {
  getCategories: typeof categoriesRequest;
}

export interface IExternalProps {
  categories: ISelectOption[];
}
