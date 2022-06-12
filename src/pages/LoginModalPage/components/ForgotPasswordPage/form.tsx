import { Formik } from 'formik';
import React, { PureComponent } from 'react';
import * as yup from 'yup';
import locale from 'yup/lib/locale';

import RegularInput from '../../../../components/RegularInput';
import { renderFormMessages } from '../../../../utils/form';
import validateDotsInRow from '../../../../utils/validation/validate-dots-in-row';
import { IFormProps, IFormValues } from './types';

const initialValues: IFormValues = {
  email: ''
};

const validationSchema: any = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .test(...validateDotsInRow(locale.string.email))
    .label('Email')
});

class ForgotPasswordForm extends PureComponent<IFormProps> {
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
          <>
            {status && renderFormMessages(status)}
            <form onSubmit={handleSubmit}>
              <RegularInput
                key="email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
                error={errors.email}
                touched={touched.email}
                toggleVisibilityBtn={false}
                iconName="email"
              />
              <button className="btn btn--a" type="submit" disabled={isSubmitting}>
                Send email
              </button>
            </form>
          </>
        )}
      />
    );
  }
}

export default ForgotPasswordForm;
