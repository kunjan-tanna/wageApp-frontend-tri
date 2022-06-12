import {
  IBlockedUser,
  IConfirmationModalState,
  ICurrentUser,
  ICurrentUserStoreState
} from './types';
import { IStoreState } from '../../store';

const isRequestingSelector = (state: ICurrentUserStoreState): boolean => {
  return state.requesting;
};

const currentUserSelector = (state: ICurrentUserStoreState): ICurrentUser => {
  const { currentUser } = state;

  return currentUser;
};

const isAuthorizedSelector = (state: ICurrentUserStoreState): boolean => {
  return state.currentUser.email !== '';
};

const blockedUsersSelector = (state: ICurrentUserStoreState): IBlockedUser[] => {
  const { blockedUsers } = state;

  if (blockedUsers.list.length > 0) {
    return blockedUsers.list.map(item => ({
      ...item,
      avatarUrl: item.avatarUrl
    }));
  }

  return [];
};

const blockedUsersErrorSelector = (state: ICurrentUserStoreState): boolean => {
  return state.blockedUsers.error;
};

const blockedUsersRequestingSelector = (state: ICurrentUserStoreState): boolean => {
  return state.blockedUsers.requesting;
};

const ownerIdSelector = (state: ICurrentUserStoreState): string => {
  return state.currentUser.id;
};

const confirmationModalSelector = (state: IStoreState): IConfirmationModalState => {
  return state.currentUser.confirmationModal;
};

export {
  isRequestingSelector,
  currentUserSelector,
  isAuthorizedSelector,
  blockedUsersSelector,
  blockedUsersErrorSelector,
  blockedUsersRequestingSelector,
  ownerIdSelector,
  confirmationModalSelector
};
