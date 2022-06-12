import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { categoriesRequest } from '../../modules/Categories/actions';
import { categoriesSelectSelector } from '../../modules/Categories/selectors';
import { offersRequest, offersResetPage } from '../../modules/Offers/actions';
import { isRequestingSelector, offersSelector } from '../../modules/Offers/selectors';
import { statesListSelector } from '../../modules/States/selectors';
import { getUserLocation } from '../../modules/UserPreferences/selectors';
import { IStoreState } from '../../store';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';
import OfferPage from './page';
import { Actions, IDispatchProps, IExternalProps, IProps } from './types';

class OffersPageContainer extends Component<IProps> {
  public componentDidMount() {
    const { categoriesRequest } = this.props;
    categoriesRequest();
  }

  public render() {
    const { offers, categories, isRequesting, states, userLocation, history } = this.props;

    return (
      <div className="content">
        <OfferPage
          offers={offers}
          states={states}
          categories={categories}
          isRequesting={isRequesting}
          loadPage={this._offersRequest}
          offersResetPage={this.props.offersResetPage}
          userLocation={userLocation}
        />
      </div>
    );
  }

  private _offersRequest = (options: any) => {
    const {
      location: { search },
      offersRequest
    } = this.props;

    const params = getSearchParamsAsObject(search);
    console.log('\n\n PARAMSSSSS-->', params, '\nBB', options);
    offersRequest({
      filter: params.filter as string,
      distance: parseInt(params.distance as string, 10),
      offerType: params.offerType as string,
      ...options
    });
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        offersRequest,
        categoriesRequest,
        offersResetPage
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    offers: offersSelector(state.offers),
    categories: categoriesSelectSelector(state.categories),
    isRequesting: isRequestingSelector(state.offers),
    states: statesListSelector(state.states),
    userLocation: getUserLocation(state.userPreferences)
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(OffersPageContainer);
