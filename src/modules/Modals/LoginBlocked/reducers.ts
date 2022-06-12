import { Actions, ActionTypes } from './actions';
import { ILoginBlockedState } from './types';

const loginBlockedInitial = {
  visible: false
};

const loginBlockedModal = (state: ILoginBlockedState = loginBlockedInitial, action: Actions) => {
  switch (action.type) {
    case ActionTypes.LOGIN_BLOCKED_MODAL_OPEN: {
      return {
        ...state,
        visible: true
      };
    }
    case ActionTypes.LOGIN_BLOCKED_MODAL_CLOSE: {
      return {
        ...state,
        visible: false
      };
    }
    case ActionTypes.LOGIN_BLOCKED_MODAL_RESET: {
      return loginBlockedInitial;
    }
    default: {
      return state;
    }
  }
};

export default loginBlockedModal;
