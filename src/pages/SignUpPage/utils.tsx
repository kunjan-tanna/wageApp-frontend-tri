import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';

import AddressAutocomplete from '../../components/AddressAutocomplete';
import { IAddress } from '../../components/AddressAutocomplete/types';
import Checkbox from '../../components/Checkbox';
import RegularInput from '../../components/RegularInput';
import AddressField from './components/AddressField';
import PhoneInput from '../../components/PhoneInput';
import { IFormValues, IRenderedInput } from './types';

export const renderInputs = (
  inputs: IRenderedInput[],
  handleChange: (e: React.ChangeEvent<any>) => void,
  handleBlur: (e: any) => void,
  values: IFormValues,
  errors: FormikErrors<IFormValues>,
  touched: FormikTouched<IFormValues>,
  setFieldValue?: (field: string, values: any) => void
) => {
  return inputs.map((item: IRenderedInput) => {
    const { name, type, placeholder, label, iconName } = item;
    console.log('\n\n NNNN', errors);
    switch (type) {
      case 'checkbox': {
        return (
          <Checkbox
            key={name}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[name]}
            label={label}
            error={errors[name]}
            touched={touched[name]}
          />
        );
      }
      case 'address': {
        return (
          <AddressAutocomplete
            key={name}
            component={AddressField}
            componentProps={{
              iconName: 'address',
              placeholder: 'Address',
              error: errors.businessAddressStreet,
              onChange: handleChange,
              onBlur: handleBlur,
              touched: touched[name],
              address: values.businessAddressStreet,
              setFieldValue: setFieldValue
            }}
            onLocationChange={({ address, city, zipcode }: IAddress) => {
              console.log('\n\n ddddd', address, zipcode);
              if (setFieldValue) {
                setFieldValue('businessAddressStreet', address);
                setFieldValue('businessAddressCity', city);
                setFieldValue('zipcode', zipcode);
              }
            }}
          />
        );
      }
      case 'phone': {
        return (
          <PhoneInput
            key={name}
            name={name}
            onBlur={handleBlur}
            initialValue={values[name].toString()}
            placeholder={placeholder}
            error={errors[name]}
            touched={touched[name]}
            iconName={iconName}
            onPhoneChange={(phoneNumber: string) => {
              if (setFieldValue) {
                setFieldValue('businessPhoneNumber', phoneNumber);
              }
            }}
          />
        );
      }
      default: {
        return (
          <RegularInput
            key={name}
            type={type ? type : 'text'}
            name={name}
            onChange={handleChange}
            //onBlur={handleBlur}
            value={values[name]}
            placeholder={placeholder}
            error={errors[name]}
            touched={touched[name]}
            toggleVisibilityBtn={type === 'password'}
            iconName={iconName}
          />
        );
      }
    }
  });
};
