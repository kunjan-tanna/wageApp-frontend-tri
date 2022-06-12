import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { Actions, offersRequest } from '../../modules/Offers/actions';
import { homepageOffersSelector, isRequestingSelector } from '../../modules/Offers/selectors';
import { setUserLocation } from '../../modules/UserPreferences/actions';
import { getUserLocation } from '../../modules/UserPreferences/selectors';
import { IStoreState } from '../../store';
import { OfferType } from '../../types/offers';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';
import { IOfferFiltersValues, offerFiltersInitial } from './constants';
import HomePage from './page';
import {
  IDispatchProps,
  IExternalProps,
  IProps,
  IStateData,
  DisplayTypes,
  DisplayType
} from './types';
import { SortTypes } from '../../../src/data/sortTypes';

class HomePageContainer extends Component<IProps, IStateData> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      sortBy: '',
      displayType: DisplayTypes.GRID,
      offers: {}
    };
  }
  public componentDidMount() {
    this._handleFiltersChange();
  }

  public componentDidUpdate(prevProps: Readonly<IProps>) {
    console.log('PROSssssss', this.props);
    const {
      location: { search }
    } = this.props;

    if (prevProps.location.search !== search) {
      this._handleFiltersChange();
    }
    if (prevProps.offers != this.props.offers) {
      // console.log("PREVPROS",prevProps)
      console.log('PROSssssss', this.props.offers, 'prevProps', prevProps);
      this.setState({ offers: this.props.offers });
      //  this._getSortData();
    }
  }
  public _getSortData = (data: any) => {
    console.log('INSIDE GET DATA', data);
    this.setState({ offers: data });
  };
  public render() {
    const {
      offers,
      isRequesting,
      setUserLocation,
      userLocation,
      location: { search }
    } = this.props;
    const { offerType } = getSearchParamsAsObject(search);
    console.log('offers=====', this.state.offers);

    return (
      <>
        <>
          {/* {this.state.offers.data && this.state.offers.data.length > 0 && (
              
          )} */}
          <HomePage
            getsortDetails={this._getSortData}
            offers={offers}
            isRequesting={isRequesting}
            loadPage={this._handleFiltersChange}
            selectedOfferType={offerType ? (offerType as OfferType) : null}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
          />
        </>
      </>
    );
  }

  private _handleFiltersChange = (options?: Partial<IOfferFiltersValues>) => {
    console.log('LIST============', options, offerFiltersInitial);
    const {
      offersRequest,
      location: { search },
      userLocation
    } = this.props;

    const params = getSearchParamsAsObject(search);

    return offersRequest({
      ...offerFiltersInitial,
      ...userLocation,
      ...params,
      ...options,
      offerType: params.offerType ? (params.offerType as string) : ''
    });
    // if(displayType == 'list' && this.state.sortBy !== ""){

    //   offerFiltersInitial.sortBy = this.state.sortBy
    //   if (this.state.sortBy == SortTypes.dateCreated) {
    //     offerFiltersInitial.sortDir = SortTypes.dirDesc;
    //   }else{
    //     offerFiltersInitial.sortDir =SortTypes.dirAsc
    //   }

    //   // console.log("OPTIONSSSS",offerFiltersInitial,"DisplayType",this.state.displayType)
    //   return offersRequest({
    //     ...offerFiltersInitial,
    //     ...userLocation,
    //     ...params,
    //     ...options,
    //     offerType: params.offerType ? (params.offerType as string) : ''
    //   });
    // }else{
    //   console.log("GRID============")

    //    return offersRequest({
    //     ...offerFiltersInitial,
    //     ...userLocation,
    //     ...params,
    //     ...options,
    //     offerType: params.offerType ? (params.offerType as string) : ''
    //   });
    // }
    // console.log("this.state.sortBy",this.state.sortBy)
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        offersRequest,
        setUserLocation
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    offers: homepageOffersSelector(state.offers),
    isRequesting: isRequestingSelector(state.offers),
    userLocation: getUserLocation(state.userPreferences)
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(HomePageContainer);
