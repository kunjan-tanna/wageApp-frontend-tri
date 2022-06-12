import { combineReducers } from 'redux';
import { Routes } from '../../config';
import { Actions, ActionTypes } from './actions';
import { INotificationList, INotificationsStoreState, NotificationTypes } from './types';

const notificationListInitial: INotificationList = {
  error: false,
  requesting: false,
  data: []
};

const list = (
  state: INotificationList = notificationListInitial,
  action: Actions
): INotificationList => {
  switch (action.type) {
    case ActionTypes.NOTIFICATIONS_GET_ALL_REQUEST: {
      return {
        data: [],
        error: false,
        requesting: true
      };
    }
    case ActionTypes.NOTIFICATIONS_GET_ALL_SUCCESS: {
      return {
        data: [
          ...action.payload.notifications
            .reverse()
            .map(({ title, content, dateSent, id, dateRead, type, linkUrl }) => {
              let link = '';
              switch (type) {
                case NotificationTypes.OFFERS_LIST: {
                  link = Routes.OFFERS_LIST;
                  break;
                }
                case NotificationTypes.ADD_TASK: {
                  link = Routes.ADD_TASK;
                  break;
                }
                case NotificationTypes.LINK: {
                  link = linkUrl ? linkUrl : '';
                  break;
                }
              }
              return {
                title,
                text: content,
                date: dateSent,
                id,
                read: !!dateRead,
                link,
                type
              };
            })
        ],
        error: false,
        requesting: false
      };
    }
    case ActionTypes.NOTIFICATIONS_GET_ALL_ERROR: {
      return {
        data: [],
        error: true,
        requesting: false
      };
    }
    case ActionTypes.NOTIFICATIONS_MARK_NOTIFICATION_AS_READ_SUCCESS: {
      return {
        ...state,
        data: [
          ...state.data.map(item => {
            if (item.id === action.payload) {
              return {
                ...item,
                read: true
              };
            }
            return item;
          })
        ]
      };
    }
    case ActionTypes.NOTIFICATIONS_REMOVE_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        data: [...state.data.filter(item => item.id !== action.payload)]
      };
    }
    default:
      return state;
  }
};

export default combineReducers<INotificationsStoreState, Actions>({
  list
});
