import { Actions, ActionTypes } from './actions';
import { IBlockPeopleModalState } from './types';


const blockPeopleModalInitial = {
  visible: false,
  type: null,
  requesting: false,
  error: false,
  success: false,
  userId: null,
  userName: ''
};


const blockPeopleModal = (state: IBlockPeopleModalState = blockPeopleModalInitial, action: Actions) => {
  switch (action.type) {
    case ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_REQUEST:
    case ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_REQUEST: {
      return {
        ...state,
        requesting: true,
        error: false,
        success: false
      };
    }
    case ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS:
    case ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS: {
      return {
        ...state,
        requesting: false,
        error: false,
        success: true
      };
    }
    case ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_ERROR:
    case ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_ERROR: {
      return {
        ...state,
        requesting: false,
        error: true,
        success: false
      };
    }
    case ActionTypes.BLOCK_PEOPLE_MODAL_VISIBILITY_CHANGE: {
      const { type, visible, userId, userName } = action.payload;

      return {
        ...state,
        type,
        visible,
        userId,
        userName
      };
    }
    case ActionTypes.BLOCK_PEOPLE_MODAL_RESET: {
      return blockPeopleModalInitial;
    }
    default: {
      return state;
    }
  }
};

export default blockPeopleModal;
