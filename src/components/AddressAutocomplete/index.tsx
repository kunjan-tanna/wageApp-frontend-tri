import GoogleMapReact from 'google-map-react';
import React, { Component, ComponentClass, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import mapConfig from '../../components/Map/defaultConfig';
import { GOOGLE_MAPS_API_KEY } from '../../config';
import { Actions, markMapScriptAsLoaded } from '../../modules/MapScript/actions';
import { isLoadedSelector } from '../../modules/MapScript/selectors';
import { IStoreState } from '../../store';

import {
  IAddressAutocompleteComponent,
  IDispatchProps,
  IExternalProps,
  IProps,
  IState
} from './types';

import './styles.scss';

class AddressAutocomplete extends Component<IProps, IState> {
  private input = createRef<HTMLInputElement>();
  private autocomplete?: google.maps.places.Autocomplete;

  public constructor(props: IProps) {
    super(props);

    this.state = {
      address: '',
      city: '',
      zipcode: ''
    };
  }

  public componentDidMount(): void {
    const { scriptLoaded } = this.props;

    if (!scriptLoaded) {
      this._loadPlacesScript();
    } else {
      this._onScriptReady();
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    const { onLocationChange, scriptLoaded } = this.props;
    const { address, city, zipcode } = this.state;

    if (prevProps.scriptLoaded !== scriptLoaded && scriptLoaded) {
      this._onScriptReady();
    }

    if (prevState.address !== address && onLocationChange) {
      onLocationChange({ address, city, zipcode });
    }
  }

  public componentWillUnmount(): void {
    this._removePlacesListener();
  }

  public render() {
    const { component, componentProps } = this.props;

    const InputComponent: ComponentClass<IAddressAutocompleteComponent> = component;
    console.log('\n\n HHHH', componentProps);
    return (
      <InputComponent
        externalRef={this.input}
        iconName={componentProps.iconName}
        placeholder={componentProps.placeholder}
        error={componentProps.error}
        touched={componentProps.touched}
        address={componentProps.address}
        onBlur={componentProps.onBlur}
        onChange={componentProps.onChange}
      />
    );
  }

  private _loadPlacesScript() {
    // @ts-ignore
    const { googleMapLoader } = GoogleMapReact;
    const { markMapScriptAsLoaded } = this.props;

    return googleMapLoader({
      key: GOOGLE_MAPS_API_KEY,
      libraries: 'places',
      language: mapConfig.language
    }).then(() => markMapScriptAsLoaded());
  }

  private _onPlacesChanged = () => {
    const place = this.autocomplete;
    if (place) {
      const placeData = place.getPlace();
      const locality = placeData.address_components!.find(
        item =>
          item.types.includes('locality') || item.types.includes('administrative_area_level_1')
      );

      const postalCode = placeData.address_components!.find(item =>
        item.types.includes('postal_code')
      );
      console.log('\n\n RRRRRR', postalCode, placeData);

      return this.setState({
        address: placeData.formatted_address!,
        city: locality ? locality.long_name : '',
        zipcode: postalCode ? postalCode.long_name : ''
      });
    }
  };

  private _onScriptReady() {
    this._addPlacesListener();
  }

  private _addPlacesListener = () => {
    this.autocomplete = new google.maps.places.Autocomplete(this.input.current!, {
      types: ['address']
    });
    this.autocomplete.setComponentRestrictions({
      country: ['us']
    });
    return this.autocomplete!.addListener('place_changed', this._onPlacesChanged);
  };

  private _removePlacesListener = () => {
    if (typeof google !== 'undefined') {
      return google.maps.event.clearInstanceListeners(this.autocomplete!);
    }
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    scriptLoaded: isLoadedSelector(state.mapScript)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        markMapScriptAsLoaded
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(AddressAutocomplete);
