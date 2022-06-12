import React, { Component } from 'react';

import { IAddressAutocompleteComponent } from '../../../../components/AddressAutocomplete/types';

class AddressField extends Component<IAddressAutocompleteComponent> {
  // onChange = () => {
  //   this.props.setFieldValue('businessAddressStreet','');
  // }

  public render() {
    const {
      externalRef,
      iconName,
      placeholder,
      error,
      touched,
      address,
      onBlur,
      onChange
    } = this.props;
    const visibleError = touched && error;
    console.log('\n\n BBBBBB', visibleError);

    return (
      <div className="input">
        <div className="input__field-wrapper">
          {iconName && (
            <div className="input__icon">
              <i className={`icon icon--${iconName}`} />
            </div>
          )}
          {/* ${visibleError ? ' input__field--error' : ''} */}
          <input
            className={`input__field${visibleError ? ' input__field--error' : ''}`}
            type="text"
            ref={externalRef}
            placeholder={placeholder}
            onChange={onChange}
            name={'businessAddressStreet'}
            // onFocus={onFocus}
            onBlur={onBlur}
          />
          <div className="input__field-placeholder">{placeholder}</div>
          {visibleError && <div className="validation-error">{error}</div>}
        </div>
      </div>
    );
  }
}

export default AddressField;
