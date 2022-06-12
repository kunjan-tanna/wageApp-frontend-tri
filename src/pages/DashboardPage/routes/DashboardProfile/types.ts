import {
  Actions as CurrentUserActions,
  changeAvatarRequest,
  changePasswordRequest,
  changePersonalDataRequest,
  currentUserChangePersonalDataToggle,
  currentUserFormChangePasswordToggle,
  currentUserFormDeleteAccountToggle,
  currentUserFormDisplayReset,
  currentUserRequest,
  deleteAccountRequest
} from '../../../../modules/CurrentUser/actions';
import { ICurrentUser, IDeleteAccountState } from '../../../../modules/CurrentUser/types';
import {
  Actions as FileUploadActions,
  avatarUploadReset
} from '../../../../modules/FileUpload/actions';
import { IAvatarUpload } from '../../../../modules/FileUpload/types';

export interface IProps extends IExternalProps, IDispatchProps {}

export interface IExternalProps {
  currentUser: ICurrentUser;
  avatarUpload: IAvatarUpload;
  deleteAccount: IDeleteAccountState;
  changePasswordFormDisplay: boolean;
  personalDataFormDisplay: boolean;
  deleteAccountConfirmDisplay: boolean;
  changePasswordSuccessDisplay: boolean;
  currentUserRequesting: boolean;
}

export interface IDispatchProps {
  changePasswordRequest: typeof changePasswordRequest;
  changePersonalDataRequest: typeof changePersonalDataRequest;
  changeAvatarRequest: typeof changeAvatarRequest;
  deleteAccountRequest: typeof deleteAccountRequest;
  avatarUploadReset: typeof avatarUploadReset;
  currentUserRequest: typeof currentUserRequest;
  currentUserFormChangePasswordToggle: typeof currentUserFormChangePasswordToggle;
  currentUserChangePersonalDataToggle: typeof currentUserChangePersonalDataToggle;
  currentUserFormDeleteAccountToggle: typeof currentUserFormDeleteAccountToggle;
  currentUserFormDisplayReset: typeof currentUserFormDisplayReset;
}

export interface IChangeVal {
  'Change name'?: string;
  'Change email'?: string;
  'Change phone number'?: string;
  'Change zip code'?: number;
  'Change businessName'?: string;
  'Change businessAddressStreet'?: string;
  'Change businessAddressCity'?: string;
  'Change businessPhoneNumber'?: string;
  'Change businessWebAddress'?: string;
}

export type Actions = CurrentUserActions | FileUploadActions;
