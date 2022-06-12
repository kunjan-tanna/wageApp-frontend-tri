import { IBlockPeopleModalState } from './BlockPeople/types';
import { ICheckEmailState } from './CheckEmail/types';
import { ILoginBlockedState } from './LoginBlocked/types';
import { IOfferModifyModalState } from './OfferModify/types';

export interface IModalsState {
  BlockPeople: IBlockPeopleModalState;
  OfferModifyForm: IOfferModifyModalState;
  CheckEmailModal: ICheckEmailState;
  LoginBlockedModal: ILoginBlockedState;
}
