import React from 'react';

import { OfferTypes } from '../../../../types/offers';
import { IProps } from './types';

const OfferLocation = (props: IProps) => {

  const {
    location: {
      locality,
      stateShortName
    },
    offerType
  } = props;

  return (
    <div className="offer-details-page__location">
      <h3>Location</h3>
      <div className="offer-details-page__state">
        <i className={`icon icon--marker${offerType === OfferTypes.SERVICE ? '-2' : ''}`}/>
        <span>
          <strong>{locality}</strong>, {stateShortName}
        </span>
      </div>
    </div>
  );
};

export default OfferLocation;
