'use strict';
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
exports.signalRReconnectionSaga = exports.signalRSendMessageSaga = exports.signalRConnectionStopSaga = exports.signalRConnectionRequestSaga = exports.removeConversationSaga = exports.markConversationAsReadSaga = exports.getConversationDetailsSaga = exports.getConversationsSaga = void 0;
var redux_saga_1 = require('redux-saga');
var effects_1 = require('redux-saga/effects');
var signalr_no_jquery_1 = require('signalr-no-jquery');
var config_1 = require('../../config');
var client_1 = require('../../utils/api/client');
var client_2 = require('../../utils/api/client');
var actions = require('./actions');
var selectors_1 = require('./selectors');
var types_1 = require('./types');
var MixPanel_1 = require('../../utils/MixPanel');
var moment_timezone_1 = require('moment-timezone');
var getConversationsRequest = function() {
  return __awaiter(void 0, void 0, Promise, function() {
    var data;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            client_2.apiClient.get(config_1.ApiConfig.endpoints.chat.getConversations, {
              baseURL: config_1.ApiConfig.URL
            })
          ];
        case 1:
          data = _a.sent().data;
          return [2 /*return*/, data];
      }
    });
  });
};
function getConversationsSaga() {
  var response, error_1;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        _a.trys.push([0, 3, , 5]);
        return [4 /*yield*/, effects_1.call(getConversationsRequest)];
      case 1:
        response = _a.sent();
        return [4 /*yield*/, effects_1.put(actions.chatGetConversationsSuccess(response))];
      case 2:
        _a.sent();
        return [3 /*break*/, 5];
      case 3:
        error_1 = _a.sent();
        return [4 /*yield*/, effects_1.put(actions.chatGetConversationsError())];
      case 4:
        _a.sent();
        return [3 /*break*/, 5];
      case 5:
        return [2 /*return*/];
    }
  });
}
exports.getConversationsSaga = getConversationsSaga;
var getConversationDetailsRequest = function(payload) {
  return __awaiter(void 0, void 0, Promise, function() {
    var data;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            client_2.apiClient.get(
              config_1.ApiConfig.endpoints.chat.getConversationDetails(payload),
              { baseURL: config_1.ApiConfig.URL }
            )
          ];
        case 1:
          data = _a.sent().data;
          return [2 /*return*/, data];
      }
    });
  });
};
function getConversationDetailsSaga(action) {
  var payload, response, converser, offer, messages, isConversationRead, error_2;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        payload = action.payload;
        _a.label = 1;
      case 1:
        _a.trys.push([1, 6, , 8]);
        return [4 /*yield*/, effects_1.call(getConversationDetailsRequest, payload)];
      case 2:
        response = _a.sent();
        (converser = response.converser),
          (offer = response.offer),
          (messages = response.messages),
          (isConversationRead = response.isConversationRead);
        return [
          4 /*yield*/,
          effects_1.put(
            actions.chatGetConversationDetailsSuccess({
              converser: converser,
              offer: offer,
              messages: messages.map(function(_a) {
                var id = _a.id,
                  senderId = _a.senderId,
                  text = _a.text,
                  dateSent = _a.dateSent,
                  messageContentType = _a.messageContentType,
                  senderAvatarUrl = _a.senderAvatarUrl;
                return {
                  messageId: id,
                  senderId: senderId,
                  text: messageContentType === 1 ? text : config_1.ApiConfig.URL + '/' + text,
                  dateSent: dateSent,
                  type:
                    messageContentType === 1
                      ? types_1.MessageTypes.TEXT
                      : types_1.MessageTypes.IMAGE,
                  senderAvatarUrl: senderAvatarUrl,
                  status: types_1.MessageStatuses.SENT,
                  tempId: null
                };
              })
            })
          )
        ];
      case 3:
        _a.sent();
        if (!!isConversationRead) return [3 /*break*/, 5];
        return [4 /*yield*/, effects_1.call(markConversationAsReadSaga, payload)];
      case 4:
        _a.sent();
        _a.label = 5;
      case 5:
        return [3 /*break*/, 8];
      case 6:
        error_2 = _a.sent();
        return [4 /*yield*/, effects_1.put(actions.chatGetConversationDetailsError())];
      case 7:
        _a.sent();
        return [3 /*break*/, 8];
      case 8:
        return [2 /*return*/];
    }
  });
}
exports.getConversationDetailsSaga = getConversationDetailsSaga;
function markConversationAsReadSaga(conversationId) {
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        _a.trys.push([0, , 2, 4]);
        return [
          4 /*yield*/,
          client_2.apiClient.post(
            config_1.ApiConfig.endpoints.chat.markConversationAsRead(conversationId),
            null,
            { baseURL: config_1.ApiConfig.URL }
          )
        ];
      case 1:
        _a.sent();
        return [3 /*break*/, 4];
      case 2:
        return [4 /*yield*/, effects_1.put(actions.chatMarkConversationAsRead(conversationId))];
      case 3:
        _a.sent();
        return [7 /*endfinally*/];
      case 4:
        return [2 /*return*/];
    }
  });
}
exports.markConversationAsReadSaga = markConversationAsReadSaga;
function removeConversationSaga(action) {
  var payload, error_3;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        payload = action.payload;
        _a.label = 1;
      case 1:
        _a.trys.push([1, 4, , 6]);
        return [
          4 /*yield*/,
          client_2.apiClient.post(
            config_1.ApiConfig.endpoints.chat.deleteConversation(payload),
            null,
            {
              baseURL: config_1.ApiConfig.URL
            }
          )
        ];
      case 2:
        _a.sent();
        return [4 /*yield*/, effects_1.put(actions.chatRemoveConversationSuccess(payload))];
      case 3:
        _a.sent();
        //Chat removed event called here
        MixPanel_1.mixPanelEvent('Chat deleted', {
          'Date deleted': moment_timezone_1['default'](new Date())
            .tz('America/Galapagos')
            .format('MM/DD/YYYY')
        });
        return [3 /*break*/, 6];
      case 4:
        error_3 = _a.sent();
        return [4 /*yield*/, effects_1.put(actions.chatRemoveConversationError())];
      case 5:
        _a.sent();
        return [3 /*break*/, 6];
      case 6:
        return [2 /*return*/];
    }
  });
}
exports.removeConversationSaga = removeConversationSaga;
function setMessageReceivedEvent(hubProxy) {
  var messageReceivedChannel, _loop_1;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        messageReceivedChannel = redux_saga_1.eventChannel(function(emit) {
          var eventName = 'MessageReceived';
          hubProxy.on(eventName, function(messageData) {
            emit(messageData);
          });
          return function() {
            hubProxy.off(eventName, function() {
              return null;
            });
          };
        });
        _loop_1 = function() {
          var msgData,
            conversations,
            conversationId_1,
            conversationDetails,
            converser,
            offer,
            messages,
            senderFirstName,
            senderLastName,
            senderBusinessName,
            messageId,
            senderId,
            text,
            dateTimeSent,
            messageContentType,
            senderAccountType,
            senderAvatarUrl,
            offerCoverPhotoUrl,
            offerDateCreated,
            offerId,
            offerTitle,
            offerType;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, effects_1.take(messageReceivedChannel)];
              case 1:
                msgData = _a.sent();
                if (!msgData) return [3 /*break*/, 7];
                return [
                  4 /*yield*/,
                  effects_1.select(function(state) {
                    return selectors_1.conversationsListSelector(state.chat);
                  })
                ];
              case 2:
                conversations = _a.sent();
                conversationId_1 = msgData.conversationId;
                if (
                  !(
                    conversations.length > 0 &&
                    !conversations.find(function(item) {
                      return item.conversationId === conversationId_1;
                    })
                  )
                )
                  return [3 /*break*/, 5];
                return [
                  4 /*yield*/,
                  effects_1.call(getConversationDetailsRequest, conversationId_1)
                ];
              case 3:
                conversationDetails = _a.sent();
                (converser = conversationDetails.converser),
                  (offer = conversationDetails.offer),
                  (messages = conversationDetails.messages);
                return [
                  4 /*yield*/,
                  effects_1.put(
                    actions.signalRConversationStarted([
                      {
                        conversationId: conversationId_1,
                        converser: __assign({}, converser),
                        isConversationRead: false,
                        offer: __assign({}, offer),
                        lastMessage: messages.length > 0 ? messages[messages.length - 1] : null
                      }
                    ])
                  )
                ];
              case 4:
                _a.sent();
                return [3 /*break*/, 7];
              case 5:
                (senderFirstName = msgData.senderFirstName),
                  (senderLastName = msgData.senderLastName),
                  (senderBusinessName = msgData.senderBusinessName),
                  (messageId = msgData.messageId),
                  (senderId = msgData.senderId),
                  (text = msgData.text),
                  (dateTimeSent = msgData.dateTimeSent),
                  (messageContentType = msgData.messageContentType),
                  (senderAccountType = msgData.senderAccountType),
                  (senderAvatarUrl = msgData.senderAvatarUrl),
                  (offerCoverPhotoUrl = msgData.offerCoverPhotoUrl),
                  (offerDateCreated = msgData.offerDateCreated),
                  (offerId = msgData.offerId),
                  (offerTitle = msgData.offerTitle),
                  (offerType = msgData.offerType);
                return [
                  4 /*yield*/,
                  effects_1.put(
                    actions.signalRMessageReceived({
                      converser: {
                        id: senderId,
                        accountType: senderAccountType,
                        firstName: senderFirstName ? senderFirstName : '',
                        lastName: senderLastName ? senderLastName : '',
                        businessName: senderBusinessName,
                        avatarUrl: senderAvatarUrl
                      },
                      messages: [
                        {
                          messageId: messageId,
                          senderId: senderId,
                          text: text,
                          dateSent: dateTimeSent,
                          type:
                            messageContentType === 1
                              ? types_1.MessageTypes.TEXT
                              : types_1.MessageTypes.IMAGE,
                          senderAvatarUrl: senderAvatarUrl,
                          status: types_1.MessageStatuses.SENT,
                          tempId: null
                        }
                      ],
                      offer: {
                        coverPhotoUrl: offerCoverPhotoUrl,
                        dateCreated: offerDateCreated,
                        id: offerId,
                        title: offerTitle,
                        type: offerType
                      }
                    })
                  )
                ];
              case 6:
                _a.sent();
                _a.label = 7;
              case 7:
                return [2 /*return*/];
            }
          });
        };
        _a.label = 1;
      case 1:
        if (!true) return [3 /*break*/, 3];
        return [5 /*yield**/, _loop_1()];
      case 2:
        _a.sent();
        return [3 /*break*/, 1];
      case 3:
        return [2 /*return*/];
    }
  });
}
function setConfirmationReceivedEvent(hubProxy) {
  var confirmationReceivedChannel, confirmation;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        confirmationReceivedChannel = redux_saga_1.eventChannel(function(emit) {
          var eventName = 'ConfirmationReceived';
          hubProxy.on(eventName, function(confirmationData) {
            emit(confirmationData);
          });
          return function() {
            hubProxy.off(eventName, function() {
              return null;
            });
          };
        });
        _a.label = 1;
      case 1:
        if (!true) return [3 /*break*/, 5];
        return [4 /*yield*/, effects_1.take(confirmationReceivedChannel)];
      case 2:
        confirmation = _a.sent();
        if (!confirmation) return [3 /*break*/, 4];
        return [4 /*yield*/, effects_1.put(actions.signalRConfirmationReceived(confirmation))];
      case 3:
        _a.sent();
        _a.label = 4;
      case 4:
        return [3 /*break*/, 1];
      case 5:
        return [2 /*return*/];
    }
  });
}
var signalRConnection = function(hubProxy) {
  return __awaiter(void 0, void 0, void 0, function() {
    var promise;
    return __generator(this, function(_a) {
      promise = new Promise(function(resolve, reject) {
        return hubProxy.connection
          .start()
          .done(function() {
            return resolve(true);
          })
          .fail(function() {
            return reject(new Error());
          });
      });
      return [2 /*return*/, promise];
    });
  });
};
function signalRConnectionRequestSaga(action) {
  var retryCount, maxRetryCount, token, hubName, connection, hubProxy, error_4, userEmail, logged;
  var _a, _b;
  return __generator(this, function(_c) {
    switch (_c.label) {
      case 0:
        retryCount =
          (_b = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.retryCount) !==
            null && _b !== void 0
            ? _b
            : 0;
        maxRetryCount = 3;
        token = client_2.tokenStore.get() ? client_2.tokenStore.get().access_token : null;
        hubName = config_1.SignalR.hubName;
        connection = signalr_no_jquery_1.hubConnection(config_1.SignalR.host, {
          qs: 'Authorization=Bearer ' + token
        });
        hubProxy = connection.createHubProxy(hubName);
        return [4 /*yield*/, effects_1.fork(setMessageReceivedEvent, hubProxy)];
      case 1:
        _c.sent();
        return [4 /*yield*/, effects_1.fork(setConfirmationReceivedEvent, hubProxy)];
      case 2:
        _c.sent();
        _c.label = 3;
      case 3:
        _c.trys.push([3, 6, , 11]);
        return [4 /*yield*/, signalRConnection(hubProxy)];
      case 4:
        _c.sent();
        return [4 /*yield*/, effects_1.put(actions.signalRConnectionSuccess(hubProxy))];
      case 5:
        _c.sent();
        return [3 /*break*/, 11];
      case 6:
        error_4 = _c.sent();
        userEmail = function(state) {
          return state.currentUser.currentUser.email;
        };
        return [4 /*yield*/, effects_1.select(userEmail)];
      case 7:
        logged = _c.sent();
        return [4 /*yield*/, effects_1.put(actions.signalRConnectionError())];
      case 8:
        _c.sent();
        if (!(logged && retryCount !== -1 && retryCount < maxRetryCount)) return [3 /*break*/, 10];
        return [
          4 /*yield*/,
          effects_1.put(
            actions.signalRReconnectionRequest({
              retryCount: retryCount + 1
            })
          )
        ];
      case 9:
        _c.sent();
        _c.label = 10;
      case 10:
        return [3 /*break*/, 11];
      case 11:
        return [2 /*return*/];
    }
  });
}
exports.signalRConnectionRequestSaga = signalRConnectionRequestSaga;
function signalRConnectionStopSaga() {
  var hubProxy;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        return [
          4 /*yield*/,
          effects_1.select(function(state) {
            return selectors_1.signalRHubProxySelector(state.chat);
          })
        ];
      case 1:
        hubProxy = _a.sent();
        if (!hubProxy) return [3 /*break*/, 3];
        return [4 /*yield*/, hubProxy.connection.stop()];
      case 2:
        _a.sent();
        _a.label = 3;
      case 3:
        return [4 /*yield*/, effects_1.put(actions.signalRConnectionStopSuccess())];
      case 4:
        _a.sent();
        return [2 /*return*/];
    }
  });
}
exports.signalRConnectionStopSaga = signalRConnectionStopSaga;
function signalRSendMessageSaga(action) {
  var hubProxy, payload, error_5;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        return [
          4 /*yield*/,
          effects_1.select(function(state) {
            return selectors_1.signalRHubProxySelector(state.chat);
          })
        ];
      case 1:
        hubProxy = _a.sent();
        payload = action.payload;
        _a.label = 2;
      case 2:
        _a.trys.push([2, 5, , 8]);
        return [4 /*yield*/, hubProxy.invoke('SendMessage', payload)];
      case 3:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.put(
            actions.signalRDeleteMessage({ messageId: payload.messageId ? payload.messageId : 0 })
          )
        ];
      case 4:
        _a.sent();
        return [3 /*break*/, 8];
      case 5:
        error_5 = _a.sent();
        return [
          4 /*yield*/,
          effects_1.put(
            actions.signalRReconnectionRequest({
              retryCount: -1
            })
          )
        ];
      case 6:
        _a.sent();
        return [4 /*yield*/, effects_1.put(actions.signalRSendMessageError(payload))];
      case 7:
        _a.sent();
        return [3 /*break*/, 8];
      case 8:
        return [2 /*return*/];
    }
  });
}
exports.signalRSendMessageSaga = signalRSendMessageSaga;
function signalRReconnectionSaga(action) {
  var hubProxy;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        return [
          4 /*yield*/,
          effects_1.select(function(state) {
            return selectors_1.signalRHubProxySelector(state.chat);
          })
        ];
      case 1:
        hubProxy = _a.sent();
        if (!hubProxy) return [3 /*break*/, 3];
        return [4 /*yield*/, hubProxy.connection.stop()];
      case 2:
        _a.sent();
        _a.label = 3;
      case 3:
        return [4 /*yield*/, client_1.authManager.reloadToken()];
      case 4:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.put(
            actions.signalRConnectionRequest({
              retryCount: action.payload.retryCount
            })
          )
        ];
      case 5:
        _a.sent();
        return [2 /*return*/];
    }
  });
}
exports.signalRReconnectionSaga = signalRReconnectionSaga;
function default_1() {
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        return [
          4 /*yield*/,
          effects_1.takeLatest(
            actions.ActionTypes.CHAT_GET_CONVERSATIONS_REQUEST,
            getConversationsSaga
          )
        ];
      case 1:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.takeLatest(
            actions.ActionTypes.CHAT_GET_CONVERSATION_DETAILS_REQUEST,
            getConversationDetailsSaga
          )
        ];
      case 2:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.takeLatest(
            actions.ActionTypes.CHAT_REMOVE_CONVERSATION_REQUEST,
            removeConversationSaga
          )
        ];
      case 3:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.takeLatest(
            actions.ActionTypes.CHAT_SIGNALR_CONNECTION_REQUEST,
            signalRConnectionRequestSaga
          )
        ];
      case 4:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.takeLatest(
            actions.ActionTypes.CHAT_SIGNALR_CONNECTION_STOP_REQUEST,
            signalRConnectionStopSaga
          )
        ];
      case 5:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.takeEvery(actions.ActionTypes.CHAT_SIGNALR_SEND_MESSAGE, signalRSendMessageSaga)
        ];
      case 6:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.takeLatest(
            actions.ActionTypes.CHAT_SIGNALR_RECONNECTION_REQUEST,
            signalRReconnectionSaga
          )
        ];
      case 7:
        _a.sent();
        return [2 /*return*/];
    }
  });
}
exports['default'] = default_1;
