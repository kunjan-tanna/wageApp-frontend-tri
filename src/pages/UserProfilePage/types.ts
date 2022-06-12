import { RouteComponentProps } from 'react-router';
import { ICurrentUser } from '../../modules/CurrentUser/types';
import {
  Actions as BlockPeopleActions,
  blockPeopleModalVisibilityChange
} from '../../modules/Modals/BlockPeople/actions';
import { BlockPeopleModalVisibilityChangePayload } from '../../modules/Modals/BlockPeople/types';
import { getUserRequest } from '../../modules/User/actions';
import { IUserDetails } from '../../modules/User/types';
import { Actions as UserOffersActions, userOffersRequest } from '../../modules/UserOffers/actions';
import { RequestPayload as GetUserOffersRequestPayload } from '../../modules/UserOffers/types';
import { IOffersList } from '../../types/offers';

export interface IExternalProps {
  user: IUserDetails;
  userRequesting: boolean;
  userError: boolean;
  userOffersRequesting: boolean;
  userOffersError: boolean;
  userOffers: IOffersList;
  currentUser: ICurrentUser;
}

export interface IDispatchProps {
  getUserRequest: typeof getUserRequest;
  userOffersRequest: typeof userOffersRequest;
  blockPeopleModalVisibilityChange: typeof blockPeopleModalVisibilityChange;
}

interface IMatchParams {
  userId: string;
}

export interface IProps extends IExternalProps, IDispatchProps, RouteComponentProps<IMatchParams> {}

export interface IPageProps {
  user: IUserDetails;
  userRequesting: boolean;
  userOffersRequesting: boolean;
  userOffersError: boolean;
  userOffers: IOffersList;
  accountType: string;
  currentUserId: string;
  userOffersRequest: (payload: GetUserOffersRequestPayload) => void;
  blockModalVisibilityChange: (payload: BlockPeopleModalVisibilityChangePayload) => void;
}

export type Actions = UserOffersActions | BlockPeopleActions | UserOffersActions;
