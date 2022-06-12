import H from 'history';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../../../../../components/Loading';
import ModalAlternative from '../../../../../../components/ModalAlternative';
import {
  chatRemoveConversationRequest,
  chatRemoveConversationReset
} from '../../../../../../modules/Chat/actions';
import {
  conversationRemoveErrorSelector,
  conversationRemoveRequestingSelector,
  conversationRemoveSuccessSelector
} from '../../../../../../modules/Chat/selectors';
import { IStoreState } from '../../../../../../store';
import { IProps } from './types';
import { db, messagesRef } from '../../../../../../utils/Firebase/index';

const ChatRemoveConversation = ({ items, parentRoute, history, match }: IProps) => {
  const { conversationId } = match.params;
  const dispatch = useDispatch();
  const requesting = useSelector((state: IStoreState) =>
    conversationRemoveRequestingSelector(state.chat)
  );
  const success = useSelector((state: IStoreState) =>
    conversationRemoveSuccessSelector(state.chat)
  );
  const error = useSelector((state: IStoreState) => conversationRemoveErrorSelector(state.chat));
  const showWelcomeContent = !requesting && !success && !error;
  const removeRequest = useCallback(
    () => dispatch(chatRemoveConversationRequest(Number(conversationId))),
    [dispatch, conversationId]
  );

  const removeChatRequest = () => {
    messagesRef.doc(String(conversationId)).update({
      isArchieved: true
    });
    removeRequest();
  };

  useEffect(() => {
    return () => {
      dispatch(chatRemoveConversationReset());
    };
  }, [dispatch]);

  return (
    <ModalAlternative isOpen={true} extraClass={'pink-style'}>
      <div className="modal-alternative__header">
        <h3>Delete chat</h3>
      </div>
      <div className="modal-alternative__content">
        {showWelcomeContent && _renderWelcomeContent(removeChatRequest, history)}
        {requesting && <Loading />}
        {error && _renderMessage('An error occurred. Please try later.', history, true)}
        {success && _renderMessage('Conversation has been removed.', history)}
      </div>
    </ModalAlternative>
  );
};

const _renderWelcomeContent = (removeChatRequest: () => void, history: H.History) => {
  return (
    <>
      <p>This chat will be permanently deleted for you</p>
      <div className="btns">
        <button className="btn btn--b" onClick={history.goBack}>
          Cancel
        </button>
        <button className="btn btn--a" onClick={removeChatRequest}>
          Ok
        </button>
      </div>
    </>
  );
};

const _renderMessage = (text: string, history: H.History, goBack?: boolean) => {
  return (
    <>
      <p>{text}</p>
      <div className="btns">
        <button
          className="btn btn--b btn--b-color2"
          onClick={() => (goBack ? history.goBack() : history.push('/dashboard/messages'))}
        >
          Ok
        </button>
      </div>
    </>
  );
};

export default ChatRemoveConversation;
