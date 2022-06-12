import { ReactNode } from 'react';
import { Nullable } from '../../types';
import { ActionTypes } from './actions';

export interface INotification {
  title: string;
  text: string;
  date: string;
  id: number;
  read: boolean;
  customContent?: ReactNode;
  link?: string;
  onClick?: () => void;
  type: any;
}

export interface INotificationList {
  requesting: boolean;
  error: boolean;
  data: INotification[];
}

export enum NotificationTypes {
  OFFERS_LIST = 1,
  ADD_TASK = 2,
  LINK = 3
}

export type NotificationType =
  | NotificationTypes.OFFERS_LIST
  | NotificationTypes.ADD_TASK
  | NotificationTypes.LINK;

export interface INotificationFromAPI {
  id: number;
  type: NotificationType;
  dateSent: string;
  dateRead: Nullable<string>;
  title: string;
  content: string;
  linkUrl: Nullable<string>;
  linkUser: Nullable<string>;
}

export type GetNotificationsResponsePayload = {
  notifications: INotificationFromAPI[];
};

export interface INotificationsGetAllRequest {
  readonly type: ActionTypes.NOTIFICATIONS_GET_ALL_REQUEST;
}

export interface INotificationsGetAllSuccess {
  readonly type: ActionTypes.NOTIFICATIONS_GET_ALL_SUCCESS;
  payload: GetNotificationsResponsePayload;
}

export interface INotificationsGetAllError {
  readonly type: ActionTypes.NOTIFICATIONS_GET_ALL_ERROR;
}

export interface INotificationsMarkAsRead {
  readonly type: ActionTypes.NOTIFICATIONS_MARK_NOTIFICATION_AS_READ;
  payload: number;
}

export interface INotificationsMarkAsReadSuccess {
  readonly type: ActionTypes.NOTIFICATIONS_MARK_NOTIFICATION_AS_READ_SUCCESS;
  payload: number;
}

export interface INotificationsMarkAsReadError {
  readonly type: ActionTypes.NOTIFICATIONS_MARK_NOTIFICATION_AS_READ_ERROR;
  payload: number;
}

export interface INotificationsRemove {
  readonly type: ActionTypes.NOTIFICATIONS_REMOVE_NOTIFICATION;
  payload: number;
}

export interface INotificationsRemoveSuccess {
  readonly type: ActionTypes.NOTIFICATIONS_REMOVE_NOTIFICATION_SUCCESS;
  payload: number;
}

export interface INotificationsRemoveError {
  readonly type: ActionTypes.NOTIFICATIONS_REMOVE_NOTIFICATION_ERROR;
  payload: number;
}

export interface INotificationsStoreState {
  list: INotificationList;
}
