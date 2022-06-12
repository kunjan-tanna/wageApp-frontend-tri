import { combineReducers } from 'redux';
import { ActionTypes as BlockPeopleActionTypes } from '../../modules/Modals/BlockPeople/actions';
import { Actions, ActionTypes as ChatActionTypes } from './actions';
import {
  IChatStoreState,
  IConversationDetails,
  IConversationRemove,
  IConversationsList,
  MessageStatuses
} from './types';
import { ConfirmationErrorTypes, ISignalR, myselfSenderID } from './types/signalr';

const conversationsListInitial: IConversationsList = {
  error: false,
  requesting: false,
  data: []
};

const conversationDetailsInitial = {
  error: false,
  requesting: false,
  data: null
};

const signalRInitial = {
  hubProxy: null
};

const conversationRemoveInitial = {
  requesting: false,
  success: false,
  error: false
};

const conversationsList = (
  state: IConversationsList = conversationsListInitial,
  action: Actions
): IConversationsList => {
  switch (action.type) {
    case ChatActionTypes.CHAT_GET_CONVERSATIONS_REQUEST:
      return {
        ...state,
        requesting: true,
        error: false
      };

    case ChatActionTypes.CHAT_GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: false,
        data: action.payload.conversations.reverse().map(item => ({
          ...item,
          converser: {
            ...item.converser
          },
          offer: {
            ...item.offer
          }
        }))
      };

    case ChatActionTypes.CHAT_GET_CONVERSATIONS_ERROR:
      return {
        ...state,
        requesting: false,
        error: true,
        data: []
      };

    case ChatActionTypes.CHAT_SIGNALR_CONVERSATION_STARTED:
      return {
        ...state,
        data: [...action.payload, ...state.data]
      };

    case ChatActionTypes.CHAT_SIGNALR_MESSAGE_RECEIVED:
      return {
        ...state,
        data: [
          ...state.data
            .filter(
              item =>
                item.offer.id === action.payload.offer.id &&
                item.converser.id === action.payload.converser.id
            )
            .map(item => {
              return {
                ...item,
                isConversationRead: false
              };
            }),
          ...state.data.filter(item => item.offer.id !== action.payload.offer.id)
        ]
      };

    case ChatActionTypes.CHAT_MARK_CONVERSATION_AS_READ:
      return {
        ...state,
        data: [
          ...state.data.map(item => {
            if (item.conversationId === action.payload) {
              return {
                ...item,
                isConversationRead: true
              };
            }
            return item;
          })
        ]
      };

    case ChatActionTypes.CHAT_REMOVE_CONVERSATION_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter(item => item.conversationId !== action.payload)]
      };

    default:
      return state;
  }
};

const conversationDetails = (
  state: IConversationDetails = conversationDetailsInitial,
  action: Actions
): IConversationDetails => {
  switch (action.type) {
    case ChatActionTypes.CHAT_GET_CONVERSATION_DETAILS_REQUEST:
      return {
        ...state,
        requesting: true,
        error: false
      };

    case ChatActionTypes.CHAT_GET_CONVERSATION_DETAILS_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: false,
        data: {
          ...action.payload,
          offer: {
            ...action.payload.offer
          }
        }
      };

    case ChatActionTypes.CHAT_GET_CONVERSATION_DETAILS_ERROR:
      return {
        ...state,
        requesting: false,
        error: true,
        data: null
      };

    case ChatActionTypes.CHAT_SIGNALR_MESSAGE_RECEIVED:
      if (state.data && state.data.offer.id === action.payload.offer.id) {
        return {
          ...state,
          data: {
            ...state.data,
            messages: [...state.data.messages, ...action.payload.messages]
          }
        };
      }

      return state;

    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS:
    case BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_SUCCESS: {
      const isBlocked =
        action.type === BlockPeopleActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_SUCCESS;

      if (state.data && state.data.converser.id === action.payload.id) {
        return {
          ...state,
          data: {
            ...state.data,
            converser: {
              ...state.data.converser,
              isBlocked
            }
          }
        };
      }
      return state;
    }

    case ChatActionTypes.CHAT_SIGNALR_SEND_MESSAGE:
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            messages: [
              ...state.data.messages,
              {
                messageId: new Date().getTime(),
                senderId: myselfSenderID,
                text: action.payload.Message,
                dateSent: new Date().toISOString(),
                type: action.payload.MessageContentType,
                senderAvatarUrl: '',
                status: MessageStatuses.SENDING,
                tempId: action.payload.TempId
              }
            ]
          }
        };
      }
      return state;

    case ChatActionTypes.CHAT_SIGNALR_DELETE_MESSAGE:
      const { payload } = action;

      if (state.data) {
        if (
          state.data.messages.find(
            item => item.messageId === payload.messageId && item.status === 'error'
          )
        ) {
          return {
            ...state,
            data: {
              ...state.data,
              messages: state.data.messages.filter(item => item.messageId !== payload.messageId)
            }
          };
        }
      }

      return state;

    case ChatActionTypes.CHAT_SIGNALR_SEND_MESSAGE_ERROR:
      if (state.data && state.data.offer.id === action.payload.OfferId) {
        return {
          ...state,
          data: {
            ...state.data,
            messages: [
              ...state.data.messages.map(item => {
                if (
                  item.text === action.payload.Message &&
                  item.status === MessageStatuses.SENDING
                ) {
                  return {
                    ...item,
                    status: MessageStatuses.ERROR
                  };
                }

                return item;
              })
            ]
          }
        };
      }
      return state;

    case ChatActionTypes.CHAT_SIGNALR_CONFIRMATION_RECEIVED: {
      const isBlocked =
        !action.payload.success && action.payload.errorType === ConfirmationErrorTypes.BLOCKED;

      if (state.data && state.data.offer.id === action.payload.message.offerId) {
        return {
          ...state,
          data: {
            ...state.data,
            converser: {
              ...state.data.converser,
              communicationBlocked: isBlocked
            },
            messages: [
              ...state.data.messages.map(item => {
                if (
                  item.tempId === action.payload.message.tempId &&
                  item.status === MessageStatuses.SENDING
                ) {
                  return {
                    ...item,
                    status: action.payload.success ? MessageStatuses.SENT : MessageStatuses.ERROR
                  };
                }

                return item;
              })
            ]
          }
        };
      }
      return state;
    }

    default:
      return state;
  }
};

const signalR = (state: ISignalR = signalRInitial, action: Actions): ISignalR => {
  switch (action.type) {
    case ChatActionTypes.CHAT_SIGNALR_CONNECTION_SUCCESS: {
      return {
        hubProxy: action.payload
      };
    }
    case ChatActionTypes.CHAT_SIGNALR_CONNECTION_ERROR:
    case ChatActionTypes.CHAT_SIGNALR_CONNECTION_STOP_SUCCESS: {
      return {
        hubProxy: null
      };
    }
    default: {
      return state;
    }
  }
};

const conversationRemove = (
  state: IConversationRemove = conversationRemoveInitial,
  action: Actions
): IConversationRemove => {
  switch (action.type) {
    case ChatActionTypes.CHAT_REMOVE_CONVERSATION_REQUEST: {
      return {
        success: false,
        requesting: true,
        error: false
      };
    }
    case ChatActionTypes.CHAT_REMOVE_CONVERSATION_SUCCESS: {
      return {
        success: true,
        requesting: false,
        error: false
      };
    }
    case ChatActionTypes.CHAT_REMOVE_CONVERSATION_ERROR: {
      return {
        success: false,
        requesting: false,
        error: true
      };
    }
    case ChatActionTypes.CHAT_REMOVE_CONVERSATION_RESET: {
      return conversationRemoveInitial;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers<IChatStoreState, Actions>({
  conversationsList,
  conversationDetails,
  signalR,
  conversationRemove
});
