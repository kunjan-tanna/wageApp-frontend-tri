import { Actions as CurrentUserActions, currentUserGetBlockedRequest } from '../../../../modules/CurrentUser/actions';
import { IBlockedUser } from '../../../../modules/CurrentUser/types';
import {
  Actions as BlockPeopleActions,
  blockPeopleModalVisibilityChange
} from '../../../../modules/Modals/BlockPeople/actions';

export interface IProps extends IDispatchProps {
  blockedUsers: IBlockedUser[];
  error: boolean;
}

export interface IDispatchProps {
  currentUserGetBlockedRequest: typeof currentUserGetBlockedRequest;
  blockPeopleModalVisibilityChange: typeof blockPeopleModalVisibilityChange;
}

export interface IExternalProps {
  blockedUsers: IBlockedUser[];
  error: boolean;
}

export type Actions = CurrentUserActions | BlockPeopleActions;