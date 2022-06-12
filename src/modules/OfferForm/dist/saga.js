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
exports.editTaskSaga = exports.addTaskSaga = void 0;
var moment_timezone_1 = require('moment-timezone');
var effects_1 = require('redux-saga/effects');
var config_1 = require('../../config');
var client_1 = require('../../utils/api/client');
var MixPanel_1 = require('../../utils/MixPanel');
var fileUploadActions = require('../FileUpload/actions');
var offerModalActions = require('../Modals/OfferModify/actions');
var offerFormActions = require('./actions');
var react_geocode_1 = require('react-geocode');
react_geocode_1['default'].setApiKey('AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs');
react_geocode_1['default'].setLanguage('en');
react_geocode_1['default'].setRegion('us');
react_geocode_1['default'].enableDebug();
var extendRequestPayload = function(payload) {
  return __assign(__assign({}, payload.values), {
    price: payload.values.price ? payload.values.price : null,
    media: payload.values.media.split(',').map(function(id) {
      return { id: parseInt(id, 10) };
    })
  });
};
var addTaskRequest = function(payload) {
  return __awaiter(void 0, void 0, Promise, function() {
    var data;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            client_1.apiClient.post(
              config_1.ApiConfig.endpoints.offers.add,
              extendRequestPayload(payload),
              {
                baseURL: config_1.ApiConfig.URL
              }
            )
          ];
        case 1:
          data = _a.sent().data;
          return [2 /*return*/, data];
      }
    });
  });
};
function addTaskSaga(action) {
  var payload, _a, resetForm, setSubmitting, images_1, type_1, error_1;
  return __generator(this, function(_b) {
    switch (_b.label) {
      case 0:
        payload = action.payload;
        (_a = action.payload.actions),
          (resetForm = _a.resetForm),
          (setSubmitting = _a.setSubmitting);
        _b.label = 1;
      case 1:
        _b.trys.push([1, 9, , 13]);
        return [4 /*yield*/, effects_1.put(offerModalActions.offerModifyModalOpen())];
      case 2:
        _b.sent();
        return [4 /*yield*/, effects_1.call(addTaskRequest, payload)];
      case 3:
        _b.sent();
        return [4 /*yield*/, effects_1.put(offerFormActions.addTaskSuccess())];
      case 4:
        _b.sent();
        images_1 = payload.values.media.split(',');
        type_1 = payload.values.type[0].toUpperCase() + payload.values.type.slice(1);
        react_geocode_1['default']
          .fromLatLng(String(payload.values.lat), String(payload.values.lng))
          .then(function(res) {
            var zipcode;
            if (res.status == 'OK') {
              var result = res.results[0];
              if (result) {
                for (var i = 0; i < result.address_components.length; i++) {
                  var types = result.address_components[i].types;
                  for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
                    if (types[typeIdx] == 'postal_code') {
                      zipcode = result.address_components[i].short_name;
                    }
                  }
                }
              } else {
                console.log('No results found');
              }
            }
            // Add Task event clled here
            var categories, category_name;
            var a = localStorage.getItem('offer_categories');
            if (a && JSON.parse(a) && JSON.parse(a)[0]) {
              categories = JSON.parse(a);
              var b = categories.filter(function(obj) {
                return obj.value == payload.values.categoryId;
              });
              category_name = b[0].label;
            }
            MixPanel_1.mixPanelEvent(type_1 + ' added', {
              Title: payload.values.title,
              Images: images_1.length,
              Price: payload.values.price,
              'Date created': moment_timezone_1['default'](new Date())
                .tz('America/Galapagos')
                .format('MM/DD/YYYY'),
              Category: category_name || '',
              Location: zipcode
            });
          });
        return [4 /*yield*/, effects_1.call(resetForm)];
      case 5:
        _b.sent();
        return [4 /*yield*/, effects_1.call(setSubmitting, false)];
      case 6:
        _b.sent();
        return [
          4 /*yield*/,
          effects_1.put(
            offerModalActions.offerModifyModalShowMessage({ message: 'Task successfully created.' })
          )
        ];
      case 7:
        _b.sent();
        return [4 /*yield*/, effects_1.put(fileUploadActions.offerFormUploadReset())];
      case 8:
        _b.sent();
        return [3 /*break*/, 13];
      case 9:
        error_1 = _b.sent();
        return [4 /*yield*/, effects_1.put(offerFormActions.addTaskError())];
      case 10:
        _b.sent();
        return [4 /*yield*/, effects_1.call(setSubmitting, false)];
      case 11:
        _b.sent();
        return [
          4 /*yield*/,
          effects_1.put(
            offerModalActions.offerModifyModalShowMessage({
              message: 'Internal error. Please try again.'
            })
          )
        ];
      case 12:
        _b.sent();
        return [3 /*break*/, 13];
      case 13:
        return [2 /*return*/];
    }
  });
}
exports.addTaskSaga = addTaskSaga;
var editTaskRequest = function(payload) {
  return __awaiter(void 0, void 0, Promise, function() {
    var data;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            client_1.apiClient.put(
              config_1.ApiConfig.endpoints.offers.edit(payload.offerId),
              extendRequestPayload(payload),
              {
                baseURL: config_1.ApiConfig.URL
              }
            )
          ];
        case 1:
          data = _a.sent().data;
          return [2 /*return*/, data];
      }
    });
  });
};
function editTaskSaga(action) {
  var payload, _a, resetForm, setSubmitting, error_2;
  return __generator(this, function(_b) {
    switch (_b.label) {
      case 0:
        payload = action.payload;
        (_a = action.payload.actions),
          (resetForm = _a.resetForm),
          (setSubmitting = _a.setSubmitting);
        _b.label = 1;
      case 1:
        _b.trys.push([1, 9, , 13]);
        return [4 /*yield*/, effects_1.put(offerModalActions.offerModifyModalOpen())];
      case 2:
        _b.sent();
        return [4 /*yield*/, effects_1.call(editTaskRequest, payload)];
      case 3:
        _b.sent();
        return [4 /*yield*/, effects_1.put(offerFormActions.editTaskSuccess())];
      case 4:
        _b.sent();
        return [4 /*yield*/, effects_1.call(resetForm)];
      case 5:
        _b.sent();
        return [4 /*yield*/, effects_1.call(setSubmitting, false)];
      case 6:
        _b.sent();
        return [
          4 /*yield*/,
          effects_1.put(
            offerModalActions.offerModifyModalShowMessage({ message: 'Task successfully edited.' })
          )
        ];
      case 7:
        _b.sent();
        return [4 /*yield*/, effects_1.put(fileUploadActions.offerFormUploadReset())];
      case 8:
        _b.sent();
        return [3 /*break*/, 13];
      case 9:
        error_2 = _b.sent();
        return [4 /*yield*/, effects_1.put(offerFormActions.editTaskError())];
      case 10:
        _b.sent();
        return [4 /*yield*/, effects_1.call(setSubmitting, false)];
      case 11:
        _b.sent();
        return [
          4 /*yield*/,
          effects_1.put(
            offerModalActions.offerModifyModalShowMessage({
              message: 'Internal error. Please try again.'
            })
          )
        ];
      case 12:
        _b.sent();
        return [3 /*break*/, 13];
      case 13:
        return [2 /*return*/];
    }
  });
}
exports.editTaskSaga = editTaskSaga;
function default_1() {
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        return [
          4 /*yield*/,
          effects_1.takeLatest(offerFormActions.ActionTypes.ADD_TASK_REQUEST, addTaskSaga)
        ];
      case 1:
        _a.sent();
        return [
          4 /*yield*/,
          effects_1.takeLatest(offerFormActions.ActionTypes.EDIT_TASK_REQUEST, editTaskSaga)
        ];
      case 2:
        _a.sent();
        return [2 /*return*/];
    }
  });
}
exports['default'] = default_1;
