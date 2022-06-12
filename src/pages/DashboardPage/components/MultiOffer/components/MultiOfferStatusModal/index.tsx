import './styles.scss';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Loading from '../../../../../../components/Loading';
import ModalAlternative from '../../../../../../components/ModalAlternative';
import { multiOfferRequestReset } from '../../../../../../modules/MultiuploadOffers/actions';
import { IProps } from './types';

const MultiOfferStatusModal = (props: IProps) => {
  const { status, closeModal } = props;
  const { errorMessage, success, requesting } = status;
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(multiOfferRequestReset());
    };
  }, [dispatch]);

  const messageContent = (
    <p>
      {errorMessage}
      {success && 'Your task was created successfully'}
    </p>
  );

  return (
    <ModalAlternative isOpen={true} extraClass="multi-offer-status">
      <div className="modal-alternative__header">
        <h3>Creating new tasks</h3>
        <button onClick={closeModal}>
          <i className="icon icon--close-gray" />
        </button>
      </div>
      <div className="modal-alternative__content">
        {requesting ? <Loading /> : messageContent}
        <button onClick={closeModal} className="btn btn--b btn--b-color">
          Close
        </button>
      </div>
    </ModalAlternative>
  );
};

export default MultiOfferStatusModal;
