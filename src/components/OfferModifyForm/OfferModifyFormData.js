import { Formik } from 'formik';

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ApiConfig, Routes } from '../../config';

import * as yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { IStoreState } from '../../store';
import { categoriesRequest } from '../../modules/Categories/actions';
import { offersRequest, offersResetPage } from '../../modules/Offers/actions';
// import { Form, Steps, Button, message } from 'antd';
import GeolocationInput from '../GeolocationInput';
import Map from '../Map';
import RadioButton from '../RadioButton';
import RegularInput from '../RegularInput';
import Textarea from '../Textarea';
import { AccountTypes, ILocation } from '../../types';
import { renderFormMessages } from '../../utils/form';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import CategorySelect from './components/CategorySelect';
import FileUploader from './components/FileUpload';
import GeolocationInputComponent from './components/GeolocationInputComponent';
import InputLabelWrapper from './components/InputLabel';
import {
  IFormValues,
  IProps,
  IState,
  IExternalProps,
  Actions,
  IDispatchProps
} from '../../pages/AddTaskPage/types';
import offerValidation from '../../utils/validation/offer';
import { categoriesSelectSelector } from '../../modules/Categories/selectors';
import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import querystring from 'querystring';

import './styles.scss';
import MoreOptions from '../MoreOptions';
import 'antd/dist/antd.css';
import Messages from '../../pages/DashboardPage/routes/DashboardMessages/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-responsive-modal';
import { apiClient } from '../../utils/api/client';
import { delay } from '@redux-saga/core/effects';

const steps = ['Basic information', 'Job details', 'Terms'];
function OfferModifyFormData(props) {
  const validationSchema = yup.object().shape(offerValidation);

  const [resetCount, setResetCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [titleState, setTitleState] = useState('');
  const [countDown, setCountDown] = useState(0);
  const [current, setCurrent] = useState(0);
  const [textAreaCount, setTextAreaCount] = useState(0);
  const [promotion, setPromotion] = useState(false);
  const [promotionType, setPromotionType] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openCodeModal, setOpenCodeModal] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [disButton, setDisButton] = useState(false);
  const [formData, setFormData] = useState({});
  const [formikValue, setFormikValues] = useState({});
  const [submitActions, setSubmitActions] = useState({});
  const [genCode, setGenCode] = useState(null);
  const [disBtn, setDisbtn] = useState(false);
  const [code, setCode] = useState('');

  const myForm = React.useRef(null);
  // const [formData, setForm] = useState(Form.useForm());
  const { accountType, handleSubmit, title, submitButton, categories, initialValues } = props;

  // const [limit, setLimit] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const { categoriesRequest, currentUser } = props;
    console.log('currentUser', currentUser);
    setDisbtn(true);
    // setOpenCodeModal(true);
    categoriesRequest();
    if (initialValues && initialValues.promotionType == 0) {
      setPromotionType(0);
      setPromotion(false);
    } else if (initialValues && initialValues.promotionType > 0) {
      setPromotion(true);
      setPromotionType(Number(this.initialValues.promotionType));
    }
  }, []);
  const handleChangeData = (e, setFieldValue) => {
    setTitleErrorMessage('');

    if (e.target.value.length <= 22) {
      setFieldValue('title', e.target.value);
      setCountDown(e.target.value.length);
    } else {
      setErrorMessage('');
    }
    if (e.target.value.replace(/\s/g, '') === '') {
      setErrorMessage('Title is required to create an offer.');
    }
  };
  const handlePromotionChange = () => {
    setPromotion(!promotion);
    setPromotionType(0);
    setErrorMessage('');
  };
  const handlePromotionTypeChange = () => {
    setPromotionType(promotionType == 1 ? 1 : promotionType == 2 ? 2 : promotionType == 3 ? 3 : 0);
    setErrorMessage('');
  };
  const GeolocationInputChange = data => {
    console.log('\n\n DATa is', data.current.value);
  };

  const _increaseResetCount = () => {
    return setResetCount(resetCount + 1);
  };
  const handleChangeTextArea = (e, setFieldValue) => {
    if (e.target.value.length <= 500) {
      setFieldValue('description', e.target.value);
      setTextAreaCount(e.target.value.length);
    } else {
      setErrorMessage('');
    }
  };

  //IMPLEMENT THE MATERIAL UI STEPPER
  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };
  const handleNext = () => {
    if (activeStep == 0) {
      if (!formData.categoryId || !formData.title) {
        toast.error('Please fill the details', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    } else if (activeStep == 1) {
      if (!formData.media || !formData.lat) {
        toast.error('Please fill the details', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else if (activeStep == 1) {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    // if (Object.keys(formData).length == 0) {
    //   if (activeStep == 0 && !formData.title && !formData.categoryId) {
    //     toast.error('Please fill the details', {
    //       position: toast.POSITION.BOTTOM_RIGHT
    //     });
    //   }
    // } else {
    //   let newSkipped = skipped;
    //   if (isStepSkipped(activeStep)) {
    //     newSkipped = new Set(newSkipped.values());
    //     newSkipped.delete(activeStep);
    //   }

    //   setActiveStep(prevActiveStep => prevActiveStep + 1);
    //   setSkipped(newSkipped);
    // }
  };
  //OPEN PHONE VERIFICATION MODAL
  const handleModal = (values, actions) => {
    setOpenModal(true);
    setFormikValues(values);
    setSubmitActions(actions);
  };
  //CLOSE PHONE VERIFICATION MODAL
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  //CLOSE ENTER CODE MOAL
  const handleCloseCodeModal = () => {
    setOpenCodeModal(false);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  //PHONE VERIFICATION SEND CODE API CALL
  const handleVerify = async () => {
    const abc = {
      phoneNumber: 7817803197 //static
    };

    await apiClient.get(`${ApiConfig.URL}/api/users/getcode/${7817803197}`).then(response => {
      console.log('RESPONSE', response);
      if (response.status === 200) {
        const receviceCode = response.data.code;
        setGenCode(receviceCode);
        if (receviceCode) {
          setDisbtn(false);
          // setOpenModal(false);
        }
        toast.success(`OTP has been sent to your register number.Please check it`, {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
          setOpenCodeModal(true);
        }, 3000);
      }
    });
  };
  //ENTER THE CODE AND VERIFY
  const handleChangePhoneSubmit = async () => {
    console.log('HELLO', formikValue, 'ACTIONS', submitActions);
    // const reqBody = {
    //   phoneNumber: props.currentUser.phoneNumber
    // };
    const reqBody = {
      phoneNumber: 7817803197, //static,
      code: code
    };
    if (genCode == code) {
      reqBody.code = code;
    } else {
      toast.error(`You have enter wrong OTP.`, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    console.log('REQBODY', reqBody);
    await apiClient.post(`${ApiConfig.URL}/api/users/verifyCode`, reqBody).then(response => {
      console.log('RESPONSE', response);
      if (response.status === 200) {
        const isVerified = response.data.isVerified;
        if (isVerified == true) {
          handleSubmit(formikValue, submitActions);
          setOpenCodeModal(false);
          setOpenModal(false);
        }
      }
    });
  };
  //HANDLE ONCHANGE
  const handleChangeCode = e => {
    const { name, value } = e.target;
    console.log('NAME', name, 'VALUE', value);
    if (genCode == value) {
      setDisbtn(false);
    }
    setCode(value);
  };

  //HANDLE RESET CODE
  const handleResetCode = async () => {
    setCode('');
    setDisbtn(true);

    await apiClient.get(`${ApiConfig.URL}/api/users/getcode/${7817803197}`).then(response => {
      console.log('RESPONSE', response);
      if (response.status === 200) {
        const receviceCode = response.data.code;
        setGenCode(receviceCode);

        toast.success(`OTP has been sent to your register number.Please check it`, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  };
  return (
    <div className="offer-modify add-task-screen">
      <div className="add-task-header">
        <div className="container">
          <div className="post-job-step-status">
            <div className="post-job-step-status-inner">
              <label>Post a job</label>
              <div className="borderFull"></div>
              <span>1/3</span>
            </div>
          </div>
          <div className="add-task-step">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div className="steps-action">
              {activeStep > 0 && (
                <Button className="btn-back" onClick={() => handleBack()}>
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <>
                  {' '}
                  <Button className="btn-next" type="primary" onClick={() => handleNext()}>
                    Next
                  </Button>
                  <ToastContainer />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="offer-modify__content">
        <h2 className="offer-modify__title">{title}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log('\n\n\n ST', actions);
            // if (this.state.titleState.replace(/\s/g, '') === "") {
            //   this.setState({ titleErrorMessage: ' Title is required to create an offer.' });
            // }
            if (titleErrorMessage === '') {
              if (promotion === true && promotionType == 0) {
                setErrorMessage('*Please select promotion type');
              } else {
                setErrorMessage('');
                setIsSubmitting(true);

                values['promotionType'] = promotionType;
                values['map_types'] = window.localStorage.getItem('MAP_TYPES');
                window.localStorage.removeItem('MAP_TYPES');
                console.log('\n\n WWWWWWW', values);
                if (props.currentUser.isNumberVerified == false) {
                  return handleModal(values, actions);
                } else if (props.currentUser.isNumberVerified == true) {
                  // handleSubmit(values, actions);
                }
              }

              return _increaseResetCount();
            }
          }}
          onReset={() => {
            return _increaseResetCount();
          }}
          validate={values => {
            setFormData(values);
          }}
          render={({
            values,
            errors,
            status,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched
          }) => (
            <>
              <div>
                <div className="steps-content">
                  {status && renderFormMessages(status)}

                  <form onSubmit={handleSubmit} ref={myForm}>
                    {activeStep == 0 ? (
                      <>
                        <InputLabelWrapper labelText="Select Role">
                          <fieldset className="custome-radio radioBlock radioBlockMain">
                            <div className="toggle radio">
                              <input
                                type="radio"
                                name={'type'}
                                id={'gig'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'gig'}
                                checked={'gig' === values.type}
                              />
                              <label htmlFor={'gig'} className="radio-label">
                                <span>I want to hire someone</span>
                              </label>
                            </div>
                            {/* {accountType === AccountTypes.INTERNAL && ( */}
                            <div className="toggle radio">
                              <input
                                type="radio"
                                name={'type'}
                                id={'service'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'service'}
                                checked={'service' === values.type}
                              />
                              <label htmlFor={'service'} className="radio-label">
                                <span>I am looking for work</span>
                              </label>
                              {/* )} */}
                            </div>
                          </fieldset>
                          {/* <div className="radio-btns">
                        <div className="radio-btns__box">
                          <RadioButton
                            name="type"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.type}
                            touched={touched.type}
                            error={errors.type}
                            label="I want to hire someone"
                            id="gig"
                          />
                          <MoreOptions
                              items={[
                                {
                                  label: 'You are looking to hire'
                                }
                              ]}
                            />
                        </div>
                        {accountType === AccountTypes.INTERNAL && (
                          <div className="radio-btns__box">
                            <RadioButton
                              name="type"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.type}
                              touched={touched.type}
                              error={errors.type}
                              label="I am looking for work"
                              id="service"
                            />
                            <MoreOptions
                                items={[
                                  {
                                    label: 'You have a service to offer'
                                  }
                                ]}
                              />
                          </div>
                        )}
                      </div> */}
                        </InputLabelWrapper>
                        <InputLabelWrapper labelText="Details">
                          <RegularInput
                            name="title"
                            onChange={e => handleChangeData(e, setFieldValue)}
                            onBlur={handleBlur}
                            value={values.title}
                            touched={touched.title}
                            error={errors.title || titleErrorMessage}
                            placeholder={
                              values?.type === 'gig'
                                ? 'What do you need done?'
                                : 'In a nutshell, what do you do?'
                            }
                          />
                          {/* {this.state.titleErrorMessage.length > 0 && (
                          <span className="promotionCss"><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{this.state.titleErrorMessage}</span>
                        )} */}
                          {titleErrorMessage.length == 0 && countDown > 0 ? (
                            <div className="fRight">
                              <span>{countDown}/22</span>
                            </div>
                          ) : null}
                          <Textarea
                            name="description"
                            onChange={e => handleChangeTextArea(e, setFieldValue)}
                            onBlur={handleBlur}
                            value={values.description}
                            touched={touched.description}
                            error={errors.description}
                            id="description"
                            placeholder={
                              values?.type === 'gig'
                                ? 'Could you describe the task a bit more?'
                                : 'Please tell people more about youself.'
                            }
                            placeholderDescription={
                              !values.description && values.type === 'gig'
                                ? 'What you want it to look like, how long you think it should take, experience you are looking for, difficulties someone may run into.'
                                : ''
                            }
                          />
                          {textAreaCount > 0 ? (
                            <div className="fRight">
                              <span>{textAreaCount}/500</span>
                            </div>
                          ) : null}
                          <div className="select">
                            {localStorage.setItem('offer_categories', JSON.stringify(categories))}

                            <select
                              className={'select-dropdown select__field'}
                              value={values.categoryId}
                              onChange={e => setFieldValue('categoryId', e.target.value)}
                            >
                              <option value="">
                                {values?.type === 'gig'
                                  ? 'What category does it fit in?'
                                  : 'Select your skills'}
                              </option>
                              {categories.map(
                                c => c.value != 0 && <option value={c.value}>{c.label}</option>
                              )}
                            </select>
                          </div>
                          {errors.categoryId && touched.categoryId ? (
                            <div className="validation-error">{errors.categoryId}</div>
                          ) : null}
                          {/* <CategorySelect
                        setFieldValue={setFieldValue}
                        error={errors.categoryId}
                        touched={touched.categoryId}
                        value={values.categoryId}
                      /> */}
                        </InputLabelWrapper>
                      </>
                    ) : (
                      ''
                    )}
                    {activeStep == 1 ? (
                      <>
                        {' '}
                        <InputLabelWrapper labelText="Photos">
                          <FileUploader
                            error={errors.media}
                            touched={touched.media}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            textTitle={
                              values?.type === 'gig'
                                ? 'Please drag and drop up to 5 images of the job'
                                : 'Drag and drop pictures that highlight your work'
                            }
                          />
                        </InputLabelWrapper>
                        <InputLabelWrapper
                          labelText={
                            values?.type === 'gig' ? 'Where is the job?' : 'Where are you located?'
                          }
                          extraClassname="map"
                        >
                          {console.log('\n\n EEEEEEEEEE', errors)}
                          <GeolocationInput
                            isFromAddEdit={true}
                            map_types={initialValues.map_types}
                            onLocationChange={location => {
                              setFieldValue('lat', location.lat);
                              setFieldValue('lng', location.lng);
                            }}
                            component={GeolocationInputComponent}
                            additionalProps={{
                              resetCount,
                              placeholder: 'Address, city, or zip code',
                              error: !!errors.lng && touched.lng,
                              onChange: data => GeolocationInputChange(data)
                            }}
                            initialLocation={{
                              lat: initialValues.lat,
                              lng: initialValues.lng
                            }}
                          />
                          <div className="input-wrapper__map">
                            <Map
                              markers={[
                                {
                                  id: 1,
                                  location: {
                                    lat: values.lat,
                                    lng: values.lng
                                  },
                                  title: values.title,
                                  type: values.type
                                }
                              ]}
                            />
                          </div>
                        </InputLabelWrapper>
                      </>
                    ) : (
                      ''
                    )}
                    {activeStep == 2 ? (
                      <>
                        {' '}
                        <InputLabelWrapper
                          labelText={
                            values?.type === 'gig'
                              ? 'How much are you willing to pay?'
                              : 'How much do you charge?'
                          }
                        >
                          <RegularInput
                            type="number"
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={!values.price ? '' : values.price}
                            touched={touched.price}
                            error={errors.price}
                            placeholder="Negotiable price"
                            iconName="dolar"
                            additionalClass="price"
                          />
                        </InputLabelWrapper>
                        <InputLabelWrapper labelText="Promote (optional)">
                          <>
                            <div className="pramotionMain">
                              <p>Get more views instantly. Promotion will run via email.</p>
                              <b>More options available soon.</b>

                              {/* <div className="promotionBlock">
                              <input type="checkbox" className="checkboxCss" id="promotion" name="promotion" checked={this.state.promotion} onChange={() => this.setState({ promotion: !this.state.promotion, promotionType: 0 })} />
                              <label> Promotion</label>
                            </div> */}

                              <div className="control-group">
                                <label className="control control--checkbox">
                                  I want promotions
                                  <input
                                    type="checkbox"
                                    className="checkboxCss"
                                    id="promotion"
                                    name="promotion"
                                    checked={promotion}
                                    onChange={() => handlePromotionChange()}
                                  />
                                  <div className="control__indicator"></div>
                                </label>
                                {errorMessage.length > 0 && (
                                  <span className="promotionCss">{errorMessage}</span>
                                )}
                              </div>

                              {promotion && (
                                <div className="collapse listitem" id="typetask">
                                  <div className="card card-body">
                                    <div className="radioBlock">
                                      <div className="radio">
                                        <input
                                          id="radio-1"
                                          name="promotionType"
                                          value={1}
                                          checked={promotionType === 1}
                                          type="radio"
                                          onChange={() => handlePromotionTypeChange()}
                                        />
                                        <label htmlFor="radio-1" className="radio-label">
                                          <span>Local</span>
                                        </label>
                                      </div>
                                      <div className="radio">
                                        <input
                                          id="radio-2"
                                          name="promotionType"
                                          value={2}
                                          checked={promotionType === 2}
                                          type="radio"
                                          onChange={() => handlePromotionTypeChange()}
                                        />
                                        <label htmlFor="radio-2" className="radio-label">
                                          <span>Statewide</span>
                                        </label>
                                      </div>
                                      <div className="radio">
                                        <input
                                          id="radio-3"
                                          name="promotionType"
                                          value={3}
                                          checked={promotionType === 3}
                                          type="radio"
                                          onChange={() => handlePromotionTypeChange()}
                                        />
                                        <label htmlFor="radio-3" className="radio-label">
                                          <span>Nationwide</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        </InputLabelWrapper>
                        {/* <InputLabelWrapper labelText="Description" labelOptional={true} id="description">
                      <Textarea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        touched={touched.description}
                        error={errors.description}
                        id="description"
                        placeholder="Describe what you need done"
                        placeholderDescription={
                          !values.description
                            ? 'What you want it to look like, how long you think it should take, experience you are looking for, difficulties they may run  into.'
                            : ''
                        }
                      />
                    </InputLabelWrapper> */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn--a submit-btn"
                        >
                          {submitButton}
                        </button>
                      </>
                    ) : (
                      ''
                    )}
                  </form>
                  {/* {steps[current].content} */}
                  {/* ///PHONE VERIFICATION MODAL/////// */}
                  <Modal open={openModal} onClose={handleCloseModal}>
                    <div className="verificationModal">
                      <div className="verificationModal-content">
                        <h2>Phone Verification!</h2>
                        <h3>We just need to verify your account.</h3>
                        <p>
                          Before you can send a message, please verify the phone number associated
                          with your account: <strong>{props.currentUser.phoneNumber}</strong>
                        </p>
                      </div>
                      <div className="ConfirmBtn">
                        <button
                          className="btn btn--b btn--b-color"
                          type="submit"
                          onClick={() => handleVerify()}
                        >
                          Send Code
                        </button>
                        <ToastContainer autoClose={2500} />
                      </div>
                    </div>
                  </Modal>
                  {/* //////////ENTER CODE SCREEN MODAL////////////// */}
                  <Modal open={openCodeModal} onClose={handleCloseCodeModal}>
                    <div className="verificationModal">
                      <h2>Account Verification</h2>
                      <div className="verificationModal-content text-left">
                        <h3>
                          Please enter the 6 digit code we send you{' '}
                          <strong>{props.currentUser.phoneNumber}</strong>
                        </h3>
                        {console.log('genCode', genCode)}
                        {/* <input type="text" className="form-control" placeholder="6-digit code" /> */}
                        <RegularInput
                          type="number"
                          name="code"
                          onChange={handleChangeCode}
                          // onBlur={handleBlur}
                          value={code ? code : ''}
                          // touched={touched.price}
                          // error={errors.price}
                          placeholder="6-digit code"
                          additionalClass="price"
                        />
                        <button
                          className="resend"
                          // className="btn btn--b btn--b-color"
                          onClick={() => handleResetCode()}
                        >
                          Resend code
                        </button>
                      </div>
                      <div className="ConfirmBtn">
                        <button
                          disabled={disBtn}
                          className="btn btn--b btn--b-color"
                          onClick={() => handleChangePhoneSubmit()}
                        >
                          VERIFY MY PHONE NUMBER
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        offersRequest,
        categoriesRequest,
        offersResetPage
      },
      dispatch
    )
  };
};
// const myHorizontalLoginForm = Form.create()(OfferModifyForm);
const mapStateToProps = state => {
  return {
    categories: categoriesSelectSelector(state.categories),
    currentUser: currentUserSelector(state.currentUser)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferModifyFormData);
