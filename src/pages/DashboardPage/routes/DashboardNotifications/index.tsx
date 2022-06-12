import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import Loading from '../../../../components/Loading';
import Notification from '../../../../components/Notification';
import {
  newestNotificationsListSelector,
  notificationsListErrorSelector,
  notificationsListRequestingSelector,
  notificationsListSelector,
  oldestNotificationsListSelector
} from '../../../../modules/Notifications/selectors';
import { INotification } from '../../../../modules/Notifications/types';
import { IStoreState } from '../../../../store';
import DashboardItemHeader from '../../components/DashboardItemHeader';
import { IProps } from './types';
import { useExtendedNotifications } from './utils';
import { mixPanelEvent } from '../../../../utils/MixPanel';

import './styles.scss';

const DashboardNotifications: FC<IProps> = ({ history }: IProps) => {
  mixPanelEvent('Viewed in-app notification', {
    'In-app notification': 'Yes'
  });
  const notificationsCount = useSelector((state: IStoreState) => notificationsListSelector(state))
    .length;
  const newest = useExtendedNotifications(
    useSelector((state: IStoreState) => newestNotificationsListSelector(state)),
    history
  );
  const oldest = useExtendedNotifications(
    useSelector((state: IStoreState) => oldestNotificationsListSelector(state)),
    history
  );
  const requesting = useSelector((state: IStoreState) =>
    notificationsListRequestingSelector(state)
  );
  const error = useSelector((state: IStoreState) => notificationsListErrorSelector(state));

  return (
    <>
      <DashboardItemHeader title="Notifications" itemsCount={notificationsCount} />
      {requesting ? <Loading /> : _renderContent(newest, oldest, notificationsCount, error)}
    </>
  );
};

const _renderMessage = (text: string) => {
  return <div className="dashboard-card no-notifications">{text}</div>;
};

const _renderNotificationList = (items: INotification[], title: string, classPrefix: string) => {
  return (
    <div className={`row notifications notifications--${classPrefix}`}>
      <h3 className="notifications__heading">{title}</h3>
      <ul className="notifications__list">
        {items.map((notification: INotification) => {
          return <Notification key={notification.id} notification={notification} />;
        })}
      </ul>
    </div>
  );
};

const _renderContent = (
  newest: INotification[],
  oldest: INotification[],
  count: number,
  error: boolean
) => {
  return count >= 1 ? (
    <div className="dashboard__page-content-block dashboard__page-content-block--notifications">
      {newest.length > 0 && _renderNotificationList(newest, 'Newest', 'newest')}
      {oldest.length > 0 && _renderNotificationList(oldest, 'Oldest', 'oldest')}
    </div>
  ) : (
    _renderMessage(error ? 'Unexpected error. Please try later.' : 'No new notification')
  );
};

export default DashboardNotifications;
