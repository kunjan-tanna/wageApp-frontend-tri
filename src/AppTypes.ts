import { Actions as ChatActions, chatGetConversationsRequest } from './modules/Chat/actions';
import { ICurrentUser } from './modules/CurrentUser/types';
import { Actions as NotificationsActions, getNotificationsRequest } from './modules/Notifications/actions';
import { Actions as StatesActions, statesRequest } from './modules/States/actions';
import { IState as IStateListElement } from './modules/States/types';
import { Actions as UserPreferencesActions, setUserLocation } from './modules/UserPreferences/actions';

export interface IExternalProps {
  currentUser: ICurrentUser;
  showBlockPeopleModal: boolean;
  statesList: IStateListElement[];
}

export type Actions = ChatActions | NotificationsActions | StatesActions | UserPreferencesActions;

export interface IDispatchProps {
  getConversationsRequest: typeof chatGetConversationsRequest;
  getNotificationsRequest: typeof getNotificationsRequest;
  statesRequest: typeof statesRequest;
  setUserLocation: typeof setUserLocation;
}

export interface IProps extends IDispatchProps, IExternalProps {
}
