import { Formik } from 'formik';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import locale from 'yup/lib/locale';
import validatePhone from '../../../../utils/validation/basic-phone-validation';
import AuthorizationBySocialMedia from '../../../../components/AuthorizationBySocialMedia';
import { Routes } from '../../../../config';
import { AccountTypes } from '../../../../types';
import { renderFormMessages } from '../../../../utils/form';
import validateDotsInRow from '../../../../utils/validation/validate-dots-in-row';
import validatePhoneNum from '../../../../utils/validation/basic-phone-validation';

import passwordValidation from '../../../../utils/validation/password';
import confirmpasswordValidation from '../../../../utils/validation/confirm-password';

import { IFormProps, IFormValues, IRenderedInput, IState } from '../../types';
import { renderInputs } from '../../utils';
import ReCAPTCHA from 'react-google-recaptcha';

const initialValues: IFormValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  businessName: '',
  businessAddressStreet: '',
  businessAddressCity: '',
  businessPhoneNumber: '',
  businessWebAddress: '',
  agreement: false,
  accountType: AccountTypes.INTERNAL,
  zipcode: '',
  confirmpassword: ''
};

const validationSchema: any = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required()
    .label('Name')
    .max(27),
  lastName: yup
    .string()
    .trim()
    .required()
    .label('Last name')
    .max(27),
  email: yup
    .string()
    .required()
    .email()
    .test(...validateDotsInRow(locale.string.email))
    .label('E-mail'),
  businessPhoneNumber: yup
    .string()
    .required()
    .test(...validatePhoneNum(locale.string.phone))
    .label('Phone'),
  password: passwordValidation,
  confirmpassword: confirmpasswordValidation,
  zipcode: yup
    .string()
    .required()
    .label('Zip code')
    .matches(/^[0-9]+$/, 'Should contain numbers')
    .min(5, 'Zip code must contain 5 digits')
    .max(5, 'Zip code must contain 5 digits'),
  agreement: yup.boolean().oneOf([true], 'Must accept Terms and Conditions')
});

const inputs: IRenderedInput[] = [
  {
    name: 'firstName',
    placeholder: 'Name',
    iconName: 'person'
  },
  {
    name: 'lastName',
    placeholder: 'Last name',
    iconName: 'person-with-plus'
  },
  {
    name: 'email',
    placeholder: 'E-mail',
    type: 'email',
    iconName: 'email'
  },
  {
    name: 'businessPhoneNumber',
    placeholder: 'Phone',
    type: 'phone',
    iconName: 'phone'
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    iconName: 'key'
  },
  {
    name: 'confirmpassword',
    placeholder: 'Repeat Password',
    type: 'password',
    iconName: 'key'
  },
  {
    name: 'zipcode',
    placeholder: 'Zip code',
    iconName: 'key'
  },
  {
    name: 'agreement',
    type: 'checkbox',
    label: (
      <>
        I accept <Link to={Routes.ABOUT_TERMS}>terms & conditions</Link>
      </>
    )
  }
];

const data = {
  facebook: {
    text: 'Facebook'
  },
  google: {
    text: 'Google'
  }
};

class InternalClientForm extends PureComponent<IFormProps, IState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = { captcha: true };
  }

  public _onChange = (value: any) => {
    if (value === null) {
      this.setState({ captcha: true });
    } else {
      this.setState({ captcha: false });
    }
  };

  public render() {
    const { handleSubmit, history } = this.props;
    const { captcha } = this.state;

    return (
      <div className="modal-window__content">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
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
            setFieldValue
          }) => (
            <>
              {console.log('\n\nto', touched)}
              {/* {status && renderFormMessages(status)} */}

              <form onSubmit={handleSubmit}>
                {renderInputs(
                  inputs,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  setFieldValue
                )}
                <div className="captcha">
                  <ReCAPTCHA
                    sitekey="6LcTOmUaAAAAACQ1lskWqChu_-ockkw9Zo9MAl9m"
                    onChange={this._onChange}
                  />
                </div>
                <button className="btn btn--a" type="submit" disabled={isSubmitting || captcha}>
                  Register
                </button>
              </form>
            </>
          )}
        />

        <AuthorizationBySocialMedia
          history={history}
          title="or sign up with"
          facebook={data.facebook}
          google={data.google}
        />
      </div>
    );
  }
}

export default InternalClientForm;
