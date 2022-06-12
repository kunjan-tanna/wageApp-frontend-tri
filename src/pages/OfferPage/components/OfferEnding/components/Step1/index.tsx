import React from 'react';

import { IProps } from './types';

import ProviderSelect from '../../../ProviderSelect';

const Step1 = (props: IProps) => {
  const { data, selectHandler } = props;

  return (
    <>
      <div className="modal-alternative__content">
        {/* <p>Who did you choose to complete your task?</p> */}
        <p>Are you sure you want to end this gig?</p>
      </div>
      <ProviderSelect data={data} selectHandler={selectHandler} />
    </>
  );
};

export default Step1;
