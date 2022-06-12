import { RouteComponentProps } from 'react-router';

import { Actions as CategoriesActions, categoriesRequest } from '../../modules/Categories/actions';
import {
  Actions as OffersActions,
  offersRequest,
  offersResetPage
} from '../../modules/Offers/actions';
import { IState as IStateListElement } from '../../modules/States/types';
import { IUserPreferencesUserLocation } from '../../modules/UserPreferences/types';
import { ISelectOption } from '../../types';
import { IOffersList, OfferType } from '../../types/offers';

export interface IExternalProps {
  offers: IOffersList;
  states: IStateListElement[];
  categories: ISelectOption[];
  isRequesting: boolean;
  userLocation: IUserPreferencesUserLocation;
}

export interface IDispatchProps {
  offersRequest: typeof offersRequest;
  categoriesRequest: typeof categoriesRequest;
  offersResetPage: typeof offersResetPage;
}

export interface IProps extends IExternalProps, IDispatchProps, RouteComponentProps {}

export interface IState {
  filters: {
    [key: string]: any;
    distance: number;
    sortBy: string;
    categoryId?: number;
    priceFrom?: number;
    priceTo?: number;
    offerType?: OfferType;
    filterToggle?: string;
  };
  filterFlag?: boolean;
}

export type Actions = OffersActions | CategoriesActions;

export interface IPageProps extends RouteComponentProps {
  offers: IOffersList;
  categories: ISelectOption[];
  states: IStateListElement[];
  isRequesting: boolean;
  loadPage: (options: any) => void;
  offersResetPage: () => void;
  userLocation: IUserPreferencesUserLocation;
}
