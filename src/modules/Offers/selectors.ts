import { IOffersList } from '../../types/offers';
import { IUserOffersStoreState } from '../UserOffers/types';
import { IOffersStoreState } from './types';

const isRequestingSelector = (state: IOffersStoreState): boolean => {
  return state.requesting;
};

const homepageOffersSelector = (state: IOffersStoreState): IOffersList => {
  const { data, ...rest } = state.list;
  return {
    ...rest,
    data: data.map(item => ({
      ...item
    }))
  };
};

const offersSelector = (state: IOffersStoreState): IOffersList => {
  const { data, ...rest } = state.list;
  return {
    ...rest,
    data: data.map(item => ({
      ...item
    }))
  };
};

const userOffersSelector = (state: IUserOffersStoreState): IOffersList => {
  const { data, ...rest } = state.list;
  return {
    ...rest,
    data: data.map(item => ({
      ...item
    }))
  };
};

export { isRequestingSelector, homepageOffersSelector, offersSelector, userOffersSelector };
