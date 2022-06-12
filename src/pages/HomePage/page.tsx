import './styles.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../config';

import OfferList from '../../components/OfferList';
import HomePageSearch from './components/HomePageSearch';
import titleImg from './images/title-img.svg';
import { IPageProps, IState, IPropsData } from './types';
import IMG from '../../styles/images/get-the-job-done1.svg';
import bannerImg from '../../../src/styles/images/banner.png';
import postJobOne from '../../../src/styles/images/01.png';
import postJobTwo from '../../../src/styles/images/02.png';
import { sortByData } from '../../data/sortList';
import offerStatuses, { IDashboardOfferStatus } from '../../data/static/dashboard-offer-statuses';
import { SortTypes } from '../../data/sortTypes';
import { Actions, offersRequest } from '../../modules/Offers/actions';
import { apiClient } from '../../utils/api/client';
import { ApiConfig } from '../../config';
import querystring from 'querystring';
import OfferListItem from '../../components/OfferList/components/OfferListItem';
import classnames from 'classnames';
import Loading from '../../components/Loading';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IOffer, IDispatchProps } from '../../types/offers';
import { distance } from '../../data/distanceRadius';

class HomePage extends Component<IPageProps, IState, IPropsData> {
  constructor(props: any) {
    super(props);
    this.state = {
      locationPermission: false,
      offers: {},
      selectedOfferId: 0,
      filters: {
        itemsPerPage: 12,
        page: 1,
        sortBy: sortByData[0].value
      }
    };
  }

  componentDidMount() {
    this.getLocationPermissionStatus();
  }
  // public componentDidUpdate(
  //   prevProps: Readonly<IPageProps>,
  //   prevState: Readonly<{}>,
  //   snapshot?: any
  // ): void {
  //   if (prevProps.offers != this.props.offers) {
  //     // console.log("PREVPROS",prevProps)
  //     console.log("PROSssssss",this.props.offers,"prevProps",prevProps)
  //     this.setState({ offers: this.props.offers });

  //   }
  // }

  public getLocationPermissionStatus = () => {
    navigator.geolocation.getCurrentPosition(
      success => {
        this.setState({ locationPermission: false });
      },
      error => {
        this.setState({ locationPermission: true });
      }
    );
  };
  public _changeData = (data: any, append: any) => {
    console.log('sortTYpe', append);

    console.log('PROPSSSORTDATA', this.props);
    // this.props.getsortDetails(data)
    const {
      selectedOfferId,
      filters: { itemsPerPage }
    } = this.state;
    const offerStatusName = this._getOfferTypeById(selectedOfferId);
    const currentFilter = {
      sortType: data,
      status: offerStatusName,
      page: 1,
      itemsPerPage,
      sortDir: SortTypes.dirAsc
    };
    this._getOffers(currentFilter, append);
  };
  public _renderItem = (item: IOffer): JSX.Element => {
    console.log('render', item);

    return <OfferListItem key={item.id} {...item} />;
  };
  private _getOffers = async (params: any, append: any) => {
    // const loaderClassNames = classnames({ 'spinner--hidden': !this.props.isRequesting });

    const {
      // ownerId,
      // userOffersOffersCountRequest,
      // userOffersRequest,
      // offerTypeSignature,
      offersRequest,
      userLocation
    } = this.props;
    // userOffersOffersCountRequest(offerTypeSignature.countRequestLabel);

    const currentFilter = {
      sortBy: params.sortType,
      sortDir: SortTypes.dirAsc,
      status: params.status,
      itemsPerPage: params.itemsPerPage,
      filter: '',
      distance: distance.slice(-1)[0].value,
      offerType: '',
      lat: 0,
      lng: 0,
      page: append == true ? params.page + 1 : 1,
      type: ''
    };
    console.log('PROPSSS=======', currentFilter);
    if (params.sortType === SortTypes.dateCreated) {
      currentFilter.sortDir = SortTypes.dirDesc;
    }
    const options = {
      page: params.page,
      itemsPerPage: params.itemsPerPage
    };
    // await apiClient
    //   .get<any>(`${ApiConfig.endpoints.offers.getList}?${querystring.stringify(currentFilter)}`, {
    //     baseURL: ApiConfig.URL
    //   })
    //   .then(response => {
    //     console.log('RESPONSEE', response);

    //       let abc = response.data.offers;
    //       let offerData ={
    //         ...this.state.offers,
    //         data: abc,
    //         totalOffers: response.data.totalOffers,
    //         page: params.page,
    //         itemsPerPage: params.itemsPerPage,
    //       }
    //       this.props.getsortDetails(offerData)

    //     })

    //   // return  <Loading className={loaderClassNames} />

    //     // return abc.map((item:any) => <OfferListItem key={item.id} {...item} />)
    //     // return abc.map((item:any) => <Demo />)

    //     // const data = abc.map((item: any) => this._renderItem(item));

    //     // return data;
    //   });

    // if (params.sortType === SortTypes.dateCreated) {
    //   currentFilter.sortDir = SortTypes.dirDesc;
    // }

    // if (ownerId) {
    console.log('currentFilter', currentFilter);
    console.log('userLocation', userLocation);
    console.log('params', params);
    console.log('options', options);

    return offersRequest({
      ...currentFilter,
      ...userLocation,
      ...params,
      ...options,
      offerType: params.offerType ? (params.offerType as string) : ''
    });
    // offersRequest(currentFilter);
    // }
  };

  private _getOfferTypeById = (selectedOfferId: number): string => {
    const offerStatus: IDashboardOfferStatus = offerStatuses.find(
      offerStatus => offerStatus.id === selectedOfferId
    ) as IDashboardOfferStatus;
    return offerStatus.name;
  };
  public render() {
    const {
      offers,
      isRequesting,
      loadPage,
      setUserLocation,
      userLocation,
      selectedOfferType
    } = this.props;

    return (
      <>
        <div className="homepage-header homepage-gray-header">
          <div className="homepage-header__heading">
            <div className="container">
              <h1>
                Find talented Workers and Jobs
                {/* <img
                src={IMG}
                alt="Get the job done"
                title="Get the job done"
                className="setMarging"
              /> */}
              </h1>
            </div>
          </div>
          <div className="homepage-header__search">
            <HomePageSearch
              selectedOfferType={selectedOfferType}
              setUserLocation={setUserLocation}
              userLocation={userLocation}
              locationPermission={this.state.locationPermission}
            />
          </div>
          <div className="bannerImg">
            <img src={bannerImg} className="" alt="" />
          </div>
        </div>
        <div className="content wage-home-content">
          <main className="homePage__container">
            <div className="row">
              {/* {this.state.offers.data && this.state.offers.data.length > 0 && (
               
              )} */}
              <OfferList
                data={offers}
                isRequesting={isRequesting}
                loadPage={loadPage}
                showTypeTabs={true}
                onselData={this._changeData}
                columnsCount={6}
              />
            </div>
          </main>
          <div className="post-job-section">
            <div className="container">
              <div className="row">
                <div className="post-job-left">
                  <div>
                    <h2>
                      Post a job & <span>invite Workers to apply!</span>
                    </h2>

                    <Link to={Routes.ADD_TASK} className="btn btn-post-job">
                      Post a jobs
                    </Link>
                  </div>
                </div>
                <div className="post-job-right">
                  <ul>
                    <li>
                      <img src={postJobOne} className="" alt="" />
                    </li>
                    <li>
                      <img src={postJobTwo} className="" alt="" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        offersRequest
      },
      dispatch
    )
  };
};
export default compose<any>(connect(null, mapDispatchToProps))(HomePage);
// export default connect<any>(null,mapDispatchToProps)(HomePage);
// export default HomePage;
