import './styles.scss';

import querystring from 'querystring';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import OfferFilters from '../../components/OfferFilters';
import OfferList from '../../components/OfferList';
import { defaultDistanceValue } from '../../data/distanceRadius';
import { sortBy as availableSortBys } from '../../data/sortList';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';
import { IPageProps, IState } from './types';

class OfferPage extends Component<IPageProps, IState> {
  public static defaultState: IState = {
    filters: {
      offerType: 'gig',
      distance: defaultDistanceValue,
      sortBy: availableSortBys[0].value,
      MinDistance: 0
    },
    filterFlag: true
  };

  constructor(props: IPageProps) {
    super(props);

    this.state = { filters: OfferPage.defaultState.filters, filterFlag: true };
  }

  public componentDidUpdate(prevProps: Readonly<IPageProps>) {
    const {
      location: { search },
      userLocation
    } = this.props;

    if (
      prevProps.userLocation.lat === 0 &&
      prevProps.userLocation.lng === 0 &&
      JSON.stringify(prevProps.userLocation) !== JSON.stringify(userLocation)
    ) {
      const params = getSearchParamsAsObject(search);
      delete params.lat;
      delete params.lng;

      console.log('\n\n PARAAAAAMMM****', params);

      return this._updateFilters(params);
    }
  }

  public render() {
    const { filters, filterFlag } = this.state;
    const { offers, categories, isRequesting, loadPage, states } = this.props;
    return (
      <>
        <OfferFilters
          filters={filters}
          page={offers.page}
          defaultFilters={OfferPage.defaultState.filters}
          updateFilters={this._updateFilters}
          categories={categories}
          states={states}
          loadPage={loadPage}
          updateFilterMenu={this._updateFilterFlag}
          isOfferPage={true}
          data={offers}
          isRequesting={isRequesting}
          columnsCount={6}
          filterFlag={this.state.filterFlag}
        />
        <main
          className={
            filterFlag == undefined || filterFlag === false
              ? 'offers__container'
              : 'offers__container__open__filters'
          }
        >
          {/* <div className="container">
            <div className="row">
              <OfferList
                isOfferPage={true}
                filters={filters}
                data={offers}
                isRequesting={isRequesting}
                columnsCount={6}
                loadPage={loadPage}
                filterFlag={this.state.filterFlag}
              />
            </div>
          </div> */}
        </main>
      </>
    );
  }

  private _updateFilterFlag = (filterFlag?: boolean) => {
    this.setState({
      filterFlag: filterFlag
    });
  };

  private _updateFilters = (filters: any, setTemporaryDefaultState?: boolean) => {
    const {
      history: { push },
      loadPage,
      offersResetPage,
      offers: { page, itemsPerPage },
      userLocation
    } = this.props;

    filters.sortBy && filters.sortBy === 'dateCreated'
      ? (filters.sortDir = 'desc')
      : delete filters.sortDir;

    filters.lat = userLocation.lat;
    filters.lng = userLocation.lng;

    this.setState({
      filters,
      // @ts-ignore
      ...(setTemporaryDefaultState ? { temporary: OfferFilters.defaultState.temporary } : null)
    });
    offersResetPage();
    loadPage({ ...filters, page, itemsPerPage });
    push(`?${querystring.stringify(filters)}`);
  };
}

export default withRouter(OfferPage);
