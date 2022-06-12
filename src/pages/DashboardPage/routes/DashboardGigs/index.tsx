import './styles.scss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { dashboardOfferTypes } from '../../../../data/static/dashboard-offer-types';
import { ownerIdSelector } from '../../../../modules/CurrentUser/selectors';
import { multiOfferRequest } from '../../../../modules/MultiuploadOffers/actions';
import { userOffersSelector } from '../../../../modules/Offers/selectors';
import {
  userOffersOffersCountRequest,
  userOffersRequest
} from '../../../../modules/UserOffers/actions';
import { gigsCountSelector } from '../../../../modules/UserOffers/selectors';
import { getUserLocation } from '../../../../modules/UserPreferences/selectors';
import { IStoreState } from '../../../../store';
import { AccountTypes } from '../../../../types';
import DashboardOffers from '../../components/DashboardOffers';
import { Actions, IDispatchProps, IExternalProps, IProps, IState } from './types';
import { sortBy as availableSortBys } from '../../../../data/sortList';
import { distance } from '../../../../data/distanceRadius';
import { SortTypes } from '../../../../data/sortTypes';

class DashboardGigs extends PureComponent<IProps, IState> {
  public componentDidMount() {
    const { ownerId } = this.props;
    let filters = {
      distance: distance.slice(-1)[0].value,
      itemsPerPage: 12,
      page: 1,
      sortBy: availableSortBys[0].value
    };
    const currentFilter = {
      distance: distance.slice(-1)[0].value,
      page: filters.page,
      itemsPerPage: filters.itemsPerPage,
      sortBy: availableSortBys[0].value,
      sortDir: SortTypes.dirDesc,
      type: dashboardOfferTypes.gigs.name,
      ownerId,
      status: 'pending'
      // append: params.append,
      // timestamp: Math.floor(Date.now() / 1000),
      // ...userLocation
    };

    this.props.userOffersRequest(currentFilter);
  }
  public render() {
    const {
      offers,
      ownerId,
      accountType,
      gigsCount,
      isRequesting,
      isError,
      userOffersRequest,
      userOffersOffersCountRequest,
      userLocation
    } = this.props;

    return (
      <div className="dashboard-gigs">
        <DashboardOffers
          offerTypeSignature={dashboardOfferTypes.gigs}
          isRequesting={isRequesting}
          isError={isError}
          offers={offers}
          ownerId={ownerId}
          offersCount={gigsCount}
          userOffersRequest={userOffersRequest}
          userOffersOffersCountRequest={userOffersOffersCountRequest}
          userLocation={userLocation}
          multiOffer={accountType === AccountTypes.BUSINESS}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    offers: userOffersSelector(state.userOffers),
    ownerId: ownerIdSelector(state.currentUser),
    accountType: state.currentUser.currentUser.accountType,
    gigsCount: gigsCountSelector(state.userOffers.offersCount),
    isRequesting: state.userOffers.requesting,
    isError: state.userOffers.error,
    userLocation: getUserLocation(state.userPreferences)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        multiOfferRequest,
        userOffersRequest,
        userOffersOffersCountRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(DashboardGigs);
