import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  conversationsListSelector,
  unreadConversationsSelector
} from '../../modules/Chat/selectors';
import { currentUserSelector, isAuthorizedSelector } from '../../modules/CurrentUser/selectors';
import {
  notificationsListSelector,
  unreadNotificationsSelector
} from '../../modules/Notifications/selectors';
import { IStoreState } from '../../store';
import HeaderMenuAuthorized from './components/HeaderMenuAuthorized';
import HeaderMenuUnauthorized from './components/HeaderMenuUnauthorized';
import { IExternalProps, IProps, IState } from './types';
import { mixPanelEvent, createAlias, setUserProfile } from '../../utils/MixPanel';
import { db } from '../../utils/Firebase/index';

import './styles.scss';

class HeaderMenu extends Component<IProps, IState> {
  public static defaultState: IState = {
    tooltips: {
      menuAbout: false,
      notifications: false,
      chat: false,
      menuAbout1: false
    },
    arr: [],
    conversationIds: [],
    count: 0
  };

  public constructor(props: IProps) {
    super(props);

    this.state = {
      ...HeaderMenu.defaultState
    };
  }

  public render() {
    return <ul>{this._renderMenu()}</ul>;
  }

  private _renderMenu = () => {
    const {
      conversations,
      notifications,
      isAuthorized,
      unreadConversations,
      unreadNotifications,
      user,
      history,
      pageurl
    } = this.props;
    const { tooltips } = this.state;
    console.log('NOTIFICATION', notifications);

    if (isAuthorized) {
      if (user.accountType == 'Business') {
        createAlias(user.email);
        setUserProfile({
          $name: user.lastName,
          $email: user.email
        });
      } else {
        createAlias(user.email);
        setUserProfile({
          $name: user.firstName + ' ' + user.lastName,
          $email: user.email
        });
      }

      return (
        <HeaderMenuAuthorized
          conversations={conversations}
          notifications={notifications}
          unreadConversations={unreadConversations}
          unreadNotifications={unreadNotifications}
          user={user}
          toggleTooltip={this._toggleTooltip}
          tooltips={tooltips}
          history={history}
          pageurl={pageurl}
          conversationIds={this.state.conversationIds}
        />
      );
    } else {
      return <HeaderMenuUnauthorized toggleTooltip={this._toggleTooltip} tooltips={tooltips} />;
    }
  };

  private _toggleTooltip = (name: string) => {
    const { tooltips } = this.state;

    this.setState({ tooltips: { [name]: !tooltips[name] } });
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    user: currentUserSelector(state.currentUser),
    isAuthorized: isAuthorizedSelector(state.currentUser),
    conversations: conversationsListSelector(state.chat),
    notifications: notificationsListSelector(state),
    unreadConversations: unreadConversationsSelector(state.chat),
    unreadNotifications: unreadNotificationsSelector(state)
  };
};

export default compose<any>(connect(mapStateToProps))(HeaderMenu);
