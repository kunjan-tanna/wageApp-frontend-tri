import { ApiConfig } from '../../config';
import { IGeneralState } from '../../types';

import {
  IOfferDetails,
  IOfferReportState,
  IOfferStoreState
} from './types';

const isRequestingSelector = (state: IOfferStoreState): boolean => {
  return state.requesting;
};

const isErrorSelector = (state: IOfferStoreState): boolean => {
  return state.error;
};

const setStatusSelector = (state: IOfferStoreState): IGeneralState => {
  return state.setStatus;
};

const completeSelector = (state: IOfferStoreState): IGeneralState => {
  return state.complete;
};

const bidSelector = (state: IOfferStoreState): IGeneralState => {
  return state.bid;
};

const reportSelector = (state: IOfferStoreState): IOfferReportState => {
  return state.report;
};


const offerSelector = (state: IOfferStoreState): IOfferDetails => {
  const { offer } = state;

  return {
    ...offer,
    gallery: offer.gallery.map(item => ({ ...item, url: `${ApiConfig.URL}${item.url}` }))
  };
};

export {
  isErrorSelector,
  isRequestingSelector,
  offerSelector,
  setStatusSelector,
  completeSelector,
  bidSelector,
  reportSelector
};
