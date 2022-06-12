import { AccountType, IGalleryItem, IGeneralState, ILocation, Nullable } from '../../types';
import { IOffer, OfferStatus, OfferType } from '../../types/offers';
import { IUserDetails } from '../User/types';

import { IOfferBidder } from '../OfferBidders/types';
import { ActionTypes } from './actions';

export type OfferRequestPayload = {
  offerId: string;
};

export type OfferResponsePayload = any;

export type OfferCompleteRequestPayload = {
  offerId: number;
  bidderId: string;
  rating: number;
  ratingCount: number;
  reason: string;
};

export type OfferCompleteResponsePayload = any;

export type OfferSetStatusRequestPayload = {
  offerId: number;
  status: OfferStatus;
  workerId?: string;
};

export type OfferSetStatusSuccessPayload = {
  status: OfferStatus;
};

export type OfferSetStatusResponsePayload = any;

export type OfferBidRequestPayload = {
  offerId: number;
  message: string;
};

export type OfferBidResponsePayload = any;

export type OfferReportResponsePayload = any;

export interface IOfferDetails {
  id: number;
  description: string;
  location: ILocation;
  status: string;
  date: Date;
  title: string;
  price: number;
  currency: string;
  coverPhotoUrl: Nullable<string>;
  owner: {
    email: string;
    id: string;
    accountType: AccountType;
    firstName: string;
    lastName: string;
    businessName: string;
    businessAddressCity: string;
    businessAddressStreet: string;
    businessPhoneNumber: string;
    businessWebAddress: string;
    avatarUrl: string;
    communicationBlocked: boolean;
    isBlocked: boolean;
    rating: number;
    ratingCount: number;
  };
  relatedOffers: IOffer[];
  userOffers: IOffer[];
  ownerUserDetails: IUserDetails;
  selectedBidder: {
    rating: number;
    id: string;
    accountType: AccountType;
    firstName: string;
    lastName: string;
    businessName: string;
    businessAddressCity: string;
    businessAddressStreet: string;
    businessPhoneNumber: string;
    businessWebAddress: string;
    avatarUrl: string;
    communicationBlocked: boolean;
    isBlocked: boolean;
    conversationId: number;
  };
  gallery: IGalleryItem[];
  numberOfBidders: number;
  category: {
    id: number;
    name: string;
    description: string;
    iconUrl: string;
  };
  offerType: OfferType;
  promotionType: number;
  map_types?: any;
  reportedUserIds: string;
}

export interface IOfferStoreState {
  offer: IOfferDetails;
  requesting: boolean;
  error: boolean;
  setStatus: IGeneralState;
  complete: IGeneralState;
  bid: IOfferBidState;
  report: IOfferReportState;
}

export interface IOfferRequest {
  readonly type: ActionTypes.OFFER_REQUEST;
  payload: OfferRequestPayload;
}

export interface IOfferSuccess {
  readonly type: ActionTypes.OFFER_SUCCESS;
  payload: OfferResponsePayload;
}

export interface IOfferError {
  readonly type: ActionTypes.OFFER_ERROR;
}

export interface IOfferCompleteRequest {
  readonly type: ActionTypes.OFFER_COMPLETE_REQUEST;
  payload: OfferCompleteRequestPayload;
}

export interface IOfferCompleteSuccess {
  readonly type: ActionTypes.OFFER_COMPLETE_SUCCESS;
}

export interface IOfferCompleteError {
  readonly type: ActionTypes.OFFER_COMPLETE_ERROR;
}

export interface IOfferSetStatusRequest {
  readonly type: ActionTypes.OFFER_SET_STATUS_REQUEST;
  payload: OfferSetStatusRequestPayload;
}

export interface IOfferSetStatusSuccess {
  readonly type: ActionTypes.OFFER_SET_STATUS_SUCCESS;
  payload: OfferSetStatusSuccessPayload;
}

export interface IOfferSetStatusError {
  readonly type: ActionTypes.OFFER_SET_STATUS_ERROR;
}

export interface IOfferBidState extends IGeneralState {
  responseStatus: number;
}

export interface IOfferBidRequest {
  readonly type: ActionTypes.OFFER_BID_REQUEST;
  payload: OfferBidRequestPayload;
}

export interface IOfferBidSuccess {
  readonly type: ActionTypes.OFFER_BID_SUCCESS;
  payload: OfferBidRequestPayload;
}

export interface IOfferBidError {
  readonly type: ActionTypes.OFFER_BID_ERROR;
  payload: OfferBidErrorPayload;
}

export interface OfferBidErrorPayload {
  responseStatus: number;
}

export interface IOfferBidReset {
  readonly type: ActionTypes.OFFER_BID_RESET;
}

export interface IOfferSelectBidder {
  readonly type: ActionTypes.OFFER_SELECT_BIDDER;
  payload: IOfferBidder;
}

export interface IOfferReportState {
  offerReportResponse: string;
}

export interface IOfferReport {
  readonly type: ActionTypes.OFFER_REPORT;
  payload: IOfferReportPayload;
}

export interface IOfferReportPayload {
  offerId: number;
}

export interface IOfferRequestPayload {
  offerId: number;
}

export interface IOfferReportSuccess {
  readonly type: ActionTypes.OFFER_REPORT_SUCCESS;
}

export interface IOfferReportError {
  readonly type: ActionTypes.OFFER_REPORT_ERROR;
}

export interface IOfferSendMailPayload {
  offerId: number;
}

export type OfferGetOwnerEmailResponse = {
  userEmail: string;
};

export interface IOfferSendMail {
  readonly type: ActionTypes.OFFER_SEND_MAIL;
  payload: IOfferSendMailPayload;
}

export interface IOfferSendMailSuccess {
  readonly type: ActionTypes.OFFER_SEND_MAIL_SUCCESS;
}

export interface IOfferSendMailError {
  readonly type: ActionTypes.OFFER_SEND_MAIL_ERROR;
}
