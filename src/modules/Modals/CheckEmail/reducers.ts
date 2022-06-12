import { Actions, ActionTypes } from './actions';
import { ICheckEmailState } from './types';

const checkEmailModalInitial = {
  visible: false,
  userEmail: ''
};

const checkEmailModal = (state: ICheckEmailState = checkEmailModalInitial, action: Actions) => {
  switch (action.type) {
    case ActionTypes.CHECK_EMAIL_MODAL_OPEN: {
      return {
        ...state,
        visible: true,
        userEmail: action.payload.userEmail
      }
    }
    case ActionTypes.CHECK_EMAIL_MODAL_CLOSE: {
      return {
        ...state,
        visible: false
      }
    }
    case ActionTypes.CHECK_EMAIL_MODAL_RESEND: {
      return {
        ...state,
        visible: false
      }
    }
    case ActionTypes.CHECK_EMAIL_MODAL_RESET: {
      return checkEmailModalInitial
    }
    default: {
      return state;
    }
  }
};

export default checkEmailModal;
