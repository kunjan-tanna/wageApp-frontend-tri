import GoogleMapReact from 'google-map-react';
import React, { Component, ComponentClass, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import mapConfig from '../../components/Map/defaultConfig';
import { GOOGLE_MAPS_API_KEY } from '../../config';
import { Actions, markMapScriptAsLoaded } from '../../modules/MapScript/actions';
import { isLoadedSelector } from '../../modules/MapScript/selectors';
import { IStoreState } from '../../store';
import { ILocation } from '../../types';

import {
  IDispatchProps,
  IExternalProps,
  IGeolocationInputComponent,
  IProps,
  IState
} from './types';

import './styles.scss';

class GeolocationInput extends Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    verbose: true,
    currentLocationButton: {
      visible: true,
      disabled: false,
      label: 'Get current location'
    },
    initialLocation: { lat: 0, lng: 0 },
    name: 'location'
  };

  private input = createRef<HTMLInputElement>();
  private searchbox?: google.maps.places.Autocomplete;

  public constructor(props: IProps) {
    super(props);

    const { initialLocation } = this.props;
    this.state = {
      location: initialLocation,
      open: false
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
    const { scriptLoaded, onLocationChange, additionalProps } = this.props;
    const { location } = this.state;
    if (prevProps.scriptLoaded !== scriptLoaded && scriptLoaded) {
      this._onScriptReady();
    }

    if (!this._compareLocations(prevState.location, location) && onLocationChange) {
      onLocationChange(location);
    }

    if (additionalProps && additionalProps.hasOwnProperty('resetCount')) {
      const { resetCount } = additionalProps;

      if (prevProps.additionalProps!.resetCount !== resetCount) {
        // after form reset call it again
        setTimeout(() => this._onScriptReady(), 200);
      }
    }
  }

  public componentWillUnmount(): void {
    this._removePlacesListener();
  }

  public render() {
    const { additionalProps, currentLocationButton, name, component } = this.props;
    const { open } = this.state;
    const InputComponent: ComponentClass<IGeolocationInputComponent> = component;
    console.log('\n\n NAMEEEEEEEEEE', name);
    return (
      <>
        <InputComponent
          externalRef={this.input}
          name={name}
          currentLocationButton={currentLocationButton}
          currentLocationButtonAction={this._getCurrentLocation}
          additionalProps={additionalProps}
          onChange={this._onPlacesChanged}
        />
      </>
    );
  }

  private _compareLocations = (prevLocation: ILocation, currentLocation: ILocation): boolean =>
    prevLocation.lat === currentLocation.lat && prevLocation.lng === currentLocation.lng;

  private _getCurrentLocation = () => {
    console.log('\n\n CALLLED');
    const { showLocationMsg, isFromAddEdit } = this.props;
    return navigator.geolocation.getCurrentPosition(
      success => {
        const {
          coords: { latitude, longitude }
        } = success;

        const location: ILocation = {
          lat: latitude,
          lng: longitude
        };

        this._geocoderFetchLocationName(location, true);

        this.setState({
          location
        });
      },
      error => this._setLocationName('')
    );
  };

  // private _geocoderFetchLocationName = (location: ILocation) => {
  //   const geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ location }, results => {
  //     if (results && results.length > 0) {
  //       this._setLocationName(results[0].formatted_address);
  //     }
  //   });
  // };
  private _geocoderFetchLocationName = (location: ILocation, flag?: any) => {
    const { isFromAddEdit, map_types } = this.props;
    console.log('\n\n ZXZXZX', map_types);
    if (flag) {
      window.localStorage.removeItem('_TYPE');
    }
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, results => {
      if (results && results.length > 0) {
        console.log('\n RESULT::', results);
        let localStorageType = window.localStorage.getItem('_TYPE');
        if (isFromAddEdit) {
          window.localStorage.setItem('MAP_TYPES', results[0].types.toString());
        }
        if (map_types) {
          if (!flag) {
            let arr = String(map_types).split(',');
            console.log('PARSE ARR-->', arr);
            for (var i = 0; i < results.length; i++) {
              var types = results[i].types;

              for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
                if (types[typeIdx] == arr[0]) {
                  this._setLocationName(results[i].formatted_address);
                  return;
                }
              }
            }
            this._setLocationName(results[0].formatted_address);
          } else {
            window.localStorage.setItem('_TYPE', JSON.stringify(results[0].types));
            this._setLocationName(results[0].formatted_address);
          }
        } else if (localStorageType != null) {
          let arr = JSON.parse(localStorageType);
          for (var i = 0; i < results.length; i++) {
            var types = results[i].types;

            for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
              if (types[typeIdx] == arr[0]) {
                this._setLocationName(results[i].formatted_address);
                return;
              }
            }
          }
          this._setLocationName(results[0].formatted_address);
        } else {
          window.localStorage.setItem('_TYPE', JSON.stringify(results[0].types));
          this._setLocationName(results[0].formatted_address);
        }
      }
    });
  };

  private _setLocationName = (name: string) => {
    if (this.input.current) {
      this.input!.current!.value = name;
    }
  };

  private _loadPlacesScript() {
    // @ts-ignore
    const { googleMapLoader } = GoogleMapReact;
    const { markMapScriptAsLoaded, isFromAddEdit } = this.props;

    return googleMapLoader({
      key: GOOGLE_MAPS_API_KEY,
      libraries: 'places',
      language: mapConfig.language
    }).then(() => markMapScriptAsLoaded());
  }

  private _onPlacesChanged = () => {
    const { isFromAddEdit } = this.props;

    const places = this.searchbox!.getPlace();
    console.log('\n\n YYYY', this.input.current?.value);

    if (
      this.input.current &&
      (this.input.current.value == '' ||
        this.input.current.value == null ||
        this.input.current.value == undefined)
    ) {
      console.log('*******yes in');
      return this.setState({
        location: {
          lat: 0,
          lng: 0,
          name: ''
        }
      });
    }

    if (places && places.geometry) {
      console.log('\n &&&&&', places.formatted_address);
      let map_types = places.types || [];
      window.localStorage.setItem('_TYPE', JSON.stringify(places.types));
      if (isFromAddEdit) {
        window.localStorage.setItem('MAP_TYPES', map_types.toString());
      }
      const location = places!.geometry!.location;
      return this.setState({
        location: {
          lat: location.lat(),
          lng: location.lng(),
          name: this.input.current?.value
        }
      });
    }

    if (!places) {
      return this.setState({
        location: {
          lat: 0,
          lng: 0,
          name: ''
        }
      });
    }
    // else {
    //   return this.setState({
    //     location: {
    //       lat: 0,
    //       lng: 0
    //     }
    //   });
    // }
  };

  private _onScriptReady() {
    console.log('\n\n FFFFF');
    const {
      initialLocation: { lat, lng, name }
    } = this.props;
    this._addPlacesListener();

    if (lat === 0 && lng === 0) {
      this._getCurrentLocation();
    } else if (name) {
      this._setLocationName(name);
    } else {
      this._geocoderFetchLocationName({ lat, lng });
    }
  }

  private _addPlacesListener = () => {
    // this.searchbox = new google.maps.places.SearchBox(this.input.current!);
    // this.searchbox.setComponentRestrictions({
    //   country: ["us", "pr", "vi", "gu", "mp"],
    // });
    this.searchbox = new google.maps.places.Autocomplete(this.input.current!);

    // Set initial restrict to the greater list of countries.
    this.searchbox.setComponentRestrictions({
      country: ['us']
    });

    // Specify only the data fields that are needed.
    return this.searchbox!.addListener('place_changed', this._onPlacesChanged);
  };

  private _removePlacesListener = () => {
    if (typeof google !== 'undefined') {
      return google.maps.event.clearInstanceListeners(this.searchbox!);
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

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(GeolocationInput);
