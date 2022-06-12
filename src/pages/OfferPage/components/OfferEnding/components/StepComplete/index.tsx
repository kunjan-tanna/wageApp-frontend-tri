import React from 'react';

import ModalAlternative from '../../../../../../components/ModalAlternative';

import { IProps } from './types';

import './styles.scss';

const StepComplete = (props: IProps) => {

  const { isOpen, onClick, offerType } = props;
  
  return (
    <ModalAlternative isOpen={isOpen} extraClass='ending-task'>
      <div className="modal-alternative__header">
        <button className="btn-close" onClick={onClick}>
          <i className="icon icon--close-gray"/>
        </button>
        <h3>End {offerType}</h3>
      </div>
      <div className="step__text-content step__text-content--completed">
        <p>Great! This task was moved to Completed.</p>
      </div>
      <button
        className="btn btn--b btn--b-color"
        onClick={onClick}>
        Ok, got it!
      </button>
    </ModalAlternative>
  );
};

export default StepComplete;
