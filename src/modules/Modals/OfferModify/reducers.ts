import { ActionTypes as OfferFormActions } from '../../OfferForm/actions';
import { Actions, ActionTypes as ModalActions } from './actions';
import { IOfferModifyModalState } from './types';

const offerModifyFormInitial = {
  visible: false,
  requesting: true,
  message: '',
  error: false
};


const offerModifyForm = (state: IOfferModifyModalState = offerModifyFormInitial, action: Actions) => {
  switch (action.type) {
    case ModalActions.OFFER_MODIFY_MODAL_OPEN: {
      return {
        ...state,
        visible: true
      };
    }
    case ModalActions.OFFER_MODIFY_MODAL_SHOW_MESSAGE: {
      return {
        ...state,
        visible: true,
        requesting: false,
        message: action.payload.message
      };
    }
    case ModalActions.OFFER_MODIFY_MODAL_CLOSE: {
      return {
        ...state,
        visible: false
      };
    }
    case ModalActions.OFFER_MODIFY_MODAL_RESET: {
      return offerModifyFormInitial;
    }
    case OfferFormActions.ADD_TASK_ERROR:
    case OfferFormActions.EDIT_TASK_ERROR: {
      return {
        ...state,
        error: true
      };
    }
    default: {
      return state;
    }
  }
};

export default offerModifyForm;
