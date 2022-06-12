import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import OfferModifyForm from '../../components/OfferModifyForm';
import MessageModal from '../../components/OfferModifyForm/components/MessageModal';
import { IFormValues } from '../../components/OfferModifyForm/types';
import { Routes } from '../../config';
import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import { offerFormUploadReset } from '../../modules/FileUpload/actions';
import { offerModifyModalClose } from '../../modules/Modals/OfferModify/actions';
import { offerModifyFormSelector } from '../../modules/Modals/OfferModify/selectors';
import { Actions, addTaskRequest } from '../../modules/OfferForm/actions';
import { IStoreState } from '../../store';
import { OfferTypes } from '../../types/offers';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';
import { mixPanelEvent } from '../../utils/MixPanel';
import { IDispatchProps, IExternalProps, IProps, IState } from './types';
import OfferModifyFormData from '../../components/OfferModifyForm/OfferModifyFormData';

class AddTaskPageContainer extends Component<IProps, IState> {
  private readonly initialValues: IFormValues;

  public constructor(props: IProps) {
    super(props);

    const { type } = getSearchParamsAsObject(props.location.search);

    this.initialValues = {
      title: '',
      categoryId: undefined,
      lat: 0,
      lng: 0,
      description: '',
      type: type === OfferTypes.SERVICE ? OfferTypes.SERVICE : OfferTypes.GIG,
      price: undefined,
      media: ''
    };

    this.state = {
      offerType: this.initialValues.type
    };
  }

  public componentWillUnmount(): void {
    const { offerFormUploadReset } = this.props;
    offerFormUploadReset();
  }

  public render() {
    const { offerType } = this.state;
    const { currentUser, offerModifyModal, offerModifyModalClose, history } = this.props;
    const { visible, requesting, message, error } = offerModifyModal;
    return (
      <>
        {/* <OfferModifyForm
          handleSubmit={this._handleSubmit}
          initialValues={this.initialValues}
          accountType={currentUser.accountType}
          title=""
          submitButton="Post"
        /> */}
        <OfferModifyFormData
          handleSubmit={this._handleSubmit}
          initialValues={this.initialValues}
          accountType={currentUser.accountType}
          title=""
          submitButton="Post"
        />
        {visible && (
          <MessageModal
            title="Creating new task"
            message={message}
            requesting={requesting}
            error={error}
            onCloseSuccess={() => {
              // let type = offerType[0].toUpperCase() + offerType.slice(1)
              // let images = this.initialValues.media.split(",")

              // console.log("INTITIAL VALUES::")
              // console.log(this.initialValues)

              // mixPanelEvent(`${type} added`, {
              //   "Title": this.initialValues.title,
              //   "Images added": images.length,
              //   "Price": this.initialValues.price,
              //   "Date created": moment(new Date()).format("MM/DD/YYYY")
              //   // "Category" : payload.values.categoryId,
              //   // "Location": payload.values.location
              // })

              history.push(
                offerType === OfferTypes.SERVICE ? Routes.DASHBOARD_SERVICES : Routes.DASHBOARD_GIGS
              );
            }}
            onCloseError={() => offerModifyModalClose()}
          />
        )}
      </>
    );
  }

  private _handleSubmit = (values: IFormValues, actions: any) => {
    const { addTaskRequest } = this.props;
    console.log('ADD TASK VALS->', values, actions);
    return this.setState(
      {
        offerType: values.type
      },
      () => {
        addTaskRequest({ values, actions });
      }
    );
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => ({
  currentUser: currentUserSelector(state.currentUser),
  offerModifyModal: offerModifyFormSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        addTaskRequest,
        offerFormUploadReset,
        offerModifyModalClose
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(AddTaskPageContainer);
