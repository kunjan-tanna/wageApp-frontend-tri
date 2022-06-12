import { combineReducers } from 'redux';
import { ActionTypes as BlockPeopleActionTypes } from '../../modules/Modals/BlockPeople/actions';
import { Actions, ActionTypes } from './actions';
import { IOfferBiddersList, IOfferBiddersStoreState } from './types';

const initialState: IOfferBiddersList = {
  list: []
};

function bidders(state: IOfferBiddersList = initialState, action: Actions): IOfferBiddersList {


  switch (action.type) {
    case ActionTypes.OFFER_BIDDERS_SUCCESS: {
      return {
        list: action.payload.bidders
      };
    }
    case ActionTypes.OFFER_BIDDERS_REQUEST:
    case ActionTypes.OFFER_BIDDERS_ERROR: {
      return state;
    }
    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS:
    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS: {

      const index = state.list.findIndex(item => item.id === action.payload.id);
      const isBlocked = action.type === BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS;

      return {
        ...state,
        list: state.list.map((item, itemIndex) => {
          if (index === itemIndex) {
            return {
              ...item,
              isBlocked,
              communicationBlocked: isBlocked
            };
          }

          return item;
        })
      };
    }
    default: {
      return state;
    }
  }
}

function requesting(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.OFFER_BIDDERS_REQUEST:
      return true;
    case ActionTypes.OFFER_BIDDERS_ERROR:
    case ActionTypes.OFFER_BIDDERS_SUCCESS:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.OFFER_BIDDERS_ERROR:
      return true;
    case ActionTypes.OFFER_BIDDERS_REQUEST:
    case ActionTypes.OFFER_BIDDERS_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers<IOfferBiddersStoreState, Actions>({
  bidders,
  requesting,
  error
});
