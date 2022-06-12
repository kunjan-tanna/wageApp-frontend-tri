import './styles.scss';

import classnames from 'classnames';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';

import Loading from '../../../../../../components/Loading';
import Map from '../../../../../../components/Map';
import ModalAlternative from '../../../../../../components/ModalAlternative';
import OfferTypeBadge from '../../../../../../components/OfferTypeBadge';
import Socials from '../../../../../../components/Socials';
import { ApiConfig, Routes } from '../../../../../../config';
import { offerReport } from '../../../../../../modules/Offer/actions';
import { IProps } from './types';

const ChatTaskDetails = ({ details, setVisibleState, report }: IProps) => {
  const [reportModalState, setReportModalState] = useState(false);

  const dispatch = useDispatch();

  const offerReportCallback = useCallback(
    offerId =>
      dispatch(
        offerReport({
          offerId
        })
      ),
    [dispatch]
  );

  const {
    offer: {
      description,
      price,
      coverPhotoUrl,
      title,
      type,
      location,
      numberOfBidders,
      dateCreated,
      ownerId
    }
  } = details;

  const { offerReportResponse } = report;

  const offerId = details.offer.id;
  const converserId = details.converser.id;
  const headerClassName = classnames('task-details__header', {
    'task-details__header--price-exists': price
  });

  return (
    <>
      <div className="task-details">
        <ScrollArea>
          <div className={headerClassName}>
            <button
              className="task-details__header__close"
              onClick={() => setVisibleState(false)}
              title={'Close'}
            >
              <i className="icon icon--close-gray" />
            </button>
            {price && <h4>${price}</h4>}
          </div>

          <div className="task-details__thumb">
            <Link to={`${Routes.OFFER}/${offerId}`}>
              {coverPhotoUrl ? (
                <img src={`${ApiConfig.URL}${coverPhotoUrl}`} alt={title} />
              ) : (
                <i className="icon icon--no-photo" />
              )}
            </Link>
          </div>
          <div className="task-details__description">
            <OfferTypeBadge type={type} size={'small'} />
            <h3>{type == 'gig' ? 'About the job' : 'About the worker'}</h3>
            <p>{description}</p>
          </div>
          <div className="task-details__map">
            <Map
              markers={[
                {
                  id: offerId,
                  location,
                  title,
                  type
                }
              ]}
              options={{
                fullscreenControl: false,
                zoomControl: false
              }}
            />
          </div>
          <div className="task-details__another-content">
            <Socials offer={details.offer} />
            <p>Posted: {moment(dateCreated).format('MM/DD/YYYY')}</p>
            <p>
              <strong>{numberOfBidders}</strong> others interested
            </p>
            {ownerId === converserId && (
              <button
                className="report-btn"
                onClick={() => {
                  offerReportCallback(offerId);
                  setReportModalState(true);
                }}
              >
                Report <i className="icon icon--report" />
              </button>
            )}
          </div>
        </ScrollArea>
      </div>

      <ModalAlternative isOpen={reportModalState} extraClass="report-modal">
        <div className="modal-alternative__header">
          <button className="btn-close" onClick={() => setReportModalState(false)}>
            <i className="icon icon--close-gray" />
          </button>
          <h3>Report</h3>
        </div>
        <div className="modal-alternative-content">
          {offerReportResponse ? (
            <>
              <p>
                {offerReportResponse === 'success' && 'This offer has been reported.'}
                {offerReportResponse === 'error' && 'Error! Please try again.'}
              </p>
              <button
                className="btn btn--b btn--b-color"
                onClick={() => setReportModalState(false)}
              >
                Ok
              </button>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </ModalAlternative>
    </>
  );
};

export default ChatTaskDetails;
