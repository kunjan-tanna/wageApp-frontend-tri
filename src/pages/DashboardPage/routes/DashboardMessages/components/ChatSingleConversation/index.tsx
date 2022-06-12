import classnames from 'classnames';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'emotion';
import Loading from '../../../../../../components/Loading';
import MoreOptions from '../../../../../../components/MoreOptions';
import {
  chatGetConversationDetailsRequest,
  signalRSendMessage
} from '../../../../../../modules/Chat/actions';
import {
  conversationDetailsErrorSelector,
  conversationDetailsRequestingSelector,
  conversationDetailsSelector
} from '../../../../../../modules/Chat/selectors';
import {
  IConversationDetailsData,
  IConverser,
  ISingleMessage,
  IMessageFirebase
} from '../../../../../../modules/Chat/types';
import { ISendMessagePayload } from '../../../../../../modules/Chat/types/signalr';
import { blockPeopleModalVisibilityChange } from '../../../../../../modules/Modals/BlockPeople/actions';
import {
  BlockPeopleModalVisibilityChangePayload,
  BlockTypes
} from '../../../../../../modules/Modals/BlockPeople/types';
import { IStoreState } from '../../../../../../store';
import { AccountTypes } from '../../../../../../types';
import GetUserName from '../../../../../../utils/GetUserName';
import ChatAlertMessage from '../ChatAlertMessage';
import ChatMessageForm from '../ChatMessageForm';
import ChatRemoveConversation from '../ChatRemoveConversation';
import ChatSingleMessage from '../ChatSingleMessage';
import ChatTaskDetails from '../ChatTaskDetails';
import './styles.scss';
import { IProps, IExternalProps } from './types';
import Avatar from '../../../../../../components/Avatar';

import {
  messagesRef,
  firebaseDate,
  sendNotification,
  db,
  FS
} from '../../../../../../utils/Firebase/index';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { apiClient, tokenStore } from '../../../../../../utils/api/client';
import { ApiConfig, Routes } from '../../../../../../config';
import Axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  currentUserSelector,
  isAuthorizedSelector
} from '../../../../../../modules/CurrentUser/selectors';
import verifiedUser from '../../../../../../styles/images/icons/new-theme-icon/verified.svg';

import moment from 'moment';

const ROOT_CSS = css({
  height: 425,
  width: 'auto'
});

const ChatSingleConversation = (props: IProps) => {
  const {
    currentUserId,
    match: {
      path,
      params: { conversationId }
    },
    report
  } = props;
  const [showTaskDetails, _setTaskDetailsState] = useState<boolean>(true);
  const dispatch = useDispatch();
  const loading = useSelector((state: IStoreState) =>
    conversationDetailsRequestingSelector(state.chat)
  );
  const details = useSelector((state: IStoreState) => conversationDetailsSelector(state.chat));
  console.log('\n\n detailsss->', details, currentUserId);
  const error = useSelector((state: IStoreState) => conversationDetailsErrorSelector(state.chat));
  const conversationClassName = classnames('conversation', {
    'conversation--smaller': showTaskDetails
  });
  const sendMessage = useCallback(
    (payload: ISendMessagePayload) => dispatch(signalRSendMessage(payload)),
    [dispatch]
  );
  const blockModalVisibilityChange = useCallback(
    (payload: BlockPeopleModalVisibilityChangePayload) =>
      dispatch(blockPeopleModalVisibilityChange(payload)),
    [dispatch]
  );

  const [count, setCount] = useState(0);
  const [messageList, setMessageList] = useState();

  const query = messagesRef.doc(String(conversationId)).collection('conversationmessages');

  const [msgs] = useCollectionData(query.orderBy('sentDate', 'asc'));
  console.log('\n\n YYYYYY', msgs);
  useEffect(() => {
    setMessageList(msgs);
    let query = messagesRef.doc(String(conversationId));
    let lastMessageQuery = messagesRef
      .doc(String(conversationId))
      .collection('conversationmessages');
    lastMessageQuery
      .orderBy('sentDate', 'desc')
      .limit(1)
      .get()
      .then(querysnap => {
        // console.log('\n\n\n QUUUUWWWWS',querysnap);
        querysnap.forEach(snap => {
          query.get().then(querysnap1 => {
            if (
              querysnap1.data()?.isRead === false &&
              querysnap1.data()?.lastSenderId != currentUserId
            ) {
              console.log('\n\n\n YYYYYYYYYYEEEEEEESSSSSSSSS');
              query.update({ isRead: true });
            }
          });
        });
      });
  });
  useEffect(() => {
    // db.collection('Users')
    //   .doc(String(currentUserId))
    //   .onSnapshot(snapShort => {
    //     console.log('\n\n $$$', snapShort.data());
    //     let count = snapShort.data()?.unreadConversation;
    //     setCount(count);
    //   });
    // query
    //   .where('isRead', '==', false)
    //   .where('senderId', '!=', currentUserId)
    //   .get()
    //   .then(snap => {
    //     const cnt = snap.size;
    //     console.log('\n\n count is ->', count);
    //     if (count - cnt > 0) {
    //       db.collection('Users')
    //         .doc(String(currentUserId))
    //         .update('unreadConversation', FS.FieldValue.increment(-cnt));
    //     } else {
    //       db.collection('Users')
    //         .doc(String(currentUserId))
    //         //.update('unreadConversation', FS.FieldValue.increment(-count))
    //         .update({ unreadConversation: 0 });
    //     }
    //     snap.forEach(s => {
    //       query.doc(String(s.id)).update({ isRead: true });
    //     });
    //   });
  }, [count, conversationId]);

  useEffect(() => {
    dispatch(chatGetConversationDetailsRequest(Number(conversationId)));
  }, [dispatch, conversationId]);

  // useEffect(() => {
  //   const db = firestore;
  //   return db
  //     .collection('web')
  //     .where('ConversationId', '==', conversationId)
  //     .onSnapshot(snapshot => {
  //       snapshot.forEach(doc => {
  //         console.log('\n\n DDDOOOCC', doc.data(), doc.id);
  //         db.collection('web')
  //           .doc(doc.id)
  //           .collection('conversationmessages')
  //           .get()
  //           .then(querySnapshot => {
  //             querySnapshot.forEach(doc => {
  //               console.log('querySnapshot->', doc.data());
  //             });
  //           });
  //       });
  //     });
  // }, []);

  // { seconds: Math.floor(Date.now() / 1000) },
  const sendFirebaseMessage = async (payload: ISendMessagePayload) => {
    let receiverId = details && details.converser.id;
    let reqData1 = {
      conversationId: String(conversationId),
      imageUrl: payload.Image,
      type: payload.MessageContentType,
      senderId: props.currentUserId,
      text: payload.MessageContentType === 'Image' ? payload.Image : payload.Message,
      sentDate: firebaseDate,
      isRead: false,
      status: 'sending'
    };
    setMessageList(messageList.push(reqData1));

    let imageUrl = '';
    if (payload.file && payload.MessageContentType === 'Image') {
      console.log('\n IMANGE UpLOAD');
      const formData = new FormData();
      formData.append('file', payload.file);
      const { data } = await apiClient.post<any>(
        `https://api.wageapp.io/api/media/chat-images`,
        formData,
        {
          baseURL: ApiConfig.URL,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('\n IMANGE UpLOAD 2222');

      if (data) {
        imageUrl = data[0];
      }
      console.log('\n\n @@@@@', data);
    }
    let reqData = {
      conversationId: String(conversationId),
      imageUrl: imageUrl,
      type: payload.MessageContentType,
      senderId: props.currentUserId,
      text: payload.MessageContentType === 'Image' ? imageUrl : payload.Message,
      sentDate: firebaseDate,
      isRead: false
    };
    console.log('pay->', reqData);

    setTimeout(() => {
      // UNARCHIVE CHAT
      messagesRef
        .doc(String(conversationId))
        .get()
        .then(snapshort => {
          console.log('check isachi', snapshort.data());
          if (snapshort.data() && snapshort.data()?.isArchieved === true) {
            apiClient.post<any>(
              `https://api.wageapp.io/api/conversations/${conversationId}/set-unarchived`,
              null,
              {
                baseURL: ApiConfig.URL
              }
            );
            messagesRef.doc(String(conversationId)).update({
              isArchieved: false
            });
          }
        });
      // INCREASE COUNT
      db.collection('Users')
        .doc(String(receiverId))
        .update('unreadConversation', FS.FieldValue.increment(1))
        .catch(err => {
          db.collection('Users')
            .doc(String(receiverId))
            .set({ unreadConversation: 1 });
        });
      // SET ISREAD FALSE
      messagesRef.doc(String(conversationId)).update({
        isRead: false
      });
      db.collection('Conversations')
        .doc(String(conversationId))
        .update({
          lastSenderId: props.currentUserId,
          lastSentMessageDate: firebaseDate
        });
      query.doc().set(reqData);

      sendNotification(props.user, details, conversationId);
    }, 200);
  };

  return (
    <div className="chat__single-conversation">
      {loading ? (
        <Loading />
      ) : error ? (
        <ChatAlertMessage text={'Unexpected error. Please try again.'} />
      ) : (
        details &&
        details.messages && (
          <>
            <div className={conversationClassName}>
              <div className="conversation__header">
                {_renderBasicHeaderContent(details, showTaskDetails, _setTaskDetailsState)}
                {_renderMoreOptions(
                  details.converser,
                  details.offer,
                  path,
                  conversationId,
                  blockModalVisibilityChange
                )}
              </div>
              <div className="conversation__content conversationScrollMain">
                {/* <ScrollArea
                      speed={0.8}
                      className="area"
                      contentClassName="content"
                      horizontal={false}
                    > */}

                {/* <div className="conversationScrollMain"> */}
                {_renderMessagesList2(messageList, currentUserId, sendFirebaseMessage, details)}
                {/* </div> */}

                {/* <ScrollToBottom id="scroll" className={ROOT_CSS}> */}
                {/* {_renderMessagesList(details.messages, currentUserId, sendMessage, details)} */}
                {/* {_renderMessagesList2(messageList, currentUserId, sendFirebaseMessage, details)} */}
                {/* </ScrollToBottom> */}
                {/* </ScrollArea> */}
              </div>
              <ChatMessageForm
                sendMessage={sendFirebaseMessage}
                offerId={details.offer.id}
                recipientId={details.converser.id}
                blocked={details.converser.communicationBlocked || details.converser.isBlocked}
                deleted={details.converser.isDeleted}
                blockedMessage={
                  details?.converser?.isBlocked
                    ? 'Receiver is blocked'
                    : 'Sender does not accept replies'
                }
              />
            </div>
            {showTaskDetails && (
              <ChatTaskDetails
                details={details}
                setVisibleState={_setTaskDetailsState}
                report={report}
              />
            )}
          </>
        )
      )}
      <Route
        path={`/dashboard/messages/:conversationId/delete`}
        component={ChatRemoveConversation}
      />
    </div>
  );
};

const _renderBasicHeaderContent = (
  details: IConversationDetailsData,
  showTaskDetails: boolean,
  setTaskDetailsState: Dispatch<SetStateAction<boolean>>
) => {
  const { firstName, lastName, businessName, accountType, avatarUrl, id } = details.converser;

  const name = accountType === AccountTypes.BUSINESS ? businessName : `${firstName} ${lastName}`;
  const { title } = details.offer;
  console.log('CONVO', details);
  return (
    <>
      <NavLink to={`${Routes.USER_PROFILE}/${id}`} className="chat-single-profile">
        <div className="conversation__header__titles">
          <div className="chat-user-pic">
            {avatarUrl ? (
              <img src={`${ApiConfig.URL}${avatarUrl}`} alt="" />
            ) : (
              <div className="avatar">
                <i className="icon icon--profile-color"></i>
              </div>
            )}
          </div>
          <h3>{name}</h3>
          {/* <div className="verified-user">
            <img src={verifiedUser} alt="" />
          </div> */}
          {/* <h4>{title}</h4> */}
        </div>
      </NavLink>
      {!showTaskDetails && (
        <button className="btn btn--b task-details-btn" onClick={() => setTaskDetailsState(true)}>
          Task Info
        </button>
      )}
    </>
  );
};

const _renderMoreOptions = (
  converser: IConverser,
  offer: any,
  path: string,
  conversationId: string,
  blockModalVisibilityChange: (payload: BlockPeopleModalVisibilityChangePayload) => void
) => {
  const { accountType, firstName, lastName, businessName, isBlocked } = converser;
  window.localStorage.setItem('_OfferTitleForBlock', offer.title);
  const items = [
    {
      label: 'Delete chat',
      customComponent: (
        <NavLink to={`${path.replace(':conversationId', conversationId)}/delete`}>
          <i className="icon icon--trash-red" />
          Delete chat
        </NavLink>
      )
    },
    {
      label: `${isBlocked ? 'Unblock' : 'Block'} user`,
      iconName: 'block-red',
      method: () =>
        blockModalVisibilityChange({
          type: isBlocked ? BlockTypes.UNBLOCK : BlockTypes.BLOCK,
          visible: true,
          userId: converser.id,
          userName: GetUserName(accountType, firstName, lastName, businessName)
        })
    }
  ];

  return <MoreOptions items={items} />;
};

// const _renderMessagesList = (
//   messages: ISingleMessage[],
//   currentUserId: string,
//   sendMessage: (payload: ISendMessagePayload) => void,
//   details: IConversationDetailsData
// ) => {
//   if (messages.length > 0) {
//     return (
//       <ul className="conversation__messages">
//         {messages.map(item => {
//           return (
//             <ChatSingleMessage
//               key={item.messageId}
//               item={item}
//               currentUserId={currentUserId}
//               sendMessage={() => {
//                 sendMessage({
//                   OfferId: details.offer.id,
//                   MessageContentType: item.type,
//                   Message: item.text,
//                   Image: item.text,
//                   FileName: item.text,
//                   RecipientId: details.converser.id,
//                   TempId: item.tempId ? item.tempId : '',
//                   messageId: item.messageId
//                 });
//               }}
//             />
//           );
//         })}
//       </ul>
//     );
//   }
// };

const _renderMessagesList2 = (
  messages: any,
  currentUserId: string,
  sendMessage: (payload: ISendMessagePayload) => void,
  details: IConversationDetailsData
) => {
  if (details && messages && messages.length > 0) {
    return (
      <ul className="conversation__messages">
        {messages.map((item: any, index: number, arr: any) => {
          let time = '';
          if (item?.sentDate != null) {
            time = moment(new Date(Number(item.sentDate.seconds) * 1000)).format(
              'DD-MM-YYYY hh:mm A'
            );
            if (
              index > 0 &&
              arr[index].senderId == arr[index - 1].senderId &&
              moment(new Date(Number(arr[index].sentDate.seconds) * 1000)).format(
                'DD-MM-YYYY hh:mm A'
              ) ==
                moment(new Date(Number(arr[index - 1].sentDate.seconds) * 1000)).format(
                  'DD-MM-YYYY hh:mm A'
                )
            ) {
              time = '';
            }
          }
          return (
            <ChatSingleMessage
              key={item.messageId}
              item={item}
              time={time}
              senderType={details.converser.accountType === 'Business' ? 'Business' : 'Internel'}
              currentUserId={currentUserId}
              avatar={details.converser.avatarUrl}
              isdeleted={details.converser.isDeleted}
              sendMessage={() => {
                sendMessage({
                  OfferId: details.offer.id,
                  MessageContentType: item.type,
                  Message: item.text,
                  Image: item.imageUrl,
                  FileName: item.text,
                  RecipientId: details.converser.id,
                  TempId: item.tempId ? item.tempId : '',
                  messageId: item.messageId,
                  file: ''
                });
              }}
            />
          );
        })}
        {details.converser.isDeleted && (
          <li className="deleteMessage">This user has been deleted</li>
        )}
      </ul>
    );
  }
};

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    user: currentUserSelector(state.currentUser)
  };
};

export default compose<any>(connect(mapStateToProps))(ChatSingleConversation);

// export default ChatSingleConversation;
