import React, { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { NavLink } from 'react-router-dom';

import Avatar from '../../../../../../components/Avatar';
import DateFormat from '../../../../../../components/DateFormat';
import OfferTypeBadge from '../../../../../../components/OfferTypeBadge';
import { ApiConfig, Routes } from '../../../../../../config';
import { AccountTypes } from '../../../../../../types';
import './styles.scss';
import { IProps } from './types';

import { db, messagesRef } from '../../../../../../utils/Firebase/index';
import verifiedUser from '../../../../../../styles/images/icons/new-theme-icon/verified.svg';
import moment from 'moment';

// import Firebase from 'firebase/app';

// const firestore = Firebase.firestore();
// const messagesRef = firestore.collection('web');

const ChatMessagesListItem = ({
  id,
  accountType,
  firstName,
  businessName,
  coverPhotoUrl,
  title,
  date,
  type,
  avatarUrl,
  read,
  currentUserId
}: IProps) => {
  const name = accountType === AccountTypes.INTERNAL ? firstName : businessName;
  const [IsRead, setIsRead] = useState(true);

  // useEffect(() => {
  //   const doc = messagesRef.doc(String(id)).collection('conversationmessages');
  //   const observer = doc.onSnapshot(
  //     querySnapshot => {
  //       console.log(`Received doc snapshot: ${querySnapshot}`);
  //       querySnapshot.docChanges().forEach(change => {
  //         if (change.type === 'added' || change.type === 'modified') {
  //           let query = messagesRef.doc(String(id)).collection('conversationmessages');
  //           query
  //             .where('senderId', '!=', String(currentUserId))
  //             .where('isRead', '==', false)
  //             .get()
  //             .then(querysnap => {
  //               if (querysnap.size === 0) {
  //                 setIsRead(true);
  //               } else {
  //                 setIsRead(false);
  //               }
  //             });
  //         }
  //       });
  //     },
  //     err => {
  //       console.log(`Encountered error: ${err}`);
  //     }
  //   );
  // });

  useEffect(() => {
    db.collection('Conversations')
      .doc(String(id))
      .onSnapshot(querySnapshot => {
        if (
          querySnapshot.data()?.isRead === false &&
          querySnapshot.data()?.lastSenderId != currentUserId
        ) {
          setIsRead(false);
        } else {
          setIsRead(true);
        }
      });
    // db.collection('Conversations')
    //   .where('conversationId', '==', String(id))
    //   .onSnapshot(querySnapshot => {
    //     querySnapshot.docChanges().forEach(change => {
    //       if (change.type === 'added' || change.type === 'modified') {
    //         let query = messagesRef.doc(String(id));
    //         query.get().then(querysnap => {
    //           let lastMessageQuery = messagesRef.doc(String(id)).collection('conversationmessages');
    //           lastMessageQuery
    //             .orderBy('sentDate', 'desc')
    //             .limit(1)
    //             .get()
    //             .then(querysnap2 => {
    //               querysnap2.forEach(snap => {
    //                 if (
    //                   querysnap.data() ?.isRead === false &&
    //                     snap.data() ?.senderId != currentUserId
    //                 ) {
    //                   setIsRead(false);
    //                 } else {
    //                   setIsRead(true);
    //                 }
    //               });
    //             });
    //         });
    //       }
    //     });
    //   });
  });

  return (
    <li className="messages-list__item">
      {console.log('IsRead', name)}
      <NavLink
        to={`${Routes.DASHBOARD_MESSAGES}/${id}`}
        className={`messages-list__item__link${
          !IsRead ? ' messages-list__item__link--unread' : ''
        }`}
      >
        <OfferTypeBadge type={type} size="small" />
        <div className="messages-list__item__photo">
          {coverPhotoUrl ? (
            <img src={`${ApiConfig.URL}${coverPhotoUrl}`} alt={title} />
          ) : (
            <i className="icon icon--no-photo" />
          )}
        </div>
        <Avatar accountType={accountType} avatarUrl={avatarUrl} name={name!} unread={!IsRead} />
        <div className="messages-list__item__content">
          {name && (
            <h3 className="messages-list__item__name">
              <span className="online"></span>
              <LinesEllipsis text={name} maxLine={1} />
              {/* <div className="verified-user">
                <img src={verifiedUser} alt="" />
              </div> */}
            </h3>
          )}
          {title && (
            <h4 className="messages-list__item__title">
              <LinesEllipsis text={title} maxLine={1} />
            </h4>
          )}
          <small className="messages-list__item__date">
            <span className={type == 'gig' ? 'listStatus job' : 'listStatus worker'}>
              {type == 'gig' ? 'Manager' : 'Worker'}
            </span>
          </small>
          <h4 className="messages-list__item__title">{title}</h4>
          <div className="messages-list__user_disc">{title}</div>
        </div>

        <div className="message-list_time">
          {' '}
          <DateFormat value={date} />
        </div>
      </NavLink>
    </li>
  );
};

export default ChatMessagesListItem;
