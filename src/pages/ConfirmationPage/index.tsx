import './styles.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Loading from '../../components/Loading';
import ModalAlternative from '../../components/ModalAlternative';
import { Routes } from '../../config';
import { confirmationModalSelector } from '../../modules/CurrentUser/selectors';
import { IStoreState } from '../../store';
import { IProps } from './types';

const ConfirmationPage = ({ location, title, successMessage, requestMethod }: IProps) => {
  const searchParams = location.search;
  const [isOpen, setModalVisibility] = useState(true);
  const dispatch = useDispatch();
  const accountConfirmation = useSelector((state: IStoreState) => confirmationModalSelector(state));
  const { requesting, error } = accountConfirmation;

  useEffect(() => {
    const params = searchParams.slice(1);

    dispatch(requestMethod({ params }));
  }, [dispatch, searchParams, requestMethod]);

  if (!isOpen) {
    return <Redirect to={Routes.HOME} />;
  }

  const _closeModal = () => {
    setModalVisibility(false);
  };

  return (
    <ModalAlternative isOpen={isOpen} extraClass="account-confirm">
      <div className="modal-alternative__header">
        <h2>{title}</h2>
        <button className="btn" onClick={_closeModal}>
          <i className="icon icon--close-gray" />
        </button>
      </div>
      <div className="modal-alternative__content">
        <>
          {requesting ? (
            <Loading isLoading={true} className="account-confirm-loader" />
          ) : (
            <>
              {error ? <p>{error}</p> : <p>{successMessage}</p>}
              <div className="modal-alternative__navigation">
                {error ? (
                  <button onClick={_closeModal} className="btn btn--b btn--b-color">
                    Ok
                  </button>
                ) : (
                  <Link to={Routes.LOGIN} className="btn btn--b btn--b-color">
                    Login
                  </Link>
                )}
              </div>
            </>
          )}
        </>
      </div>
    </ModalAlternative>
  );
};

export default ConfirmationPage;
