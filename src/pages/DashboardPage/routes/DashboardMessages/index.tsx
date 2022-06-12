// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Route } from 'react-router';
// import { bindActionCreators, compose, Dispatch } from 'redux';

// import Loading from '../../../../components/Loading';
// import {
//   Actions,
//   chatGetConversationsRequest as getConversationsRequest
// } from '../../../../modules/Chat/actions';
// import {
//   conversationsListErrorSelector,
//   conversationsListRequestingSelector,
//   conversationsListSelector
// } from '../../../../modules/Chat/selectors';
// import { IConversation } from '../../../../modules/Chat/types';
// import { currentUserSelector } from '../../../../modules/CurrentUser/selectors';
// import { reportSelector } from '../../../../modules/Offer/selectors';
// import { IStoreState } from '../../../../store';
// import DashboardItemHeader from '../../components/DashboardItemHeader';
// import ChatAlertMessage from './components/ChatAlertMessage';
// import ChatMessagesList from './components/ChatMessagesList';
// import ChatSingleConversation from './components/ChatSingleConversation';
// import { IDispatchProps, IExternalProps, IProps } from './types';
// import { db } from '../../../../utils/Firebase/index';
// import './styles.scss';

// import { apiClient, tokenStore } from '../../../../utils/api/client';
// import { ApiConfig } from '../../../../config';

// class DashboardMessages extends Component<IProps> {
//   state = {
//     convs: [],
//     flag: false
//   };
//   public async componentDidMount() {
//     await this.props.getConversationsRequest();
//   }

//   async componentDidUpdate(prevProps: any) {
//     if (prevProps != this.props && this.props.allConversations.length > 0) {
//       let tmp = this.props.allConversations;
//       for (let i = 0; i < this.props.allConversations.length; i++) {
//         let a = await db
//           .collection('Conversations')
//           .doc(String(this.props.allConversations[i].conversationId))
//           .get();
//         // if (a.data() && tmp[i]) {
//         tmp[i].lastMessage = a.data()?.lastSentMessageDate?.seconds || null;
//         // }
//       }
//       tmp.sort((a: any, b: any) => {
//         return b.lastMessage - a.lastMessage;
//       });
//       this.setState({ convs: tmp });

//       this.props.allConversations.map(c => {
//         db.collection('Conversations')
//           .doc(String(c.conversationId))
//           .onSnapshot(async querySnapShort => {
//             let tmp = this.props.allConversations;
//             console.log('\n\n GOT SNAP', querySnapShort.data(), tmp);
//             for (let i = 0; i < tmp.length; i++) {
//               if(Number(querySnapShort.data()?.conversationId) == tmp[i].conversationId){
//                 tmp[i].lastMessage = querySnapShort.data()?.lastSentMessageDate?.seconds || null;
//               }
//               // let a = await db
//               //   .collection('Conversations')
//               //   .doc(String(this.props.allConversations[i].conversationId))
//               //   .get();
//               // tmp[i].lastMessage = a.data()?.lastSentMessageDate?.seconds || null;
//             }
//             tmp.sort((a: any, b: any) => {
//               return b.lastMessage - a.lastMessage;
//             });
//             await this.setState({ convs: tmp });
//           });
//       });
//     }
//   }

//   public render() {
//     const { allConversations, getConversationsError, getConversationsRequesting } = this.props;
//     const loading = getConversationsRequesting;
//     console.log('state=>', this.state);
//     return (
//       <>
//         <DashboardItemHeader title="Messages" additionalClassName="dashboard-header--chat" />
//         <div className="chat">
//           {loading ? <Loading /> : this._renderContent(this.state.convs, getConversationsError)}
//         </div>
//       </>
//     );
//   }

//   private _renderContent(items: IConversation[], error: boolean) {
//     const route = '/dashboard/messages';
//     const currentUserId = this.props.currentUser.id;
//     const { report } = this.props;
//     console.log('\n\n NNNNNN', items);
//     if (error) {
//       return <ChatAlertMessage text={'An internal error occurred.'} />;
//     }

//     if (items.length > 0) {
//       return (
//         <>
//           <ChatMessagesList currentUserId={currentUserId} items={items} parentRoute={route} />
//           <Route
//             path={`${route}/:conversationId`}
//             render={props => (
//               <ChatSingleConversation {...props} report={report} currentUserId={currentUserId} />
//             )}
//           />
//         </>
//       );
//     } else {
//       let flag = false;
//       setTimeout(() => {
//         flag = true;
//       }, 500);

//       if (flag) {
//         return <ChatAlertMessage text={'No conversations have started yet.'} />;
//       } else {
//         return <Loading />;
//       }
//     }
//   }
// }

// const mapStateToProps = (state: IStoreState): IExternalProps => {
//   const { chat, currentUser } = state;

//   return {
//     allConversations: conversationsListSelector(chat),
//     getConversationsError: conversationsListErrorSelector(chat),
//     getConversationsRequesting: conversationsListRequestingSelector(chat),
//     currentUser: currentUserSelector(currentUser),
//     report: reportSelector(state.offer)
//   };
// };

// const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
//   return {
//     ...bindActionCreators(
//       {
//         getConversationsRequest
//       },
//       dispatch
//     )
//   };
// };

// export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(DashboardMessages);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { bindActionCreators, compose, Dispatch } from 'redux';

import Loading from '../../../../components/Loading';
import {
  Actions,
  chatGetConversationsRequest as getConversationsRequest
} from '../../../../modules/Chat/actions';
import {
  conversationsListErrorSelector,
  conversationsListRequestingSelector,
  conversationsListSelector
} from '../../../../modules/Chat/selectors';
import { IConversation } from '../../../../modules/Chat/types';
import { currentUserSelector } from '../../../../modules/CurrentUser/selectors';
import { reportSelector } from '../../../../modules/Offer/selectors';
import { IStoreState } from '../../../../store';
import DashboardItemHeader from '../../components/DashboardItemHeader';
import ChatAlertMessage from './components/ChatAlertMessage';
import ChatMessagesList from './components/ChatMessagesList';
import ChatSingleConversation from './components/ChatSingleConversation';
import { IDispatchProps, IExternalProps, IProps } from './types';
import { db } from '../../../../utils/Firebase/index';
import './styles.scss';

import { apiClient, tokenStore } from '../../../../utils/api/client';
import { ApiConfig } from '../../../../config';

class DashboardMessages extends Component<IProps> {
  state = {
    convs: [],
    flag: true
  };
  public async componentDidMount() {
    this.props.getConversationsRequest();
    await this.setState({ flag: false });
  }

  async componentDidUpdate(prevProps: any) {
    if (prevProps != this.props && this.props.allConversations.length > 0) {
      // this.setState({ flag: false });
      // let tmp = this.props.allConversations;
      // for (let i = 0; i < this.props.allConversations.length; i++) {
      //   let a = await db
      //     .collection('Conversations')
      //     .doc(String(this.props.allConversations[i].conversationId))
      //     .get();
      //   tmp[i].lastMessage = a.data() ?.lastSentMessageDate ?.seconds || null;
      // }
      // tmp.sort((a: any, b: any) => {
      //   return b.lastMessage - a.lastMessage;
      // });
      // this.setState({ convs: tmp });

      this.props.allConversations.map(c => {
        db.collection('Conversations')
          .doc(String(c.conversationId))
          .onSnapshot(async querySnapShort => {
            let tmp = this.props.allConversations;
            for (let i = 0; i < this.props.allConversations.length; i++) {
              if (Number(querySnapShort.data()?.conversationId) == tmp[i].conversationId) {
                tmp[i].lastMessage = querySnapShort.data()?.lastSentMessageDate?.seconds;
              }
              // let a = await db
              //   .collection('Conversations')
              //   .doc(String(this.props.allConversations[i].conversationId))
              //   .get();
              // // if (a.data()) {
              // tmp[i].lastMessage = a.data()?.lastSentMessageDate?.seconds;
              // //  }
            }
            // tmp.sort((a: any, b: any) => {
            //   return b.lastMessage - a.lastMessage;
            // });
            this.setState({ convs: tmp, flag: false });
          });
      });
      // this.setState({ flag: true });
    }
  }
  // public handleSearch(info) {
  //   console.log("INFOOO",info)

  // }
  public render() {
    const { allConversations, getConversationsError, getConversationsRequesting } = this.props;
    const loading = getConversationsRequesting || this.state.flag;
    console.log('///////////////////', this.state);
    return (
      <>
        <DashboardItemHeader title="Messages" additionalClassName="dashboard-header--chat" />
        <div className="chat newChatModule">
          {loading ? <Loading /> : this._renderContent(allConversations, getConversationsError)}
        </div>
      </>
    );
  }

  private _renderContent(items: IConversation[], error: boolean) {
    items.sort((a: any, b: any) => {
      return b.lastMessage - a.lastMessage;
    });
    const route = '/dashboard/messages';
    const currentUserId = this.props.currentUser.id;
    const { report } = this.props;
    console.log('\n\n NNNNNN', items);
    if (error) {
      return <ChatAlertMessage text={'An internal error occurred.'} />;
    }
    if (items.length > 0) {
      return (
        <>
          <ChatMessagesList currentUserId={currentUserId} items={items} parentRoute={route} />
          <Route
            path={`${route}/:conversationId`}
            render={props => (
              <ChatSingleConversation {...props} report={report} currentUserId={currentUserId} />
            )}
          />
        </>
      );
    } else {
      return <ChatAlertMessage text={'No conversations have started yet.'} />;
    }
  }
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  const { chat, currentUser } = state;

  return {
    allConversations: conversationsListSelector(chat),
    getConversationsError: conversationsListErrorSelector(chat),
    getConversationsRequesting: conversationsListRequestingSelector(chat),
    currentUser: currentUserSelector(currentUser),
    report: reportSelector(state.offer)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        getConversationsRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(DashboardMessages);
