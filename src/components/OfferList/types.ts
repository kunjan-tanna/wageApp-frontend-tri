import { IOffersList } from '../../types/offers';
import { ISelectOptions } from '../SelectDropdown/types';

export interface IProps {
  onselData: any;
  isOfferPage: boolean;
  isDashboardPage: boolean;
  data: IOffersList;
  isRequesting: boolean;
  columnsCount: number;
  onSelectChange?: (value: ISelectOptions) => void;
  selectDropdownValue?: ISelectOptions;
  loadPage: (options: any) => void;
  showTypeTabs?: boolean;
  filters: {
    [key: string]: any;
    distance: number;
    sortBy: string;
    categoryId?: number;
    priceFrom?: number;
    priceTo?: number;
    offerType?: any;
  };
  filterFlag?: boolean;
  selectedCategory?: string;
  filterData?: any;
  location?: any;
  updateFilters?: any;
  categories?: any;
  isUserProfile: any;
  onClearCat: (options?: any) => void;
  onClearTask: (options?: any) => void;
  onClearDis: (options?: any) => void;
  onClearPrice: (options?: any) => void;
  onClearState: (options?: any) => void;
}

export enum DisplayTypes {
  GRID = 'grid',
  LIST = 'list',
  MAP = 'map'
}

export type DisplayType = DisplayTypes.GRID | DisplayTypes.LIST | DisplayTypes.MAP;

export interface IState {
  displayType: DisplayType;
  eventFlag: any;
  isSorting: any;
  sortingData: any;
  sortBy: any;
  UserProfile : any;
}
