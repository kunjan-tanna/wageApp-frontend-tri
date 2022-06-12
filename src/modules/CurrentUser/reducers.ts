import { combineReducers } from 'redux';

import { ActionTypes as BlockPeopleActionTypes } from '../../modules/Modals/BlockPeople/actions';
import { ActionTypes as OfferActionTypes } from '../../modules/Offer/actions';
import { AccountTypes } from '../../types';
import { Actions, ActionTypes as CurrentUserActionTypes } from './actions';
import {
  IBlockedUsers,
  IConfirmationModalState,
  ICurrentUser,
  ICurrentUserChangeBusinessDataValues,
  ICurrentUserChangeInternalDataValues,
  ICurrentUserStoreState,
  IDeleteAccountState,
  IEditFormDisplayState
} from './types';

const currentUserInitial: ICurrentUser = {
  email: '',
  isEmailConfirmed: false,
  id: '0',
  accountType: AccountTypes.INTERNAL,
  firstName: '',
  lastName: '',
  businessName: '',
  businessAddressCity: '',
  businessAddressStreet: '',
  businessPhoneNumber: '',
  businessWebAddress: '',
  joinedDate: '',
  verifiedBy: 'Email',
  avatarUrl: '',
  rating: 0,
  ratingCount: 0,
  offerCount: 0,
  hustleCount: 0,
  communicationBlocked: false,
  isBlocked: false,
  interestedOffers: [],
  zipCode: '',
  phoneNumber: '',
  businessLat: 0,
  businessLong: 0
};

const blockedUsersInitial: IBlockedUsers = {
  list: [],
  requesting: false,
  error: false
};

const deleteAccountInitial: IDeleteAccountState = {
  requesting: false,
  error: false
};

const accountConfirmationInitial: IConfirmationModalState = {
  requesting: true,
  error: ''
};

const editFormDisplayInitial: IEditFormDisplayState = {
  changePassword: false,
  deleteAccount: false,
  personalData: false,
  changePasswordSuccessMessage: false
};

const currentUser = (state: ICurrentUser = currentUserInitial, action: Actions): ICurrentUser => {
  switch (action.type) {
    case CurrentUserActionTypes.CURRENT_USER_SUCCESS:
      // @ts-ignore
      return {
        ...state,
        ...action.payload,
        avatarUrl: action.payload.avatarUrl
      };
    case CurrentUserActionTypes.CURRENT_USER_SET_DEFAULT_VALUES: {
      return {
        ...currentUserInitial
      };
    }

    case OfferActionTypes.OFFER_BID_SUCCESS: {
      if (!state.interestedOffers.find(item => item === action.payload.offerId)) {
        return {
          ...state,
          interestedOffers: [...state.interestedOffers, action.payload.offerId]
        };
      }
      return state;
    }

    case CurrentUserActionTypes.CURRENT_USER_CHANGE_PERSONAL_DATA_SUCCESS: {
      let values;
      if (state.accountType === AccountTypes.BUSINESS) {
        values = action.payload.values as ICurrentUserChangeBusinessDataValues;

        return {
          ...state,
          email: action.payload.values.email,
          businessName: values.businessName,
          businessAddressStreet: values.businessAddressStreet,
          businessAddressCity: values.businessAddressCity,
          businessPhoneNumber: values.businessPhoneNumber,
          businessWebAddress: values.businessWebAddress,
          zipCode: values.zipCode
        };
      } else {
        values = action.payload.values as ICurrentUserChangeInternalDataValues;

        return {
          ...state,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          zipCode: values.zipCode,
          phoneNumber: values.phoneNumber
        };
      }
    }

    case CurrentUserActionTypes.CURRENT_USER_CHANGE_AVATAR_SUCCESS: {
      return {
        ...state,
        avatarUrl: action.payload.avatarUrl
      };
    }

    default: {
      return state;
    }
  }
};

const blockedUsers = (state: IBlockedUsers = blockedUsersInitial, action: Actions) => {
  switch (action.type) {
    case CurrentUserActionTypes.CURRENT_USER_GET_BLOCKED_REQUEST:
      return {
        ...state,
        requesting: true
      };
    case CurrentUserActionTypes.CURRENT_USER_GET_BLOCKED_SUCCESS:
      return {
        list: action.payload,
        requesting: false,
        error: false
      };
    case CurrentUserActionTypes.CURRENT_USER_GET_BLOCKED_ERROR:
      return {
        ...state,
        requesting: false,
        error: true
      };
    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS:
      if (!state.list.find(item => item.id === action.payload.id)) {
        return {
          ...state,
          list: [
            ...state.list,
            {
              ...action.payload
            }
          ]
        };
      }

      return state;

    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

const requesting = (state: boolean = false, action: Actions): boolean => {
  switch (action.type) {
    case CurrentUserActionTypes.CURRENT_USER_REQUEST:
      return true;
    case CurrentUserActionTypes.CURRENT_USER_ERROR:
    case CurrentUserActionTypes.CURRENT_USER_SUCCESS:
      return false;
    default:
      return state;
  }
};

const error = (state: boolean = false, action: Actions): boolean => {
  switch (action.type) {
    case CurrentUserActionTypes.CURRENT_USER_ERROR:
      return true;
    case CurrentUserActionTypes.CURRENT_USER_REQUEST:
    case CurrentUserActionTypes.CURRENT_USER_SUCCESS:
      return false;
    default:
      return state;
  }
};

const deleteAccount = (
  state: IDeleteAccountState = deleteAccountInitial,
  action: Actions
): IDeleteAccountState => {
  switch (action.type) {
    case CurrentUserActionTypes.CURRENT_USER_DELETE_ACCOUNT_REQUEST:
      return { ...state, requesting: true };
    case CurrentUserActionTypes.CURRENT_USER_DELETE_ACCOUNT_SUCCESS:
      return { ...state, requesting: false };
    case CurrentUserActionTypes.CURRENT_USER_DELETE_ACCOUNT_ERROR:
      return { ...state, error: true, requesting: false };
    case CurrentUserActionTypes.CURRENT_USER_SET_DEFAULT_VALUES:
      return deleteAccountInitial;
    default:
      return state;
  }
};

const confirmationModal = (
  state: IConfirmationModalState = accountConfirmationInitial,
  action: Actions
): IConfirmationModalState => {
  switch (action.type) {
    case CurrentUserActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_REQUEST:
    case CurrentUserActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_REQUEST:
    case CurrentUserActionTypes.CURRENT_USER_REVOKE_EMAIL_REQUEST:
      return { ...state, requesting: true };
    case CurrentUserActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_SUCCESS:
    case CurrentUserActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_SUCCESS:
    case CurrentUserActionTypes.CURRENT_USER_REVOKE_EMAIL_SUCCESS:
      return { ...state, requesting: false, error: '' };
    case CurrentUserActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_ERROR:
    case CurrentUserActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_ERROR:
    case CurrentUserActionTypes.CURRENT_USER_REVOKE_EMAIL_ERROR:
      return { ...state, requesting: false, error: action.payload };
    case CurrentUserActionTypes.CURRENT_USER_SET_DEFAULT_VALUES:
      return accountConfirmationInitial;
    default:
      return state;
  }
};

const editFormDisplay = (
  state: IEditFormDisplayState = editFormDisplayInitial,
  action: Actions
): IEditFormDisplayState => {
  switch (action.type) {
    case CurrentUserActionTypes.CURRENT_USER_FORM_CHANGE_PASSWORD_TOGGLE:
      return state.changePassword
        ? { ...state, changePassword: false }
        : {
            changePasswordSuccessMessage: false,
            deleteAccount: false,
            personalData: false,
            changePassword: true
          };
    case CurrentUserActionTypes.CURRENT_USER_FORM_CHANGE_PERSONAL_DATA_TOGGLE:
      return state.personalData
        ? { ...state, personalData: false }
        : {
            changePasswordSuccessMessage: false,
            deleteAccount: false,
            personalData: true,
            changePassword: false
          };
    case CurrentUserActionTypes.CURRENT_USER_FORM_DELETE_ACCOUNT_TOGGLE:
      return state.deleteAccount
        ? { ...state, deleteAccount: false }
        : {
            changePasswordSuccessMessage: false,
            deleteAccount: true,
            personalData: false,
            changePassword: false
          };
    case CurrentUserActionTypes.CURRENT_USER_FORM_CHANGE_PASSWORD_SUCCESS_MESSAGE:
      return { ...state, changePasswordSuccessMessage: true };
    case CurrentUserActionTypes.CURRENT_USER_FORM_FORM_DISPLAY_RESET:
      return editFormDisplayInitial;
    default:
      return state;
  }
};

export default combineReducers<ICurrentUserStoreState, Actions>({
  currentUser,
  blockedUsers,
  editFormDisplay,
  requesting,
  error,
  deleteAccount,
  confirmationModal
});
