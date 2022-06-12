import './styles.scss';

import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

import DisplayOnlyForLogged from '../../components/DisplayOnlyForLogged';
import DisplayOnlyForOwner from '../../components/DisplayOnlyForOwner';
import Gallery from '../../components/Gallery';
import Loading, { HasIndicator } from '../../components/Loading';
import withModal from '../../components/Modal';
import ModalAlternative from '../../components/ModalAlternative';
import OfferTypeBadge from '../../components/OfferTypeBadge';
import Socials from '../../components/Socials';
import UserInfoBox from '../../components/UserInfoBox';
import { Routes } from '../../config';
import { IOfferBidder } from '../../modules/OfferBidders/types';
import { AccountTypes } from '../../types';
import { OfferStatuses } from '../../types/offers';
import OfferBidders from './components/OfferBidders';
import OfferDetailsHeader from './components/OfferDetailsHeader';
import Step1 from './components/OfferEnding/components/Step1';
import Step2 from './components/OfferEnding/components/Step2';
import Step3 from './components/OfferEnding/components/Step3';
import Step3Completed from './components/OfferEnding/components/Step3Completed';
import StepComplete from './components/OfferEnding/components/StepComplete';
import OfferLocation from './components/OfferLocation';
import OfferMessage from './components/OfferMessage';
import PickupLocationMap from './components/PickupLocationMap';
import RelatedOffers from './components/RelatedOffers';
import { IPageProps, IPageState, IExternalProps2, IDispatchProps2 } from './types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { IStoreState } from '../../store';
import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import { mixPanelEvent, setUserProfile } from '../../utils/MixPanel/index';
import { report, title } from 'process';
import moment from 'moment';
import mt from 'moment-timezone';
import { db, messagesRef, firebaseDate, FS } from '../../utils/Firebase/index';

import Firebase from 'firebase/app';

import { bindActionCreators, Dispatch } from 'redux';

import {
  Actions,
  chatGetConversationsRequest as getConversationsRequest
} from '../../modules/Chat/actions';

// import Axios from 'axios';

import { apiClient, tokenStore } from '../../utils/api/client';
import { ApiConfig } from '../../config';
import { last } from 'lodash';

// const firestore = Firebase.firestore();
// const messagesRef = firestore.collection('web');

class OfferPage extends Component<IPageProps, IPageState> {
  public constructor(props: IPageProps) {
    super(props);
    this.state = {
      messageSent: false,
      successModalClose: false,
      reportModalOpen: false,
      reOpenModal: false,
      deleteOfferModal: false,
      alreadyReportModalOpen: false,
      tmpRequestFlag: false
    };
  }

  public componentDidMount() {
    //Gig view event called here
    const {
      offer: { title, category, price, offerType }
    } = this.props;

    let type = offerType[0].toUpperCase() + offerType.slice(1);

    mixPanelEvent(`${type} viewed`, {
      Category: category.name,
      Price: price || 0,
      Title: title
    });
  }

  public componentDidUpdate() {
    const { bid, getModalVisibility, closeModal } = this.props;

    console.log('\n\n BBIIDD', bid);
    if (getModalVisibility('Message') && bid.success) {
      closeModal('Message')();
    }
  }

  public componentWillUnmount(): void {
    this.setState({
      reportModalOpen: false,
      alreadyReportModalOpen: false,
      tmpRequestFlag: false
    });
  }

  public render() {
    const { isRequesting } = this.props;
    const { tmpRequestFlag } = this.state;
    return (
      <>
        <main className={`container container--task ${HasIndicator(isRequesting)}`}>
          {isRequesting && tmpRequestFlag === false ? <Loading /> : ''}
          {this._renderContent()}
        </main>
        {this._renderMessageModal()}
        {this._renderEndOfferModal()}
        {this._renderReopenModal()}
        {this._renderDeleteOfferModal()}
      </>
    );
  }

  private _renderContent = () => {
    const {
      blockModalVisibilityChange,
      offer: {
        id,
        title,
        category,
        offerType,
        numberOfBidders,
        description,
        location,
        ownerUserDetails,
        gallery,
        relatedOffers,
        userOffers,
        status,
        owner
      },
      offer,
      offerBidders,
      offerBiddersRequest,
      currentUserId,
      offerReport,
      currentUserEmail,
      isOfferAlreadyReported,
      offerRequest
    } = this.props;

    const loginLink = {
      pathname: Routes.LOGIN,
      state: {
        from: `${Routes.OFFER}/${offer.id}`,
        var: 'report'
      }
    };

    console.log('\n\n ZZZZZZZ', isOfferAlreadyReported);

    return (
      <div className="row">
        <div className="full-width-box full-width-box--with-more-options">
          <div className="offer-details-page">
            <div className="offer-details-page__column offer-details-page__column--right">
              <OfferDetailsHeader offer={this.props.offer} />
              {this._renderOfferOptions()}
              <DisplayOnlyForOwner ownerId={owner.id}>
                {status !== OfferStatuses.COMPLETED && this._renderOwnerOption()}
                {status == OfferStatuses.COMPLETED && this._renderReopenButton()}
              </DisplayOnlyForOwner>
              {window.localStorage.setItem('_OfferTitleForBlock', this.props.offer.title)}
              <UserInfoBox
                currentUserId={currentUserId}
                visibleViewButton={true}
                ownerId={owner.id}
                userData={{
                  ...owner,
                  isBlocked: ownerUserDetails.isBlocked,
                  verifiedBy: ownerUserDetails.verifiedBy,
                  joinedDate: ownerUserDetails.joinedDate,
                  isDeleted: ownerUserDetails.isDeleted
                }}
                blockModalVisibilityChange={blockModalVisibilityChange}
                showBusinessDetails={true}
              />
              {location.locality && <OfferLocation location={location} offerType={offerType} />}
              <div className="offer-details-page__map">
                <PickupLocationMap id={id} location={location} title={title} type={offerType} />
              </div>
              {console.log('\n\n\n EEEEEE-->', this.props.user.id, owner.id)}
              <div className="offer-details-page__interested">
                <span>{numberOfBidders}</span> others interested
                {this.props.user.id !== owner.id ? (
                  currentUserEmail.length < 1 ? (
                    <div className="report">
                      <span className="reportFlag">
                        <Link to={loginLink}>
                          Report <i className="icon icon--report"></i>
                        </Link>
                      </span>
                    </div>
                  ) : (
                    <div className="report">
                      <span
                        className="reportFlag"
                        onClick={() => {
                          if (this.props.isOfferAlreadyReported == true) {
                            this._openAlreadyReportedModal();
                          } else {
                            offerReport({
                              offerId: offer.id
                            });
                            this._openReportModal();
                          }
                        }}
                      >
                        Report <i className="icon icon--report"></i>
                      </span>
                    </div>
                  )
                ) : null}
              </div>
              <DisplayOnlyForOwner ownerId={ownerUserDetails.id}>
                <OfferBidders
                  offerBidders={offerBidders}
                  offerBiddersRequest={offerBiddersRequest}
                  offerId={id.toString()}
                  blockModalVisibilityChange={blockModalVisibilityChange}
                />
              </DisplayOnlyForOwner>
            </div>

            <div className="offer-details-page__column">
              <div className="offer-details-page__gallery-badge">
                <Gallery items={gallery} userData={ownerUserDetails} offerType={offerType} />
                <OfferTypeBadge type={offerType} />
              </div>
              <div className="offer-details-page__description">
                <h3 className="offer-details-page__description__title">Description</h3>
                <p className="offer-details-page__description__text">{description}</p>
              </div>
              <Socials offer={offer} />
            </div>
          </div>
        </div>
        {userOffers.length > 0 && (
          <RelatedOffers
            title={`Posted by ${
              owner.accountType === AccountTypes.INTERNAL ? owner.firstName : ''
            } ${owner.lastName}`}
            offers={userOffers}
          />
        )}
        {relatedOffers.length > 0 && <RelatedOffers title="Related" offers={relatedOffers} />}
      </div>
    );
  };

  private _handleReopenOfferModal = () => {
    const {
      setModalState,
      openModal,
      offer: { status }
    } = this.props;

    openModal('EndOffer')();
  };

  private _handleOpenEndOfferModal = () => {
    const {
      setModalState,
      openModal,
      offer: { status }
    } = this.props;

    if (status === OfferStatuses.INPROGRESS) {
      setModalState('EndOffer', 'step-3-completed')();
    } else {
      setModalState('EndOffer', 'step-1')();
    }

    openModal('EndOffer')();
  };

  open12 = () => {
    const {
      setModalState,
      openModal,
      offer: { status }
    } = this.props;
    openModal('Message');
  };

  private _renderOfferOptions = () => {
    const {
      offer,
      offer: {
        owner: { id },
        offerType,
        ownerUserDetails
      },
      currentUserId,
      currentUserEmail,
      openModal,
      offerReport,
      report: { offerReportResponse },
      offerSendMail
    } = this.props;

    // Gig - Service report event called here
    if (offerReportResponse === 'success' && this.state.reportModalOpen === true) {
      let type = offerType[0].toUpperCase() + offerType.slice(1);
      console.log('Report type', type);

      const offerUrl = `${'https://wageapp.io'}${Routes.OFFER}/${offer.id}/${offer.title
        .trim()
        .replace(/\s/g, '-')
        .toLowerCase()}`;

      mixPanelEvent(`${type} reported`, {
        reported: true,
        'Task Title': offer.title,
        Link: offerUrl,
        'User name': ownerUserDetails.firstName + ' ' + ownerUserDetails.lastName
      });
    }

    const { reportModalOpen } = this.state;
    const loginLink = {
      pathname: Routes.LOGIN,
      state: {
        from: `${Routes.OFFER}/${offer.id}`
      }
    };

    if (window.localStorage.getItem('re_flag') == 'true') {
      const app = document.getElementById('myCheck');
      app?.click();

      // window.localStorage.removeItem('re_flag');
      // if (document && document.getElementById("myCheck")) {
      //   document.getElementById("myCheck").click();
      // }
    }

    if (id === currentUserId) {
      return null;
    }

    return (
      <>
        <div className="offer-details-page__navigation">
          <DisplayOnlyForLogged>
            {/* onClick={openModal('Message')} */}
            <button id="myCheck" className="btn btn--b btn--b-color" onClick={openModal('Message')}>
              Chat
            </button>
            {/* <button
              className="btn btn--b"
              onClick={() => {
                offerReport({
                  offerId: offer.id
                });
                this._openReportModal();
              }}
            >
              Report
            </button> */}
            {offer.owner.accountType === AccountTypes.BUSINESS && (
              <button className="btn btn--b" onClick={() => offerSendMail({ offerId: offer.id })}>
                Email
              </button>
            )}
          </DisplayOnlyForLogged>
          {currentUserEmail.length < 1 && (
            <>
              {/* <span onClick={openModal('Message')}> */}
              <Link className="btn btn--b btn--b-color" to={loginLink}>
                Chat
              </Link>
              {/* </span> */}
              {/* <Link to={loginLink} className="btn btn--b">
                Reports
              </Link> */}
              {/* <Link to={loginLink} className="btn btn--b">
                Email
              </Link> */}
            </>
          )}
        </div>
        <ModalAlternative isOpen={reportModalOpen} extraClass="report-modal">
          <div className="modal-alternative__header">
            <button className="btn-close" onClick={this._closeReportModal}>
              <i className="icon icon--close-gray" />
            </button>
            <h3>Report</h3>
          </div>
          <div className="modal-alternative-content">
            {offerReportResponse ? (
              <>
                {window.scrollTo(0, 0)}
                <p>
                  {offerReportResponse === 'success' && 'This offer has been reported.'}
                  {offerReportResponse === 'error' && 'Error! Please try again.'}
                </p>
                <button className="btn btn--b btn--b-color" onClick={this._closeReportModal}>
                  Ok
                </button>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </ModalAlternative>

        <ModalAlternative isOpen={this.state.alreadyReportModalOpen} extraClass="report-modal">
          <div className="modal-alternative__header">
            <button className="btn-close" onClick={this._closeReportModal}>
              <i className="icon icon--close-gray" />
            </button>
            <h3>Report</h3>
          </div>
          <div className="modal-alternative-content">
            <>
              <p>You have already reported this offer.</p>
              <button className="btn btn--b btn--b-color" onClick={this._closeAlreadyReportModal}>
                Ok
              </button>
            </>
          </div>
        </ModalAlternative>
      </>
    );
  };

  private _renderMessageModal = () => {
    const {
      offer,
      getModalVisibility,
      closeModal,
      bid: { responseStatus, error }
    } = this.props;

    const { messageSent } = this.state;

    return (
      <OfferMessage
        offer={offer}
        responseStatus={responseStatus}
        error={error}
        modalState={getModalVisibility('Message')}
        closeModal={closeModal('Message')}
        messageHandler={this._messageSendHandler}
        messageSent={messageSent}
        closeThanksMessage={() => this._closeThanksMessage()}
      />
    );
  };

  private _closeThanksMessage = () => {
    const { offerBidReset } = this.props;

    offerBidReset();

    this.setState({
      messageSent: false
    });
  };

  private _renderEndOfferModal = () => {
    const {
      getModalVisibility,
      closeModal,
      setStatus,
      offer: { status, offerType }
    } = this.props;

    const { successModalClose } = this.state;

    return (
      <>
        <ModalAlternative isOpen={getModalVisibility('EndOffer')} extraClass="ending-task">
          <div className="modal-alternative__header">
            <button className="btn-close" onClick={closeModal('EndOffer')}>
              <i className="icon icon--close-gray" />
            </button>
            <h3>End {offerType}</h3>
          </div>
          {this._renderProviderSelectScreen()}
        </ModalAlternative>
        {setStatus.success && status !== OfferStatuses.INPROGRESS && (
          <StepComplete
            offerType={offerType}
            onClick={this._closeSuccessModal}
            isOpen={!successModalClose}
          />
        )}
      </>
    );
  };

  private _closeSuccessModal = () => {
    this.setState({
      successModalClose: true
    });
  };

  private reOpenHandler = async () => {
    const {
      offer: { id, offerType },
      history
    } = this.props;
    console.log('\n\n oFFER ####', offerType);
    await apiClient
      .put<any>(`https://api.wagedev.com/api/offers/${id}/reopen`, {
        baseURL: ApiConfig.URL
      })
      .then(res => {
        this.setState({ reOpenModal: !this.state.reOpenModal });
      });

    if (offerType == 'gig') {
      history.push(`${Routes.DASHBOARD_GIGS}`);
    } else {
      history.push(`${Routes.DASHBOARD_SERVICES}`);
    }
  };

  private _renderReopenMessage = () => {
    return (
      <>
        <div className="modal-alternative__content">
          <p>Are you sure you want to re-open offer?</p>
        </div>
        <div className="Center">
          <button className="btn btn--b btn--b-color" onClick={this.reOpenHandler}>
            Re-open now
          </button>
        </div>
      </>
    );
  };

  private _renderDeleteOfferMessage = () => {
    return (
      <>
        <div className="modal-alternative__content">
          <p>Are you sure you want to delete this?</p>
        </div>
        <div className="Center">
          <button className="btn btn--b btn--b-color W-260" onClick={this.deleteOfferHandler}>
            Yes, I want to delete this
          </button>
        </div>
      </>
    );
  };

  private _renderProviderSelectScreen = () => {
    const {
      offerBidders,
      setModalState,
      closeModal,
      offer: { selectedBidder, status, offerType },
      offerCompleteRequest,
      offer
    } = this.props;

    const endOfferModalState = this.props.getModalState('EndOffer');

    switch (endOfferModalState) {
      case 'step-2':
        return (
          <Step2
            onBack={setModalState('EndOffer', 'step-1')}
            user={selectedBidder!}
            onFinish={setModalState('EndOffer', 'step-3-completed')}
            status={status}
            onProgress={this._handleGigInProgress}
            offerType={offerType}
          />
        );
      case 'step-3-pending':
        return (
          <Step3
            onFinish={() => {
              closeModal('EndOffer')();
            }}
          />
        );
      case 'step-3-completed':
        return (
          <Step3Completed
            onBack={setModalState('EndOffer', 'step-2')}
            user={selectedBidder!}
            closeModal={closeModal}
            offer={offer}
            offerCompleteRequest={offerCompleteRequest}
          />
        );
      default:
        return <Step1 data={offerBidders} selectHandler={this._providerSelectHandler} />;
    }
  };

  private _handleGigInProgress = () => {
    const { setModalState, offerSetStatusRequest, offer } = this.props;

    const { id } = offer.selectedBidder!;
    offerSetStatusRequest({ offerId: offer.id, status: OfferStatuses.INPROGRESS, workerId: id });

    setModalState('EndOffer', 'step-3-pending')();
  };

  private _providerSelectHandler = (user?: IOfferBidder) => {
    const {
      setModalState,
      offerSetStatusRequest,
      offerSelectBidder,
      offer: {
        id,
        offerType,
        title,
        category: { name },
        owner: { firstName, lastName }
      },
      closeModal
    } = this.props;

    if (!user) {
      offerSetStatusRequest({ offerId: id, status: OfferStatuses.COMPLETED });

      let type = offerType[0].toUpperCase() + offerType.slice(1);
      mixPanelEvent(`${type} completed`, {
        Title: title,
        Category: name,
        'Date ended': mt(new Date())
          .tz('America/Galapagos')
          .format('MM/DD/YYYY')
      });

      setUserProfile({
        Worker: firstName + ' ' + lastName
      });

      closeModal('EndOffer')();
    } else {
      offerSelectBidder(user);

      setModalState('EndOffer', 'step-2')();
    }
  };

  private _messageSendHandler = async (values: any, actions: any) => {
    const {
      offerBidRequest,
      offer: { id, title, price, category, offerType, ownerUserDetails },
      bid: { responseStatus },
      currentUserId,
      closeModal,
      getConversationsRequest
    } = this.props;

    // Chat initiated event called here
    if (responseStatus === 200) {
      apiClient
        .get<any>(`https://api.wageapp.io/api/conversations/v2`, {
          baseURL: ApiConfig.URL
        })
        .then(res => {
          if (!JSON.stringify(res.data.conversations).includes(String(id))) {
            mixPanelEvent('Chat initiated', {
              'Date initiated': mt(new Date())
                .tz('America/Galapagos')
                .format('MM/DD/YYYY'),
              'Task name': title,
              'Task price': price,
              Category: category.name,
              'User name': ownerUserDetails.firstName + ' ' + ownerUserDetails.lastName,
              'Task type': offerType
            });

            setUserProfile({
              $name: ownerUserDetails.firstName + ' ' + ownerUserDetails.lastName,
              id: ownerUserDetails.id
            });
          }
        });
    }

    const { data } = await apiClient.post<any>(
      `https://api.wageapp.io/api/offers/${id}/bid-v2`,
      { message: values.message },
      { baseURL: ApiConfig.URL }
    );
    console.log('\n\n DDDRRR,', data);
    // offerBidRequest({ offerId: id, message: values.message });
    await getConversationsRequest();
    db.collection('Conversations')
      .doc(String(data.conversationId))
      .set({
        conversationId: String(data.conversationId),
        isArchieved: false,
        isRead: false,
        offerId: id,
        lastSenderId: currentUserId,
        lastSentMessageDate: firebaseDate
      })
      .then(querySnapshot => {
        db.collection('Conversations')
          .doc(String(data.conversationId))
          .collection('conversationmessages')
          .doc()
          .set({
            conversationId: String(data.conversationId),
            imageUrl: '',
            type: 'Text',
            sentDate: firebaseDate,
            senderId: currentUserId,
            text: values.message,
            isRead: false
          });
        db.collection('Users')
          .doc(String(ownerUserDetails.id))
          .update('unreadConversation', FS.FieldValue.increment(1));

        closeModal('Message')();
      });

    if (values.message.length > 0) {
      setTimeout(this._openThanksMessage, 500);
    }
  };

  private _openThanksMessage = () => {
    this.setState({
      messageSent: true
    });
  };

  private _closeReportModal = () => {
    const { offerRequest, offer } = this.props;
    this.setState({
      tmpRequestFlag: true
    });
    offerRequest({
      offerId: offer.id
    });
    this.setState({
      reportModalOpen: false
    });
  };

  private _closeAlreadyReportModal = () => {
    this.setState({
      alreadyReportModalOpen: false
    });
  };

  private _openAlreadyReportedModal = () => {
    this.setState({
      alreadyReportModalOpen: true
    });
  };

  private _openReportModal = () => {
    this.setState({
      reportModalOpen: true
    });
  };

  private _renderReopenButton = () => {
    return (
      <div className="offer-details-page__navigation">
        <button className="btn btn--b btn--b-color" onClick={this.reOpenModal}>
          Re-open
        </button>
      </div>
    );
  };

  private reOpenModal = () => {
    this.setState({
      reOpenModal: !this.state.reOpenModal
    });
  };

  private deleteOfferModal = () => {
    this.setState({
      deleteOfferModal: !this.state.deleteOfferModal
    });
  };

  private _renderReopenModal = () => {
    return (
      <>
        <ModalAlternative isOpen={this.state.reOpenModal} extraClass="ending-task">
          <div className="modal-alternative__header">
            <button className="btn-close" onClick={this.reOpenModal}>
              <i className="icon icon--close-gray" />
            </button>
            <h3>RE-OPEN</h3>
          </div>
          {this._renderReopenMessage()}
        </ModalAlternative>
      </>
    );
  };
  private _renderDeleteOfferModal = () => {
    return (
      <>
        <ModalAlternative isOpen={this.state.deleteOfferModal} extraClass="ending-task">
          <div className="modal-alternative__header">
            <button className="btn-close" onClick={this.deleteOfferModal}>
              <i className="icon icon--close-gray" />
            </button>
            <h3>DELETE</h3>
          </div>
          {this._renderDeleteOfferMessage()}
        </ModalAlternative>
      </>
    );
  };

  private deleteOfferHandler = async () => {
    const {
      offer: { id, offerType },
      history
    } = this.props;
    await apiClient
      .delete<any>(`https://api.wagedev.com/api/offers/${id}`, {
        baseURL: ApiConfig.URL
      })
      .then(res => {
        this.setState({ reOpenModal: !this.state.reOpenModal });
      });

    if (offerType == 'gig') {
      history.push(`${Routes.DASHBOARD_GIGS}`);
    } else {
      history.push(`${Routes.DASHBOARD_SERVICES}`);
    }
  };

  private _renderOwnerOption = () => {
    const {
      offer: { status }
    } = this.props;

    return (
      <div className="offer-details-page__navigation">
        <div className="offer_left">
          <Link
            className="btn btn--b btn--b-color"
            to={`${Routes.EDIT_TASK}/${this.props.offer.id}`}
          >
            Edit
          </Link>

          {status === OfferStatuses.PENDING || status === OfferStatuses.INPROGRESS ? (
            <button className="btn btn--b" onClick={this._handleOpenEndOfferModal}>
              End
            </button>
          ) : null}
        </div>
        <div className="delIcon">
          <i className="icon icon--trash" title="Delete offer" onClick={this.deleteOfferModal}></i>
        </div>
      </div>
    );
  };
}

// export default withModal(OfferPage, [
//   'Message',
//   {
//     name: 'EndOffer',
//     state: 'step-1'
//   }
// ]);

const mapStateToProps = (state: IStoreState): IExternalProps2 => {
  return {
    user: currentUserSelector(state.currentUser)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps2 => {
  return {
    ...bindActionCreators(
      {
        getConversationsRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(
  withModal(OfferPage, [
    'Message',
    {
      name: 'EndOffer',
      state: 'step-1'
    }
  ])
);
