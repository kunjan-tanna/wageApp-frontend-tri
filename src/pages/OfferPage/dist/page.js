'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
require('./styles.scss');
var react_1 = require('react');
var react_router_dom_1 = require('react-router-dom');
var DisplayOnlyForLogged_1 = require('../../components/DisplayOnlyForLogged');
var DisplayOnlyForOwner_1 = require('../../components/DisplayOnlyForOwner');
var Gallery_1 = require('../../components/Gallery');
var Loading_1 = require('../../components/Loading');
var Modal_1 = require('../../components/Modal');
var ModalAlternative_1 = require('../../components/ModalAlternative');
var OfferTypeBadge_1 = require('../../components/OfferTypeBadge');
var Socials_1 = require('../../components/Socials');
var UserInfoBox_1 = require('../../components/UserInfoBox');
var config_1 = require('../../config');
var types_1 = require('../../types');
var offers_1 = require('../../types/offers');
var OfferBidders_1 = require('./components/OfferBidders');
var OfferDetailsHeader_1 = require('./components/OfferDetailsHeader');
var Step1_1 = require('./components/OfferEnding/components/Step1');
var Step2_1 = require('./components/OfferEnding/components/Step2');
var Step3_1 = require('./components/OfferEnding/components/Step3');
var Step3Completed_1 = require('./components/OfferEnding/components/Step3Completed');
var StepComplete_1 = require('./components/OfferEnding/components/StepComplete');
var OfferLocation_1 = require('./components/OfferLocation');
var OfferMessage_1 = require('./components/OfferMessage');
var PickupLocationMap_1 = require('./components/PickupLocationMap');
var RelatedOffers_1 = require('./components/RelatedOffers');
var react_redux_1 = require('react-redux');
var redux_1 = require('redux');
var selectors_1 = require('../../modules/CurrentUser/selectors');
var index_1 = require('../../utils/MixPanel/index');
var moment_timezone_1 = require('moment-timezone');
var index_2 = require('../../utils/Firebase/index');
var redux_2 = require('redux');
var actions_1 = require('../../modules/Chat/actions');
// import Axios from 'axios';
var client_1 = require('../../utils/api/client');
var config_2 = require('../../config');
// const firestore = Firebase.firestore();
// const messagesRef = firestore.collection('web');
var OfferPage = /** @class */ (function(_super) {
  __extends(OfferPage, _super);
  function OfferPage(props) {
    var _this = _super.call(this, props) || this;
    _this._renderContent = function() {
      var _a = _this.props,
        blockModalVisibilityChange = _a.blockModalVisibilityChange,
        _b = _a.offer,
        id = _b.id,
        title = _b.title,
        category = _b.category,
        offerType = _b.offerType,
        numberOfBidders = _b.numberOfBidders,
        description = _b.description,
        location = _b.location,
        ownerUserDetails = _b.ownerUserDetails,
        gallery = _b.gallery,
        relatedOffers = _b.relatedOffers,
        userOffers = _b.userOffers,
        status = _b.status,
        owner = _b.owner,
        offer = _a.offer,
        offerBidders = _a.offerBidders,
        offerBiddersRequest = _a.offerBiddersRequest,
        currentUserId = _a.currentUserId,
        offerReport = _a.offerReport,
        currentUserEmail = _a.currentUserEmail;
      var loginLink = {
        pathname: config_1.Routes.LOGIN,
        state: {
          from: config_1.Routes.OFFER + '/' + offer.id,
          var: 'report'
        }
      };
      return react_1['default'].createElement(
        'div',
        { className: 'row' },
        react_1['default'].createElement(
          'div',
          { className: 'full-width-box full-width-box--with-more-options' },
          react_1['default'].createElement(
            'div',
            { className: 'offer-details-page' },
            react_1['default'].createElement(
              'div',
              { className: 'offer-details-page__column offer-details-page__column--right' },
              react_1['default'].createElement(OfferDetailsHeader_1['default'], {
                offer: _this.props.offer
              }),
              _this._renderOfferOptions(),
              react_1['default'].createElement(
                DisplayOnlyForOwner_1['default'],
                { ownerId: owner.id },
                status !== offers_1.OfferStatuses.COMPLETED && _this._renderOwnerOption()
              ),
              react_1['default'].createElement(UserInfoBox_1['default'], {
                currentUserId: currentUserId,
                ownerId: owner.id,
                userData: __assign(__assign({}, owner), {
                  isBlocked: ownerUserDetails.isBlocked,
                  verifiedBy: ownerUserDetails.verifiedBy,
                  joinedDate: ownerUserDetails.joinedDate
                }),
                blockModalVisibilityChange: blockModalVisibilityChange,
                showBusinessDetails: true
              }),
              location.locality &&
                react_1['default'].createElement(OfferLocation_1['default'], {
                  location: location,
                  offerType: offerType
                }),
              react_1['default'].createElement(
                'div',
                { className: 'offer-details-page__map' },
                react_1['default'].createElement(PickupLocationMap_1['default'], {
                  id: id,
                  location: location,
                  title: title,
                  type: offerType
                })
              ),
              console.log('\n\n\n EEEEEE-->', _this.props.user.id, owner.id),
              react_1['default'].createElement(
                'div',
                { className: 'offer-details-page__interested' },
                react_1['default'].createElement('span', null, numberOfBidders),
                ' others interested',
                _this.props.user.id !== owner.id
                  ? currentUserEmail.length < 1
                    ? react_1['default'].createElement(
                        'div',
                        { className: 'report' },
                        react_1['default'].createElement(
                          'span',
                          { className: 'reportFlag' },
                          react_1['default'].createElement(
                            react_router_dom_1.Link,
                            { to: loginLink },
                            'Report ',
                            react_1['default'].createElement('i', {
                              className: 'icon icon--report'
                            })
                          )
                        )
                      )
                    : react_1['default'].createElement(
                        'div',
                        { className: 'report' },
                        react_1['default'].createElement(
                          'span',
                          {
                            className: 'reportFlag',
                            onClick: function() {
                              offerReport({
                                offerId: offer.id
                              });
                              _this._openReportModal();
                            }
                          },
                          'Report ',
                          react_1['default'].createElement('i', { className: 'icon icon--report' })
                        )
                      )
                  : null
              ),
              react_1['default'].createElement(
                DisplayOnlyForOwner_1['default'],
                { ownerId: ownerUserDetails.id },
                react_1['default'].createElement(OfferBidders_1['default'], {
                  offerBidders: offerBidders,
                  offerBiddersRequest: offerBiddersRequest,
                  offerId: id.toString(),
                  blockModalVisibilityChange: blockModalVisibilityChange
                })
              )
            ),
            react_1['default'].createElement(
              'div',
              { className: 'offer-details-page__column' },
              react_1['default'].createElement(
                'div',
                { className: 'offer-details-page__gallery-badge' },
                react_1['default'].createElement(Gallery_1['default'], {
                  items: gallery,
                  userData: ownerUserDetails
                }),
                react_1['default'].createElement(OfferTypeBadge_1['default'], { type: offerType })
              ),
              react_1['default'].createElement(
                'div',
                { className: 'offer-details-page__description' },
                react_1['default'].createElement(
                  'h3',
                  { className: 'offer-details-page__description__title' },
                  'Description'
                ),
                react_1['default'].createElement(
                  'p',
                  { className: 'offer-details-page__description__text' },
                  description
                )
              ),
              react_1['default'].createElement(Socials_1['default'], { offer: offer })
            )
          )
        ),
        userOffers.length > 0 &&
          react_1['default'].createElement(RelatedOffers_1['default'], {
            title:
              'Posted by ' +
              (owner.accountType === types_1.AccountTypes.INTERNAL ? owner.firstName : '') +
              ' ' +
              owner.lastName,
            offers: userOffers
          }),
        relatedOffers.length > 0 &&
          react_1['default'].createElement(RelatedOffers_1['default'], {
            title: 'Related',
            offers: relatedOffers
          })
      );
    };
    _this._handleOpenEndOfferModal = function() {
      var _a = _this.props,
        setModalState = _a.setModalState,
        openModal = _a.openModal,
        status = _a.offer.status;
      if (status === offers_1.OfferStatuses.INPROGRESS) {
        setModalState('EndOffer', 'step-3-completed')();
      } else {
        setModalState('EndOffer', 'step-1')();
      }
      openModal('EndOffer')();
    };
    _this.open12 = function() {
      var _a = _this.props,
        setModalState = _a.setModalState,
        openModal = _a.openModal,
        status = _a.offer.status;
      openModal('Message');
    };
    _this._renderOfferOptions = function() {
      var _a = _this.props,
        offer = _a.offer,
        _b = _a.offer,
        id = _b.owner.id,
        offerType = _b.offerType,
        ownerUserDetails = _b.ownerUserDetails,
        currentUserId = _a.currentUserId,
        currentUserEmail = _a.currentUserEmail,
        openModal = _a.openModal,
        offerReport = _a.offerReport,
        offerReportResponse = _a.report.offerReportResponse,
        offerSendMail = _a.offerSendMail;
      // Gig - Service report event called here
      if (offerReportResponse === 'success' && _this.state.reportModalOpen === true) {
        var type = offerType[0].toUpperCase() + offerType.slice(1);
        console.log('Report type', type);
        var offerUrl =
          '' +
          'https://wageapp.io' +
          config_1.Routes.OFFER +
          '/' +
          offer.id +
          '/' +
          offer.title
            .trim()
            .replace(/\s/g, '-')
            .toLowerCase();
        index_1.mixPanelEvent(type + ' reported', {
          reported: true,
          'Task Title': offer.title,
          Link: offerUrl,
          'User name': ownerUserDetails.firstName + ' ' + ownerUserDetails.lastName
        });
      }
      var reportModalOpen = _this.state.reportModalOpen;
      var loginLink = {
        pathname: config_1.Routes.LOGIN,
        state: {
          from: config_1.Routes.OFFER + '/' + offer.id
        }
      };
      if (window.localStorage.getItem('re_flag') == 'true') {
        var app = document.getElementById('myCheck');
        app === null || app === void 0 ? void 0 : app.click();
        // window.localStorage.removeItem('re_flag');
        // if (document && document.getElementById("myCheck")) {
        //   document.getElementById("myCheck").click();
        // }
      }
      if (id === currentUserId) {
        return null;
      }
      return react_1['default'].createElement(
        react_1['default'].Fragment,
        null,
        react_1['default'].createElement(
          'div',
          { className: 'offer-details-page__navigation' },
          react_1['default'].createElement(
            DisplayOnlyForLogged_1['default'],
            null,
            react_1['default'].createElement(
              'button',
              {
                id: 'myCheck',
                className: 'btn btn--b btn--b-color',
                onClick: openModal('Message')
              },
              'Chat'
            ),
            offer.owner.accountType === types_1.AccountTypes.BUSINESS &&
              react_1['default'].createElement(
                'button',
                {
                  className: 'btn btn--b',
                  onClick: function() {
                    return offerSendMail({ offerId: offer.id });
                  }
                },
                'Email'
              )
          ),
          currentUserEmail.length < 1 &&
            react_1['default'].createElement(
              react_1['default'].Fragment,
              null,
              react_1['default'].createElement(
                react_router_dom_1.Link,
                { className: 'btn btn--b btn--b-color', to: loginLink },
                'Chat'
              )
            )
        ),
        react_1['default'].createElement(
          ModalAlternative_1['default'],
          { isOpen: reportModalOpen, extraClass: 'report-modal' },
          react_1['default'].createElement(
            'div',
            { className: 'modal-alternative__header' },
            react_1['default'].createElement(
              'button',
              { className: 'btn-close', onClick: _this._closeReportModal },
              react_1['default'].createElement('i', { className: 'icon icon--close-gray' })
            ),
            react_1['default'].createElement('h3', null, 'Report')
          ),
          react_1['default'].createElement(
            'div',
            { className: 'modal-alternative-content' },
            offerReportResponse
              ? react_1['default'].createElement(
                  react_1['default'].Fragment,
                  null,
                  react_1['default'].createElement(
                    'p',
                    null,
                    offerReportResponse === 'success' && 'This offer has been reported.',
                    offerReportResponse === 'error' && 'Error! Please try again.'
                  ),
                  react_1['default'].createElement(
                    'button',
                    { className: 'btn btn--b btn--b-color', onClick: _this._closeReportModal },
                    'Ok'
                  )
                )
              : react_1['default'].createElement(Loading_1['default'], null)
          )
        )
      );
    };
    _this._renderMessageModal = function() {
      var _a = _this.props,
        offer = _a.offer,
        getModalVisibility = _a.getModalVisibility,
        closeModal = _a.closeModal,
        _b = _a.bid,
        responseStatus = _b.responseStatus,
        error = _b.error;
      var messageSent = _this.state.messageSent;
      return react_1['default'].createElement(OfferMessage_1['default'], {
        offer: offer,
        responseStatus: responseStatus,
        error: error,
        modalState: getModalVisibility('Message'),
        closeModal: closeModal('Message'),
        messageHandler: _this._messageSendHandler,
        messageSent: messageSent,
        closeThanksMessage: function() {
          return _this._closeThanksMessage();
        }
      });
    };
    _this._closeThanksMessage = function() {
      var offerBidReset = _this.props.offerBidReset;
      offerBidReset();
      _this.setState({
        messageSent: false
      });
    };
    _this._renderEndOfferModal = function() {
      var _a = _this.props,
        getModalVisibility = _a.getModalVisibility,
        closeModal = _a.closeModal,
        setStatus = _a.setStatus,
        _b = _a.offer,
        status = _b.status,
        offerType = _b.offerType;
      var successModalClose = _this.state.successModalClose;
      return react_1['default'].createElement(
        react_1['default'].Fragment,
        null,
        react_1['default'].createElement(
          ModalAlternative_1['default'],
          { isOpen: getModalVisibility('EndOffer'), extraClass: 'ending-task' },
          react_1['default'].createElement(
            'div',
            { className: 'modal-alternative__header' },
            react_1['default'].createElement(
              'button',
              { className: 'btn-close', onClick: closeModal('EndOffer') },
              react_1['default'].createElement('i', { className: 'icon icon--close-gray' })
            ),
            react_1['default'].createElement('h3', null, 'End ', offerType)
          ),
          _this._renderProviderSelectScreen()
        ),
        setStatus.success &&
          status !== offers_1.OfferStatuses.INPROGRESS &&
          react_1['default'].createElement(StepComplete_1['default'], {
            offerType: offerType,
            onClick: _this._closeSuccessModal,
            isOpen: !successModalClose
          })
      );
    };
    _this._closeSuccessModal = function() {
      _this.setState({
        successModalClose: true
      });
    };
    _this._renderProviderSelectScreen = function() {
      var _a = _this.props,
        offerBidders = _a.offerBidders,
        setModalState = _a.setModalState,
        closeModal = _a.closeModal,
        _b = _a.offer,
        selectedBidder = _b.selectedBidder,
        status = _b.status,
        offerType = _b.offerType,
        offerCompleteRequest = _a.offerCompleteRequest,
        offer = _a.offer;
      var endOfferModalState = _this.props.getModalState('EndOffer');
      switch (endOfferModalState) {
        case 'step-2':
          return react_1['default'].createElement(Step2_1['default'], {
            onBack: setModalState('EndOffer', 'step-1'),
            user: selectedBidder,
            onFinish: setModalState('EndOffer', 'step-3-completed'),
            status: status,
            onProgress: _this._handleGigInProgress,
            offerType: offerType
          });
        case 'step-3-pending':
          return react_1['default'].createElement(Step3_1['default'], {
            onFinish: function() {
              closeModal('EndOffer')();
            }
          });
        case 'step-3-completed':
          return react_1['default'].createElement(Step3Completed_1['default'], {
            onBack: setModalState('EndOffer', 'step-2'),
            user: selectedBidder,
            closeModal: closeModal,
            offer: offer,
            offerCompleteRequest: offerCompleteRequest
          });
        default:
          return react_1['default'].createElement(Step1_1['default'], {
            data: offerBidders,
            selectHandler: _this._providerSelectHandler
          });
      }
    };
    _this._handleGigInProgress = function() {
      var _a = _this.props,
        setModalState = _a.setModalState,
        offerSetStatusRequest = _a.offerSetStatusRequest,
        offer = _a.offer;
      var id = offer.selectedBidder.id;
      offerSetStatusRequest({
        offerId: offer.id,
        status: offers_1.OfferStatuses.INPROGRESS,
        workerId: id
      });
      setModalState('EndOffer', 'step-3-pending')();
    };
    _this._providerSelectHandler = function(user) {
      var _a = _this.props,
        setModalState = _a.setModalState,
        offerSetStatusRequest = _a.offerSetStatusRequest,
        offerSelectBidder = _a.offerSelectBidder,
        _b = _a.offer,
        id = _b.id,
        offerType = _b.offerType,
        title = _b.title,
        name = _b.category.name,
        _c = _b.owner,
        firstName = _c.firstName,
        lastName = _c.lastName,
        closeModal = _a.closeModal;
      if (!user) {
        offerSetStatusRequest({ offerId: id, status: offers_1.OfferStatuses.COMPLETED });
        var type = offerType[0].toUpperCase() + offerType.slice(1);
        index_1.mixPanelEvent(type + ' completed', {
          Title: title,
          Category: name,
          'Date ended': moment_timezone_1['default'](new Date())
            .tz('America/Galapagos')
            .format('MM/DD/YYYY')
        });
        index_1.setUserProfile({
          Worker: firstName + ' ' + lastName
        });
        closeModal('EndOffer')();
      } else {
        offerSelectBidder(user);
        setModalState('EndOffer', 'step-2')();
      }
    };
    _this._messageSendHandler = function(values, actions) {
      return __awaiter(_this, void 0, void 0, function() {
        var _a,
          offerBidRequest,
          _b,
          id,
          title,
          price,
          category,
          offerType,
          ownerUserDetails,
          responseStatus,
          currentUserId,
          closeModal,
          getConversationsRequest,
          data;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              (_a = this.props),
                (offerBidRequest = _a.offerBidRequest),
                (_b = _a.offer),
                (id = _b.id),
                (title = _b.title),
                (price = _b.price),
                (category = _b.category),
                (offerType = _b.offerType),
                (ownerUserDetails = _b.ownerUserDetails),
                (responseStatus = _a.bid.responseStatus),
                (currentUserId = _a.currentUserId),
                (closeModal = _a.closeModal),
                (getConversationsRequest = _a.getConversationsRequest);
              // Chat initiated event called here
              if (responseStatus === 200) {
                client_1.apiClient
                  .get('https://api.wageapp.io/api/conversations/v2', {
                    baseURL: config_2.ApiConfig.URL
                  })
                  .then(function(res) {
                    if (!JSON.stringify(res.data.conversations).includes(String(id))) {
                      index_1.mixPanelEvent('Chat initiated', {
                        'Date initiated': moment_timezone_1['default'](new Date())
                          .tz('America/Galapagos')
                          .format('MM/DD/YYYY'),
                        'Task name': title,
                        'Task price': price,
                        Category: category.name,
                        'User name': ownerUserDetails.firstName + ' ' + ownerUserDetails.lastName,
                        'Task type': offerType
                      });
                      index_1.setUserProfile({
                        $name: ownerUserDetails.firstName + ' ' + ownerUserDetails.lastName,
                        id: ownerUserDetails.id
                      });
                    }
                  });
              }
              return [
                4 /*yield*/,
                client_1.apiClient.post(
                  'https://api.wageapp.io/api/offers/' + id + '/bid-v2',
                  { message: values.message },
                  { baseURL: config_2.ApiConfig.URL }
                )
              ];
            case 1:
              data = _c.sent().data;
              console.log('\n\n DDDRRR,', data);
              // offerBidRequest({ offerId: id, message: values.message });
              return [4 /*yield*/, getConversationsRequest()];
            case 2:
              // offerBidRequest({ offerId: id, message: values.message });
              _c.sent();
              index_2.db
                .collection('Conversations')
                .doc(String(data.conversationId))
                .set({
                  conversationId: String(data.conversationId),
                  isArchieved: false,
                  isRead: false,
                  offerId: id,
                  lastSenderId: currentUserId,
                  lastSentMessageDate: index_2.firebaseDate
                })
                .then(function(querySnapshot) {
                  index_2.db
                    .collection('Conversations')
                    .doc(String(data.conversationId))
                    .collection('conversationmessages')
                    .doc()
                    .set({
                      conversationId: String(data.conversationId),
                      imageUrl: '',
                      type: 'Text',
                      sentDate: index_2.firebaseDate,
                      senderId: currentUserId,
                      text: values.message,
                      isRead: false
                    });
                  index_2.db
                    .collection('Users')
                    .doc(String(ownerUserDetails.id))
                    .update('unreadConversation', index_2.FS.FieldValue.increment(1));
                  closeModal('Message')();
                });
              if (values.message.length > 0) {
                setTimeout(this._openThanksMessage, 500);
              }
              return [2 /*return*/];
          }
        });
      });
    };
    _this._openThanksMessage = function() {
      _this.setState({
        messageSent: true
      });
    };
    _this._closeReportModal = function() {
      _this.setState({
        reportModalOpen: false
      });
    };
    _this._openReportModal = function() {
      _this.setState({
        reportModalOpen: true
      });
    };
    _this._renderOwnerOption = function() {
      var status = _this.props.offer.status;
      return react_1['default'].createElement(
        'div',
        { className: 'offer-details-page__navigation' },
        react_1['default'].createElement(
          react_router_dom_1.Link,
          {
            className: 'btn btn--b btn--b-color',
            to: config_1.Routes.EDIT_TASK + '/' + _this.props.offer.id
          },
          'Edit'
        ),
        status === offers_1.OfferStatuses.PENDING || status === offers_1.OfferStatuses.INPROGRESS
          ? react_1['default'].createElement(
              'button',
              { className: 'btn btn--b', onClick: _this._handleOpenEndOfferModal },
              'End'
            )
          : null
      );
    };
    _this.state = {
      messageSent: false,
      successModalClose: false,
      reportModalOpen: false
    };
    return _this;
  }
  OfferPage.prototype.componentDidMount = function() {
    //Gig view event called here
    var _a = this.props.offer,
      title = _a.title,
      category = _a.category,
      price = _a.price,
      offerType = _a.offerType;
    var type = offerType[0].toUpperCase() + offerType.slice(1);
    index_1.mixPanelEvent(type + ' viewed', {
      Category: category.name,
      Price: price || 0,
      Title: title
    });
  };
  OfferPage.prototype.componentDidUpdate = function() {
    var _a = this.props,
      bid = _a.bid,
      getModalVisibility = _a.getModalVisibility,
      closeModal = _a.closeModal;
    console.log('\n\n BBIIDD', bid);
    if (getModalVisibility('Message') && bid.success) {
      closeModal('Message')();
    }
  };
  OfferPage.prototype.componentWillUnmount = function() {
    this.setState({
      reportModalOpen: false
    });
  };
  OfferPage.prototype.render = function() {
    var isRequesting = this.props.isRequesting;
    return react_1['default'].createElement(
      react_1['default'].Fragment,
      null,
      react_1['default'].createElement(
        'main',
        { className: 'container container--task ' + Loading_1.HasIndicator(isRequesting) },
        isRequesting ? react_1['default'].createElement(Loading_1['default'], null) : '',
        this._renderContent()
      ),
      this._renderMessageModal(),
      this._renderEndOfferModal()
    );
  };
  return OfferPage;
})(react_1.Component);
// export default withModal(OfferPage, [
//   'Message',
//   {
//     name: 'EndOffer',
//     state: 'step-1'
//   }
// ]);
var mapStateToProps = function(state) {
  return {
    user: selectors_1.currentUserSelector(state.currentUser)
  };
};
var mapDispatchToProps = function(dispatch) {
  return __assign(
    {},
    redux_2.bindActionCreators(
      {
        getConversationsRequest: actions_1.chatGetConversationsRequest
      },
      dispatch
    )
  );
};
exports['default'] = redux_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps))(
  Modal_1['default'](OfferPage, [
    'Message',
    {
      name: 'EndOffer',
      state: 'step-1'
    }
  ])
);
