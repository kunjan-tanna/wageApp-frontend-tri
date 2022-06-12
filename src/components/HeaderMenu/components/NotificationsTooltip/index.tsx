import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { INotification } from '../../../../modules/Notifications/types';
import Notification from '../../../Notification';
import Tooltip from '../../../Tooltip';

import { IProps } from './types';

import './styles.scss';

const NotificationsTooltip: FC<IProps> = ({ isOpen, onClickOutside, items, showAllLink, noItemsText }) => {
  return (
    <Tooltip
      extraClassName="tooltip--notifications"
      isOpen={isOpen}
      onClickOutside={onClickOutside}
    >
      {items.length > 0
        ?
        <>
          <ul className="tooltip-notifications__row">
            {_renderItems(items)}
          </ul>
          <Link to={showAllLink} className="btn btn--b">
            Show all
          </Link>
        </>
        :
        <p className="no-items">{noItemsText}</p>
      }
    </Tooltip>
  );
};


const _renderItems = (items: INotification[]) => {
  return items.map(item => {
    return (
      <Notification
        key={item.id}
        notification={item}
        extraClass="notifications-item--tooltip"
      />
    );
  });
};

export default NotificationsTooltip;