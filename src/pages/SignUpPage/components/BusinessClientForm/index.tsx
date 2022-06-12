import { Formik } from 'formik';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import locale from 'yup/lib/locale';

import validatePhone from '../../../../utils/validation/basic-phone-validation';
import { Routes } from '../../../../config';
import { AccountTypes } from '../../../../types';
import { renderFormMessages } from '../../../../utils/form';
import validateDotsInRow from '../../../../utils/validation/validate-dots-in-row';
import passwordValidation from '../../../../utils/validation/password';
import { IFormProps, IFormValues, IRenderedInput, IState } from '../../types';
import { renderInputs } from '../../utils';
import ReCAPTCHA from 'react-google-recaptcha';
import confirmpasswordValidation from '../../../../utils/validation/confirm-password';

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
  accountType: AccountTypes.BUSINESS,
  zipcode: '',
  confirmpassword: ''
};

const validationSchema: any = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .test(...validateDotsInRow(locale.string.email))
    .label('E-mail'),
  password: passwordValidation,
  confirmpassword: confirmpasswordValidation,
  businessAddressStreet: yup
    .string()
    .trim()
    .required()
    .label('Address'),
  businessName: yup
    .string()
    .trim()
    .required()
    .label('Business name'),
  businessPhoneNumber: yup
    .string()
    .required()
    .label('Phone')
    .test(...validatePhone(locale.string.phone)),
  businessWebAddress: yup
    .string()
    .required()
    .label('Website')
    .matches(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/,
      'Website address is not correct.'
    ),
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
    name: 'businessName',
    placeholder: 'Business name',
    iconName: 'person'
  },
  {
    name: 'email',
    placeholder: 'E-mail',
    type: 'email',
    iconName: 'email'
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
    name: 'businessAddressStreet',
    placeholder: 'Address',
    type: 'address',
    iconName: 'address'
  },
  {
    name: 'zipcode',
    placeholder: 'Zip code',
    iconName: 'key'
  },
  {
    name: 'businessPhoneNumber',
    placeholder: 'Phone',
    type: 'phone',
    iconName: 'phone'
  },
  {
    name: 'businessWebAddress',
    placeholder: 'Website',
    iconName: 'computer'
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

class BusinessClientForm extends PureComponent<IFormProps, IState> {
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
    const { handleSubmit } = this.props;
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
      </div>
    );
  }
}

export default BusinessClientForm;
