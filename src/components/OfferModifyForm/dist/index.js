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
exports.__esModule = true;
var formik_1 = require('formik');
var react_1 = require('react');
var yup = require('yup');
var react_redux_1 = require('react-redux');
var redux_1 = require('redux');
var actions_1 = require('../../modules/Categories/actions');
var actions_2 = require('../../modules/Offers/actions');
var GeolocationInput_1 = require('../../components/GeolocationInput');
var Map_1 = require('../../components/Map');
var RadioButton_1 = require('../../components/RadioButton');
var RegularInput_1 = require('../../components/RegularInput');
var Textarea_1 = require('../../components/Textarea');
var types_1 = require('../../types');
var form_1 = require('../../utils/form');
var MoreOptions_1 = require('../MoreOptions');
var FileUpload_1 = require('./components/FileUpload');
var GeolocationInputComponent_1 = require('./components/GeolocationInputComponent');
var InputLabel_1 = require('./components/InputLabel');
var offer_1 = require('../../utils/validation/offer');
var selectors_1 = require('../../modules/Categories/selectors');
require('./styles.scss');
var validationSchema = yup.object().shape(offer_1['default']);
var OfferModifyForm = /** @class */ (function(_super) {
  __extends(OfferModifyForm, _super);
  function OfferModifyForm(props) {
    var _this = _super.call(this, props) || this;
    _this.handleChange = function(e, setFieldValue) {
      if (e.target.value.length <= 22) {
        setFieldValue('title', e.target.value);
        _this.setState({ countDown: e.target.value.length });
      } else {
        _this.setState({ errorMessage: '' });
      }
    };
    _this.handleChangeTextArea = function(e, setFieldValue) {
      if (e.target.value.length <= 500) {
        setFieldValue('description', e.target.value);
        _this.setState({ textAreaCount: e.target.value.length });
      } else {
        _this.setState({ errorMessage: '' });
      }
    };
    _this.state = {
      resetCount: 0,
      errorMessage: '',
      countDown: 0,
      textAreaCount: 0,
      promotion: false,
      promotionType: 0,
      isSubmitting: false
    };
    _this.initialValues = props.initialValues;
    return _this;
  }
  OfferModifyForm.prototype.componentDidMount = function() {
    var categoriesRequest = this.props.categoriesRequest;
    categoriesRequest();
    if (this.initialValues && this.initialValues.promotionType == 0) {
      this.setState({ promotionType: 0, promotion: false });
    } else if (this.initialValues && this.initialValues.promotionType > 0) {
      this.setState({ promotion: true, promotionType: Number(this.initialValues.promotionType) });
    }
  };
  OfferModifyForm.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      accountType = _a.accountType,
      handleSubmit = _a.handleSubmit,
      title = _a.title,
      submitButton = _a.submitButton,
      categories = _a.categories;
    var resetCount = this.state.resetCount;
    return react_1['default'].createElement(
      'div',
      { className: 'offer-modify' },
      react_1['default'].createElement(
        'div',
        { className: 'offer-modify__content' },
        react_1['default'].createElement('h2', { className: 'offer-modify__title' }, title),
        react_1['default'].createElement(formik_1.Formik, {
          initialValues: this.initialValues,
          validationSchema: validationSchema,
          onSubmit: function(values, actions) {
            console.log('\n\n\n ST', _this.state);
            if (_this.state.promotion === true && _this.state.promotionType == 0) {
              _this.setState({ errorMessage: '*Please select promotion type' });
            } else {
              _this.setState({ errorMessage: '', isSubmitting: true });
              values['promotionType'] = _this.state.promotionType;
              handleSubmit(values, actions);
            }
            return _this._increaseResetCount();
          },
          onReset: function() {
            return _this._increaseResetCount();
          },
          render: function(_a) {
            var values = _a.values,
              errors = _a.errors,
              status = _a.status,
              touched = _a.touched,
              handleBlur = _a.handleBlur,
              handleChange = _a.handleChange,
              handleSubmit = _a.handleSubmit,
              isSubmitting = _a.isSubmitting,
              setFieldValue = _a.setFieldValue,
              setFieldTouched = _a.setFieldTouched;
            return react_1['default'].createElement(
              react_1['default'].Fragment,
              null,
              status && form_1.renderFormMessages(status),
              react_1['default'].createElement(
                'form',
                { onSubmit: handleSubmit },
                react_1['default'].createElement(
                  InputLabel_1['default'],
                  { labelText: 'Select Task Type' },
                  react_1['default'].createElement(
                    'div',
                    { className: 'radio-btns' },
                    react_1['default'].createElement(
                      'div',
                      { className: 'radio-btns__box' },
                      react_1['default'].createElement(RadioButton_1['default'], {
                        name: 'type',
                        onChange: handleChange,
                        onBlur: handleBlur,
                        value: values.type,
                        touched: touched.type,
                        error: errors.type,
                        label: 'Gig',
                        id: 'gig'
                      }),
                      react_1['default'].createElement(MoreOptions_1['default'], {
                        items: [
                          {
                            label: 'You are looking to hire'
                          }
                        ]
                      })
                    ),
                    accountType === types_1.AccountTypes.INTERNAL &&
                      react_1['default'].createElement(
                        'div',
                        { className: 'radio-btns__box' },
                        react_1['default'].createElement(RadioButton_1['default'], {
                          name: 'type',
                          onChange: handleChange,
                          onBlur: handleBlur,
                          value: values.type,
                          touched: touched.type,
                          error: errors.type,
                          label: 'Service',
                          id: 'service'
                        }),
                        react_1['default'].createElement(MoreOptions_1['default'], {
                          items: [
                            {
                              label: 'You have a service to offer'
                            }
                          ]
                        })
                      )
                  )
                ),
                react_1['default'].createElement(
                  InputLabel_1['default'],
                  { labelText: 'Details' },
                  react_1['default'].createElement(RegularInput_1['default'], {
                    name: 'title',
                    onChange: function(e) {
                      return _this.handleChange(e, setFieldValue);
                    },
                    onBlur: handleBlur,
                    value: values.title,
                    touched: touched.title,
                    error: errors.title,
                    placeholder: 'Task name'
                  }),
                  _this.state.countDown > 0
                    ? react_1['default'].createElement(
                        'div',
                        { className: 'fRight' },
                        react_1['default'].createElement('span', null, _this.state.countDown, '/22')
                      )
                    : null,
                  react_1['default'].createElement(Textarea_1['default'], {
                    name: 'description',
                    onChange: function(e) {
                      return _this.handleChangeTextArea(e, setFieldValue);
                    },
                    onBlur: handleBlur,
                    value: values.description,
                    touched: touched.description,
                    error: errors.description,
                    id: 'description',
                    placeholder: 'Describe what you need done',
                    placeholderDescription: !values.description
                      ? 'What you want it to look like, how long you think it should take, experience you are looking for, difficulties they may run  into.'
                      : ''
                  }),
                  _this.state.textAreaCount > 0
                    ? react_1['default'].createElement(
                        'div',
                        { className: 'fRight' },
                        react_1['default'].createElement(
                          'span',
                          null,
                          _this.state.textAreaCount,
                          '/500'
                        )
                      )
                    : null,
                  react_1['default'].createElement(
                    'div',
                    { className: 'select' },
                    localStorage.setItem('offer_categories', JSON.stringify(categories)),
                    react_1['default'].createElement(
                      'select',
                      {
                        className: 'select-dropdown select__field',
                        value: values.categoryId,
                        onChange: function(e) {
                          return setFieldValue('categoryId', e.target.value);
                        }
                      },
                      react_1['default'].createElement('option', { value: '' }, 'Category'),
                      categories.map(function(c) {
                        return (
                          c.value != 0 &&
                          react_1['default'].createElement('option', { value: c.value }, c.label)
                        );
                      })
                    )
                  ),
                  errors.categoryId && touched.categoryId
                    ? react_1['default'].createElement(
                        'div',
                        { className: 'validation-error' },
                        errors.categoryId
                      )
                    : null
                ),
                react_1['default'].createElement(
                  InputLabel_1['default'],
                  { labelText: 'Photos' },
                  react_1['default'].createElement(FileUpload_1['default'], {
                    error: errors.media,
                    touched: touched.media,
                    setFieldValue: setFieldValue,
                    setFieldTouched: setFieldTouched
                  })
                ),
                react_1['default'].createElement(
                  InputLabel_1['default'],
                  { labelText: 'Location', extraClassname: 'map' },
                  react_1['default'].createElement(GeolocationInput_1['default'], {
                    onLocationChange: function(location) {
                      setFieldValue('lat', location.lat);
                      setFieldValue('lng', location.lng);
                    },
                    component: GeolocationInputComponent_1['default'],
                    additionalProps: {
                      resetCount: resetCount,
                      placeholder: 'Address, city, or zip code',
                      error: !!errors.lng && touched.lng
                    },
                    initialLocation: {
                      lat: _this.initialValues.lat,
                      lng: _this.initialValues.lng
                    }
                  }),
                  react_1['default'].createElement(
                    'div',
                    { className: 'input-wrapper__map' },
                    react_1['default'].createElement(Map_1['default'], {
                      markers: [
                        {
                          id: 1,
                          location: {
                            lat: values.lat,
                            lng: values.lng
                          },
                          title: values.title,
                          type: values.type
                        }
                      ]
                    })
                  )
                ),
                react_1['default'].createElement(
                  InputLabel_1['default'],
                  { labelText: 'Price' },
                  react_1['default'].createElement(RegularInput_1['default'], {
                    type: 'number',
                    name: 'price',
                    onChange: handleChange,
                    onBlur: handleBlur,
                    value: !values.price ? '' : values.price,
                    touched: touched.price,
                    error: errors.price,
                    placeholder: 'Negotiable price',
                    iconName: 'dolar',
                    additionalClass: 'price'
                  })
                ),
                react_1['default'].createElement(
                  InputLabel_1['default'],
                  { labelText: 'Promote (optional)' },
                  react_1['default'].createElement(
                    react_1['default'].Fragment,
                    null,
                    react_1['default'].createElement(
                      'div',
                      { className: 'pramotionMain' },
                      react_1['default'].createElement(
                        'p',
                        null,
                        'Get more views instantly. Promotion will run via email.'
                      ),
                      react_1['default'].createElement('b', null, 'More options available soon.'),
                      react_1['default'].createElement(
                        'div',
                        { className: 'control-group' },
                        react_1['default'].createElement(
                          'label',
                          { className: 'control control--checkbox' },
                          'I want promotions',
                          react_1['default'].createElement('input', {
                            type: 'checkbox',
                            className: 'checkboxCss',
                            id: 'promotion',
                            name: 'promotion',
                            checked: _this.state.promotion,
                            onChange: function() {
                              return _this.setState({
                                promotion: !_this.state.promotion,
                                promotionType: 0,
                                errorMessage: ''
                              });
                            }
                          }),
                          react_1['default'].createElement('div', {
                            className: 'control__indicator'
                          })
                        ),
                        _this.state.errorMessage.length > 0 &&
                          react_1['default'].createElement(
                            'span',
                            { className: 'promotionCss' },
                            _this.state.errorMessage
                          )
                      ),
                      _this.state.promotion &&
                        react_1['default'].createElement(
                          'div',
                          { className: 'collapse listitem', id: 'typetask' },
                          react_1['default'].createElement(
                            'div',
                            { className: 'card card-body' },
                            react_1['default'].createElement(
                              'div',
                              { className: 'radioBlock' },
                              react_1['default'].createElement(
                                'div',
                                { className: 'radio' },
                                react_1['default'].createElement('input', {
                                  id: 'radio-1',
                                  name: 'promotionType',
                                  value: 1,
                                  checked: _this.state.promotionType === 1,
                                  type: 'radio',
                                  onChange: function() {
                                    return _this.setState({ promotionType: 1, errorMessage: '' });
                                  }
                                }),
                                react_1['default'].createElement(
                                  'label',
                                  { htmlFor: 'radio-1', className: 'radio-label' },
                                  react_1['default'].createElement('span', null, 'Local')
                                )
                              ),
                              react_1['default'].createElement(
                                'div',
                                { className: 'radio' },
                                react_1['default'].createElement('input', {
                                  id: 'radio-2',
                                  name: 'promotionType',
                                  value: 2,
                                  checked: _this.state.promotionType === 2,
                                  type: 'radio',
                                  onChange: function() {
                                    return _this.setState({ promotionType: 2, errorMessage: '' });
                                  }
                                }),
                                react_1['default'].createElement(
                                  'label',
                                  { htmlFor: 'radio-2', className: 'radio-label' },
                                  react_1['default'].createElement('span', null, 'Statewide')
                                )
                              ),
                              react_1['default'].createElement(
                                'div',
                                { className: 'radio' },
                                react_1['default'].createElement('input', {
                                  id: 'radio-3',
                                  name: 'promotionType',
                                  value: 3,
                                  checked: _this.state.promotionType === 3,
                                  type: 'radio',
                                  onChange: function() {
                                    return _this.setState({ promotionType: 3, errorMessage: '' });
                                  }
                                }),
                                react_1['default'].createElement(
                                  'label',
                                  { htmlFor: 'radio-3', className: 'radio-label' },
                                  react_1['default'].createElement('span', null, 'Nationwide')
                                )
                              )
                            )
                          )
                        )
                    )
                  )
                ),
                react_1['default'].createElement(
                  'button',
                  {
                    type: 'submit',
                    disabled: _this.state.isSubmitting,
                    className: 'btn btn--a submit-btn'
                  },
                  submitButton
                )
              )
            );
          }
        })
      )
    );
  };
  OfferModifyForm.prototype._increaseResetCount = function() {
    return this.setState(function(prevState) {
      return {
        resetCount: prevState.resetCount + 1
      };
    });
  };
  return OfferModifyForm;
})(react_1.PureComponent);
var mapDispatchToProps = function(dispatch) {
  return __assign(
    {},
    redux_1.bindActionCreators(
      {
        offersRequest: actions_2.offersRequest,
        categoriesRequest: actions_1.categoriesRequest,
        offersResetPage: actions_2.offersResetPage
      },
      dispatch
    )
  );
};
var mapStateToProps = function(state) {
  return {
    categories: selectors_1.categoriesSelectSelector(state.categories)
  };
};
exports['default'] = redux_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps))(
  OfferModifyForm
);
// export default OfferModifyForm;
