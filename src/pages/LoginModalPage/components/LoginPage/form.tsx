import { Formik } from 'formik';
import React, { PureComponent } from 'react';
import * as yup from 'yup';
import locale from 'yup/lib/locale';

import RegularInput from '../../../../components/RegularInput';
import { renderFormMessages } from '../../../../utils/form';
import validateDotsInRow from '../../../../utils/validation/validate-dots-in-row';

import { IFormProps, IFormValues, IState } from './types';
import ReCAPTCHA from 'react-google-recaptcha';

const initialValues: IFormValues = {
  login: '',
  password: ''
};

const validationSchema: any = yup.object().shape({
  login: yup
    .string()
    // .email()
    .trim()
    .required()
    .test(...validateDotsInRow(locale.string.email))
    .label('Email'),
  password: yup
    .string()
    .required()
    .label('Password')
});

class LoginForm extends PureComponent<IFormProps, IState> {
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
  public _handleChange = (e: any, setFieldValue: any, setStatus: any, setFieldError: any) => {
    setFieldValue(e.target.name, e.target.value);
    setStatus('');
  };
  public render() {
    const { handleSubmit, handleForgotPassword } = this.props;
    const { captcha } = this.state;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          actions.setStatus('');
          handleSubmit(values, actions);
          actions.setSubmitting(false);
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
          setStatus,
          setFieldError
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <RegularInput
                key="login"
                type="text"
                name="login"
                additionalClass="pb-0"
                onChange={e => this._handleChange(e, setFieldValue, setStatus, setFieldError)}
                // onBlur={handleBlur}
                value={values.login}
                placeholder="Email"
                error={errors.login}
                touched={touched.login}
                toggleVisibilityBtn={false}
                iconName="email"
              />
              {status && renderFormMessages(status)}
              <RegularInput
                key="password"
                type="password"
                name="password"
                onChange={e => this._handleChange(e, setFieldValue, setStatus, setFieldError)}
                // onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
                error={errors.password}
                touched={touched.password}
                toggleVisibilityBtn={true}
                iconName="key"
              />
              <div className="forgot-password">
                <button
                  type="button"
                  className="btn btn--link-style"
                  onClick={handleForgotPassword}
                >
                  I forgot my password
                </button>
              </div>
              <div className="captcha">
                <ReCAPTCHA
                  sitekey="6LcTOmUaAAAAACQ1lskWqChu_-ockkw9Zo9MAl9m"
                  onChange={this._onChange}
                />
              </div>
              <button className="btn btn--a" type="submit" disabled={isSubmitting || captcha}>
                Log in
              </button>
            </form>
          </>
        )}
      />
    );
  }
}

export default LoginForm;
