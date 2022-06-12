import { AccountType } from '../../types';
import { OfferType } from '../../types/offers';
import { ISelectOption } from '../../types';
import { Actions as CategoriesActions, categoriesRequest } from '../../modules/Categories/actions';
import {
  Actions as OffersActions,
  offersRequest,
  offersResetPage
} from '../../modules/Offers/actions';

export interface IProps {
  handleSubmit: (values: IFormValues, actions: any) => void;
  initialValues: IFormValues;
  accountType: AccountType;
  title: string;
  submitButton: string;
  categories: ISelectOption[];
  categoriesRequest: typeof categoriesRequest;
}

export interface IState {
  resetCount: number;
  errorMessage: String;
  countDown: Number;
  current: number;
  textAreaCount: Number;
  promotion: boolean;
  promotionType: Number;
  isSubmitting: boolean;
  titleErrorMessage: String;
  titleState: string;
}

export interface IFormValues {
  type: OfferType;
  title: string;
  price?: number;
  categoryId?: number;
  lat: number;
  lng: number;
  description: string;
  media: string;
  promotionType?: any;
  map_types?: any;
}

export interface IExternalProps {
  categories: ISelectOption[];
}

export interface IDispatchProps {
  offersRequest: typeof offersRequest;
  categoriesRequest: typeof categoriesRequest;
  offersResetPage: typeof offersResetPage;
}

export type Actions = OffersActions | CategoriesActions;
