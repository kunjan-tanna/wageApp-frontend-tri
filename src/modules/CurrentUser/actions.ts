import {
  IBlockPeopleModalBlockUserSuccess,
  IBlockPeopleModalUnblockUserSuccess
} from '../Modals/BlockPeople/types';
import { IOfferBidSuccess } from '../Offer/types';
import {
  IBlockedUser,
  IConfirmationModalRequestPayload,
  ICurrentUserAccountConfirmationError,
  ICurrentUserAccountConfirmationRequest,
  ICurrentUserAccountConfirmationSuccess,
  ICurrentUserChangeAvatarRequest,
  ICurrentUserChangeAvatarRequestPayload,
  ICurrentUserChangeAvatarSuccess,
  ICurrentUserChangePasswordRequest,
  ICurrentUserChangePasswordRequestPayload,
  ICurrentUserChangePasswordSuccessMessage,
  ICurrentUserChangePersonalDataRequest,
  ICurrentUserChangePersonalDataRequestPayload,
  ICurrentUserChangePersonalDataSuccess,
  ICurrentUserChangePersonalDataSuccessPayload,
  ICurrentUserChangePersonalDataToggle,
  ICurrentUserDeleteAccountError,
  ICurrentUserDeleteAccountRequest,
  ICurrentUserDeleteAccountSuccess,
  ICurrentUserEmailConfirmationError,
  ICurrentUserEmailConfirmationRequest,
  ICurrentUserEmailConfirmationSuccess,
  ICurrentUserError,
  ICurrentUserFormChangePasswordToggle,
  ICurrentUserFormDeleteAccountToggle,
  ICurrentUserFormDisplayReset,
  ICurrentUserGetBlockedError,
  ICurrentUserGetBlockedRequest,
  ICurrentUserGetBlockedSuccess,
  ICurrentUserRequest,
  ICurrentUserRevokeEmailError,
  ICurrentUserRevokeEmailRequest,
  ICurrentUserRevokeEmailSuccess,
  ICurrentUserSetDefaultValues,
  ICurrentUserSuccess,
  ResponsePayload
} from './types';

export enum ActionTypes {
  CURRENT_USER_REQUEST = '[CURRENT USER] - get data - request',
  CURRENT_USER_SUCCESS = '[CURRENT USER] - get data - success',
  CURRENT_USER_ERROR = '[CURRENT USER] - get data - error',
  CURRENT_USER_SET_DEFAULT_VALUES = '[CURRENT USER] - set default values',
  CURRENT_USER_GET_BLOCKED_REQUEST = '[CURRENT USER] - get blocked - request',
  CURRENT_USER_GET_BLOCKED_SUCCESS = '[CURRENT USER] - get blocked - success',
  CURRENT_USER_GET_BLOCKED_ERROR = '[CURRENT USER] - get blocked - error',
  CURRENT_USER_CHANGE_PASSWORD_REQUEST = '[CURRENT USER] - change password - request',
  CURRENT_USER_CHANGE_PERSONAL_DATA_REQUEST = '[CURRENT USER] - change personal data - request',
  CURRENT_USER_CHANGE_PERSONAL_DATA_SUCCESS = '[CURRENT USER] - change personal data - success',
  CURRENT_USER_DELETE_ACCOUNT_REQUEST = '[CURRENT USER] - delete account - request',
  CURRENT_USER_DELETE_ACCOUNT_SUCCESS = '[CURRENT USER] - delete account - success',
  CURRENT_USER_DELETE_ACCOUNT_ERROR = '[CURRENT USER] - delete account - error',
  CURRENT_USER_CHANGE_AVATAR_REQUEST = '[CURRENT USER] - change avatar - request',
  CURRENT_USER_CHANGE_AVATAR_SUCCESS = '[CURRENT USER] - change avatar - success',
  CURRENT_USER_FORM_CHANGE_PASSWORD_TOGGLE = '[CURRENT USER] - display change password form - toggle',
  CURRENT_USER_FORM_DELETE_ACCOUNT_TOGGLE = '[CURRENT USER] - display delete account form - toggle',
  CURRENT_USER_FORM_CHANGE_PERSONAL_DATA_TOGGLE = '[CURRENT USER] - change personal data form - toggle',
  CURRENT_USER_FORM_CHANGE_PASSWORD_SUCCESS_MESSAGE = '[CURRENT USER] - change password form - success message',
  CURRENT_USER_FORM_FORM_DISPLAY_RESET = '[CURRENT USER] - display form - reset',
  CURRENT_USER_ACCOUNT_CONFIRMATION_REQUEST = '[CURRENT USER] - account confirmation - request',
  CURRENT_USER_ACCOUNT_CONFIRMATION_SUCCESS = '[CURRENT USER] - account confirmation - success',
  CURRENT_USER_ACCOUNT_CONFIRMATION_ERROR = '[CURRENT USER] - account confirmation - error',
  CURRENT_USER_EMAIL_CONFIRMATION_REQUEST = '[CURRENT USER] - email confirmation - request',
  CURRENT_USER_EMAIL_CONFIRMATION_SUCCESS = '[CURRENT USER] - email confirmation - success',
  CURRENT_USER_EMAIL_CONFIRMATION_ERROR = '[CURRENT USER] - email confirmation - error',
  CURRENT_USER_REVOKE_EMAIL_REQUEST = '[CURRENT USER] - revoke email - request',
  CURRENT_USER_REVOKE_EMAIL_SUCCESS = '[CURRENT USER] - revoke email - success',
  CURRENT_USER_REVOKE_EMAIL_ERROR = '[CURRENT USER] - revoke email - error'
}

export type Actions =
  | ICurrentUserRequest
  | ICurrentUserSuccess
  | ICurrentUserError
  | ICurrentUserSetDefaultValues
  | ICurrentUserGetBlockedRequest
  | ICurrentUserGetBlockedSuccess
  | ICurrentUserGetBlockedError
  | ICurrentUserChangePasswordRequest
  | ICurrentUserChangePersonalDataRequest
  | ICurrentUserChangePersonalDataSuccess
  | ICurrentUserChangeAvatarRequest
  | ICurrentUserChangeAvatarSuccess
  | ICurrentUserDeleteAccountRequest
  | ICurrentUserDeleteAccountSuccess
  | ICurrentUserDeleteAccountError
  | ICurrentUserFormChangePasswordToggle
  | ICurrentUserFormDeleteAccountToggle
  | ICurrentUserChangePersonalDataToggle
  | ICurrentUserChangePasswordSuccessMessage
  | ICurrentUserFormDisplayReset
  | IOfferBidSuccess
  | IBlockPeopleModalBlockUserSuccess
  | IBlockPeopleModalUnblockUserSuccess
  | ICurrentUserAccountConfirmationSuccess
  | ICurrentUserAccountConfirmationError
  | ICurrentUserAccountConfirmationRequest
  | ICurrentUserEmailConfirmationRequest
  | ICurrentUserEmailConfirmationSuccess
  | ICurrentUserEmailConfirmationError
  | ICurrentUserRevokeEmailRequest
  | ICurrentUserRevokeEmailSuccess
  | ICurrentUserRevokeEmailError;

export const currentUserRequest = (): ICurrentUserRequest => {
  return {
    type: ActionTypes.CURRENT_USER_REQUEST
  };
};

export const currentUserSuccess = (payload: ResponsePayload): ICurrentUserSuccess => {
  return {
    type: ActionTypes.CURRENT_USER_SUCCESS,
    payload
  };
};

export const currentUserError = (): ICurrentUserError => {
  return {
    type: ActionTypes.CURRENT_USER_ERROR
  };
};

export const currentUserSetDefaultValues = (): ICurrentUserSetDefaultValues => {
  return {
    type: ActionTypes.CURRENT_USER_SET_DEFAULT_VALUES
  };
};

export const currentUserGetBlockedRequest = (): ICurrentUserGetBlockedRequest => {
  return {
    type: ActionTypes.CURRENT_USER_GET_BLOCKED_REQUEST
  };
};

export const currentUserGetBlockedSuccess = (
  payload: IBlockedUser[]
): ICurrentUserGetBlockedSuccess => {
  return {
    type: ActionTypes.CURRENT_USER_GET_BLOCKED_SUCCESS,
    payload
  };
};

export const currentUserGetBlockedError = (): ICurrentUserGetBlockedError => {
  return {
    type: ActionTypes.CURRENT_USER_GET_BLOCKED_ERROR
  };
};

export function changePasswordRequest(
  payload: ICurrentUserChangePasswordRequestPayload
): ICurrentUserChangePasswordRequest {
  return {
    type: ActionTypes.CURRENT_USER_CHANGE_PASSWORD_REQUEST,
    payload
  };
}

export function changePersonalDataRequest(
  payload: ICurrentUserChangePersonalDataRequestPayload
): ICurrentUserChangePersonalDataRequest {
  return {
    type: ActionTypes.CURRENT_USER_CHANGE_PERSONAL_DATA_REQUEST,
    payload
  };
}

export const currentUserChangePersonalDataSuccess = (
  payload: ICurrentUserChangePersonalDataSuccessPayload
): ICurrentUserChangePersonalDataSuccess => {
  return {
    type: ActionTypes.CURRENT_USER_CHANGE_PERSONAL_DATA_SUCCESS,
    payload
  };
};

export const currentUserChangeAvatarRequest = (
  payload: ICurrentUserChangeAvatarRequestPayload
): ICurrentUserChangeAvatarRequest => {
  return {
    type: ActionTypes.CURRENT_USER_CHANGE_AVATAR_REQUEST,
    payload
  };
};

export const changeAvatarRequest = (
  payload: ICurrentUserChangeAvatarRequestPayload
): ICurrentUserChangeAvatarRequest => {
  return {
    type: ActionTypes.CURRENT_USER_CHANGE_AVATAR_REQUEST,
    payload
  };
};

export const currentUserChangeAvatarSuccess = (
  avatarUrl: string
): ICurrentUserChangeAvatarSuccess => {
  return {
    type: ActionTypes.CURRENT_USER_CHANGE_AVATAR_SUCCESS,
    payload: { avatarUrl }
  };
};

export const deleteAccountRequest = (): ICurrentUserDeleteAccountRequest => {
  return {
    type: ActionTypes.CURRENT_USER_DELETE_ACCOUNT_REQUEST
  };
};

export const deleteAccountSuccess = (): ICurrentUserDeleteAccountSuccess => {
  return {
    type: ActionTypes.CURRENT_USER_DELETE_ACCOUNT_SUCCESS
  };
};

export const currentUserDeleteAccountError = (): ICurrentUserDeleteAccountError => {
  return {
    type: ActionTypes.CURRENT_USER_DELETE_ACCOUNT_ERROR
  };
};

export const currentUserFormChangePasswordToggle = (): ICurrentUserFormChangePasswordToggle => {
  return {
    type: ActionTypes.CURRENT_USER_FORM_CHANGE_PASSWORD_TOGGLE
  };
};

export const currentUserChangePersonalDataToggle = (): ICurrentUserChangePersonalDataToggle => {
  return {
    type: ActionTypes.CURRENT_USER_FORM_CHANGE_PERSONAL_DATA_TOGGLE
  };
};

export const currentUserFormDeleteAccountToggle = (): ICurrentUserFormDeleteAccountToggle => {
  return {
    type: ActionTypes.CURRENT_USER_FORM_DELETE_ACCOUNT_TOGGLE
  };
};

export const currentUserChangePasswordSuccessMessage = (): ICurrentUserChangePasswordSuccessMessage => {
  return {
    type: ActionTypes.CURRENT_USER_FORM_CHANGE_PASSWORD_SUCCESS_MESSAGE
  };
};

export const currentUserFormDisplayReset = (): ICurrentUserFormDisplayReset => {
  return {
    type: ActionTypes.CURRENT_USER_FORM_FORM_DISPLAY_RESET
  };
};

export const accountConfirmationRequest = (
  payload: IConfirmationModalRequestPayload
): ICurrentUserAccountConfirmationRequest => {
  return {
    type: ActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_REQUEST,
    payload
  };
};

export const accountConfirmationSuccess = (): ICurrentUserAccountConfirmationSuccess => {
  return {
    type: ActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_SUCCESS
  };
};

export const accountConfirmationError = (payload: string): ICurrentUserAccountConfirmationError => {
  return {
    type: ActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_ERROR,
    payload
  };
};

export const emailConfirmationRequest = (
  payload: IConfirmationModalRequestPayload
): ICurrentUserEmailConfirmationRequest => {
  return {
    type: ActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_REQUEST,
    payload
  };
};

export const emailConfirmationSuccess = (): ICurrentUserEmailConfirmationSuccess => {
  return {
    type: ActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_SUCCESS
  };
};

export const emailConfirmationError = (payload: string): ICurrentUserEmailConfirmationError => {
  return {
    type: ActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_ERROR,
    payload
  };
};

export const revokeEmailRequest = (
  payload: IConfirmationModalRequestPayload
): ICurrentUserRevokeEmailRequest => {
  return {
    type: ActionTypes.CURRENT_USER_REVOKE_EMAIL_REQUEST,
    payload
  };
};

export const revokeEmailSuccess = (): ICurrentUserRevokeEmailSuccess => {
  return {
    type: ActionTypes.CURRENT_USER_REVOKE_EMAIL_SUCCESS
  };
};

export const revokeEmailError = (payload: string): ICurrentUserRevokeEmailError => {
  return {
    type: ActionTypes.CURRENT_USER_REVOKE_EMAIL_ERROR,
    payload
  };
};
