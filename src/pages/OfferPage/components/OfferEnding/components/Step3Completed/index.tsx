import React, { Component } from 'react';

import NameWithAvatar from '../../../../../../components/NameWithAvatar';
import RaterButton from '../../../../../../components/RaterButton';
import { rating as ratingData } from '../../../../../../data/rating';

import { IRaterProps } from '../../../../../../components/RaterButton/types';
import { IProps, IState } from './types';

class Step3Completed extends Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);

    this.state = {
      rating: 0,
      ratingCount: 0,
      reason: []
    };
  };

  public render() {
    const { onBack, user } = this.props;

    const { rating, reason } = this.state;

    const rater: IRaterProps = {
      rating,
      onRate: this._rateHandler
    };

    return (
      <>
        <button className="btn-back" onClick={onBack}>
          <i className="icon icon--back"/>
        </button>
        <div className="step__avatar step__avatar--3">
          <NameWithAvatar user={user}/>
        </div>
        <div className="step__rater step--color">
          <p>Rate a person</p>
          <RaterButton rater={rater}/>
        </div>
        <div className="step__status-reasons">
          <div className="step__status">
            Explain the rating
          </div>
          <div className="step__reasons">
            {this._ratingReasonsRender()}
          </div>
        </div>
        <button
          className="btn btn--b btn--b-color step__btn"
          onClick={this._completeHandler}
          disabled={rating === 0 || reason.length === 0}>Finish
        </button>
      </>
    );
  }

  private _completeHandler = () => {

    const { closeModal, offerCompleteRequest, offer } = this.props;

    const { rating, reason, ratingCount } = this.state;

    const bidderId = offer.selectedBidder!.id;

    offerCompleteRequest({
      offerId: offer.id,
      bidderId,
      rating,
      ratingCount,
      reason: reason.toString()
    });

    closeModal('EndOffer')();
  };

  private _ratingReasonsRender = () => {

    const { rating, reason } = this.state;

    if (rating === 0) {
      return;
    }

    const _generateButton = (ratingValue: string) => {

      return ratingData[ratingValue].map(item => (
        <button className={reason.includes(item) ? 'active' : ''}
                key={item}
                onClick={this._ratingReasonSelectHandler(item)}>
          {item}
        </button>
      ));
    };

    switch (rating) {
      case 1:
        return _generateButton('1');

      case 2:
        return _generateButton('2');

      case 3:
        return _generateButton('3');

      case 4:
        return _generateButton('4');

      case 5:
        return _generateButton('5');

      default:
        return;
    }
  };

  private _ratingReasonSelectHandler = (reasonPar: string) => () => {

    const { reason } = this.state;

    if (reason.find(item => item === reasonPar)) {
      return this.setState({
        reason: reason.filter(item => item !== reasonPar)
      });
    }
    return this.setState({ reason: [...reason, reasonPar] });
  };

  private _rateHandler = (event: any) => {
    this.setState({
      rating: event.rating,
      reason: []
    });
  };

};


export default Step3Completed;