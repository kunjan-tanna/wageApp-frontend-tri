import React, { PureComponent } from 'react';

import { IDashboardOfferStatus } from '../../../../data/static/dashboard-offer-statuses';
import { IProps } from './types';

import './styles.scss';

class OffersCount extends PureComponent<IProps> {
  public render() {
    const { offersCount, offersStatuses, selectedOfferId } = this.props;
    const gigType = offersStatuses.find(offerStatus => offerStatus.id === selectedOfferId) as IDashboardOfferStatus;

    return (
      <div className="gigs-count">
        All {gigType.label}: <b>{offersCount}</b>
      </div>
    );
  }
}

export default OffersCount;
