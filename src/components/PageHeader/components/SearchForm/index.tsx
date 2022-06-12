import './styles.scss';

import { Formik } from 'formik';
import querystring from 'querystring';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import GeolocationInputComponent from '../../../../components/GeolocationInputHeaderComponent';
import { Routes } from '../../../../config';
import {
  defaultDistanceValue,
  distance as availableDistance
} from '../../../../data/distanceRadius';
import { ILocation } from '../../../../types';
import getSearchParamsAsObject from '../../../../utils/GetSearchParamsAsObject';
import Button from '../../../Button';
import GeolocationInput from '../../../GeolocationInput';
import InputFieldAlternative from '../../../InputFieldAlternative';
import SelectAlternative from '../../../SelectAlternative';
import { IProps, IState } from './types';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { mixPanelEvent } from '../../../../utils/MixPanel';

class SearchForm extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    const {
      location: { search }
    } = props;

    const { filter, distance, lat, lng } = getSearchParamsAsObject(search);
    console.log('\n\n\n HHHHHU', lat, lng);
    const distanceValue = availableDistance.find(ad => ad.value === Number(distance));

    this.state = {
      locationPermission: false,
      filter: filter ? (filter as string) : '',
      distance: distanceValue ? distanceValue.value : defaultDistanceValue,
      location:
        lat && lng
          ? { lat: parseFloat(lat as string), lng: parseFloat(lng as string) }
          : { lat: 0, lng: 0 }
    };
  }

  public componentDidMount(): void {
    const { location } = this.state;
    const { setUserLocation } = this.props;

    setUserLocation(location);
  }

  public render() {
    const { filter, distance, locationPermission } = this.state;
    const { setUserLocation } = this.props;

    return (
      <>
        <Formik
          initialValues={this.state}
          onSubmit={values => {
            this._handleSubmit(values);
          }}
          render={({ handleChange, handleSubmit, setFieldValue }) => (
            <form
              className=""
              action={Routes.OFFERS_LIST}
              method="get"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="inner-searching-optons">
                  <div className="search-form__field__search">
                    <InputFieldAlternative
                      type="text"
                      name="filter"
                      defaultValue={filter}
                      placeholder="Search"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="search-form__field__location">
                    <GeolocationInput
                      verbose={false}
                      currentLocationButton={{ visible: true, disabled: false, label: '◉' }}
                      initialLocation={this.state.location}
                      onLocationChange={(location: ILocation) => {
                        setFieldValue('location', location);
                        setUserLocation(location);
                      }}
                      component={GeolocationInputComponent}
                    />
                  </div>
                  <div className="search-form__field__radius">
                    <SelectAlternative
                      data={availableDistance}
                      name="distance"
                      defaultValue={distance}
                      onChange={(e: any) => {
                        setFieldValue('distance', e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className="page-header-searchbox__button buttonAlign">
                    <Button label="Search" type="submit" variant="drop" />
                  </div>
                </div>
              </div>
            </form>
          )}
        />

        <Modal open={this.state.locationPermission} onClose={this.onCloseModal}>
          <div className="locationModal">
            <p>
              You must update your browser settings to share your location. In the meantime, please
              enter your address, city, or zip code manually.
            </p>
          </div>
        </Modal>
      </>
    );
  }
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

  private _handleSubmit = async (values: IState) => {
    const {
      history: { push },
      location: { search }
    } = this.props;

    const queryString = getSearchParamsAsObject(search);
    const concatProperties = this.removeUnusedParams(queryString, values);
    const geocoder = new google.maps.Geocoder();
    let loc;
    let a = values.location;
    if (geocoder && a.lat > 0 && a.lng > 0) {
      await geocoder.geocode({ location: a }, results => {
        if (results && results.length > 0) {
          console.log('\n RESULT SSSSS', results);
          loc = results[0].formatted_address;
        }
      });
    }
    //Search event is called here
    if (values.filter.length > 0) {
      mixPanelEvent('Search', {
        'Search performed': values.filter
      });
    }
    console.log('\n\n VBVBVB', values.distance);

    mixPanelEvent('Filter applied', {
      'Filter applied': loc ? loc + ';' : '' + values.distance + ' mi'
    });

    push(`${Routes.OFFERS_LIST}?${querystring.stringify(concatProperties)}`);
  };

  private removeUnusedParams(querystring: querystring.ParsedUrlQuery, values: IState): any {
    const { offerType, sortBy, categoryId, priceFrom, priceTo } = querystring;
    const { location, ...qsValues } = values;
    const concatProperties = {
      ...qsValues,
      ...location,
      offerType,
      sortBy,
      categoryId,
      priceFrom,
      priceTo
    };

    if (!categoryId) {
      delete concatProperties.categoryId;
    }
    if (!priceFrom) {
      delete concatProperties.priceFrom;
    }
    if (!priceTo) {
      delete concatProperties.priceTo;
    }
    delete concatProperties.stateFullName;
    delete concatProperties.stateShortName;

    return concatProperties;
  }
}

export default withRouter(SearchForm);
