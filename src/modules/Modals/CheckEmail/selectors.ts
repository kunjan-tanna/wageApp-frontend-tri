import { ICheckEmailState } from './types';

const checkEmailSelector = (state: any): ICheckEmailState => {
  return state.modals.CheckEmailModal;
};

export {
  checkEmailSelector
}