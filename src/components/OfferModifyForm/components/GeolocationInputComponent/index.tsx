import classnames from 'classnames';
import React, { Component } from 'react';

import { IGeolocationInputComponent } from '../../../../components/GeolocationInput/types';
import './styles.scss';
class GeolocationInputComponent extends Component<IGeolocationInputComponent> {
  public render() {
    const {
      additionalProps,
      externalRef,
      name,
      currentLocationButton: { disabled, visible },
      currentLocationButtonAction
    } = this.props;
    const placeholder =
      additionalProps && additionalProps.placeholder ? additionalProps.placeholder : '';
    const error = additionalProps && additionalProps.error ? additionalProps.error : '';
    const fieldClassnames = classnames('input__field', {
      'input__field--error': error
    });
    console.log('\n\n nananna', externalRef);
    function onKeyDown(keyEvent: any) {
      // console.log('\n\n ZZZZZZZZZZZZZZZ',externalRef.current?.focus);
      if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
        keyEvent.preventDefault();
      }
    }

    return (
      <>
        <div
          className={
            additionalProps?.isFromEditProfile
              ? 'input__field-wrapper input__field-wrapper topSet'
              : 'input__field-wrapper input__field-wrapper--no-icon'
          }
        >
          {additionalProps?.isFromEditProfile ? (
            <div className="input__icon">
              <i className="icon icon--address"></i>
            </div>
          ) : null}
          <input
            id="abc"
            className={fieldClassnames}
            onChange={() => this.props.onChange(externalRef)}
            type="text"
            name={name}
            ref={externalRef}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
          />
          <div className="input__field-placeholder">{placeholder}</div>
          {visible && (
            <button
              className={additionalProps?.isFromEditProfile ? 'visibleFalse' : 'geolocation-btn'}
              type="button"
              disabled={disabled}
              onClick={currentLocationButtonAction}
            />
          )}
        </div>
        {error && <div className="validation-error">Choose location</div>}
      </>
    );
  }
}

export default GeolocationInputComponent;
