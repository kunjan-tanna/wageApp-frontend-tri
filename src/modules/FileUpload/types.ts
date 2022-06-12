import { Nullable } from '../../types';
import { ActionTypes } from './actions';


export type OfferFormUploadRequestPayload = {
  tempId: string;
  file: File;
};

export type OfferFormUploadResponsePayload = {
  tempId: string;
  data: IFileData;
};

export type OfferFormUploadErrorPayload = {
  tempId: string;
}

export type OfferFormFileRemovePayload = {
  tempId: string;
}

export interface IFileUploadStoreState {
  offerForm: IOfferFormUpload;
  avatar: IAvatarUpload
}

export interface IOfferFormUpload {
  files: ISingleFile[];
}

export interface IAvatarUpload {
  requesting: boolean
  error: boolean
}

export interface IFileData {
  id: number;
  mediaType: string;
  url: string;
}

export interface ISingleFile {
  tempId: string;
  requesting: boolean;
  error: boolean;
  data: Nullable<IFileData>;
}

export interface IOfferFormUploadRequest {
  readonly type: ActionTypes.OFFER_FILE_UPLOAD_REQUEST;
  payload: OfferFormUploadRequestPayload;
}

export interface IOfferFormUploadSuccess {
  readonly type: ActionTypes.OFFER_FILE_UPLOAD_SUCCESS;
  payload: OfferFormUploadResponsePayload;
}

export interface IOfferFormUploadError {
  readonly type: ActionTypes.OFFER_FILE_UPLOAD_ERROR;
  payload: OfferFormUploadErrorPayload;
}

export interface IOfferFormUploadReset {
  readonly type: ActionTypes.OFFER_FILE_UPLOAD_RESET;
}

export interface IOfferFormFileRemove {
  readonly type: ActionTypes.OFFER_FILE_REMOVE;
  payload: OfferFormFileRemovePayload;
}

export interface IAvatarUploadRequest {
  readonly type: ActionTypes.AVATAR_UPLOAD_REQUEST;
}

export interface IAvatarUploadSuccess {
  readonly type: ActionTypes.AVATAR_UPLOAD_SUCCESS;
}

export interface IAvatarUploadError {
  readonly type: ActionTypes.AVATAR_UPLOAD_ERROR;
}

export interface IAvatarUploadReset {
  readonly type: ActionTypes.AVATAR_UPLOAD_RESET;
}
