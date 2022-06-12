import { combineReducers } from 'redux';
import generateUUID from 'uuid/v4';
import { ApiConfig } from '../../config';
import { ActionTypes as OfferActions } from '../Offer/actions';
import { Actions, ActionTypes as FileUploadActions } from './actions';
import { IAvatarUpload, IFileUploadStoreState, IOfferFormUpload } from './types';
import { IFileData } from './types';

const avatarUploadInitial: IAvatarUpload = {
  requesting: false,
  error: false
};

const offerFormInitial: IOfferFormUpload = {
  files: []
};

const offerForm = (state: IOfferFormUpload = offerFormInitial, action: Actions): IOfferFormUpload => {

  let index = -1;

  if (action.type === FileUploadActions.OFFER_FILE_UPLOAD_ERROR || action.type === FileUploadActions.OFFER_FILE_UPLOAD_SUCCESS) {
    index = state.files.findIndex(item => item.tempId === action.payload.tempId);
  }

  switch (action.type) {
    case FileUploadActions.OFFER_FILE_UPLOAD_REQUEST:
      return {
        files: [
          ...state.files, {
            tempId: action.payload.tempId,
            requesting: true,
            error: false,
            data: null
          }]
      };
    case FileUploadActions.OFFER_FILE_UPLOAD_RESET:
      return offerFormInitial;

    case FileUploadActions.OFFER_FILE_UPLOAD_ERROR:
      return {
        files: state.files.map((item, itemIndex) => {
          if (index === itemIndex) {
            return {
              ...item,
              requesting: false,
              error: true
            };
          }

          return item;
        })
      };

    case FileUploadActions.OFFER_FILE_UPLOAD_SUCCESS:
      return {
        files: state.files.map((item, itemIndex) => {
          if (index === itemIndex) {
            return {
              ...item,
              requesting: false,
              error: false,
              data: {
                ...action.payload.data,
                url: `${ApiConfig.URL}${action.payload.data.url}`
              }
            };
          }

          return item;
        })
      };

    case FileUploadActions.OFFER_FILE_REMOVE:
      return {
        files: state.files.filter(item => item.tempId !== action.payload.tempId)
      };

    case OfferActions.OFFER_SUCCESS: {
      return {
        files: action.payload.gallery.map((item: IFileData) => ({
          tempId: generateUUID(),
          requesting: false,
          error: false,
          data: { ...item, url: `${ApiConfig.URL}${item.url}` }
        }))
      };
    }

    default:
      return state;
  }
};

const avatar = (state: IAvatarUpload = avatarUploadInitial, action: Actions): IAvatarUpload => {

  switch (action.type) {
    case FileUploadActions.AVATAR_UPLOAD_REQUEST:
      return {
        error: false,
        requesting: true
      };
    case FileUploadActions.AVATAR_UPLOAD_SUCCESS:
      return {
        ...state,
        requesting: false
      };
    case FileUploadActions.AVATAR_UPLOAD_ERROR:
      return {
        error: true,
        requesting: false
      };

    case FileUploadActions.AVATAR_UPLOAD_RESET:
      return avatarUploadInitial;

    default:
      return state;
  }
};

export default combineReducers<IFileUploadStoreState, Actions>({
  offerForm,
  avatar
});
