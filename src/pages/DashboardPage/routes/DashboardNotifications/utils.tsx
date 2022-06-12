import H from 'history';
import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  markNotificationAsRead,
  removeNotification
} from '../../../../modules/Notifications/actions';
import { INotification } from '../../../../modules/Notifications/types';
import websiteIsExternal from '../../../../utils/WebsiteIsExternal';

export const useExtendedNotifications = (items: INotification[], history: H.History) => {
  const dispatch = useDispatch();
  const markAsRead = useCallback(
    (notificationId: number) => dispatch(markNotificationAsRead(notificationId)),
    [dispatch]
  );
  const remove = useCallback(
    (notificationId: number) => dispatch(removeNotification(notificationId)),
    [dispatch]
  );

  return items.map(item => ({
    ...item,
    customContent: (
      <button
        className="remove-btn"
        title="Remove notification"
        onClick={ev => {
          ev.stopPropagation();
          remove(item.id);
        }}
      >
        <i className="icon icon--trash" />
      </button>
    ),
    onClick: () => {
      if (!item.read) {
        markAsRead(item.id);
      }

      if (item.link) {
        if (!websiteIsExternal(item.link)) {
          return history.push(item.link);
        }
        return window.open(item.link, '_blank');
      }
    }
  }));
};
