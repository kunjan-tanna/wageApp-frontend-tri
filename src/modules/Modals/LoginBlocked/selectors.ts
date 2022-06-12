import { ILoginBlockedState } from './types';

const loginBlockedSelector = (state: any): ILoginBlockedState => {
  return state.modals.LoginBlockedModal;
};

export {
  loginBlockedSelector
}
