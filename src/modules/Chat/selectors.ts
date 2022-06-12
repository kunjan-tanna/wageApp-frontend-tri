import { Proxy } from 'signalr-no-jquery';
import { Nullable } from '../../types';
import { OfferType } from '../../types/offers';
import { IChatStoreState, IConversation, IConversationDetailsData } from './types';
import { db } from '../../utils/Firebase/index';

const timeout = (delay: number) => {
  return new Promise(res => setTimeout(res, delay));
};

const conversationsListRequestingSelector = (state: IChatStoreState): any => {
  console.log('\n\n WWWWWW', state.conversationsList.requesting);
  if (state.conversationsList.requesting) {
    return state.conversationsList.requesting;
  } else {
    setTimeout(() => {
      return state.conversationsList.requesting;
    }, 3000);
    // timeout(5000).then(() => {
    //   return state.conversationsList.requesting;
    // })
  }
};

const conversationsListErrorSelector = (state: IChatStoreState): boolean => {
  return state.conversationsList.error;
};

const conversationsListSelector = (state: IChatStoreState): IConversation[] => {
  // let tmp = state.conversationsList.data;
  // for (let i = 0; i < state.conversationsList.data.length; i++) {
  //   db.collection('Conversations')
  //     .doc(String(state.conversationsList.data[i].conversationId))
  //     .get().then(res => {
  //       tmp[i].lastMessage = res.data() ?.lastSentMessageDate ?.seconds || null;
  //     });
  // }
  // tmp.sort((a: any, b: any) => {
  //   return b.lastMessage - a.lastMessage;
  // });
  // state.conversationsList.data.map(c => {
  //   db.collection('Conversations')
  //     .doc(String(c.conversationId))
  //     .onSnapshot(async querySnapShort => {
  //       let tmp = state.conversationsList.data;
  //       for (let i = 0; i < state.conversationsList.data.length; i++) {
  //         db.collection('Conversations')
  //           .doc(String(state.conversationsList.data[i].conversationId))
  //           .get().then(res => {
  //             tmp[i].lastMessage = res.data() ?.lastSentMessageDate ?.seconds;
  //           });
  //       }
  //       tmp.sort((a: any, b: any) => {
  //         return b.lastMessage - a.lastMessage;
  //       });
  //     });
  // });
  return state.conversationsList.data;
};

const conversationsListByTypeSelector = (state: IChatStoreState, offerType: OfferType) => {
  return conversationsListSelector(state).filter(item => item.offer.type === offerType);
};

const conversationDetailsSelector = (
  state: IChatStoreState
): Nullable<IConversationDetailsData> => {
  if (state.conversationDetails.data) {
    return state.conversationDetails.data;
  }

  return null;
};

const conversationDetailsRequestingSelector = (state: IChatStoreState): boolean => {
  return state.conversationDetails.requesting;
};

const conversationDetailsErrorSelector = (state: IChatStoreState): boolean => {
  return state.conversationDetails.error;
};

const signalRHubProxySelector = (state: IChatStoreState): Nullable<Proxy> => {
  return state.signalR.hubProxy ? state.signalR.hubProxy : null;
};

const conversationRemoveRequestingSelector = (state: IChatStoreState): boolean => {
  return state.conversationRemove.requesting;
};

const conversationRemoveSuccessSelector = (state: IChatStoreState): boolean => {
  return state.conversationRemove.success;
};

const conversationRemoveErrorSelector = (state: IChatStoreState): boolean => {
  return state.conversationRemove.error;
};

const unreadConversationsSelector = (state: IChatStoreState): number => {
  return conversationsListSelector(state).filter(item => !item.isConversationRead).length;
};

const unreadConversationsSelector2 = (state: any): number => {
  return state.filter((item: any) => !item.isRead).length;
};

export {
  conversationsListByTypeSelector,
  conversationsListSelector,
  conversationsListErrorSelector,
  conversationsListRequestingSelector,
  conversationDetailsSelector,
  conversationDetailsRequestingSelector,
  conversationDetailsErrorSelector,
  signalRHubProxySelector,
  conversationRemoveRequestingSelector,
  conversationRemoveErrorSelector,
  conversationRemoveSuccessSelector,
  unreadConversationsSelector,
  unreadConversationsSelector2
};
