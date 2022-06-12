import { Config } from '../../config';
import { defaultDistanceValue } from '../../data/distanceRadius';
import { SortTypes } from '../../data/sortTypes';
import { Nullable } from '../../types';
import { OfferStatuses } from '../../types/offers';
import { OfferType } from '../../types/offers';

export interface IOfferFiltersValues {
  sortBy: SortTypes;
  sortDir: SortTypes;
  status: OfferStatuses;
  itemsPerPage: number;
  filter: string;
  distance: number;
  offerType: Nullable<OfferType>;
}

export const offerFiltersInitial: IOfferFiltersValues = {
  sortBy: SortTypes.dateCreated,
  sortDir: SortTypes.dirDesc,
  status: Config.HOMEPAGE_OFFER_STATUS,
  itemsPerPage: Config.HOMEPAGE_ITEMS_PER_PAGE,
  filter: '',
  distance: defaultDistanceValue,
  offerType: null
};
