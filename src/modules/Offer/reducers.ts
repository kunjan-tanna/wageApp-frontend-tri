import { combineReducers } from 'redux';
import { ActionTypes as BlockPeopleActionTypes } from '../../modules/Modals/BlockPeople/actions';
import { AccountTypes, IGeneralState } from '../../types';
import { IOffer } from '../../types/offers';
import { Actions, ActionTypes } from './actions';
import { IOfferBidState, IOfferDetails, IOfferReportState, IOfferStoreState } from './types';

const initialState: IOfferDetails = {
  id: 0,
  description: '',
  location: {
    lat: 0,
    lng: 0,
    stateShortName: '',
    stateFullName: '',
    locality: ''
  },
  status: '',
  date: new Date(),
  title: '',
  price: 0,
  currency: 'USD',
  coverPhotoUrl: '',
  owner: {
    email: '',
    id: '',
    rating: 0,
    ratingCount: 0,
    accountType: AccountTypes.INTERNAL,
    firstName: '',
    lastName: '',
    businessName: '',
    businessAddressCity: '',
    businessAddressStreet: '',
    businessPhoneNumber: '',
    businessWebAddress: '',
    avatarUrl: '',
    communicationBlocked: false,
    isBlocked: false
  },
  ownerUserDetails: {
    id: '',
    accountType: AccountTypes.BUSINESS,
    avatarUrl: '',
    businessName: '',
    firstName: '',
    lastName: '',
    rating: 0,
    ratingCount: 0,
    verifiedBy: '',
    isBlocked: false,
    communicationBlocked: false,
    joinedDate: '',
    isDeleted: false
  },
  selectedBidder: {
    rating: 0,
    id: '0',
    accountType: AccountTypes.INTERNAL,
    firstName: '',
    lastName: '',
    businessName: '',
    businessAddressCity: '',
    businessAddressStreet: '',
    businessPhoneNumber: '',
    businessWebAddress: '',
    avatarUrl: '',
    communicationBlocked: false,
    isBlocked: false,
    conversationId: 0
  },
  gallery: [],
  numberOfBidders: 0,
  category: {
    id: 0,
    name: '',
    description: '',
    iconUrl: ''
  },
  offerType: 'gig',
  relatedOffers: [],
  userOffers: [],
  promotionType: 0,
  reportedUserIds: ''
};

function offer(state: IOfferDetails = initialState, action: Actions): IOfferDetails {
  switch (action.type) {
    case ActionTypes.OFFER_SUCCESS: {
      const { relatedOffers, userOffers, ...payload } = action.payload;

      return {
        ...payload,
        owner: {
          ...payload.owner,
          avatarUrl: payload.owner.avatarUrl
        },
        selectedBidder: {
          ...payload.selectedBidder,
          avatarUrl: payload.selectedBidder ? payload.selectedBidder.avatarUrl : ''
        },
        ownerUserDetails: {
          ...payload.ownerUserDetails,
          avatarUrl: payload.ownerUserDetails.avatarUrl
        },
        relatedOffers: relatedOffers.map((item: IOffer) => ({
          ...item,
          ownerAccountType: payload.owner.accountType,
          // @ts-ignore - @ToDo - need to be refactor - now exists type/offerType
          offerType: item.type
        })),
        userOffers: userOffers.map((item: IOffer) => ({
          ...item,
          ownerAccountType: payload.owner.accountType,
          // @ts-ignore - @ToDo - need to be refactor - now exists type/offerType
          offerType: item.type
        }))
      };
    }
    case ActionTypes.OFFER_COMPLETE_SUCCESS: {
      return {
        ...state,
        status: 'completed'
      };
    }
    case ActionTypes.OFFER_SET_STATUS_SUCCESS: {
      return {
        ...state,
        status: action.payload.status
      };
    }
    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS:
    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS: {
      const isBlocked =
        action.type === BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS;

      if (state.ownerUserDetails.id.toString() === action.payload.id) {
        return {
          ...state,
          ownerUserDetails: {
            ...state.ownerUserDetails,
            isBlocked,
            communicationBlocked: isBlocked
          }
        };
      }

      return state;
    }
    case ActionTypes.OFFER_SELECT_BIDDER: {
      return {
        ...state,
        selectedBidder: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

function requesting(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.OFFER_REQUEST:
    case ActionTypes.OFFER_COMPLETE_REQUEST:
    case ActionTypes.OFFER_SET_STATUS_REQUEST:
      return true;
    case ActionTypes.OFFER_ERROR:
    case ActionTypes.OFFER_SUCCESS:
    case ActionTypes.OFFER_COMPLETE_ERROR:
    case ActionTypes.OFFER_COMPLETE_SUCCESS:
    case ActionTypes.OFFER_SET_STATUS_ERROR:
    case ActionTypes.OFFER_SET_STATUS_SUCCESS:
      return false;
    default:
      return state;
  }
}

function error(state: boolean = false, action: Actions): boolean {
  switch (action.type) {
    case ActionTypes.OFFER_ERROR:
    case ActionTypes.OFFER_COMPLETE_ERROR:
    case ActionTypes.OFFER_SET_STATUS_ERROR:
      return true;
    case ActionTypes.OFFER_REQUEST:
    case ActionTypes.OFFER_SUCCESS:
    case ActionTypes.OFFER_COMPLETE_REQUEST:
    case ActionTypes.OFFER_COMPLETE_SUCCESS:
    case ActionTypes.OFFER_SET_STATUS_REQUEST:
    case ActionTypes.OFFER_SET_STATUS_SUCCESS:
      return false;
    default:
      return state;
  }
}

const generalInitialState: IGeneralState = {
  fetched: false,
  requesting: false,
  success: false,
  error: null
};

function complete(state: IGeneralState = generalInitialState, action: Actions): IGeneralState {
  switch (action.type) {
    case ActionTypes.OFFER_COMPLETE_REQUEST:
      return {
        ...state,
        requesting: true
      };
    case ActionTypes.OFFER_COMPLETE_SUCCESS:
      return {
        ...state,
        success: true,
        error: generalInitialState.error,
        requesting: generalInitialState.requesting,
        fetched: true
      };
    case ActionTypes.OFFER_COMPLETE_ERROR:
      return {
        ...state,
        success: generalInitialState.success,
        error: true,
        requesting: generalInitialState.requesting,
        fetched: true
      };
    default:
      return state;
  }
}

function setStatus(state: IGeneralState = generalInitialState, action: Actions): IGeneralState {
  switch (action.type) {
    case ActionTypes.OFFER_SET_STATUS_REQUEST:
      return {
        ...state,
        requesting: true
      };
    case ActionTypes.OFFER_SET_STATUS_SUCCESS:
      return {
        ...state,
        success: true,
        error: generalInitialState.error,
        requesting: generalInitialState.requesting,
        fetched: true
      };
    case ActionTypes.OFFER_COMPLETE_SUCCESS:
      return {
        ...state,
        success: true
      };
    case ActionTypes.OFFER_SET_STATUS_ERROR:
      return {
        ...state,
        success: generalInitialState.success,
        error: true,
        requesting: generalInitialState.requesting,
        fetched: true
      };
    case ActionTypes.OFFER_REQUEST:
      return generalInitialState;
    default:
      return state;
  }
}

const bidInitialState: IOfferBidState = {
  ...generalInitialState,
  responseStatus: 200
};

function bid(state: IOfferBidState = bidInitialState, action: Actions): IOfferBidState {
  switch (action.type) {
    case ActionTypes.OFFER_BID_REQUEST:
      return {
        ...state,
        requesting: true
      };
    case ActionTypes.OFFER_BID_SUCCESS:
      return {
        ...state,
        success: true,
        error: generalInitialState.error,
        requesting: generalInitialState.requesting,
        fetched: true
      };
    case ActionTypes.OFFER_BID_ERROR:
      return {
        ...state,
        success: generalInitialState.success,
        error: true,
        requesting: generalInitialState.requesting,
        fetched: true,
        responseStatus: action.payload.responseStatus
      };
    case ActionTypes.OFFER_BID_RESET:
      return bidInitialState;

    default:
      return state;
  }
}

const reportInitialState: IOfferReportState = {
  offerReportResponse: ''
};

function report(state: IOfferReportState = reportInitialState, action: Actions): IOfferReportState {
  switch (action.type) {
    case ActionTypes.OFFER_REPORT_SUCCESS: {
      return {
        ...state,
        offerReportResponse: 'success'
      };
    }
    case ActionTypes.OFFER_REPORT_ERROR: {
      return {
        ...state,
        offerReportResponse: 'error'
      };
    }
    case ActionTypes.OFFER_BID_RESET: {
      return reportInitialState;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers<IOfferStoreState, Actions>({
  offer,
  requesting,
  error,
  complete,
  setStatus,
  bid,
  report
});
