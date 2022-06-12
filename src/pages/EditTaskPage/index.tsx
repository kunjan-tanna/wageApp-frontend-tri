import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators, compose, Dispatch } from 'redux';

import Loading from '../../components/Loading';
import OfferModifyForm from '../../components/OfferModifyForm';
import OfferModifyFormData from '../../components/OfferModifyForm/OfferModifyFormData';
import MessageModal from '../../components/OfferModifyForm/components/MessageModal';
import { IFormValues } from '../../components/OfferModifyForm/types';
import { Routes } from '../../config';
import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import { offerFormUploadReset } from '../../modules/FileUpload/actions';
import { offerModifyModalClose } from '../../modules/Modals/OfferModify/actions';
import { offerModifyFormSelector } from '../../modules/Modals/OfferModify/selectors';
import { offerRequest } from '../../modules/Offer/actions';
import {
  isRequestingSelector as offerRequesting,
  offerSelector
} from '../../modules/Offer/selectors';
import { editTaskRequest } from '../../modules/OfferForm/actions';
import { IStoreState } from '../../store';
import { OfferStatuses } from '../../types/offers';
import { Actions, IExternalProps } from './types';
import { IDispatchProps, IProps } from './types';

import { mixPanelEvent } from '../../utils/MixPanel/index';

import './styles.scss';

class EditTaskPageContainer extends Component<IProps> {
  public componentDidMount(): void {
    const {
      match: {
        params: { offerId }
      },
      offerRequest
    } = this.props;

    offerRequest({ offerId });
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const {
      match: {
        params: { offerId }
      },
      offerRequest
    } = this.props;
    const prevOfferId = prevProps.match.params.offerId;

    if (prevOfferId !== offerId) {
      offerRequest({ offerId });
    }
  }

  public componentWillUnmount(): void {
    const { offerFormUploadReset } = this.props;
    offerFormUploadReset();
  }

  public render() {
    return <div className="edit-task">{this._renderContent()}</div>;
  }

  private _handleSubmit = (values: IFormValues, actions: any) => {
    const { editTaskRequest, offer } = this.props;

    editTaskRequest({ values, actions, offerId: offer.id });
  };

  private _renderContent = () => {
    const {
      currentUser,
      offerModifyModal,
      offerRequesting,
      offer,
      offerModifyModalClose,
      history
    } = this.props;
    const { visible, requesting, message, error } = offerModifyModal;
    const isUnauthorized = offer.owner.id && offer.owner.id !== currentUser.id;
    const isCompleted = offer.status === OfferStatuses.COMPLETED;

    if (offerRequesting) {
      return <Loading />;
    }

    if (isUnauthorized || isCompleted) {
      return <Redirect to={Routes.ERROR_404} />;
    }

    const {
      title,
      category,
      location,
      description,
      offerType,
      price,
      gallery,
      promotionType,
      map_types
    } = offer;
    const initialValues = {
      title,
      categoryId: category.id,
      lat: location.lat,
      lng: location.lng,
      description,
      type: offerType,
      price: price ? price : undefined,
      media: gallery.map(item => item.id).join(','),
      promotionType: promotionType,
      map_types: map_types
    };

    return (
      <>
        {/* <OfferModifyForm
          handleSubmit={this._handleSubmit}
          initialValues={initialValues}
          accountType={currentUser.accountType}
          title={offerType === 'gig' ? 'Edit Job' : 'Edit Service'}
          submitButton="Save Changes"
        /> */}
        <OfferModifyFormData
          handleSubmit={this._handleSubmit}
          initialValues={initialValues}
          accountType={currentUser.accountType}
          title={offerType === 'gig' ? 'Edit Job' : 'Edit Service'}
          submitButton="Save Changes"
        />
        {visible && (
          <MessageModal
            title="Editing task"
            message={message}
            requesting={requesting}
            error={error}
            onCloseSuccess={() => {
              // Edit task/offer event called here
              let type = offerType[0].toUpperCase() + offerType.slice(1);
              mixPanelEvent(`${type} edited`, {
                [`${type} edited`]: true
              });

              history.push(`${Routes.OFFER}/${offer.id}`);
            }}
            onCloseError={() => offerModifyModalClose()}
          />
        )}
      </>
    );
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => ({
  currentUser: currentUserSelector(state.currentUser),
  offer: offerSelector(state.offer),
  offerModifyModal: offerModifyFormSelector(state),
  offerRequesting: offerRequesting(state.offer)
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        editTaskRequest,
        offerFormUploadReset,
        offerModifyModalClose,
        offerRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(EditTaskPageContainer);
