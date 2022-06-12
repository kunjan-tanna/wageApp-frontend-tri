import { Formik } from 'formik';
import React, { PureComponent } from 'react';
import * as yup from 'yup';

import RegularInput from '../../../../components/RegularInput';
import { renderFormMessages } from '../../../../utils/form';
import passwordValidation from '../../../../utils/validation/password';
import { IFormProps, IFormValues } from './types';

const initialValues: IFormValues = {
  password: '',
  passwordConfirmation: ''
};

const validationSchema: any = yup.object().shape({
  password: passwordValidation,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Confirm password')
});

class ResetPasswordForm extends PureComponent<IFormProps> {
  public render() {
    const { handleSubmit } = this.props;

    return (
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
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            {status && renderFormMessages(status)}
            <div>
              <RegularInput
                key="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
                error={errors.password}
                touched={touched.password}
                iconName="key"
                toggleVisibilityBtn={true}
              />
            </div>
            <div>
              <RegularInput
                key="passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
                placeholder="Confirm Password"
                error={errors.passwordConfirmation}
                touched={touched.passwordConfirmation}
                iconName="key"
                toggleVisibilityBtn={true}
              />
            </div>
            <button className="btn btn--a" type="submit" disabled={isSubmitting}>
              Change password
            </button>
          </form>
        )}
      />
    );
  }
}

export default ResetPasswordForm;
