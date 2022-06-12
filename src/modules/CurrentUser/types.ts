import { AccountType } from '../../types';
import { IOfferBidder } from '../OfferBidders/types';
import { ActionTypes } from './actions';

export type ResponsePayload = {
  avatarUrl: string;
};

export interface ICurrentUser {
  email: string;
  isEmailConfirmed: boolean;
  id: string;
  accountType: AccountType;
  firstName: string;
  lastName: string;
  businessName: string;
  businessAddressCity: string;
  businessAddressStreet: string;
  businessPhoneNumber: string;
  businessWebAddress: string;
  verifiedBy: string;
  joinedDate: string;
  avatarUrl: string;
  rating: number;
  ratingCount: number;
  offerCount: number;
  interestedOffers: number[];
  hustleCount: number;
  communicationBlocked: boolean;
  isBlocked: boolean;
  zipCode: string;
  phoneNumber: string;
  businessLat: number;
  businessLong: number;
}

export interface IBlockedUser extends IOfferBidder {
  email: string;
  joinedDate: string;
  verifiedBy: string;
}

export interface IBlockedUsers {
  list: IBlockedUser[];
  requesting: boolean;
  error: boolean;
}

export interface IDeleteAccountState {
  requesting: boolean;
  error: boolean;
}

export interface IConfirmationModalState {
  requesting: boolean;
  error: string;
}

export interface IEditFormDisplayState {
  changePassword: boolean;
  changePasswordSuccessMessage: boolean;
  deleteAccount: boolean;
  personalData: boolean;
}

export interface ICurrentUserStoreState {
  currentUser: ICurrentUser;
  blockedUsers: IBlockedUsers;
  requesting: boolean;
  error: boolean;
  editFormDisplay: IEditFormDisplayState;
  deleteAccount: IDeleteAccountState;
  confirmationModal: IConfirmationModalState;
}

export interface ICurrentUserRequest {
  readonly type: ActionTypes.CURRENT_USER_REQUEST;
}

export interface ICurrentUserSuccess {
  readonly type: ActionTypes.CURRENT_USER_SUCCESS;
  payload: ResponsePayload;
}

export interface ICurrentUserError {
  readonly type: ActionTypes.CURRENT_USER_ERROR;
}

export interface ICurrentUserSetDefaultValues {
  readonly type: ActionTypes.CURRENT_USER_SET_DEFAULT_VALUES;
}

export interface ICurrentUserGetBlockedRequest {
  readonly type: ActionTypes.CURRENT_USER_GET_BLOCKED_REQUEST;
}

export interface ICurrentUserGetBlockedSuccess {
  readonly type: ActionTypes.CURRENT_USER_GET_BLOCKED_SUCCESS;
  payload: IBlockedUser[];
}

export interface ICurrentUserGetBlockedError {
  readonly type: ActionTypes.CURRENT_USER_GET_BLOCKED_ERROR;
}

export interface IBlockingUserResponsePayload {
  userId: string;
}

export type ICurrentUserChangePasswordRequestPayload = {
  values: ICurrentUserChangePasswordPayload;
  actions: any;
};

export interface ICurrentUserChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ICurrentUserChangePasswordRequest {
  readonly type: ActionTypes.CURRENT_USER_CHANGE_PASSWORD_REQUEST;
  payload: ICurrentUserChangePasswordRequestPayload;
}

export type ICurrentUserChangePersonalDataValues =
  | ICurrentUserChangeBusinessDataValues
  | ICurrentUserChangeInternalDataValues;

export type ICurrentUserChangePersonalDataRequestPayload = {
  values: ICurrentUserChangePersonalDataValues;
  actions: any;
};

export type ICurrentUserChangePersonalDataSuccessPayload = {
  values: ICurrentUserChangePersonalDataValues;
};

export interface ICurrentUserChangeAvatarRequest {
  readonly type: ActionTypes.CURRENT_USER_CHANGE_AVATAR_REQUEST;
  payload: ICurrentUserChangeAvatarRequestPayload;
}

export type ICurrentUserChangeAvatarRequestPayload = {
  file: File;
};

export type ICurrentUserChangeAvatarSuccessPayload = {
  avatarUrl: string;
};

export interface ICurrentUserChangeBusinessDataValues {
  email: string;
  businessName: string;
  businessAddressStreet: string;
  businessAddressCity: string;
  businessPhoneNumber: string;
  businessWebAddress: string;
  zipCode: string;
  Latitude?: string;
  Longitude?: string;
}

export interface ICurrentUserChangeInternalDataValues {
  email: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  phoneNumber: string;
}

export interface ICurrentUserChangePersonalDataRequest {
  readonly type: ActionTypes.CURRENT_USER_CHANGE_PERSONAL_DATA_REQUEST;
  payload: ICurrentUserChangePersonalDataRequestPayload;
}

export interface ICurrentUserChangePersonalDataSuccess {
  readonly type: ActionTypes.CURRENT_USER_CHANGE_PERSONAL_DATA_SUCCESS;
  payload: ICurrentUserChangePersonalDataSuccessPayload;
}

export interface ICurrentUserDeleteAccountRequest {
  readonly type: ActionTypes.CURRENT_USER_DELETE_ACCOUNT_REQUEST;
}

export interface ICurrentUserDeleteAccountSuccess {
  readonly type: ActionTypes.CURRENT_USER_DELETE_ACCOUNT_SUCCESS;
}

export interface ICurrentUserDeleteAccountError {
  readonly type: ActionTypes.CURRENT_USER_DELETE_ACCOUNT_ERROR;
}

export interface ICurrentUserChangeAvatarRequest {
  readonly type: ActionTypes.CURRENT_USER_CHANGE_AVATAR_REQUEST;
  payload: ICurrentUserChangeAvatarRequestPayload;
}

export interface ICurrentUserChangeAvatarSuccess {
  readonly type: ActionTypes.CURRENT_USER_CHANGE_AVATAR_SUCCESS;
  payload: ICurrentUserChangeAvatarSuccessPayload;
}

export interface ICurrentUserFormChangePasswordToggle {
  readonly type: ActionTypes.CURRENT_USER_FORM_CHANGE_PASSWORD_TOGGLE;
}

export interface ICurrentUserFormDeleteAccountToggle {
  readonly type: ActionTypes.CURRENT_USER_FORM_DELETE_ACCOUNT_TOGGLE;
}

export interface ICurrentUserChangePersonalDataToggle {
  readonly type: ActionTypes.CURRENT_USER_FORM_CHANGE_PERSONAL_DATA_TOGGLE;
}

export interface ICurrentUserChangePasswordSuccessMessage {
  readonly type: ActionTypes.CURRENT_USER_FORM_CHANGE_PASSWORD_SUCCESS_MESSAGE;
}

export interface ICurrentUserFormDisplayReset {
  readonly type: ActionTypes.CURRENT_USER_FORM_FORM_DISPLAY_RESET;
}

export interface IConfirmationModalRequestPayload {
  params: string;
}

export interface IConfirmationRequestData {
  token: string;
  userId: string;
}

export interface ICurrentUserAccountConfirmationRequest {
  readonly type: ActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_REQUEST;
  payload: IConfirmationModalRequestPayload;
}

export interface ICurrentUserAccountConfirmationSuccess {
  readonly type: ActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_SUCCESS;
}

export interface ICurrentUserAccountConfirmationError {
  readonly type: ActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_ERROR;
  payload: string;
}

export interface ICurrentUserEmailConfirmationRequest {
  readonly type: ActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_REQUEST;
  payload: IConfirmationModalRequestPayload;
}

export interface ICurrentUserEmailConfirmationSuccess {
  readonly type: ActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_SUCCESS;
}

export interface ICurrentUserEmailConfirmationError {
  readonly type: ActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_ERROR;
  payload: string;
}

export interface ICurrentUserRevokeEmailRequest {
  readonly type: ActionTypes.CURRENT_USER_REVOKE_EMAIL_REQUEST;
  payload: IConfirmationModalRequestPayload;
}

export interface ICurrentUserRevokeEmailSuccess {
  readonly type: ActionTypes.CURRENT_USER_REVOKE_EMAIL_SUCCESS;
}

export interface ICurrentUserRevokeEmailError {
  readonly type: ActionTypes.CURRENT_USER_REVOKE_EMAIL_ERROR;
  payload: string;
}
