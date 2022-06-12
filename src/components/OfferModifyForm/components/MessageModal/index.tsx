import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { offerModifyModalReset } from '../../../../modules/Modals/OfferModify/actions';
import Loading from '../../../Loading';
import ModalAlternative from '../../../ModalAlternative';
import { IProps } from './types';

const MessageModal = ({
  requesting,
  title,
  message,
  error,
  onCloseSuccess,
  onCloseError
}: IProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(offerModifyModalReset());
    };
  }, [dispatch]);

  return (
    <ModalAlternative isOpen={true} extraClass={'pink-style'}>
      <div className="modal-alternative__header">
        <h3>{title}</h3>
      </div>
      <div className="modal-alternative__content">
        {requesting && <Loading />}
        <p>{message}</p>
        <div className="btns">
          <button className="btn btn--a" onClick={error ? onCloseError : onCloseSuccess}>
            Ok
          </button>
        </div>
      </div>
    </ModalAlternative>
  );
};

export default MessageModal;
