import React from 'react';
import ReactModal from 'react-modal';

import { IProps } from './types';

import './style.scss';

const ModalAlternative = (props: IProps) => {

  const { isOpen, children, extraClass } = props;

  return (
    <ReactModal
      className={`modal-alternative${extraClass ? ' modal-alternative--' + extraClass : ''}`}
      isOpen={isOpen}>
      {children}
    </ReactModal>
  );
};

export default ModalAlternative;