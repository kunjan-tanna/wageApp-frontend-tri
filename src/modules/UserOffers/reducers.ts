import { Actions, ActionTypes } from './actions';

import { combineReducers } from 'redux';
import { Config } from '../../config';
import { IOffersCount, IOffersList } from '../../types/offers';
import { IUserOffersStoreState } from './types';

const initialState: IOffersList = {
  data: [],
  totalOffers: 0,
  itemsPerPage: Config.USER_PROFILE_ITEMS_PER_PAGE,
  page: 1
};

const offersCountInitial: IOffersCount = {
  gig: 0,
  service: 0
};

function offersCount(state: IOffersCount = offersCountInitial, action: Actions): IOffersCount {
  switch (action.type) {
    case ActionTypes.USER_OFFERS_COUNT_SUCCESS:
      const { offersCount, offerType } = action.payload;
      return { ...state, [offerType]: offersCount };
    case ActionTypes.USER_OFFERS_COUNT_RESET:
      return offersCountInitial;
    default:
      return state;
  }
}

function list(state: IOffersList = initialState, action: Actions): IOffersList {
  switch (action.type) {
    case ActionTypes.USER_OFFERS_SUCCESS:
      const { offers, totalOffers, page, itemsPerPage } = action.payload;
      return {
        ...initialState,
        data: offers.map(offer => ({ ...offer, dateCreated: new Date(offer.dateCreated) })),
        totalOffers,
        page: page ? page : 1,
        itemsPerPage: itemsPerPage ? itemsPerPage : Config.USER_PROFILE_ITEMS_PER_PAGE
      };
    case ActionTypes.USER_OFFERS_APPEND_SUCCESS:
      return {
        ...initialState,
        data: [
          ...state.data,
          ...action.payload.offers.map(offer => ({ ...offer, dateCreated: new Date(offer.dateCreated) }))
        ],
        totalOffers: action.payload.totalOffers,
        itemsPerPage: state.itemsPerPage,
        page: state.page + 1
      };
    case ActionTypes.USER_OFFERS_REQUEST:
    case ActionTypes.USER_OFFERS_ERROR:
      return state;
    default:
      return state;
  }
}

function requesting(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.USER_OFFERS_REQUEST:
      return true;
    case ActionTypes.USER_OFFERS_ERROR:
    case ActionTypes.USER_OFFERS_SUCCESS:
    case ActionTypes.USER_OFFERS_APPEND_SUCCESS:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.USER_OFFERS_ERROR:
      return true;
    case ActionTypes.USER_OFFERS_REQUEST:
    case ActionTypes.USER_OFFERS_SUCCESS:
    case ActionTypes.USER_OFFERS_APPEND_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers<IUserOffersStoreState, Actions>({
  list,
  requesting,
  error,
  offersCount,
});
