import 'react-rater/lib/react-rater.css';
import './styles.scss';

import React, { FC } from 'react';
import Rater from 'react-rater';

import { IProps } from './types';

const RaterButton: FC<IProps> = ({ rater }) => {
  return (
    <div className="rater-button">
      <Rater
        rating={rater.rating}
        total={rater.total}
        interactive={rater.interactive}
        onRate={rater.onRate}
        onRating={rater.onRating}
      />
    </div>
  );
};

export default RaterButton;
