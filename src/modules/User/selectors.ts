import {
  IUserDetails,
  IUserStoreState,
} from './types';

const isRequestingSelector = (state: IUserStoreState): boolean => {
  return state.requesting;
};

const userSelector = (state: IUserStoreState): IUserDetails => {
  const { user } = state;

  return user;
};

const isErrorSelector = (state: IUserStoreState): boolean => {
  return state.error;
};


export {
  isRequestingSelector,
  userSelector,
  isErrorSelector
};
