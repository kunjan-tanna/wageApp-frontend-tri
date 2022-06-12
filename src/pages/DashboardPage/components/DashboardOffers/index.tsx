import React, { PureComponent } from 'react';

import DashboardInfo from '../../../../components/DashboardInfo';
import OfferList from '../../../../components/OfferList';
import { ISelectOptions } from '../../../../components/SelectDropdown/types';
import { distance } from '../../../../data/distanceRadius';
import { sortBy as availableSortBys, sortByData } from '../../../../data/sortList';
import { SortTypes } from '../../../../data/sortTypes';
import offerStatuses, {
  IDashboardOfferStatus
} from '../../../../data/static/dashboard-offer-statuses';
import DashboardItemHeader from '../../../../pages/DashboardPage/components/DashboardItemHeader';
import DashboardAddJob from '../DashboardAddJob';
import OffersCount from '../OffersCount';
import OfferTypeSelect from '../OfferTypeSelect';
import { IProps, IState } from './types';

import './styles.scss';

class DashboardOffers extends PureComponent<IProps, IState> {
  public static defaultState: IState = {
    sortType: availableSortBys[0],
    selectedOfferId: 0,
    filters: {
      distance: distance.slice(-1)[0].value,
      itemsPerPage: 12,
      page: 1,
      sortBy: availableSortBys[0].value
    }
  };

  constructor(props: any) {
    super(props);

    this.state = DashboardOffers.defaultState;
  }

  public componentDidMount() {
    const {
      sortType,
      selectedOfferId,
      filters: { page, itemsPerPage }
    } = this.state;
    const offerStatusName = this._getOfferTypeById(selectedOfferId);
    this._getOffers({ sortType: sortType.value, status: offerStatusName, page, itemsPerPage });
  }

  public render() {
    const { filters, selectedOfferId, sortType } = this.state;
    const {
      offers,
      offersCount,
      isRequesting,
      isError,
      offerTypeSignature,
      multiOffer
    } = this.props;
    const displayInfo = !isRequesting && (isError || offersCount === 0 || offers.data.length === 0);

    offers.data = offers.data.map(offer => ({ ...offer, offerType: offer.type }));

    return (
      <>
        <DashboardItemHeader
          title={offerTypeSignature.title}
          itemsCount={offersCount}
          multiOffer={multiOffer}
        />

        <div className="dashboard__page-content-block dashboard-border-top">
          <div className="dashboard-offers-header">
            <OfferTypeSelect
              offersTypes={offerStatuses}
              selectedOfferId={selectedOfferId}
              changeOfferType={this._changeOfferType}
            />
            <OffersCount
              offersStatuses={offerStatuses}
              selectedOfferId={selectedOfferId}
              offersCount={offers.totalOffers}
            />
          </div>
          {displayInfo ? (
            this._renderInfoContent(selectedOfferId)
          ) : (
            <OfferList
              onSelectChange={this._changeSortType}
              selectDropdownValue={sortType}
              isDashboardPage={true}
              filters={filters}
              data={offers}
              isRequesting={isRequesting}
              columnsCount={4}
              loadPage={this._loadOfferListPage}
            />
          )}
        </div>
      </>
    );
  }
  public _changeData = (value: any) => {
    console.log('sortTYpe', value);
  };
  private _changeSortType = (sortType: ISelectOptions) => {
    console.log('sortTYpe', sortType);
    const {
      selectedOfferId,
      filters: { itemsPerPage }
    } = this.state;

    const offerStatusName = this._getOfferTypeById(selectedOfferId);
    this.setState({ sortType });
    const currentFilter = {
      sortType: sortType.value,
      status: offerStatusName,
      page: 1,
      itemsPerPage,
      sortDir: SortTypes.dirAsc
    };

    this._getOffers(currentFilter);
  };

  private _changeOfferType = (selectedOfferId: number): void => {
    const {
      sortType,
      filters: { itemsPerPage }
    } = this.state;

    this.setState({ selectedOfferId });
    const offerStatusName = this._getOfferTypeById(selectedOfferId);
    this._getOffers({ sortType: sortType.value, status: offerStatusName, page: 1, itemsPerPage });
  };

  private _getOffers = (params: any) => {
    const {
      ownerId,
      userOffersOffersCountRequest,
      userOffersRequest,
      offerTypeSignature,
      userLocation
    } = this.props;

    userOffersOffersCountRequest(offerTypeSignature.countRequestLabel);

    const currentFilter = {
      distance: distance.slice(-1)[0].value,
      page: params.page,
      itemsPerPage: params.itemsPerPage,
      sortBy: params.sortType,
      sortDir: SortTypes.dirAsc,
      type: offerTypeSignature.name,
      ownerId,
      status: params.status,
      append: params.append,
      timestamp: Math.floor(Date.now() / 1000),
      ...userLocation
    };

    if (params.sortType === SortTypes.dateCreated) {
      currentFilter.sortDir = SortTypes.dirDesc;
    }

    if (ownerId) {
      userOffersRequest(currentFilter);
    }
  };

  private _loadOfferListPage = (options: any) => {
    console.log('OPRIONSS', options);
    const { sortType, selectedOfferId, filters } = this.state;

    this.setState({
      filters: {
        ...filters,
        page: options.page,
        itemsPerPage: options.itemsPerPage
      }
    });

    const offerStatusName = this._getOfferTypeById(selectedOfferId);
    this._getOffers({
      sortType: sortType.value,
      status: offerStatusName,
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      append: options.append
    });
  };

  private _getOfferTypeById = (selectedOfferId: number): string => {
    const offerStatus: IDashboardOfferStatus = offerStatuses.find(
      offerStatus => offerStatus.id === selectedOfferId
    ) as IDashboardOfferStatus;
    return offerStatus.name;
  };

  private _renderInfoContent = (selectedOfferId: number) => {
    const { isError, offersCount, offerTypeSignature } = this.props;
    const name = offerTypeSignature.name;
    const offerType = name.charAt(0).toUpperCase() + name.slice(1);

    if (isError) {
      return <DashboardInfo text="Error ocurred during fetching data, please try refresh page." />;
    } else if (!offersCount) {
      return <DashboardAddJob offerType={offerType} selectedOfferId={selectedOfferId} />;
    } else {
      return <DashboardInfo text={`You have no ${offerTypeSignature.namePlural}, yet.`} />;
    }
  };
}

export default DashboardOffers;
