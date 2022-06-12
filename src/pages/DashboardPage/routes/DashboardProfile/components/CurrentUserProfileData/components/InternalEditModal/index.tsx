import { Formik } from 'formik';
import React from 'react';

import * as yup from 'yup';
import locale from 'yup/lib/locale';
import ModalAlternative from '../../../../../../../../components/ModalAlternative';
import RegularInput from '../../../../../../../../components/RegularInput';
import validateDotsInRow from '../../../../../../../../utils/validation/validate-dots-in-row';
import { IChangeInternalDataFormValues } from '../../types';
import { IProps } from './types';
import validatePhone from '../../../../../../../../utils/validation/basic-phone-validation';
import PhoneInput from '../../../../../../../../components/PhoneInput';

import { renderFormMessages } from '../../../../../../../../utils/form';
import './styles.scss';

const InternalEditModal = (props: IProps) => {
  const { currentUser, handleSubmit, isOpen, closeModal } = props;

  const initialValues: IChangeInternalDataFormValues = {
    email: currentUser.email,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    zipCode: currentUser.zipCode,
    phoneNumber: currentUser.phoneNumber
  };
  const validationSchema = yup.object().shape<IChangeInternalDataFormValues>({
    email: yup
      .string()
      .email()
      .trim()
      .required()
      .test(...validateDotsInRow(locale.string.email))
      .label('Email'),
    firstName: yup
      .string()
      .trim()
      .required()
      .label('First name')
      .max(27),
    lastName: yup
      .string()
      .trim()
      .required()
      .label('Last name')
      .max(27),
    phoneNumber: yup
      .string()
      .required()
      .label('Phone')
      .test(...validatePhone(locale.string.phone)),
    zipCode: yup
      .string()
      .trim()
      .required()
      .nullable()
      .label('Zipcode')
      .matches(/^(?!0{3})[0-9]{3,5}$/, 'Invalid zipcode.')
  });
  return (
    <ModalAlternative isOpen={isOpen} extraClass="edit-modal">
      <div className="modal-alternative__header">
        <button className="btn-close" onClick={closeModal}>
          <i className="icon icon--close-gray" />
        </button>
        <h3>Edit</h3>
      </div>
      <div className="modal-alternative-content">
        <Formik
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
          initialValues={initialValues}
          validationSchema={validationSchema}
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
                <RegularInput
                  name="firstName"
                  iconName="profile-color"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.firstName}
                  value={values.firstName}
                  error={errors.firstName}
                  placeholder="Name"
                />
                <RegularInput
                  name="lastName"
                  iconName="profile-color"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.lastName}
                  value={values.lastName}
                  error={errors.lastName}
                  placeholder="Last name"
                />
                <RegularInput
                  name="email"
                  iconName="email"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  touched={touched.email}
                  error={errors.email}
                  placeholder="Email"
                />
                <PhoneInput
                  name="phoneNumber"
                  onBlur={handleBlur}
                  initialValue={values.phoneNumber || ''}
                  placeholder="Phone"
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                  iconName="phone"
                  onPhoneChange={(phoneNumber: string) => {
                    if (setFieldValue) {
                      setFieldValue('phoneNumber', phoneNumber);
                    }
                  }}
                />
                <RegularInput
                  name="zipCode"
                  iconName="city"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zipCode}
                  touched={touched.zipCode}
                  error={errors.zipCode}
                  placeholder="zipCode"
                />
                <button className="btn btn--b btn--b-color" type="submit" disabled={isSubmitting}>
                  Confirm
                </button>
              </form>
            </>
          )}
        />
      </div>
    </ModalAlternative>
  );
};

export default InternalEditModal;
