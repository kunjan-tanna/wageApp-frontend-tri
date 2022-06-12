import React from 'react';

import { IProps } from './types';

const Step3 = (props: IProps) => {

  const { onFinish } = props;

  return (
    <>
      <div className="step__text-content">
        <p>For now, your gig will be visible only to you and your partner.</p>
        <p>
          <small>Rating feature will be enabled after task has been completed.</small>
        </p>
        <button className="btn btn--b btn--b-color" onClick={onFinish}>Ok</button>
      </div>
    </>
  );
};

export default Step3;