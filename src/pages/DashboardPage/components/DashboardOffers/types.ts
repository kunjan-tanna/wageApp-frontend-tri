import { ISelectOptions } from '../../../../components/SelectDropdown/types';
import { IDashboardOfferTypes } from '../../../../data/static/dashboard-offer-types';
import { IFormValues } from '../../../../modules/MultiuploadOffers/types';
import { RequestPayload as GetUserOffersRequestPayload } from '../../../../modules/UserOffers/types';
import { IUserPreferencesUserLocation } from '../../../../modules/UserPreferences/types';
import { IOffersList } from '../../../../types/offers';

export interface IState {
  sortType: ISelectOptions;
  selectedOfferId: number;
  filters: {
    [key: string]: any;
    distance: number;
    sortBy: string;
    categoryId?: number;
    priceFrom?: number;
    priceTo?: number;
    offerType?: any;
  };
}

export interface IProps {
  offerTypeSignature: IDashboardOfferTypes;
  isRequesting: boolean;
  isError: boolean;
  offerLocation?: string;
  offers: IOffersList;
  ownerId: string;
  offersCount: number;
  userOffersRequest: (payload: GetUserOffersRequestPayload) => void;
  userOffersOffersCountRequest: (payload: string) => void;
  userLocation: IUserPreferencesUserLocation;
  multiOffer?: boolean;
}
