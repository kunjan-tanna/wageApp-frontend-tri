import { IOffersCount, IOffersList } from '../../types/offers';
import { IUserOffersStoreState } from './types';

const isRequestingSelector = (state: IUserOffersStoreState): boolean => {
  return state.requesting;
};

const isErrorSelector = (state: IUserOffersStoreState): boolean => {
  return state.error;
};

const userOffersSelector = (state: IUserOffersStoreState): IOffersList => {
  const { data, ...rest } = state.list;

  return {
    ...rest,
    data: data.map(item => ({
      ...item,
      // @ts-ignore - @ToDo - need to be refactor - now exists type/offerType
      offerType: item.type
    }))
  };
};

const servicesCountSelector = (offersCountState: IOffersCount): number => {
  return offersCountState.service;
};

const gigsCountSelector = (offersCountState: IOffersCount): number => {
  return offersCountState.gig;
};

export {
  gigsCountSelector,
  servicesCountSelector,
  isRequestingSelector,
  isErrorSelector,
  userOffersSelector
};
