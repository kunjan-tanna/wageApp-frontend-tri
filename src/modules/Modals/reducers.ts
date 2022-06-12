import { combineReducers } from 'redux';

import { Actions as BlockPeopleActions } from './BlockPeople/actions';
import BlockPeople from './BlockPeople/reducers';
import { Actions as CheckEmailActions } from './CheckEmail/actions';
import CheckEmailModal from './CheckEmail/reducers';
import { Actions as LoginBlockedActions } from './LoginBlocked/actions';
import LoginBlockedModal from './LoginBlocked/reducers'
import { Actions as OfferModifyActions } from './OfferModify/actions';
import OfferModifyForm from './OfferModify/reducers';
import { IModalsState } from './types';

type Actions =
  BlockPeopleActions &
  CheckEmailActions &
  LoginBlockedActions &
  OfferModifyActions;

export default combineReducers<IModalsState, Actions>({
  BlockPeople,
  CheckEmailModal,
  OfferModifyForm,
  LoginBlockedModal
});
