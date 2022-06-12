import { Formik } from 'formik';
import React, { PureComponent, ChangeEvent } from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { IStoreState } from '../../store';
import { categoriesRequest } from '../../modules/Categories/actions';
import { offersRequest, offersResetPage } from '../../modules/Offers/actions';
import { Form, Steps, Button, message } from 'antd';
import GeolocationInput from '../../components/GeolocationInput';
import Map from '../../components/Map';
import RadioButton from '../../components/RadioButton';
import RegularInput from '../../components/RegularInput';
import Textarea from '../../components/Textarea';
import { AccountTypes, ILocation } from '../../types';
import { renderFormMessages } from '../../utils/form';
import MoreOptions from '../MoreOptions';
import CategorySelect from './components/CategorySelect';
import FileUploader from './components/FileUpload';
import GeolocationInputComponent from './components/GeolocationInputComponent';
import InputLabelWrapper from './components/InputLabel';
import { IFormValues, IProps, IState, IExternalProps, Actions, IDispatchProps } from './types';
import offerValidation from '../../utils/validation/offer';
import { categoriesSelectSelector } from '../../modules/Categories/selectors';
import './styles.scss';
import 'antd/dist/antd.css';
import Messages from '../../pages/DashboardPage/routes/DashboardMessages/index';

// import Details from './Details'
const validationSchema: any = yup.object().shape(offerValidation);
const { Step } = Steps;
let steps = [
  {
    title: 'First Step'
  },
  {
    title: 'Second Step'
  },
  {
    title: 'Last Step'
  }
];
class OfferModifyForm extends PureComponent<IProps, IState> {
  private readonly initialValues: IFormValues;

  public constructor(props: IProps) {
    super(props);

    this.state = {
      resetCount: 0,
      errorMessage: '',
      titleErrorMessage: '',
      titleState: '',
      countDown: 0,
      current: 0,
      textAreaCount: 0,
      promotion: false,
      promotionType: 0,
      isSubmitting: false
    };

    this.initialValues = props.initialValues;
  }

  public componentDidMount() {
    const { categoriesRequest } = this.props;
    categoriesRequest();
    if (this.initialValues && this.initialValues.promotionType == 0) {
      this.setState({ promotionType: 0, promotion: false });
    } else if (this.initialValues && this.initialValues.promotionType > 0) {
      this.setState({ promotion: true, promotionType: Number(this.initialValues.promotionType) });
    }
  }

  public handleChange = (e: any, setFieldValue: any) => {
    console.log('setFieldValue', this.initialValues);
    this.setState({ titleErrorMessage: '' });
    if (e.target.value.length <= 22) {
      setFieldValue('title', e.target.value);
      this.setState({ countDown: e.target.value.length });
    } else {
      this.setState({ errorMessage: '' });
    }
    if (e.target.value.replace(/\s/g, '') === '') {
      this.setState({ titleErrorMessage: ' Title is required to create an offer.' });
    }
  };
  public handleChangeTextArea = (e: any, setFieldValue: any) => {
    if (e.target.value.length <= 500) {
      setFieldValue('description', e.target.value);
      this.setState({ textAreaCount: e.target.value.length });
    } else {
      this.setState({ errorMessage: '' });
    }
  };
  // next(obj:any) {

  //   // const form = Form.useForm()

  //   console.log("validationSchema","errors",obj)

  // //  this.props.handleSubmit(values, actions)

  //   const current = this.state.current + 1;

  //   this.setState({ current });
  // }

  // prev() {
  //   const current = this.state.current - 1;
  //   // console.log(current)
  //   this.setState({ current });
  // }

  public render() {
    const { accountType, handleSubmit, title, submitButton, categories } = this.props;

    const { resetCount, current } = this.state;
    return (
      <div className="offer-modify add-task-screen">
        <div className="add-task-header">
          <div className="container">
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
        </div>
        <div className="add-task-content" style={{ display: 'none' }}>
          <div className="container">
            <div className="steps-content">
              <div className="title">Select Role</div>
              <div className="custome-radio radioBlock radioBlockMain">
                <div className="radio">
                  <input id="role-radio-1" name="promotionType" value={1} checked type="radio" />
                  <label htmlFor="role-radio-1" className="radio-label">
                    <span>I want to hire someone</span>
                  </label>
                </div>
                <div className="radio">
                  <input id="role-radio-2" name="promotionType" value={1} type="radio" />
                  <label htmlFor="role-radio-2" className="radio-label">
                    <span>I am looking for work</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="step-content">
              <div className="title">Details</div>
              <div className="step-details">Step Details</div>
            </div>
            <div className="step-content">
              <div className="title">Photos</div>
              <div className="step-details">Photos</div>
            </div>
          </div>
        </div>

        {/* old code */}
        <div className="offer-modify__content">
          <h2 className="offer-modify__title">{title}</h2>
          <Formik
            initialValues={this.initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log('\n\n\n ST', actions);
              // if (this.state.titleState.replace(/\s/g, '') === "") {
              //   this.setState({ titleErrorMessage: ' Title is required to create an offer.' });
              // }
              if (this.state.titleErrorMessage === '') {
                if (this.state.promotion === true && this.state.promotionType == 0) {
                  this.setState({ errorMessage: '*Please select promotion type' });
                } else {
                  this.setState({ errorMessage: '', isSubmitting: true });
                  values['promotionType'] = this.state.promotionType;
                  values['map_types'] = window.localStorage.getItem('MAP_TYPES');
                  window.localStorage.removeItem('MAP_TYPES');
                  console.log('\n\n WWWWWWW', values);
                  // handleSubmit(values, actions);
                }

                return this._increaseResetCount();
              }
            }}
            onReset={() => {
              return this._increaseResetCount();
            }}
            validate={values => {
              const errors = {};
              console.log('values', values, this.state.current);
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
                    <form onSubmit={handleSubmit}>
                      <InputLabelWrapper labelText="Select Role">
                        <fieldset className="radioBlockMain">
                          <div className="toggle">
                            <input
                              type="radio"
                              name={'type'}
                              id={'gig'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={'gig'}
                              checked={'gig' === values.type}
                            />
                            <label htmlFor={'gig'}>I want to hire someone</label>
                            {/* {accountType === AccountTypes.INTERNAL && ( */}
                            <>
                              <input
                                type="radio"
                                name={'type'}
                                id={'service'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={'service'}
                                checked={'service' === values.type}
                              />
                              <label htmlFor={'service'}>I am looking for work</label>
                            </>
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
                          onChange={e => this.handleChange(e, setFieldValue)}
                          onBlur={handleBlur}
                          value={values.title}
                          touched={touched.title}
                          error={errors.title || this.state.titleErrorMessage}
                          placeholder={
                            values?.type === 'gig'
                              ? 'What do you need done?'
                              : 'In a nutshell, what do you do?'
                          }
                        />
                        {/* {this.state.titleErrorMessage.length > 0 && (
                        <span className="promotionCss"><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{this.state.titleErrorMessage}</span>
                      )} */}
                        {this.state.titleErrorMessage.length == 0 && this.state.countDown > 0 ? (
                          <div className="fRight">
                            <span>{this.state.countDown}/22</span>
                          </div>
                        ) : null}
                        <Textarea
                          name="description"
                          onChange={e => this.handleChangeTextArea(e, setFieldValue)}
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
                        {this.state.textAreaCount > 0 ? (
                          <div className="fRight">
                            <span>{this.state.textAreaCount}/500</span>
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
                          map_types={this.initialValues.map_types}
                          onLocationChange={(location: ILocation) => {
                            setFieldValue('lat', location.lat);
                            setFieldValue('lng', location.lng);
                          }}
                          component={GeolocationInputComponent}
                          additionalProps={{
                            resetCount,
                            placeholder: 'Address, city, or zip code',
                            error: !!errors.lng && touched.lng,
                            onChange: (data: any) => this.GeolocationInputChange(data)
                          }}
                          initialLocation={{
                            lat: this.initialValues.lat,
                            lng: this.initialValues.lng
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
                                  checked={this.state.promotion}
                                  onChange={() =>
                                    this.setState({
                                      promotion: !this.state.promotion,
                                      promotionType: 0,
                                      errorMessage: ''
                                    })
                                  }
                                />
                                <div className="control__indicator"></div>
                              </label>
                              {this.state.errorMessage.length > 0 && (
                                <span className="promotionCss">{this.state.errorMessage}</span>
                              )}
                            </div>

                            {this.state.promotion && (
                              <div className="collapse listitem" id="typetask">
                                <div className="card card-body">
                                  <div className="radioBlock">
                                    <div className="radio">
                                      <input
                                        id="radio-1"
                                        name="promotionType"
                                        value={1}
                                        checked={this.state.promotionType === 1}
                                        type="radio"
                                        onChange={() =>
                                          this.setState({ promotionType: 1, errorMessage: '' })
                                        }
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
                                        checked={this.state.promotionType === 2}
                                        type="radio"
                                        onChange={() =>
                                          this.setState({ promotionType: 2, errorMessage: '' })
                                        }
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
                                        checked={this.state.promotionType === 3}
                                        type="radio"
                                        onChange={() =>
                                          this.setState({ promotionType: 3, errorMessage: '' })
                                        }
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
                        disabled={this.state.isSubmitting}
                        className="btn btn--a submit-btn"
                      >
                        {submitButton}
                      </button>
                    </form>
                    {/* {steps[current].content} */}
                  </div>
                </div>
              </>
            )}
          />
        </div>
      </div>
    );
  }

  private GeolocationInputChange(data: any) {
    console.log('\n\n DATa is', data.current.value);
  }

  private _increaseResetCount() {
    return this.setState(prevState => ({
      resetCount: prevState.resetCount + 1
    }));
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
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

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    categories: categoriesSelectSelector(state.categories)
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(OfferModifyForm);

// export default OfferModifyForm;
