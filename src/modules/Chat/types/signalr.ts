import { Proxy } from 'signalr-no-jquery';
import { Nullable } from '../../../types';
import { AccountType } from '../../../types';
import { OfferType } from '../../../types/offers';
import { ActionTypes } from '../actions';
import { IConversation, ISingleMessage, MessageType } from '../types';

export interface ISignalR {
  hubProxy: Nullable<Proxy>;
}

export interface IChatSignalRConnectionRequest {
  readonly type: ActionTypes.CHAT_SIGNALR_CONNECTION_REQUEST;
  payload: IRetryCountPayload;
}

export interface IChatSignalRConnectionSuccess {
  readonly type: ActionTypes.CHAT_SIGNALR_CONNECTION_SUCCESS;
  payload: Proxy;
}

export interface IChatSignalRConnectionStopRequest {
  readonly type: ActionTypes.CHAT_SIGNALR_CONNECTION_STOP_REQUEST;
}

export interface IChatSignalRConnectionStopSuccess {
  readonly type: ActionTypes.CHAT_SIGNALR_CONNECTION_STOP_SUCCESS;
}

export interface IChatSignalRConnectionError {
  readonly type: ActionTypes.CHAT_SIGNALR_CONNECTION_ERROR;
}

export interface IChatSignalRReconnectionRequest {
  readonly type: ActionTypes.CHAT_SIGNALR_RECONNECTION_REQUEST;
  payload: IRetryCountPayload;
}

export interface IChatSignalRMessageReceived {
  readonly type: ActionTypes.CHAT_SIGNALR_MESSAGE_RECEIVED;
  payload: IMessageReceivedPayload;
}

export interface IChatSignalRConfirmationReceived {
  readonly type: ActionTypes.CHAT_SIGNALR_CONFIRMATION_RECEIVED;
  payload: IConfirmationReceivedResponse;
}

export interface IChatSignalRConversationStarted {
  readonly type: ActionTypes.CHAT_SIGNALR_CONVERSATION_STARTED;
  payload: IConversation[];
}

export interface IChatSignalRSendMessage {
  readonly type: ActionTypes.CHAT_SIGNALR_SEND_MESSAGE;
  payload: ISendMessagePayload;
}

export interface IChatSignalRDeleteMessage {
  readonly type: ActionTypes.CHAT_SIGNALR_DELETE_MESSAGE;
  payload: IChatSignalRDeleteMessagePayload;
}

export interface IChatSignalRDeleteMessagePayload {
  messageId: number;
}

export interface IChatSignalRSendMessageError {
  readonly type: ActionTypes.CHAT_SIGNALR_SEND_MESSAGE_ERROR;
  payload: ISendMessagePayload;
}

export interface ISignalRMessageResponse {
  conversationId: number;
  dateTimeSent: string;
  messageContentType: number;
  messageId: number;
  offerCoverPhotoUrl: string;
  offerDateCreated: string;
  offerId: number;
  offerTitle: string;
  offerType: OfferType;
  senderAccountType: AccountType;
  senderAvatarUrl: string;
  senderBusinessName: Nullable<string>;
  senderFirstName: Nullable<string>;
  senderId: string;
  senderLastName: Nullable<string>;
  text: string;
}

export interface IRetryCountPayload {
  retryCount: number;
}

export interface IMessageReceivedPayload {
  converser: {
    id: string;
    accountType: AccountType;
    firstName: Nullable<string>;
    lastName: Nullable<string>;
    businessName: Nullable<string>;
    avatarUrl: Nullable<string>;
  };
  messages: ISingleMessage[];
  offer: {
    coverPhotoUrl: string;
    dateCreated: string;
    id: number;
    title: string;
    type: OfferType;
  };
}

export interface ISendMessagePayload {
  OfferId: number;
  RecipientId: string;
  MessageContentType: MessageType;
  Message: string;
  Image?: string;
  FileName?: string;
  TempId: string;
  messageId?: number;
  file: any;
}

export enum ConfirmationErrorTypes {
  INTERNAL = 1,
  VALIDATION = 2,
  BLOCKED = 3,
  SENT_TO_YOURSELF = 4,
  NOT_A_TASKER = 5
}

export type ConfirmationErrorType =
  | ConfirmationErrorTypes.INTERNAL
  | ConfirmationErrorTypes.VALIDATION
  | ConfirmationErrorTypes.BLOCKED
  | ConfirmationErrorTypes.SENT_TO_YOURSELF
  | ConfirmationErrorTypes.NOT_A_TASKER;

export interface IConfirmationReceivedResponse {
  errorType: ConfirmationErrorType;
  errors: any;
  message: {
    fileName: string;
    image: string;
    message: string;
    messageContentType: MessageType;
    offerId: number;
    recipientId: string;
    tempId: string;
  };
  success: boolean;
}

export const myselfSenderID = '_MYSELF_';
