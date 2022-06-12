import { combineReducers } from 'redux';

import { Config } from '../../config';
import { IOffersList } from '../../types/offers';
import { Actions, ActionTypes } from './actions';
import { IOffersStoreState } from './types';

const initialState: IOffersList = {
  data: [],
  totalOffers: 0,
  itemsPerPage: Config.ITEMS_PER_PAGE,
  page: 1
};

function list(state: IOffersList = initialState, action: Actions): IOffersList {
  switch (action.type) {
    case ActionTypes.RESET_PAGE:
      return { ...state, page: 1 };
    case ActionTypes.OFFERS_SUCCESS:
      const { offers, totalOffers, page, itemsPerPage } = action.payload;
      return {
        ...initialState,
        data: offers.map(offer => ({ ...offer, dateCreated: new Date(offer.dateCreated) })),
        totalOffers,
        page: page ? page : 1,
        itemsPerPage: itemsPerPage ? itemsPerPage : Config.ITEMS_PER_PAGE
      };
    case ActionTypes.OFFERS_APPEND_SUCCESS:
      return {
        ...initialState,
        data: [
          ...state.data,
          ...action.payload.offers.map(offer => ({
            ...offer,
            dateCreated: new Date(offer.dateCreated)
          }))
        ],
        totalOffers: action.payload.totalOffers,
        itemsPerPage: state.itemsPerPage,
        page: state.page + 1
      };
    case ActionTypes.OFFERS_REQUEST:
    case ActionTypes.OFFERS_ERROR:
      return state;
    default:
      return state;
  }
}

function requesting(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.OFFERS_REQUEST:
      return true;
    case ActionTypes.OFFERS_ERROR:
    case ActionTypes.OFFERS_SUCCESS:
    case ActionTypes.OFFERS_APPEND_SUCCESS:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.OFFERS_ERROR:
      return true;
    case ActionTypes.OFFERS_REQUEST:
    case ActionTypes.OFFERS_SUCCESS:
    case ActionTypes.OFFERS_APPEND_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers<IOffersStoreState, Actions>({
  list,
  requesting,
  error
});
