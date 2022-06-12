import { Formik } from 'formik';
import querystring from 'querystring';
import React, { BaseSyntheticEvent, FC, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import OfferFilters from '../../../../components/OfferFilters';

import Button from '../../../../components/Button';
import GeolocationInput from '../../../../components/GeolocationInput';
import GeolocationInputComponent from '../../../../components/GeolocationInputHeaderComponent';
import InputFieldAlternative from '../../../../components/InputFieldAlternative';
import SelectAlternative from '../../../../components/SelectAlternative';
import { Routes } from '../../../../config';
import {
  defaultDistanceValue,
  distance as availableDistance
} from '../../../../data/distanceRadius';
import { ILocation } from '../../../../types';
import { OfferType, OfferTypes } from '../../../../types/offers';
import getSearchParamsAsObject from '../../../../utils/GetSearchParamsAsObject';
import { IProps } from './types';
import { IFormValues } from './types';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { mixPanelEvent } from '../../../../utils/MixPanel';

const HomePageSearch: FC<IProps> = ({
  selectedOfferType,
  setUserLocation,
  userLocation,
  locationPermission
}) => {
  const [locationPrmisn, setlocationPrmisn] = useState(false);
  const history = useHistory();
  const routerLocation = useLocation();
  const { lat, lng, filter, distance, offerType } = getSearchParamsAsObject(routerLocation.search);
  const initialLocation =
    lat && lng
      ? {
          lat: parseFloat(lat as string),
          lng: parseFloat(lng as string)
        }
      : userLocation;

  const initialValues: IFormValues = {
    filter: filter ? (filter as string) : '',
    location: initialLocation,
    distance: distance ? (distance as string) : defaultDistanceValue.toString(),
    offerType: offerType ? (offerType as OfferType) : null
  };

  const _checkModal = () => {
    navigator.geolocation.getCurrentPosition(
      success => {
        setlocationPrmisn(false);
      },
      error => {
        setlocationPrmisn(true);
      }
    );
  };

  const onCloseModal = () => {
    setlocationPrmisn(false);
  };

  const _renderTabs = () => {
    const activeClass = 'homepage-header__search__tabItem--active';

    return (
      <ul className="homepage-header__search__tabs">
        <li
          className={`homepage-header__search__tabItem ${
            selectedOfferType === null ? activeClass : ''
          }`}
        >
          <label htmlFor="offerType_all">All</label>
        </li>
        <li
          className={`homepage-header__search__tabItem ${
            selectedOfferType === OfferTypes.GIG ? activeClass : ''
          }`}
        >
          <label htmlFor="offerType_gigs">Jobs</label>
        </li>
        <li
          className={`homepage-header__search__tabItem ${
            selectedOfferType === OfferTypes.SERVICE ? activeClass : ''
          }`}
        >
          <label htmlFor="offerType_services">Workers</label>
        </li>
      </ul>
    );
  };

  const _handleSubmit = async (values: IFormValues, withRedirect: boolean = false) => {
    const { location, ...qsValues } = values;
    const geocoder = new google.maps.Geocoder();
    let loc;
    if (geocoder && location.lat > 0 && location.lng > 0) {
      await geocoder.geocode({ location }, results => {
        if (results && results.length > 0) {
          loc = results[0].formatted_address;
        }
      });
    }
    const allValues = {
      ...qsValues,
      lat: location.lat,
      lng: location.lng,
      distance: parseInt(qsValues.distance, 10)
    };
    //Search event called here
    if (values.filter.length > 0) {
      mixPanelEvent('Search', {
        'Search performed': values.filter
      });
    }
    mixPanelEvent('Filter applied', {
      'Filter applied': loc ? loc + ';' : '' + parseInt(qsValues.distance, 10) + ' mi'
    });

    return history.push(
      `${withRedirect ? Routes.OFFERS_LIST : Routes.HOME}?${querystring.stringify(allValues)}`
    );
  };

  return (
    <>
      <div className="container homepage-header__search__container">{_renderTabs()}</div>
      <Formik
        initialValues={initialValues}
        onSubmit={values => _handleSubmit(values)}
        render={({ handleChange, handleSubmit, setFieldValue, values }) => (
          <div className="search-form">
            <form className="container" method="get" autoComplete="off" onSubmit={handleSubmit}>
              <div className="row">
                <div className="search-form-row">
                  <div className="search-form__field__search">
                    <InputFieldAlternative
                      type="text"
                      name="filter"
                      defaultValue={initialValues.filter}
                      placeholder={`Search ${
                        selectedOfferType ? (selectedOfferType === 'gig' ? 'Job' : 'Worker') : ''
                      }${selectedOfferType ? 's' : ''}`}
                      onChange={(val: BaseSyntheticEvent) => {
                        handleChange(val);
                      }}
                    />
                  </div>
                  <div className="search-form__field__location">
                    <GeolocationInput
                      verbose={false}
                      currentLocationButton={{
                        visible: true,
                        disabled: false,
                        label: 'Get current location'
                      }}
                      onLocationChange={(location: ILocation) => {
                        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
                        const isHomepage = routerLocation.pathname === Routes.HOME;
                        const setLocationFirstTime = !lat && !lng && location.lat && location.lng;
                        console.log('JJJJJJ', isHomepage, setLocationFirstTime);
                        setFieldValue('location', location);
                        setUserLocation(location);

                        if (isHomepage && setLocationFirstTime) {
                          const params = {
                            ...getSearchParamsAsObject(routerLocation.search),
                            ...location
                          };

                          return history.push(`${Routes.HOME}?${querystring.stringify(params)}`);
                        }
                      }}
                      component={GeolocationInputComponent}
                      initialLocation={initialLocation}
                    />
                  </div>
                  <div className="search-form__field__radius">
                    <SelectAlternative
                      data={availableDistance}
                      name="distance"
                      onChange={(val: BaseSyntheticEvent) => {
                        handleChange(val);
                      }}
                      defaultValue={initialValues.distance}
                    />
                  </div>
                  <div className="search-form__field__button">
                    <input
                      type="radio"
                      name="offerType"
                      id="offerType_all"
                      className="search-form__hiddenField"
                      onChange={e => {
                        handleChange(e);
                        _handleSubmit({
                          ...values,
                          offerType: null
                        });
                      }}
                      value=""
                      checked={selectedOfferType === null}
                    />
                    <input
                      type="radio"
                      name="offerType"
                      id="offerType_gigs"
                      className="search-form__hiddenField"
                      onChange={e => {
                        handleChange(e);
                        _handleSubmit({
                          ...values,
                          offerType: OfferTypes.GIG
                        });
                      }}
                      value="gig"
                      checked={selectedOfferType === OfferTypes.GIG}
                    />
                    <input
                      type="radio"
                      name="offerType"
                      id="offerType_services"
                      className="search-form__hiddenField"
                      onChange={e => {
                        handleChange(e);
                        _handleSubmit({
                          ...values,
                          offerType: OfferTypes.SERVICE
                        });
                      }}
                      value="service"
                      checked={selectedOfferType === OfferTypes.SERVICE}
                    />
                    <Button label="Search" variant="drop" type="submit" />
                  </div>
                </div>
              </div>
              <div className="search-form__advanced">
                <Button
                  label="Filters"
                  variant="clear-right"
                  onClick={() => _handleSubmit(values, true)}
                />
              </div>
            </form>
          </div>
        )}
      />

      <Modal open={locationPrmisn} onClose={onCloseModal}>
        <div className="locationModal">
          <p>
            You must update your browser settings to share your location. In the meantime, please
            enter your address, city, or zip code manually.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default HomePageSearch;
