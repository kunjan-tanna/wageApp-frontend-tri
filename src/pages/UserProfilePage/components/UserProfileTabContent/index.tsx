import React, { Component } from 'react';

import OfferList from '../../../../components/OfferList';
import { OfferStatuses, OfferTypes } from '../../../../types/offers';
import { IProps } from './types';

class UserProfileTabContent extends Component<IProps> {
  public componentDidMount(): void {
    this._getOffers({});
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { ownerId } = this.props;
    console.log('OFFERS', ownerId);
    if (ownerId && prevProps.ownerId !== ownerId) {
      this._getOffers({});
    }
  }

  public render() {
    const { offers, requesting, type } = this.props;
    console.log('OFFERS+++', offers);
    return (
      <>
        {/* <div className="user-profile__offers-count">
          {type === OfferTypes.GIG ? 'Jobs: ' : 'Services: '}
          <strong>{offers.data.length}</strong>
        </div> */}
        <div className="user-profile__offers">
          {offers.data && offers.data.length > 0 ? (
            <OfferList
              data={offers}
              // isRequesting={requesting}
              loadPage={this._getOffers}
              showTypeTabs={false}
              columnsCount={4}
              isUserProfile={true}
            />
          ) : (
            <div className="user-profile__offers-no-results">No listings (Yet!)</div>
          )}
        </div>
      </>
    );
  }

  private _getOffers = (options: any) => {
    const { userOffersRequest, type, ownerId } = this.props;

    if (ownerId) {
      return userOffersRequest({
        ...options,
        distance: 1,
        ownerId,
        status: OfferStatuses.PENDING
      });
    }
  };
}

export default UserProfileTabContent;
