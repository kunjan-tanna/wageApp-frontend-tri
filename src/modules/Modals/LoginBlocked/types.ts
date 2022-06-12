import { ActionTypes } from './actions';

export interface ILoginBlockedState {
  visible: boolean;
}

export interface ILoginBlockedModalOpen {
  readonly type: ActionTypes.LOGIN_BLOCKED_MODAL_OPEN;
}

export interface ILoginBlockedModalClose {
  readonly type: ActionTypes.LOGIN_BLOCKED_MODAL_CLOSE;
}

export interface ILoginBlockedResetValues {
  readonly type: ActionTypes.LOGIN_BLOCKED_MODAL_RESET;
}
