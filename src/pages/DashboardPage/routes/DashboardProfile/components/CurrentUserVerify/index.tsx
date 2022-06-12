import moment from 'moment';
import React, { FC } from 'react';
import RaterButton from '../../../../../../components/RaterButton';
import { IRaterProps } from '../../../../../../components/RaterButton/types';

import { IProps } from './types';

import './styles.scss';

const CurrentUserVerify: FC<IProps> = ({ verifiedBy, joinedDate, rating }) => {

  const rater: IRaterProps = {
    rating,
    interactive: false
  };


  return (
    <div className="row verify-container">
      <div className="data__info">
        <div className="data__info-source">
          <i className="icon icon--verified"/>
          Verified by {verifiedBy}
        </div>
        <RaterButton rater={rater}/>
        <div className="data__info-joined">
          Joined {moment(joinedDate).format('LL')}
        </div>
      </div>
    </div>
  );
};

export default CurrentUserVerify;
