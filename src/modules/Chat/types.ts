import { ILocation, Nullable } from '../../types';
import { OfferType } from '../../types/offers';
import { IUserDetails } from '../User/types';
import { ActionTypes } from './actions';
import { ISignalR } from './types/signalr';

export type GetConversationsResponsePayload = {
  conversations: IConversation[];
};

export interface IChatGetConversationsRequest {
  readonly type: ActionTypes.CHAT_GET_CONVERSATIONS_REQUEST;
}

export interface IChatGetConversationsSuccess {
  readonly type: ActionTypes.CHAT_GET_CONVERSATIONS_SUCCESS;
  payload: GetConversationsResponsePayload;
}

export interface IChatGetConversationsError {
  readonly type: ActionTypes.CHAT_GET_CONVERSATIONS_ERROR;
}

export interface IChatGetConversationDetailsRequest {
  readonly type: ActionTypes.CHAT_GET_CONVERSATION_DETAILS_REQUEST;
  payload: number;
}

export interface IChatRemoveConversationRequest {
  readonly type: ActionTypes.CHAT_REMOVE_CONVERSATION_REQUEST;
  payload: number;
}

export interface IChatRemoveConversationSuccess {
  readonly type: ActionTypes.CHAT_REMOVE_CONVERSATION_SUCCESS;
  payload: number;
}

export interface IChatRemoveConversationError {
  readonly type: ActionTypes.CHAT_REMOVE_CONVERSATION_ERROR;
}

export interface IChatRemoveConversationReset {
  readonly type: ActionTypes.CHAT_REMOVE_CONVERSATION_RESET;
}

export interface IChatGetConversationDetailsResponse {
  converser: IConverser;
  messages: ILastMessage[];
  offer: IConversationOffer;
  isConversationRead: boolean;
}

export interface IChatGetConversationDetailsSuccess {
  readonly type: ActionTypes.CHAT_GET_CONVERSATION_DETAILS_SUCCESS;
  payload: IConversationDetailsData;
}

export interface IChatGetConversationDetailsError {
  readonly type: ActionTypes.CHAT_GET_CONVERSATION_DETAILS_ERROR;
}

export interface IChatMarkConversationAsRead {
  readonly type: ActionTypes.CHAT_MARK_CONVERSATION_AS_READ;
  payload: number;
}

export interface IChatStoreState {
  conversationsList: IConversationsList;
  conversationDetails: IConversationDetails;
  signalR: ISignalR;
  conversationRemove: IConversationRemove;
}

export interface IConversationOffer {
  coverPhotoUrl: Nullable<string>;
  dateCreated: Date;
  description: string;
  id: number;
  location: ILocation;
  numberOfBidders: number;
  ownerId: string;
  price: Nullable<number>;
  status: string;
  title: string;
  type: OfferType;
}

export interface IConverser extends IUserDetails {
  businessAddressCity: Nullable<string>;
  businessAddressStreet: Nullable<string>;
  businessPhoneNumber: Nullable<string>;
  businessWebAddress: Nullable<string>;
}

export interface IConversation {
  conversationId: number;
  converser: IConverser;
  isConversationRead: boolean;
  lastMessage: Nullable<ILastMessage>;
  offer: IConversationOffer;
}

export interface ILastMessage {
  dateSent: string;
  id: number;
  messageContentType: number;
  senderAvatarUrl: string;
  senderId: string;
  text: string;
}

export interface IConversationsList {
  requesting: boolean;
  error: boolean;
  data: IConversation[];
}

export interface IConversationDetails {
  requesting: boolean;
  error: boolean;
  data: Nullable<IConversationDetailsData>;
}

export interface IConversationDetailsData {
  converser: IConverser;
  messages: ISingleMessage[];
  offer: IConversationOffer;
}

export enum MessageTypes {
  TEXT = 'Text',
  IMAGE = 'Image'
}

export enum MessageStatuses {
  ERROR = 'error',
  SENDING = 'sending',
  SENT = 'sent'
}

export type MessageType = MessageTypes.TEXT | MessageTypes.IMAGE;

export type MessageStatus = MessageStatuses.ERROR | MessageStatuses.SENDING | MessageStatuses.SENT;

export interface ISingleMessage {
  messageId: number;
  senderId: string;
  text: string;
  dateSent: string;
  type: MessageType;
  senderAvatarUrl: string;
  status: MessageStatus;
  tempId: Nullable<string>;
  imageUrl?: string;
}

export interface IConversationRemove {
  requesting: boolean;
  success: boolean;
  error: boolean;
}

export interface IMessageFirebase {
  text: string;
  createdAt: string;
}
