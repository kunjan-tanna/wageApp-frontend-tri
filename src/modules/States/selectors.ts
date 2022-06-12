import { IState, IStatesState } from './types';

const statesListSelector = (state: IStatesState): IState[] => {
  return state.list;
};

export { statesListSelector };
