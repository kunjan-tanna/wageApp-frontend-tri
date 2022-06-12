import {
  GetNotificationsResponsePayload,
  INotificationsGetAllError,
  INotificationsGetAllRequest,
  INotificationsGetAllSuccess,
  INotificationsMarkAsRead,
  INotificationsMarkAsReadError,
  INotificationsMarkAsReadSuccess,
  INotificationsRemove,
  INotificationsRemoveError,
  INotificationsRemoveSuccess
} from './types';

export enum ActionTypes {
  NOTIFICATIONS_GET_ALL_REQUEST = '[NOTIFICATIONS] - get notifications - request',
  NOTIFICATIONS_GET_ALL_SUCCESS = '[NOTIFICATIONS] - get notifications - success',
  NOTIFICATIONS_GET_ALL_ERROR = '[NOTIFICATIONS] - get notifications - error',
  NOTIFICATIONS_MARK_NOTIFICATION_AS_READ = '[NOTIFICATIONS] - mark notification as read',
  NOTIFICATIONS_MARK_NOTIFICATION_AS_READ_SUCCESS = '[NOTIFICATIONS] - mark notification as read - success',
  NOTIFICATIONS_MARK_NOTIFICATION_AS_READ_ERROR = '[NOTIFICATIONS] - mark notification as read - error',
  NOTIFICATIONS_REMOVE_NOTIFICATION = '[NOTIFICATIONS] - notification remove - request',
  NOTIFICATIONS_REMOVE_NOTIFICATION_SUCCESS = '[NOTIFICATIONS] - notification remove - success',
  NOTIFICATIONS_REMOVE_NOTIFICATION_ERROR = '[NOTIFICATIONS] - notification remove - error'
}

export type Actions =
  | INotificationsGetAllRequest
  | INotificationsGetAllSuccess
  | INotificationsGetAllError
  | INotificationsMarkAsRead
  | INotificationsMarkAsReadSuccess
  | INotificationsMarkAsReadError
  | INotificationsRemove
  | INotificationsRemoveSuccess
  | INotificationsRemoveError;

export const getNotificationsRequest = () => {
  return {
    type: ActionTypes.NOTIFICATIONS_GET_ALL_REQUEST
  };
};

export const getNotificationsSuccess = (payload: GetNotificationsResponsePayload): INotificationsGetAllSuccess => {
  return {
    type: ActionTypes.NOTIFICATIONS_GET_ALL_SUCCESS,
    payload
  };
};

export const getNotificationsError = () => {
  return {
    type: ActionTypes.NOTIFICATIONS_GET_ALL_ERROR
  };
};


export const markNotificationAsRead = (payload: number) => {
  return {
    type: ActionTypes.NOTIFICATIONS_MARK_NOTIFICATION_AS_READ,
    payload
  };
};

export const markNotificationAsReadSuccess = (payload: number) => {
  return {
    type: ActionTypes.NOTIFICATIONS_MARK_NOTIFICATION_AS_READ_SUCCESS,
    payload
  };
};

export const markNotificationAsReadError = (payload: number) => {
  return {
    type: ActionTypes.NOTIFICATIONS_MARK_NOTIFICATION_AS_READ_ERROR,
    payload
  };
};

export const removeNotification = (payload: number) => {
  return {
    type: ActionTypes.NOTIFICATIONS_REMOVE_NOTIFICATION,
    payload
  };
};

export const removeNotificationSuccess = (payload: number) => {
  return {
    type: ActionTypes.NOTIFICATIONS_REMOVE_NOTIFICATION_SUCCESS,
    payload
  };
};

export const removeNotificationError = (payload: number) => {
  return {
    type: ActionTypes.NOTIFICATIONS_REMOVE_NOTIFICATION_ERROR,
    payload
  };
};