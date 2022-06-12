import React from 'react';

import { IProps } from './types';

import NameWithAvatar from '../../../../../../components/NameWithAvatar';
import { OfferStatuses } from '../../../../../../types/offers';

const Step2 = (props: IProps) => {
  const { onBack, user, onFinish, onProgress, status, offerType } = props;

  return (
    <div className="step">
      <button className="btn-back" onClick={onBack}>
        <i className="icon icon--back" />
      </button>
      <div className="step__avatar step--color">
        <NameWithAvatar user={user} />
      </div>
      <div className="step__text">
        <p>What is the current state of the gig you posted?</p>
        <p>has:</p>
      </div>
      <ul className="state-task">
        <li className="state-task__item">
          <p>Finish gig and rate your partner.</p>
          <button className="btn btn--b btn--b-color" onClick={onFinish}>
            The {offerType} is completed
          </button>
        </li>
        {status !== OfferStatuses.INPROGRESS && (
          <li className="state-task__item">
            <p>Stop gig and wait to finish.</p>
            <button className="btn btn--b" onClick={onProgress}>
              The {offerType} is in progress
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Step2;
