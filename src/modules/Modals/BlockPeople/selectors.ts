import { IStoreState } from '../../../store';
import { IBlockPeopleModalState } from './types';

const blockPeopleModalSelector = (state: IStoreState): IBlockPeopleModalState => {
  return state.modals.BlockPeople;
};

const blockPeopleModalVisibilitySelector = (state: IBlockPeopleModalState): boolean => {
  return state.visible;
};

export {
  blockPeopleModalSelector,
  blockPeopleModalVisibilitySelector
};
