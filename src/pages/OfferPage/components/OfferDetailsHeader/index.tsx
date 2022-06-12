import React from 'react';

import CurrencyFormat from '../../../../components/CurrencyFormat';
import DateFormat from '../../../../components/DateFormat';

import { OfferStatuses } from '../../../../types/offers';
import { IProps } from './types';

const OfferDetailsHeader = (props: IProps) => {

  const {
    offer: {
      date,
      title,
      price,
      status
    }
  } = props;

  return (
    <div className="offer-details-page__header">
      <div className="offer-details-page__title-date">
        <h2 className="offer-details-page__title">{title} {
          status === OfferStatuses.COMPLETED &&
          <span>(COMPLETED)</span>
        }</h2>
        <div className="offer-details-page__date">
          <DateFormat value={date}/>
        </div>
      </div>
      <div className="offer-details-page__price-more">
        <div className="offer-details-page__price">
          <CurrencyFormat value={price}/>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsHeader;
