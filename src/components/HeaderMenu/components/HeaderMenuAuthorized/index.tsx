import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ApiConfig, Routes } from '../../../../config';
import { about as aboutMenu, dashboard as dashboardMenu } from '../../../../data/menu';
import { IConversation } from '../../../../modules/Chat/types';
import { useExtendedNotifications } from '../../../../pages/DashboardPage/routes/DashboardNotifications/utils';
import { AccountTypes } from '../../../../types';
import GetUserName from '../../../../utils/GetUserName';
import Avatar from '../../../Avatar';
import Button from '../../../Button';
import Tooltip from '../../../Tooltip';
import NotificationsTooltip from '../NotificationsTooltip';
import { IProps } from './types';
import getSearchParamsAsObject from '../../../../utils/GetSearchParamsAsObject';
import './styles.scss';

import { Firebase, messagesRef, db, FS } from '../../../../utils/Firebase/index';

import { apiClient, tokenStore } from '../../../../utils/api/client';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { mixPanelEvent } from '../../../../utils/MixPanel';

const HeaderMenuAuthorized: FC<IProps> = ({
  conversations,
  notifications,
  user,
  unreadConversations,
  unreadNotifications,
  tooltips,
  toggleTooltip,
  history,
  pageurl
}: IProps) => {
  const { accountType, avatarUrl, businessName, firstName, id } = user;
  const avatarForBusiness =
    accountType === AccountTypes.BUSINESS ? ' header-icon--avatar-business' : '';
  const userName = accountType === AccountTypes.BUSINESS ? businessName : firstName;
  const [count, setCount] = useState(0);
  const [conversationIds, setConversationIds] = useState();

  useEffect(() => {
    // setOnSnapShort();
    setOnCount();
  }, []);

  const setOnCount = () => {
    db.collection('Users')
      .doc(String(id))
      .onSnapshot(snapShort => {
        console.log('\n\n $$$', snapShort.data());
        let count = snapShort.data()?.unreadConversation;
        setCount(count);
      });
  };

  const setOnSnapShort = () => {
    // apiClient
    //   .get<any>(`https://api.wageapp.io/api/conversations/v2`, {
    //     baseURL: ApiConfig.URL
    //   })
    //   .then(res => {
    //     let query;
    //     if (res.data && res.data.conversations) {
    //       console.log('2222222222222222');
    //       let arr = res.data.conversations.map((item: any) => String(item.conversationId));
    //       let size = 10;
    //       while (arr.length > 0) {
    //         query = db
    //           .collection('Conversations')
    //           .where('conversationId', 'in', arr.splice(0, size));
    //         query.onSnapshot(querySnapshot => {
    //           querySnapshot.docChanges().forEach(change => {
    //             if (change.type === 'added' || change.type === 'modified') {
    //               getConversationCount();
    //             }
    //           });
    //         });
    //       }
    //     }
    //   });
  };

  // const getConversationIds = async () => {
  //   const { data } = await apiClient.get<any>(
  //     `https://api.wageapp.io/api/conversations/conversationids`,
  //     {
  //       baseURL: ApiConfig.URL
  //     }
  //   );
  //   setConversationIds(data);
  // };

  // const getConversationCount = () => {
  //   setCount(0);
  //   let cnt = 0;
  //   apiClient
  //     .get<any>(`https://api.wageapp.io/api/conversations/v2`, {
  //       baseURL: ApiConfig.URL
  //     })
  //     .then(res => {
  //       if (res.data) {
  //         res.data.conversations.map((d: any) => {
  //           db.collection('Conversations')
  //             .doc(String(d.conversationId))
  //             .get()
  //             .then(snap => {
  //               if (snap.data() ?.isRead === false && snap.data() ?.lastSenderId != user.id) {
  //                 cnt += 1;
  //                 setCount(cnt);
  //               }
  //             });
  //         });
  //       }
  //     });
  // };

  useEffect(() => {
    // if (Firebase.messaging.isSupported()) {
    //   let messaging = Firebase.messaging();
    //   messaging
    //     .requestPermission()
    //     .then(() => {
    //       return messaging.getToken();
    //     })
    //     .then(token => {
    //       db.collection('Users')
    //         .doc(String(user.id))
    //         .collection('token')
    //         .doc(token)
    //         .set({
    //           platform: 'web'
    //         });
    //       // db.collection('Users')
    //       //   .doc(String(user.id))
    //       //   .update({ unreadConversation: FS.FieldValue })
    //     })
    //     .catch(error => {
    //       console.log('error is::::', error);
    //     });
    // }
  });
  return (
    <>
      <li className="nav-menu__item post-task after-login-post-task">
        <Link to={Routes.ADD_TASK}>
          {/* <Button label="Post task" variant="add" /> */}
          <div className={pageurl === '/add-task' ? 'post-tasks-active' : `button button--add`}>
            Post Offer
          </div>
        </Link>
      </li>
      <li className="nav-menu__item after-login-menu-item">
        <Link to={Routes.DASHBOARD_MESSAGES}>
          <div className="header-icon" onClick={() => toggleTooltip('chat')}>
            {_renderUnreadNotificationsCount(count)}
            <i className="icon icon--messages" />

            {/* <NotificationsTooltip
            onClickOutside={() => toggleTooltip('chat')}
            isOpen={tooltips.chat}
            items={conversations
              .slice(0, 3)
              .map(
                ({
                  converser,
                  offer,
                  lastMessage,
                  conversationId,
                  isConversationRead
                }: IConversation) => ({
                  title: GetUserName(
                    converser.accountType,
                    converser.firstName,
                    converser.lastName,
                    converser.businessName
                  ),
                  text: offer.title,
                  date: lastMessage ? lastMessage.dateSent : '',
                  id: conversationId,
                  read: isConversationRead,
                  customContent: (
                    <Avatar accountType={converser.accountType} avatarUrl={converser.avatarUrl} />
                  ),
                  link: `/dashboard/messages/${conversationId}`
                })
              )}
            showAllLink={'/dashboard/messages'}
            noItemsText={'No conversations.'}
          /> */}
          </div>
        </Link>
      </li>
      <li className="nav-menu__item after-login-menu-item">
        <Link to={Routes.DASHBOARD_NOTIFICATIONS}>
          <div className="header-icon" onClick={() => toggleTooltip('notifications')}>
            <i className="icon icon--notifications" />
            {_renderUnreadNotificationsCount(unreadNotifications)}
            {/* <NotificationsTooltip
            onClickOutside={() => toggleTooltip('notifications')}
            isOpen={tooltips.notifications}
            items={useExtendedNotifications(notifications.slice(0, 3), history)}
            showAllLink={'/dashboard/notifications'}
            noItemsText={'No notifications.'}
          /> */}
          </div>
        </Link>
      </li>
      <li className="nav-menu__item after-login-menu-item">
        <div
          className="nav-menu__button nav-menu__button--dropdown"
          onClick={() => toggleTooltip('menuAbout')}
          title={userName}
        >
          <Link
            to={Routes.DASHBOARD_PROFILE}
            className={`header-icon header-icon--avatar${avatarForBusiness}`}
          >
            {avatarUrl ? (
              <img src={`${ApiConfig.URL}${avatarUrl}`} alt={userName} />
            ) : (
              <i className="icon icon--profile" />
            )}
          </Link>
          <span className="nav-menu__button__name">{userName}</span>
        </div>
        <Tooltip
          extraClassName="tooltip--header"
          isOpen={tooltips.menuAbout}
          onClickOutside={() => toggleTooltip('menuAbout')}
        >
          <ul className="page-header__subMenu">
            {dashboardMenu.map(({ label, path, icon }) => {
              // if (accountType === AccountTypes.BUSINESS && path!() === Routes.DASHBOARD_SERVICES) {
              //   return null;
              // }
              return (
                <li key={`${label}${path}`} onClick={() => toggleTooltip('menuAbout')}>
                  <Link to={path!()} className="page-header__subMenu__item">
                    <i className={`icon icon--${icon}`} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="page-header__subMenu__about">
            <ul>
              {aboutMenu.map(({ label, path }) => (
                <li key={`${label}${path}`}>
                  <Link to={path!()}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Tooltip>
      </li>
    </>
  );
};

const _renderUnreadNotificationsCount = (items: number) => {
  if (items > 0) {
    return (
      <span
        className={`number-of-notifications${items > 9 ? ' number-of-notifications--bigger' : ''}`}
      >
        {items > 9 ? '9+' : items}
      </span>
    );
  }

  return null;
};

export default HeaderMenuAuthorized;
