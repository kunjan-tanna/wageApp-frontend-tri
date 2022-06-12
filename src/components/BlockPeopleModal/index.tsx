import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalAlternative from '../../components/ModalAlternative';
import {
  blockPeopleModalReset,
  blockUserRequest,
  unblockUserRequest
} from '../../modules/Modals/BlockPeople/actions';
import { blockPeopleModalSelector } from '../../modules/Modals/BlockPeople/selectors';
import { BlockType, BlockTypes } from '../../modules/Modals/BlockPeople/types';
import { offerSelector } from '../../modules/Offer/selectors';
import { IStoreState } from '../../store';
import { Nullable } from '../../types';
import { mixPanelEvent, setUserProfile } from '../../utils/MixPanel';
import Loading from '../Loading';
import { IOfferStoreState } from '../../modules/Offer/types';
import { off } from 'process';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';
import moment from 'moment';
import mt from 'moment-timezone';

const BlockPeopleModal = () => {
  const dispatch = useDispatch();
  const closeModal = useCallback(() => dispatch(blockPeopleModalReset()), [dispatch]);
  const blockPeopleModal = useSelector((state: IStoreState) => blockPeopleModalSelector(state));
  const { error, requesting, success, type, userId, userName } = blockPeopleModal;
  const isBlock = type === BlockTypes.BLOCK;
  const showWelcomeContent = !error && !requesting && !success;
  const requestMethod = useCallback(
    () =>
      userId
        ? dispatch(isBlock ? blockUserRequest({ userId }) : unblockUserRequest({ userId }))
        : undefined,
    [dispatch, isBlock, userId]
  );

  let offerTitle = window.location.pathname.substring(
    window.location.pathname.lastIndexOf('/') + 1
  );
  offerTitle = offerTitle.replace('-', ' ');
  offerTitle = offerTitle[0].toUpperCase() + offerTitle.slice(1);
  let Title = window.localStorage.getItem('_OfferTitleForBlock') || offerTitle;

  return (
    <ModalAlternative isOpen={true} extraClass={'pink-style'}>
      <div className="modal-alternative__header">
        <h3>{`${isBlock ? 'Block' : 'Unblock'} user`}</h3>
      </div>
      <div className="modal-alternative__content">
        {showWelcomeContent && _renderWelcomeContent(userName, closeModal, type, requestMethod)}
        {requesting && <Loading />}

        {/* User blocked event called here */}
        {console.log('\n\n BBNBNBNBN', Title)}
        {success && isBlock
          ? mixPanelEvent('User blocked', {
              'Task name': Title,
              'User name': userName,
              'Date blocked': mt(new Date())
                .tz('America/Galapagos')
                .format('MM/DD/YYYY')
            })
          : null}

        {/* {success && isBlock
          ? setUserProfile({
              $name: userName
            })
          : null} */}

        {success &&
          _renderMessage(
            `<strong>${userName}</strong> has been ${isBlock ? 'blocked' : 'unblocked'}`,
            closeModal
          )}
        {error && _renderMessage('An error occurred. Please try again later.', closeModal)}
      </div>
    </ModalAlternative>
  );
};

const _renderWelcomeContent = (
  name: string,
  closeModal: () => void,
  type: Nullable<BlockType>,
  requestMethod?: () => void
) => {
  return (
    <>
      <p>
        <strong>{name}</strong> will be {type === BlockTypes.BLOCK ? 'added to' : 'removed from'}{' '}
        your Blocked list. Are you sure you want to do this?
      </p>
      <div className="btns">
        <button className="btn btn--b" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn--a" onClick={requestMethod}>
          Yes
        </button>
      </div>
    </>
  );
};

const _renderMessage = (text: string, closeModal: () => void) => {
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: text }} />
      <div className="btns">
        <button className="btn btn--a" onClick={closeModal}>
          Ok
        </button>
      </div>
    </>
  );
};

export default BlockPeopleModal;
