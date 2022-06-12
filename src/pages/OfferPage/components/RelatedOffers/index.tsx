import './styles.scss';

import React from 'react';

import OfferListItem from '../../../../components/OfferList/components/OfferListItem';
import { IOffer } from '../../../../types/offers';
import { IProps } from './types';

const RelatedOffers = (props: IProps) => {
  const { title, offers } = props;

  return (
    <div className="related-box">
      <h3 className="related-box__title">{title}</h3>
      <ul className="offerList__list offerList__list--grid">
        {offers.map((offer: IOffer) => (
          <OfferListItem key={offer.id} {...offer} />
        ))}
      </ul>
    </div>
  );
};

export default RelatedOffers;
