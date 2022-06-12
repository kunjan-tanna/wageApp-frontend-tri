import {
  ICurrentUser,
  ICurrentUserStoreState,
  IDeleteAccountState
} from '../../../../modules/CurrentUser/types';
import { IAvatarUpload } from '../../../../modules/FileUpload/types';
import { IStoreState } from '../../../../store';

const currentUserPersonalDataSelector = (currentUser: ICurrentUserStoreState): ICurrentUser => {
  return currentUser.currentUser;
};

const avatarUploadSelector = (state: IStoreState): IAvatarUpload => {
  return state.fileUpload.avatar;
};

const deleteAccountSelector = (state: IStoreState): IDeleteAccountState => {
  return state.currentUser.deleteAccount;
};

const changePasswordFormDisplaySelector = (state: IStoreState): boolean => {
  return state.currentUser.editFormDisplay.changePassword;
};

const personalDataFormDisplaySelector = (state: IStoreState): boolean => {
  return state.currentUser.editFormDisplay.personalData;
};

const deleteAccountFormDisplaySelector = (state: IStoreState): boolean => {
  return state.currentUser.editFormDisplay.deleteAccount;
};

const changePasswordSuccessDisplaySelector = (state: IStoreState): boolean => {
  return state.currentUser.editFormDisplay.changePasswordSuccessMessage;
};

export {
  changePasswordFormDisplaySelector,
  personalDataFormDisplaySelector,
  deleteAccountFormDisplaySelector,
  currentUserPersonalDataSelector,
  changePasswordSuccessDisplaySelector,
  avatarUploadSelector,
  deleteAccountSelector
};
