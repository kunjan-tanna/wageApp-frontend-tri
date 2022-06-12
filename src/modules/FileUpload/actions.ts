import { IOfferSuccess } from '../Offer/types';
import {
  IAvatarUploadError,
  IAvatarUploadRequest,
  IAvatarUploadReset,
  IAvatarUploadSuccess,
  IOfferFormFileRemove,
  IOfferFormUploadError,
  IOfferFormUploadRequest,
  IOfferFormUploadReset,
  IOfferFormUploadSuccess, OfferFormFileRemovePayload,
  OfferFormUploadErrorPayload,
  OfferFormUploadRequestPayload,
  OfferFormUploadResponsePayload
} from './types';

export enum ActionTypes {
  OFFER_FILE_UPLOAD_REQUEST = '[FILE UPLOAD] - offer form - upload request',
  OFFER_FILE_UPLOAD_SUCCESS = '[FILE UPLOAD] - offer form - upload success',
  OFFER_FILE_UPLOAD_ERROR = '[FILE UPLOAD] - offer form - upload error',
  OFFER_FILE_UPLOAD_RESET = '[FILE UPLOAD] - offer form - reset all files',
  OFFER_FILE_REMOVE = '[FILE UPLOAD] - offer form - file remove',
  AVATAR_UPLOAD_REQUEST = '[FILE UPLOAD] - avatar - request',
  AVATAR_UPLOAD_SUCCESS = '[FILE UPLOAD] - avatar - success',
  AVATAR_UPLOAD_ERROR = '[FILE UPLOAD] - avatar - error',
  AVATAR_UPLOAD_RESET = '[FILE UPLOAD] - avatar - reset',
}

export type Actions = IOfferFormUploadRequest |
  IOfferFormUploadSuccess |
  IOfferFormUploadError |
  IOfferFormUploadReset |
  IOfferFormFileRemove |
  IAvatarUploadRequest |
  IAvatarUploadSuccess |
  IAvatarUploadError |
  IAvatarUploadReset |
  IOfferSuccess;

export const offerFormUploadRequest = (payload: OfferFormUploadRequestPayload): IOfferFormUploadRequest => {
  return {
    type: ActionTypes.OFFER_FILE_UPLOAD_REQUEST,
    payload
  };
};

export const offerFormUploadSuccess = (payload: OfferFormUploadResponsePayload): IOfferFormUploadSuccess => {
  return {
    type: ActionTypes.OFFER_FILE_UPLOAD_SUCCESS,
    payload
  };
};

export const offerFormUploadError = (payload: OfferFormUploadErrorPayload): IOfferFormUploadError => {
  return {
    type: ActionTypes.OFFER_FILE_UPLOAD_ERROR,
    payload
  };
};

export const offerFormUploadReset = (): IOfferFormUploadReset => {
  return {
    type: ActionTypes.OFFER_FILE_UPLOAD_RESET
  };
};

export const offerFormFileRemove = (payload: OfferFormFileRemovePayload): IOfferFormFileRemove => {
  return {
    type: ActionTypes.OFFER_FILE_REMOVE,
    payload
  };
};


export const avatarUploadRequest = (): IAvatarUploadRequest => {
  return {
    type: ActionTypes.AVATAR_UPLOAD_REQUEST
  };
};

export const avatarUploadSuccess = (): IAvatarUploadSuccess => {
  return {
    type: ActionTypes.AVATAR_UPLOAD_SUCCESS
  };
};

export const avatarUploadError = (): IAvatarUploadError => {
  return {
    type: ActionTypes.AVATAR_UPLOAD_ERROR
  };
};

export const avatarUploadReset = (): IAvatarUploadReset => {
  return {
    type: ActionTypes.AVATAR_UPLOAD_RESET
  };
};