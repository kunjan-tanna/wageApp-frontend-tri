import { eventChannel } from 'redux-saga';
import { call, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { hubConnection, Proxy } from 'signalr-no-jquery';

import { ApiConfig, SignalR } from '../../config';
import { authManager } from '../../utils/api/client';
import { apiClient, tokenStore } from '../../utils/api/client';
import * as actions from './actions';
import { conversationsListSelector, signalRHubProxySelector } from './selectors';
import {
  GetConversationsResponsePayload,
  IChatGetConversationDetailsRequest,
  IChatGetConversationDetailsResponse,
  IChatGetConversationDetailsSuccess,
  IChatRemoveConversationRequest,
  IConversation,
  MessageStatuses,
  MessageTypes
} from './types';
import {
  IChatSignalRConnectionRequest,
  IChatSignalRReconnectionRequest,
  IChatSignalRSendMessage,
  IConfirmationReceivedResponse,
  ISignalRMessageResponse
} from './types/signalr';
import { IStoreState } from '../../store';
import { mixPanelEvent, createAlias, setUserProfile } from '../../utils/MixPanel';
import moment from 'moment';
import mt from 'moment-timezone';
import { db } from '../../utils/Firebase/index';

const getConversationsRequest = async (): Promise<GetConversationsResponsePayload> => {
  const { data } = await apiClient.get<any>(ApiConfig.endpoints.chat.getConversations, {
    baseURL: ApiConfig.URL
  });
  let tmp = data.conversations;
  for (let i = 0; i < data.conversations.length; i++) {
    let a = await db
      .collection('Conversations')
      .doc(String(data.conversations[i].conversationId))
      .get();
    tmp[i].lastMessage = a.data()?.lastSentMessageDate?.seconds || null;
  }
  tmp.sort((a: any, b: any) => {
    return b.lastMessage - a.lastMessage;
  });
  data.conversations = tmp;
  // return tmp;
  return data;
};

export function* getConversationsSaga() {
  try {
    const response: GetConversationsResponsePayload = yield call(getConversationsRequest);

    yield put(actions.chatGetConversationsSuccess(response));
  } catch (error) {
    yield put(actions.chatGetConversationsError());
  }
}

const getConversationDetailsRequest = async (
  payload: number
): Promise<IChatGetConversationDetailsSuccess> => {
  const { data } = await apiClient.get<any>(
    ApiConfig.endpoints.chat.getConversationDetails(payload),
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* getConversationDetailsSaga(action: IChatGetConversationDetailsRequest) {
  const { payload } = action;

  try {
    const response: IChatGetConversationDetailsResponse = yield call(
      getConversationDetailsRequest,
      payload
    );
    const { converser, offer, messages, isConversationRead } = response;

    yield put(
      actions.chatGetConversationDetailsSuccess({
        converser,
        offer,
        messages: messages.map(
          ({ id, senderId, text, dateSent, messageContentType, senderAvatarUrl }) => ({
            messageId: id,
            senderId,
            text: messageContentType === 1 ? text : `${ApiConfig.URL}/${text}`,
            dateSent,
            type: messageContentType === 1 ? MessageTypes.TEXT : MessageTypes.IMAGE,
            senderAvatarUrl,
            status: MessageStatuses.SENT,
            tempId: null
          })
        )
      })
    );

    if (!isConversationRead) {
      yield call(markConversationAsReadSaga, payload);
    }
  } catch (error) {
    yield put(actions.chatGetConversationDetailsError());
  }
}

export function* markConversationAsReadSaga(conversationId: number) {
  try {
    yield apiClient.post<any>(
      ApiConfig.endpoints.chat.markConversationAsRead(conversationId),
      null,
      { baseURL: ApiConfig.URL }
    );
  } finally {
    yield put(actions.chatMarkConversationAsRead(conversationId));
  }
}

export function* removeConversationSaga(action: IChatRemoveConversationRequest) {
  const { payload } = action;

  try {
    yield apiClient.post<any>(ApiConfig.endpoints.chat.deleteConversation(payload), null, {
      baseURL: ApiConfig.URL
    });

    yield put(actions.chatRemoveConversationSuccess(payload));

    //Chat removed event called here
    mixPanelEvent('Chat deleted', {
      'Date deleted': mt(new Date())
        .tz('America/Galapagos')
        .format('MM/DD/YYYY')
    });
  } catch (error) {
    yield put(actions.chatRemoveConversationError());
  }
}

function* setMessageReceivedEvent(hubProxy: Proxy) {
  const messageReceivedChannel = eventChannel(emit => {
    const eventName = 'MessageReceived';

    hubProxy.on(eventName, (messageData: ISignalRMessageResponse) => {
      emit(messageData);
    });

    return () => {
      hubProxy.off(eventName, () => null);
    };
  });

  while (true) {
    const msgData: ISignalRMessageResponse = yield take(messageReceivedChannel);

    if (msgData) {
      const conversations = yield select(state => conversationsListSelector(state.chat));
      const { conversationId } = msgData;

      if (
        conversations.length > 0 &&
        !conversations.find((item: IConversation) => item.conversationId === conversationId)
      ) {
        const conversationDetails: IChatGetConversationDetailsResponse = yield call(
          getConversationDetailsRequest,
          conversationId
        );

        const { converser, offer, messages } = conversationDetails;

        yield put(
          actions.signalRConversationStarted([
            {
              conversationId,
              converser: {
                ...converser
              },
              isConversationRead: false,
              offer: {
                ...offer
              },
              lastMessage: messages.length > 0 ? messages[messages.length - 1] : null
            }
          ])
        );
      } else {
        const {
          senderFirstName,
          senderLastName,
          senderBusinessName,
          messageId,
          senderId,
          text,
          dateTimeSent,
          messageContentType,
          senderAccountType,
          senderAvatarUrl,
          offerCoverPhotoUrl,
          offerDateCreated,
          offerId,
          offerTitle,
          offerType
        } = msgData;

        yield put(
          actions.signalRMessageReceived({
            converser: {
              id: senderId,
              accountType: senderAccountType,
              firstName: senderFirstName ? senderFirstName : '',
              lastName: senderLastName ? senderLastName : '',
              businessName: senderBusinessName,
              avatarUrl: senderAvatarUrl
            },
            messages: [
              {
                messageId,
                senderId,
                text,
                dateSent: dateTimeSent,
                type: messageContentType === 1 ? MessageTypes.TEXT : MessageTypes.IMAGE,
                senderAvatarUrl,
                status: MessageStatuses.SENT,
                tempId: null
              }
            ],
            offer: {
              coverPhotoUrl: offerCoverPhotoUrl,
              dateCreated: offerDateCreated,
              id: offerId,
              title: offerTitle,
              type: offerType
            }
          })
        );
      }
    }
  }
}

function* setConfirmationReceivedEvent(hubProxy: Proxy) {
  const confirmationReceivedChannel = eventChannel(emit => {
    const eventName = 'ConfirmationReceived';

    hubProxy.on(eventName, (confirmationData: IConfirmationReceivedResponse) => {
      emit(confirmationData);
    });

    return () => {
      hubProxy.off(eventName, () => null);
    };
  });

  while (true) {
    const confirmation: IConfirmationReceivedResponse = yield take(confirmationReceivedChannel);

    if (confirmation) {
      yield put(actions.signalRConfirmationReceived(confirmation));
    }
  }
}

const signalRConnection = async (hubProxy: Proxy) => {
  const promise = new Promise((resolve, reject) => {
    return hubProxy.connection
      .start()
      .done(() => resolve(true))
      .fail(() => reject(new Error()));
  });

  return promise;
};

export function* signalRConnectionRequestSaga(action: IChatSignalRConnectionRequest) {
  const retryCount = action.payload?.retryCount ?? 0;
  const maxRetryCount = 3;
  const token = tokenStore.get() ? tokenStore.get().access_token : null;
  const hubName = SignalR.hubName;
  const connection = hubConnection(SignalR.host, {
    qs: `Authorization=Bearer ${token}`
  });
  const hubProxy = connection.createHubProxy(hubName);

  yield fork(setMessageReceivedEvent, hubProxy);
  yield fork(setConfirmationReceivedEvent, hubProxy);

  try {
    yield signalRConnection(hubProxy);
    yield put(actions.signalRConnectionSuccess(hubProxy));
  } catch (error) {
    const userEmail = (state: IStoreState) => state.currentUser.currentUser.email;
    const logged = yield select(userEmail);
    yield put(actions.signalRConnectionError());

    if (logged && retryCount !== -1 && retryCount < maxRetryCount) {
      yield put(
        actions.signalRReconnectionRequest({
          retryCount: retryCount + 1
        })
      );
    }
  }
}

export function* signalRConnectionStopSaga() {
  const hubProxy = yield select(state => signalRHubProxySelector(state.chat));

  if (hubProxy) {
    yield hubProxy.connection.stop();
  }
  yield put(actions.signalRConnectionStopSuccess());
}

export function* signalRSendMessageSaga(action: IChatSignalRSendMessage) {
  const hubProxy = yield select(state => signalRHubProxySelector(state.chat));
  const { payload } = action;

  try {
    yield hubProxy.invoke('SendMessage', payload);
    yield put(
      actions.signalRDeleteMessage({ messageId: payload.messageId ? payload.messageId : 0 })
    );
  } catch (error) {
    yield put(
      actions.signalRReconnectionRequest({
        retryCount: -1
      })
    );
    yield put(actions.signalRSendMessageError(payload));
  }
}

export function* signalRReconnectionSaga(action: IChatSignalRReconnectionRequest) {
  const hubProxy = yield select(state => signalRHubProxySelector(state.chat));

  if (hubProxy) {
    yield hubProxy.connection.stop();
  }
  yield authManager.reloadToken();
  yield put(
    actions.signalRConnectionRequest({
      retryCount: action.payload.retryCount
    })
  );
}

export default function*() {
  yield takeLatest(actions.ActionTypes.CHAT_GET_CONVERSATIONS_REQUEST, getConversationsSaga);
  yield takeLatest(
    actions.ActionTypes.CHAT_GET_CONVERSATION_DETAILS_REQUEST,
    getConversationDetailsSaga
  );
  yield takeLatest(actions.ActionTypes.CHAT_REMOVE_CONVERSATION_REQUEST, removeConversationSaga);
  yield takeLatest(
    actions.ActionTypes.CHAT_SIGNALR_CONNECTION_REQUEST,
    signalRConnectionRequestSaga
  );
  yield takeLatest(
    actions.ActionTypes.CHAT_SIGNALR_CONNECTION_STOP_REQUEST,
    signalRConnectionStopSaga
  );
  yield takeEvery(actions.ActionTypes.CHAT_SIGNALR_SEND_MESSAGE, signalRSendMessageSaga);
  yield takeLatest(actions.ActionTypes.CHAT_SIGNALR_RECONNECTION_REQUEST, signalRReconnectionSaga);
}
