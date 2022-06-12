import classnames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { INotification } from '../../modules/Notifications/types';
import DateFormat from '../DateFormat';
import { IProps } from './types';
import { Routes } from '../../config';

import './styles.scss';

const Notification: FC<IProps> = ({ notification, extraClass }) => {
  const itemClassName = classnames('notifications-item', 'dashboard-card', {
    [`${extraClass}`]: extraClass,
    'notifications-item--read': notification.read
  });
  console.log('NOTIFICATION', notification);
  return (
    <li key={notification.id} className={itemClassName}>
      {notification.type == 6 ? (
        <NavLink to={Routes.DASHBOARD_MESSAGES} className="notifications-item__link">
          {_renderContent(notification)}
        </NavLink>
      ) : (
        <a className="notifications-item__link" onClick={notification.onClick}>
          {_renderContent(notification)}
        </a>
      )}
      {/* /////////////////OLD CODE//////////////////
      {notification.link && !notification.onClick
        ?
        <NavLink to={notification.link} className="notifications-item__link">
          {_renderContent(notification)}
        </NavLink>
        :
        <a className="notifications-item__link" onClick={notification.onClick}>
          {_renderContent(notification)}
        </a>
      }
      /////////////////OLD CODE////////////////// */}
    </li>
  );
};

const _renderContent = (notification: INotification) => {
  return (
    <>
      <div className="notifications-item__data">
        <h4 className="notifications-item__data__title">{notification.title}</h4>
        <p className="notifications-item__data__text">{notification.text}</p>
        <span className="notifications-item__data__date">
          <DateFormat value={notification.date} />
        </span>
      </div>
      {notification.customContent && (
        <div className="notifications-item__custom-content">{notification.customContent}</div>
      )}
    </>
  );
};

export default Notification;
