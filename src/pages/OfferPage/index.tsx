import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import { Routes } from '../../config';
import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import { offerFormUploadReset } from '../../modules/FileUpload/actions';
import { blockPeopleModalVisibilityChange } from '../../modules/Modals/BlockPeople/actions';
import {
  offerBidRequest,
  offerBidReset,
  offerCompleteRequest,
  offerReport,
  offerRequest,
  offerSelectBidder,
  offerSendMail,
  offerSetStatusRequest
} from '../../modules/Offer/actions';
import {
  bidSelector,
  completeSelector,
  isErrorSelector as offerError,
  isRequestingSelector as offerRequesting,
  offerSelector,
  reportSelector,
  setStatusSelector
} from '../../modules/Offer/selectors';
import { offerBiddersRequest } from '../../modules/OfferBidders/actions';
import {
  isRequestingSelector as offerBiddersRequesting,
  offerBiddersSelector
} from '../../modules/OfferBidders/selectors';
import { IStoreState } from '../../store';
import OfferPage from './page';
import { Actions, IDispatchProps, IExternalProps, IProps } from './types';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';

class OfferPageContainer extends Component<IProps> {
  public componentDidMount() {
    const {
      location: { search },
      match: {
        params: { offerId }
      }
    } = this.props;
    const querystringValue = getSearchParamsAsObject(search);
    let offer_id = offerId || String(querystringValue.offerId);
    this._fetchOfferData(offer_id);
  }

  public componentWillUnmount() {
    const { offerBidReset, offerFormUploadReset } = this.props;

    offerBidReset();
    offerFormUploadReset();
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const {
      isError,
      history,
      match: {
        params: { offerId }
      },
      offerBidReset
    } = this.props;

    const prevOfferId = prevProps.match.params.offerId;

    // if (isError) {
    //   history.push(Routes.ERROR_404);
    // }

    if (prevOfferId !== offerId) {
      this._fetchOfferData(offerId);
      offerBidReset();
    }
  }

  public render() {
    const {
      blockPeopleModalVisibilityChange,
      offer,
      offerBidders,
      isRequesting,
      currentUser,
      complete,
      setStatus,
      bid,
      report,
      offerCompleteRequest,
      offerSetStatusRequest,
      offerBidRequest,
      offerBiddersRequest,
      offerSelectBidder,
      offerBidReset,
      offerReport,
      offerSendMail,
      isError,
      history,
      offerRequest
    } = this.props;
    return (
      <div className="content">
        {console.log('\n\n\n GGGGG', report)}
        {!isError && (
          <OfferPage
            offer={offer}
            offerId={offer.id}
            offerBidders={offerBidders}
            isRequesting={isRequesting}
            currentUserId={currentUser.id}
            currentUserEmail={currentUser.email}
            complete={complete}
            setStatus={setStatus}
            bid={bid}
            report={report}
            offerCompleteRequest={offerCompleteRequest}
            offerSetStatusRequest={offerSetStatusRequest}
            offerSelectBidder={offerSelectBidder}
            offerBidRequest={offerBidRequest}
            offerBiddersRequest={offerBiddersRequest}
            blockModalVisibilityChange={blockPeopleModalVisibilityChange}
            offerBidReset={offerBidReset}
            offerReport={offerReport}
            offerSendMail={offerSendMail}
            history={history}
            isOfferAlreadyReported={offer.reportedUserIds.split(',').includes(currentUser.id)}
            offerRequest={offerRequest}
          />
        )}
        {isError && (
          <div>
            <p className="deletedOffer">This offer has been deleted</p>
            <Link to={Routes.HOME} className="deleted-a">
              <button className="gohomeBtn">GO TO HOME</button>
            </Link>
          </div>
        )}
      </div>
    );
  }

  private _fetchOfferData(offerId: string) {
    const { offerRequest } = this.props;

    offerRequest({ offerId });
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        offerRequest,
        offerCompleteRequest,
        offerSetStatusRequest,
        offerBidRequest,
        offerBiddersRequest,
        blockPeopleModalVisibilityChange,
        offerBidReset,
        offerSelectBidder,
        offerFormUploadReset,
        offerReport,
        offerSendMail
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    offer: offerSelector(state.offer),
    offerBidders: offerBiddersSelector(state.offerBidders),
    isError: offerError(state.offer),
    isRequesting: offerRequesting(state.offer) || offerBiddersRequesting(state.offerBidders),
    currentUser: currentUserSelector(state.currentUser),
    complete: completeSelector(state.offer),
    setStatus: setStatusSelector(state.offer),
    bid: bidSelector(state.offer),
    report: reportSelector(state.offer)
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(OfferPageContainer);
