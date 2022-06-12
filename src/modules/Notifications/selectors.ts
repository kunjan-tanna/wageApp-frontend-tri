import moment from 'moment';
import { Config } from '../../config';
import { IStoreState } from '../../store';
import { INotification } from './types';


const notificationsListSelector = (state: IStoreState): INotification[] => {
  return state.notifications.list.data;
};

const newestNotificationsListSelector = (state: IStoreState): INotification[] => {
  return notificationsListSelector(state).filter(item => moment().diff(item.date, 'days') <= Config.NUMBER_OF_DAYS_AFTER_NOTIFICATION_IS_OLD);
};

const oldestNotificationsListSelector = (state: IStoreState): INotification[] => {
  return notificationsListSelector(state).filter(item => moment().diff(item.date, 'days') > Config.NUMBER_OF_DAYS_AFTER_NOTIFICATION_IS_OLD);
};

const notificationsListRequestingSelector = (state: IStoreState): boolean => {
  return state.notifications.list.requesting;
};

const notificationsListErrorSelector = (state: IStoreState): boolean => {
  return state.notifications.list.error;
};

const unreadNotificationsSelector = (state: IStoreState): number => {
  return notificationsListSelector(state).filter(item => !item.read).length;
};

export {
  notificationsListErrorSelector,
  notificationsListRequestingSelector,
  notificationsListSelector,
  newestNotificationsListSelector,
  oldestNotificationsListSelector,
  unreadNotificationsSelector
};
