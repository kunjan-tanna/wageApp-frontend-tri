import './styles.scss';

import { Formik } from 'formik';
import React, { Fragment } from 'react';
import * as yup from 'yup';
import locale from 'yup/lib/locale';

import ModalAlternative from '../../../../../../../../components/ModalAlternative';
import PhoneInput from '../../../../../../../../components/PhoneInput';
import RegularInput from '../../../../../../../../components/RegularInput';
import { renderFormMessages } from '../../../../../../../../utils/form';
import validatePhone from '../../../../../../../../utils/validation/basic-phone-validation';
import validateDotsInRow from '../../../../../../../../utils/validation/validate-dots-in-row';
import { IChangeBusinessDataFormValues } from '../../types';
import { IProps } from './types';
import GeolocationInputComponent from '../../../../../../../../../src/components/OfferModifyForm/components/GeolocationInputComponent';
import GeolocationInput from '../../../../../../../../../src/components/GeolocationInput';

const BusinessEditModal = (props: IProps) => {
  const { isOpen, handleSubmit, currentUser, closeModal } = props;
  console.log('\n\n KKKKKKKKKKKKKKKK', currentUser);
  const initialValues: IChangeBusinessDataFormValues = {
    email: currentUser.email,
    businessName: currentUser.businessName,
    businessAddressStreet: currentUser.businessAddressStreet,
    // businessAddressCity: currentUser.businessAddressCity,
    businessPhoneNumber: currentUser.businessPhoneNumber,
    businessWebAddress: currentUser.businessWebAddress,
    zipCode: currentUser.zipCode,
    Latitude: String(currentUser.businessLat),
    Longitude: String(currentUser.businessLong)
  };

  const validationSchema = yup.object().shape<IChangeBusinessDataFormValues>({
    email: yup
      .string()
      .email()
      .trim()
      .required()
      .test(...validateDotsInRow(locale.string.email))
      .label('Email'),
    businessName: yup
      .string()
      .trim()
      .required()
      .label('Business name'),
    // businessAddressCity: yup
    //   .string()
    //   .trim()
    //   .required()
    //   .label('Business Address City'),
    businessAddressStreet: yup
      .string()
      .trim()
      .required()
      .label('Business Address Street'),
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
    zipCode: yup
      .string()
      .trim()
      .required()
      .label('Zipcode')
      .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Invalid zipcode.')
    // Latitude:yup
    // .string(),
    // Longitude:yup
    // .string()
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
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          // onSubmit={(values, actions) => {
          //   console.log('\n\n SSSSS',values);
          //    handleSubmit(values, actions);
          // }}
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
            <Fragment>
              {status && renderFormMessages(status)}
              <form onSubmit={handleSubmit}>
                <RegularInput
                  name="businessName"
                  iconName="email"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.businessName}
                  touched={touched.businessName}
                  error={errors.businessName}
                  placeholder="Business name"
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
                <GeolocationInput
                  onLocationChange={(location: any) => {
                    console.log('\n\n\n IIIIITT', location);
                    setFieldValue('Latitude', location.lat);
                    setFieldValue('Longitude', location.lng);
                    setFieldValue('businessAddressStreet', location.name);
                  }}
                  component={GeolocationInputComponent}
                  additionalProps={{
                    placeholder: 'Street',
                    error: !!errors.businessAddressStreet && touched.businessAddressStreet,
                    isFromEditProfile: true
                  }}
                  initialLocation={{
                    lat: currentUser.businessLat,
                    lng: currentUser.businessLong,
                    name: currentUser.businessAddressStreet
                  }}
                />
                {/* <AddressAutocomplete
                    key={'businessAddressStreet'}
                    component={AddressField}
                    componentProps={{
                      iconName: 'address',
                      placeholder: 'Address',
                      error: errors.businessAddressStreet,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      touched: touched['businessAddressStreet'],
                      address: values.businessAddressStreet,
                      setFieldValue: setFieldValue
                    }}
                    onLocationChange={(data: any) => {
                      console.log('\n\n ddddd', data);
                      //if (setFieldValue) {
                       // setFieldValue('businessAddressStreet', address);
                        // setFieldValue('businessAddressCity', city);
                        // setFieldValue('zipCode', zipcode);
                      //}
                    }}
                  /> */}
                {/* <RegularInput
                  name="businessAddressStreet"
                  iconName="address"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.businessAddressStreet}
                  touched={touched.businessAddressStreet}
                  error={errors.businessAddressStreet}
                  placeholder="Street"
                /> */}
                {/* <RegularInput
                  name="businessAddressCity"
                  iconName="city"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.businessAddressCity}
                  touched={touched.businessAddressCity}
                  error={errors.businessAddressCity}
                  placeholder="City"
                /> */}
                <RegularInput
                  name="zipCode"
                  iconName="city"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zipCode}
                  touched={touched.zipCode}
                  error={errors.zipCode}
                  placeholder="Zip code"
                />
                <PhoneInput
                  name="businessPhoneNumber"
                  onBlur={handleBlur}
                  initialValue={values.businessPhoneNumber}
                  placeholder="Phone"
                  error={errors.businessPhoneNumber}
                  touched={touched.businessPhoneNumber}
                  iconName="phone"
                  onPhoneChange={(phoneNumber: string) => {
                    if (setFieldValue) {
                      setFieldValue('businessPhoneNumber', phoneNumber);
                    }
                  }}
                />
                <RegularInput
                  name="businessWebAddress"
                  iconName="computer"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.businessWebAddress}
                  touched={touched.businessWebAddress}
                  error={errors.businessWebAddress}
                  placeholder="Website"
                />

                <button className="btn btn--b btn--b-color" type="submit" disabled={isSubmitting}>
                  Confirm
                </button>
              </form>
            </Fragment>
          )}
        />
      </div>
    </ModalAlternative>
  );
};

export default BusinessEditModal;
