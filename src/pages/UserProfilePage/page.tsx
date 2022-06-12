import './styles.scss';

import React, { Component } from 'react';

import Tabs from '../../components/Tabs';
import UserInfoBox from '../../components/UserInfoBox';
import { AccountTypes } from '../../types';
import { OfferType } from '../../types/offers';
import UserProfileTabContent from './components/UserProfileTabContent';
import { IPageProps } from './types';

class UserProfilePage extends Component<IPageProps> {
  public render() {
    const { blockModalVisibilityChange, user, currentUserId } = this.props;

    return (
      <div className="user-profile">
        <div className="container">
          <div className="row">
            <UserInfoBox
              userData={user}
              ownerId={user.id}
              currentUserId={currentUserId}
              blockModalVisibilityChange={blockModalVisibilityChange}
              visibleViewButton={false}
              showBusinessDetails={true}
            />

            <Tabs className={'user-profile__tabs'} items={this._fillTabs()} />
          </div>
        </div>
      </div>
    );
  }

  private _fillTabs = () => {
    const { user, userOffersRequest, userOffers, userOffersRequesting, accountType } = this.props;
    const ownerId = user && user.id ? user.id : undefined;
    console.log('ownerId', user);
    let tabs = [];

    if (accountType === AccountTypes.INTERNAL) {
      tabs = [
        {
          title: 'Your Listing',
          type: 'gig'
        }
        // {
        //   title: 'Services',
        //   type: 'service'
        // }
      ];
    } else {
      tabs = [
        {
          title: 'Your Listing',
          type: 'gig'
        }
        // {
        //   title: 'Services',
        //   type: 'service'
        // }
      ];
    }

    return tabs.map(({ title, type }) => ({
      title,
      content: (
        <UserProfileTabContent
          type={type as OfferType}
          ownerId={ownerId}
          userOffersRequest={userOffersRequest}
          offers={userOffers}
          requesting={userOffersRequesting}
        />
      )
    }));
  };
}

export default UserProfilePage;
