import { IOfferBiddersList, IOfferBiddersStoreState } from './types';

const isRequestingSelector = (state: IOfferBiddersStoreState): boolean => {
  return state.requesting;
};

const offerBiddersSelector = (state: IOfferBiddersStoreState): IOfferBiddersList => {
  const { bidders } = state;

  return {
    ...bidders,
    list: bidders.list.map(item => ({
      ...item,
      avatarUrl: item.avatarUrl ? item.avatarUrl : ''
    }))
  };
};

export { isRequestingSelector, offerBiddersSelector };
