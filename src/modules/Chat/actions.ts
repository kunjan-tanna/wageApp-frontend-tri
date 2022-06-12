import { Proxy } from 'signalr-no-jquery';
import {
  IBlockPeopleModalBlockUserSuccess,
  IBlockPeopleModalUnblockUserSuccess
} from '../Modals/BlockPeople/types';
import {
  GetConversationsResponsePayload,
  IChatGetConversationDetailsError,
  IChatGetConversationDetailsRequest,
  IChatGetConversationDetailsSuccess,
  IChatGetConversationsError,
  IChatGetConversationsRequest,
  IChatGetConversationsSuccess,
  IChatMarkConversationAsRead,
  IChatRemoveConversationError,
  IChatRemoveConversationRequest,
  IChatRemoveConversationReset,
  IChatRemoveConversationSuccess,
  IConversation,
  IConversationDetailsData
} from './types';
import {
  IChatSignalRConfirmationReceived,
  IChatSignalRConnectionError,
  IChatSignalRConnectionRequest,
  IChatSignalRConnectionStopRequest,
  IChatSignalRConnectionStopSuccess,
  IChatSignalRConnectionSuccess,
  IChatSignalRConversationStarted,
  IChatSignalRDeleteMessage,
  IChatSignalRDeleteMessagePayload,
  IChatSignalRMessageReceived,
  IChatSignalRReconnectionRequest,
  IChatSignalRSendMessage,
  IChatSignalRSendMessageError,
  IConfirmationReceivedResponse,
  IMessageReceivedPayload,
  IRetryCountPayload,
  ISendMessagePayload
} from './types/signalr';

export enum ActionTypes {
  CHAT_GET_CONVERSATIONS_REQUEST = '[CHAT] - get conversations - request',
  CHAT_GET_CONVERSATIONS_SUCCESS = '[CHAT] - get conversations - success',
  CHAT_GET_CONVERSATIONS_ERROR = '[CHAT] - get conversations - error',
  CHAT_GET_CONVERSATION_DETAILS_REQUEST = '[CHAT] - get conversation details - request',
  CHAT_GET_CONVERSATION_DETAILS_SUCCESS = '[CHAT] - get conversation details - success',
  CHAT_GET_CONVERSATION_DETAILS_ERROR = '[CHAT] - get conversation details - error',
  CHAT_MARK_CONVERSATION_AS_READ = '[CHAT] - mark conversation as read',
  CHAT_REMOVE_CONVERSATION_REQUEST = '[CHAT] - remove conversation - request',
  CHAT_REMOVE_CONVERSATION_ERROR = '[CHAT] - remove conversation - error',
  CHAT_REMOVE_CONVERSATION_SUCCESS = '[CHAT] - remove conversation - success',
  CHAT_REMOVE_CONVERSATION_RESET = '[CHAT] - remove conversation - reset',
  CHAT_SIGNALR_CONNECTION_REQUEST = '[CHAT] - SignalR - connection - request',
  CHAT_SIGNALR_CONNECTION_SUCCESS = '[CHAT] - SignalR - connection - success',
  CHAT_SIGNALR_CONNECTION_STOP_REQUEST = '[CHAT] - SignalR - stop - request',
  CHAT_SIGNALR_CONNECTION_STOP_SUCCESS = '[CHAT] - SignalR - stop - success',
  CHAT_SIGNALR_CONNECTION_ERROR = '[CHAT] - SignalR - connection - error',
  CHAT_SIGNALR_RECONNECTION_REQUEST = '[CHAT] - SignalR - reconnection - request',
  CHAT_SIGNALR_MESSAGE_RECEIVED = '[CHAT] - SignalR - MessageReceived',
  CHAT_SIGNALR_CONFIRMATION_RECEIVED = '[CHAT] - SignalR - ConfirmationReceived',
  CHAT_SIGNALR_CONVERSATION_STARTED = '[CHAT] - SignalR - conversation started',
  CHAT_SIGNALR_SEND_MESSAGE = '[CHAT] - SignalR - SendMessage',
  CHAT_SIGNALR_SEND_MESSAGE_ERROR = '[CHAT] - SignalR - SendMessage - error',
  CHAT_SIGNALR_DELETE_MESSAGE = '[CHAT] - SignalR - DeleteMessage'
}

export type Actions =
  | IChatGetConversationsRequest
  | IChatGetConversationsSuccess
  | IChatGetConversationsError
  | IChatGetConversationDetailsRequest
  | IChatGetConversationDetailsSuccess
  | IChatGetConversationDetailsError
  | IChatMarkConversationAsRead
  | IChatRemoveConversationRequest
  | IChatRemoveConversationSuccess
  | IChatRemoveConversationError
  | IChatRemoveConversationReset
  | IChatSignalRConnectionRequest
  | IChatSignalRConnectionSuccess
  | IChatSignalRConnectionError
  | IChatSignalRConnectionStopRequest
  | IChatSignalRConnectionStopSuccess
  | IChatSignalRReconnectionRequest
  | IChatSignalRMessageReceived
  | IChatSignalRConfirmationReceived
  | IChatSignalRConversationStarted
  | IChatSignalRSendMessage
  | IChatSignalRSendMessageError
  | IChatSignalRDeleteMessage
  | IBlockPeopleModalBlockUserSuccess
  | IBlockPeopleModalUnblockUserSuccess;

export const chatGetConversationsRequest = () => {
  return {
    type: ActionTypes.CHAT_GET_CONVERSATIONS_REQUEST
  };
};

export const chatGetConversationsSuccess = (
  payload: GetConversationsResponsePayload
): IChatGetConversationsSuccess => {
  return {
    type: ActionTypes.CHAT_GET_CONVERSATIONS_SUCCESS,
    payload
  };
};

export const chatGetConversationsError = () => {
  return {
    type: ActionTypes.CHAT_GET_CONVERSATIONS_ERROR
  };
};

export const chatGetConversationDetailsRequest = (payload: number) => {
  return {
    type: ActionTypes.CHAT_GET_CONVERSATION_DETAILS_REQUEST,
    payload
  };
};

export const chatGetConversationDetailsSuccess = (payload: IConversationDetailsData) => {
  return {
    type: ActionTypes.CHAT_GET_CONVERSATION_DETAILS_SUCCESS,
    payload
  };
};

export const chatGetConversationDetailsError = () => {
  return {
    type: ActionTypes.CHAT_GET_CONVERSATION_DETAILS_ERROR
  };
};

export const chatMarkConversationAsRead = (payload: number) => {
  return {
    type: ActionTypes.CHAT_MARK_CONVERSATION_AS_READ,
    payload
  };
};

export const chatRemoveConversationRequest = (payload: number) => {
  return {
    type: ActionTypes.CHAT_REMOVE_CONVERSATION_REQUEST,
    payload
  };
};

export const chatRemoveConversationSuccess = (payload: number) => {
  return {
    type: ActionTypes.CHAT_REMOVE_CONVERSATION_SUCCESS,
    payload
  };
};

export const chatRemoveConversationError = () => {
  return {
    type: ActionTypes.CHAT_REMOVE_CONVERSATION_ERROR
  };
};

export const chatRemoveConversationReset = () => {
  return {
    type: ActionTypes.CHAT_REMOVE_CONVERSATION_RESET
  };
};

export const signalRConnectionRequest = (payload?: IRetryCountPayload) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_CONNECTION_REQUEST,
    payload
  };
};

export const signalRConnectionSuccess = (payload: Proxy) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_CONNECTION_SUCCESS,
    payload
  };
};

export const signalRConnectionError = () => {
  return {
    type: ActionTypes.CHAT_SIGNALR_CONNECTION_ERROR
  };
};

export const signalRConnectionStopRequest = () => {
  return {
    type: ActionTypes.CHAT_SIGNALR_CONNECTION_STOP_REQUEST
  };
};

export const signalRConnectionStopSuccess = () => {
  return {
    type: ActionTypes.CHAT_SIGNALR_CONNECTION_STOP_SUCCESS
  };
};

export const signalRReconnectionRequest = (payload?: IRetryCountPayload) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_RECONNECTION_REQUEST,
    payload
  };
};

export const signalRMessageReceived = (payload: IMessageReceivedPayload) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_MESSAGE_RECEIVED,
    payload
  };
};

export const signalRConfirmationReceived = (payload: IConfirmationReceivedResponse) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_CONFIRMATION_RECEIVED,
    payload
  };
};

export const signalRConversationStarted = (payload: IConversation[]) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_CONVERSATION_STARTED,
    payload
  };
};

export const signalRSendMessage = (payload: ISendMessagePayload) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_SEND_MESSAGE,
    payload
  };
};

export const signalRSendMessageError = (payload: ISendMessagePayload) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_SEND_MESSAGE_ERROR,
    payload
  };
};

export const signalRDeleteMessage = (payload: IChatSignalRDeleteMessagePayload) => {
  return {
    type: ActionTypes.CHAT_SIGNALR_DELETE_MESSAGE,
    payload
  };
};
