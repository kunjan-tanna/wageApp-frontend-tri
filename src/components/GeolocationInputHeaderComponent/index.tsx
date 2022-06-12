import React, { Component } from 'react';

import { IGeolocationInputComponent } from '../../components/GeolocationInput/types';
import InputFieldAlternative from '../../components/InputFieldAlternative';

import './styles.scss';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class GeolocationInputComponent extends Component<IGeolocationInputComponent> {
  state = {
    locationPermission: false
  };
  private _checkModal = () => {
    navigator.geolocation.getCurrentPosition(
      success => {
        this.setState({ locationPermission: false });
      },
      error => {
        this.setState({ locationPermission: true });
      }
    );
  };
  public onOpenModal = () => {
    this.setState({ locationPermission: true });
  };

  public onCloseModal = () => {
    this.setState({ locationPermission: false });
  };

  public clickHandler = () => {
    // if (locationPermission === false) {
    this.props.currentLocationButtonAction();
    // }
    navigator.geolocation.getCurrentPosition(
      success => {
        console.log('suc');
        this.setState({ locationPermission: false });
      },
      error => {
        console.log('fail');
        this.setState({ locationPermission: true });
      }
    );
  };

  public render() {
    const {
      externalRef,
      name,
      currentLocationButton: { disabled, label, visible },
      currentLocationButtonAction
    } = this.props;
    return (
      <div className="geolocationInput__wrapper">
        <InputFieldAlternative
          externalRef={externalRef}
          type="text"
          name={name}
          placeholder="Location"
          className="geolocationInput__input"
        />
        {visible && (
          <button
            type="button"
            disabled={disabled}
            onClick={this.clickHandler}
            className="geolocationInput__button"
          >
            {/* <span className="geolocationInput__buttonLabel">{label}</span> */}
          </button>
        )}
        <Modal open={this.state.locationPermission} onClose={this.onCloseModal}>
          <div className="locationModal">
            <p>
              You must update your browser settings to share your location. In the meantime, please
              enter your address, city, or zip code manually.
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default GeolocationInputComponent;
