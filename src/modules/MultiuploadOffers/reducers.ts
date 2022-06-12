import { Actions, ActionTypes } from './actions';
import { IMultiOffersState } from './types';

const initialState: IMultiOffersState = {
  errorMessage: '',
  requesting: false,
  success: false
};

function multiOffers(state: IMultiOffersState = initialState, action: Actions): IMultiOffersState {
  switch (action.type) {
    case ActionTypes.MULTI_OFFER_REQUEST: {
      return {
        ...state,
        requesting: true,
        errorMessage: '',
        success: false
      };
    }
    case ActionTypes.MULTI_OFFER_REQUEST_ERROR: {
      return {
        ...state,
        requesting: false,
        errorMessage: action.payload,
        success: false
      };
    }
    case ActionTypes.MULTI_OFFER_REQUEST_SUCCESS: {
      return {
        ...state,
        requesting: false,
        errorMessage: '',
        success: true
      };
    }
    case ActionTypes.MULTI_OFFER_REQUEST_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default multiOffers;
