import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MoreOptions from '../../../../components/MoreOptions';
import NameWithAvatar from '../../../../components/NameWithAvatar';
import { Routes } from '../../../../config';
import GetUserName from '../../../../utils/GetUserName';

import { BlockTypes } from '../../../../modules/Modals/BlockPeople/types';
import { IOfferBidder } from '../../../../modules/OfferBidders/types';
import { IProps } from './types';

import './styles.scss';

class OfferBidders extends Component<IProps> {
  public componentDidMount(): void {
    const { offerBiddersRequest, offerId } = this.props;

    if (offerId) {
      offerBiddersRequest({ offerId });
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { offerBiddersRequest, offerId } = this.props;

    if (offerId && prevProps.offerId !== offerId) {
      offerBiddersRequest({ offerId });
    }
  }

  public render() {
    const { offerBidders } = this.props;

    if (offerBidders.list.length > 0) {
      return (
        <div className="offer-bidders">
          <ul className="offer-bidders__list">
            {offerBidders.list.map(item => this._renderSingleOfferBidder(item))}
          </ul>
        </div>
      );
    }

    return null;
  }

  private _renderSingleOfferBidder(item: IOfferBidder) {
    const { blockModalVisibilityChange } = this.props;
    const { id, isBlocked, accountType, firstName, lastName, businessName, conversationId } = item;

    return (
      <li key={id} className="offer-bidders__item">
        <NameWithAvatar user={item} />
        <div className="offer-bidders__item__btns">
          <Link to={`${Routes.DASHBOARD_MESSAGES}/${conversationId}`}>
            <i className="icon icon--messaging" />
          </Link>
          <div className="offer-bidders__item__more-options">
            <MoreOptions
              items={[
                {
                  label: isBlocked ? 'Unblock user' : 'Block user',
                  iconName: 'block-red',
                  method: () =>
                    blockModalVisibilityChange({
                      type: isBlocked ? BlockTypes.UNBLOCK : BlockTypes.BLOCK,
                      visible: true,
                      userId: id,
                      userName: GetUserName(accountType, firstName, lastName, businessName)
                    })
                }
              ]}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default OfferBidders;
