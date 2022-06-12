import {
  ILoginBlockedModalClose,
  ILoginBlockedModalOpen,
  ILoginBlockedResetValues
} from './types';

export enum ActionTypes {
  LOGIN_BLOCKED_MODAL_OPEN = '[MODALS] - Login Blocked - open',
  LOGIN_BLOCKED_MODAL_CLOSE = '[MODALS] - Login Blocked - close',
  LOGIN_BLOCKED_MODAL_RESET = '[MODALS] - Login Blocked - reset values'
}

export type Actions =
  | ILoginBlockedModalClose
  | ILoginBlockedModalOpen
  | ILoginBlockedResetValues
  ;

export const loginBlockedModalOpen = (): ILoginBlockedModalOpen => {
  return {
    type: ActionTypes.LOGIN_BLOCKED_MODAL_OPEN
  };
};

export const loginBlockedModalClose = (): ILoginBlockedModalClose => {
  return {
    type: ActionTypes.LOGIN_BLOCKED_MODAL_CLOSE
  };
};

export const loginBlockedModalReset = (): ILoginBlockedResetValues => {
  return {
    type: ActionTypes.LOGIN_BLOCKED_MODAL_RESET
  };
};
