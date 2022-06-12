import { RouteComponentProps } from 'react-router';
import { IState as IStateListElement } from '../../modules/States/types';
import { ISelectOption } from '../../types';
import { IOffersList } from '../../types/offers';
import { ISelectOptions } from '../SelectDropdown/types';

export interface IProps extends RouteComponentProps {
  page: number;
  categories: ISelectOption[];
  states: IStateListElement[];
  loadPage: (options: any) => void;
  updateFilters: (option: any, setTemporaryDefaultState?: boolean) => void;
  updateFilterMenu: (filterFlag?: boolean) => void;
  isOfferPage: boolean;
  data: IOffersList;
  isRequesting: boolean;
  columnsCount: number;
  onSelectChange?: (value: ISelectOptions) => void;
  selectDropdownValue?: ISelectOptions;
  showTypeTabs?: boolean;

  filterFlag?: boolean;

  defaultFilters: {
    [key: string]: any;
    distance: number;
    sortBy: string;
    categoryId?: number;
    priceFrom?: number;
    priceTo?: number;
    offerType?: any; // @TODO
  };
  filters: {
    [key: string]: any;
    distance: number;
    sortBy: string;
    categoryId?: number;
    priceFrom?: number;
    priceTo?: number;
    offerType?: any; // @TODO
  };
}

export interface IState {
  tooltips: {
    [key: string]: boolean;
  };
  temporary: {
    distanceIndex: number;
    priceFrom?: string;
    priceTo?: string;
    distance?: number;
    min_distance?: number;
  };
  catFlag?: boolean;
  disFlag?: boolean;
  priceFlag?: boolean;
  taskFlag?: boolean;
  stateFlag?: boolean;
  filterFlag?: boolean;
  sortByFlag?: boolean;
  filterData?: any;
  tempCatData: number;
  tempStateData: number;
  open: boolean;
  dot?: boolean;
  catShowLess?: boolean;
  stateShowLess?: boolean;
}
