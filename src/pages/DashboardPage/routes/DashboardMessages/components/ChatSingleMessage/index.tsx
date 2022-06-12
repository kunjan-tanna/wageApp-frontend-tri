import classnames from 'classnames';
import React from 'react';

import Avatar from '../../../../../../components/Avatar';
import { MessageStatuses, MessageTypes } from '../../../../../../modules/Chat/types';
// import { myselfSenderID } from '../../../../../../modules/Chat/types/signalr';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './styles.scss';
import { IProps } from './types';
import moment from 'moment';

const ChatSingleMessage = ({
  item,
  currentUserId,
  avatar,
  sendMessage,
  time,
  isdeleted,
  senderType
}: IProps) => {
  const { senderId, status, type, messageId, senderAvatarUrl, text, imageUrl } = item;
  const myself = senderId === currentUserId;
  // || senderId === myselfSenderID;

  const itemClassname = classnames('conversation__message-list__item', {
    'conversation__message-list__item--myself': myself
  });
  const msgClassName = classnames('conversation__message-list__msg', {
    'conversation__message-list__msg--sending': status === MessageStatuses.SENDING,
    'conversation__message-list__msg--error': status === MessageStatuses.ERROR
  });

  return (
    <li className={itemClassname} key={messageId}>
      <span>
        {time == 'Invalid date' ? '' : time.replace(moment().format('DD-MM-YYYY'), 'Today')}
      </span>
      {!myself && <Avatar avatarUrl={senderAvatarUrl || avatar} accountType={senderType} />}
      <div className={msgClassName}>
        {type === MessageTypes.TEXT ? (
          text
        ) : (
          <Zoom>
            <img
              src={
                status === MessageStatuses.SENDING ? imageUrl : 'https://api.wageapp.io/' + imageUrl
              }
              alt=""
              className="chat-zoom-picture"
            />
          </Zoom>
        )}
      </div>
      {status === MessageStatuses.ERROR && (
        <div className="conversation__message-list__item__resend">
          <button
            onClick={() => {
              sendMessage();
            }}
            className="btn"
          >
            Error! Click to resend
          </button>
        </div>
      )}
    </li>
  );
};

export default ChatSingleMessage;
