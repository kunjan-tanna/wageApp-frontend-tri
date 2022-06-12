import React from 'react';

import { IProps } from './types';

import ModalAlternative from '../../../../components/ModalAlternative';
import { ApiConfig } from '../../../../config';
import GetUserName from '../../../../utils/GetUserName';
import ChatMessageForm from '../ChatMessageForm';

const OfferMessage = (props: IProps) => {
  const {
    offer: {
      owner: { avatarUrl, firstName, lastName, accountType, businessName }
    },
    modalState,
    closeModal,
    messageHandler,
    messageSent,
    closeThanksMessage,
    responseStatus,
    error
  } = props;

  const setStatusMessage = () => {
    switch (responseStatus) {
      case 200:
        return 'Your message has been sent';
      case 405:
        return 'Cannot send this message. You have been blocked.';
      default:
        return 'Upss.. Something went wrong. Try Again';
    }
  };

  const close = () => {
    const { closeModal } = props;
    closeModal();
    window.localStorage.removeItem('re_flag');
  };

  return (
    <>
      {!error && (
        <ModalAlternative isOpen={modalState} extraClass="offer">
          <div className="modal-alternative__header">
            <div
              className={`modal-alternative__avatar ${
                !avatarUrl ? 'modal-alternative__avatar--is-icon' : ''
              }`}
            >
              {avatarUrl ? (
                <img src={`${ApiConfig.URL}${avatarUrl}`} alt="wage" />
              ) : (
                <i className="icon icon--profile-color" />
              )}
            </div>
            <h5>
              {' '}
              To:
              <strong>{GetUserName(accountType, firstName, lastName, businessName)}</strong>
            </h5>
            <button onClick={close}>
              <i className="icon icon--close-gray" />
            </button>
          </div>
          <ChatMessageForm handleSubmit={messageHandler} />
        </ModalAlternative>
      )}
      {messageSent && (
        <ModalAlternative isOpen={messageSent} extraClass="offer-thanks">
          <div className="modal-alternative__header">
            <h3>{responseStatus === 200 ? 'Thanks!' : 'Error'}</h3>
          </div>
          <div className="modal-alternative__content">
            <p>{setStatusMessage()}</p>
            <button className="btn btn--b btn--b-color" onClick={closeThanksMessage}>
              Ok
            </button>
          </div>
        </ModalAlternative>
      )}
    </>
  );
};

export default OfferMessage;
