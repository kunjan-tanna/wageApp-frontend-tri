import './styles.scss';

import classnames from 'classnames';
import _ from 'lodash';
import React, { Component, ReactNode } from 'react';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import ScrollArea from 'react-scrollbar';
import slugify from 'react-slugify';

import Map from '../../components/Map';
import { Routes } from '../../config';
import { sortBy as availableSortBys, sortByData } from '../../data/sortList/index';
import { IOffer } from '../../types/offers';
import Button from '../Button';
import Loading from '../Loading';
import SelectDropdown from '../SelectDropdown';
import OfferListItem from './components/OfferListItem';
import { DisplayType, DisplayTypes, IProps, IState } from './types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';
import locationICon from '../../styles/images/icons/new-theme-icon/location-big-green.svg';

import { detect } from 'detect-browser';
import { mixPanelEvent } from '../../utils/MixPanel';
import { SortTypes } from '../../../src/data/sortTypes';

export default class OfferList extends Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    showTypeTabs: true,
    isOfferPage: false,
    isDashboardPage: false
  };

  constructor(props: IProps) {
    super(props);
    const { filterData, isUserProfile } = this.props;

    this.state = {
      displayType: isUserProfile == true  ? DisplayTypes.LIST : DisplayTypes.GRID,
      eventFlag: false,
      isSorting: false,
      sortingData: [],
      sortBy: '',
      UserProfile : false
    };
  }
componentDidMount() {
  setTimeout(() => {
    if(this.props.isUserProfile == true) {

this.setState({ UserProfile : true,displayType : DisplayTypes.LIST})
    }
  }, 1000);
}
  componentDidUpdate(prevProps: IProps) {
    if (JSON.stringify(prevProps.filterData) != JSON.stringify(this.props.filterData)) {
      const { filterData, filterFlag } = this.props;
      console.log('TTTTTRRR', prevProps.filterData, this.props.filterData);
      //this.setState({ eventFlag: true })
      const { location } = this.props;
      const querystringValue = location ? getSearchParamsAsObject(location.search) : undefined;
      let str = '';
      let tmpStr = '';
      if (filterData && filterData.cat != 'All') {
        str = str + filterData.cat + ';';
      }
      if (querystringValue && querystringValue.distance !== '-1') {
        str = str + querystringValue.MinDistance + '-' + querystringValue.distance + 'mi;';
      }
      if (filterData && filterData.offerType !== 'All') {
        // str = str + 'All Offer Types;';
        str = str + filterData.offerType + ';';
      }
      if (filterData && filterData.range !== 'All') {
        str = str + filterData.range + ';';
      }

      if (filterData && filterData.state !== 'All') {
        str = str + filterData.state + ';';
      }

      if (str.length > 0) {
        mixPanelEvent('Filter applied', {
          'Filter applied': str
        });
      }
    }
  }

  public render() {
    const {
      data: { data, totalOffers },
      showTypeTabs,
      isRequesting,
      filterFlag,
      filterData,
      location
    } = this.props;
    console.log('PROPSS', this.props);

    const { displayType } = this.state;
    const loaderClassNames = classnames({ 'spinner--hidden': !isRequesting });

    return (
      <>
        {/* <ReactScrollWheelHandler
        downHandler={() =>
          displayType !== DisplayTypes.MAP ? this._appendNextPageHandler() : null
        }
        timeout={1000}
        className="react-scroll-component"
      > */}
        <div className="offerList">
          {showTypeTabs &&
            displayType !== DisplayTypes.MAP &&
            data.length > 0 &&
            this._renderDisplayType([DisplayTypes.GRID, DisplayTypes.LIST, DisplayTypes.MAP])}
          {this._renderContent()}
          
          <div className="offerList__pagination">
            <Loading className={loaderClassNames} />
            {data.length < totalOffers && (
              <label className="loadBtn" onClick={() => this._appendNextPageHandler()}>
                LOAD MORE
              </label>
            )}
          </div>
        </div>
        {/* </ReactScrollWheelHandler> */}
      </>
    );
  }

  _mixPanelEvents = async (flag: any, filterData: any) => {
    // const { location } = this.props;
    // const querystringValue = location ? getSearchParamsAsObject(location.search) : undefined;
    // let str = '';
    // let tmpStr = '';
    // if (filterData && filterData.cat != 'All') {
    //   str = str + filterData.cat + ';';
    // }
    // if (querystringValue && querystringValue.distance !== '-1') {
    //   str = str + querystringValue.MinDistance + '-' + querystringValue.distance + 'mi;';
    // }
    // if (filterData && filterData.offerType !== 'All') {
    //   // str = str + 'All Offer Types;';
    //   str = str + filterData.offerType + ';';
    // }
    // if (filterData && filterData.range !== 'All') {
    //   str = str + filterData.range + ';';
    // }
    // if (filterData && filterData.state !== 'All') {
    //   str = str + filterData.state + ';';
    // }
    // if (str.length > 0 && this.state.eventFlag) {
    //   mixPanelEvent('Filter applied', {
    //     'Filter applied': str
    //   });
    // }
  };

  private _renderBradCrums = () => {
    const {
      isRequesting,
      filterFlag,
      filterData,
      location,
      onClearCat,
      onClearTask,
      onClearDis,
      onClearPrice,
      onClearState,
      updateFilters
    } = this.props;
    console.log('filterData', filterData);
    const querystringValue = location ? getSearchParamsAsObject(location.search) : undefined;
    {
      this._mixPanelEvents(filterFlag, filterData);
    }
    return (
      <>
        {filterFlag && filterData ? (
          <div className={filterFlag ? 'selectedFltrBlock' : 'selectedFltrNone'}>
            {String(filterData.cat)
              .split(' - ')
              .map((c, index) => (
                <div className={filterData.cat == 'All' ? 'dNone' : 'selectedFltr'}>
                  <label>{this._toTitleCase(c)}</label>
                  <div className="closeIcon" onClick={() => this._onClearPertiqularCat(c)}></div>
                  {/* <span>Category:</span>
            <label>{filterData.cat}</label>
            <div className="closeIcon" onClick={onClearCat}></div> */}
                </div>
              ))}
            <div className={filterData.offerType == 'All' ? 'dNone' : 'selectedFltr'}>
              {/* <span>Type of task:</span> */}
              <label>{filterData.offerType === 'Gig' ? 'Jobs' : 'Workers'}</label>
              {console.log('\n\n LLLLL', filterData.offerType)}
              <div className="closeIcon" onClick={onClearTask}></div>
            </div>
            <div className={filterData.distance == '10' ? 'dNone' : 'selectedFltr'}>
              {/* <span>Distance:</span> */}
              <label>
                {querystringValue && querystringValue.distance == '-1'
                  ? 'Max'
                  : querystringValue &&
                    querystringValue.MinDistance + ' - ' + querystringValue.distance + ' mi'}
              </label>
              <div className="closeIcon" onClick={onClearDis}></div>
            </div>
            <div className={filterData.range == 'All' ? 'dNone' : 'selectedFltr'}>
              {/* <span>Price:</span> */}
              <label>{filterData.range}</label>
              <div className="closeIcon" onClick={onClearPrice}></div>
            </div>
            <div className={filterData.state == 'All' ? 'dNone' : 'selectedFltr'}>
              {/* <span>State:</span> */}
              <label>{filterData.state}</label>
              <div className="closeIcon" onClick={onClearState}></div>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  private _renderContent = () => {
    const {
      data: { data, totalOffers },
      isRequesting
    } = this.props;
    // console.log("DATAAAA",data)
    const { displayType } = this.state;

    const bannerSlider = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplay: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ],
      afterChange: (currentSlide: any) => {
        console.log(
          '\n\n QQQQQQ',
          currentSlide,
          currentSlide + 5,
          currentSlide + 10,
          data.length,
          totalOffers
        );
        if (currentSlide + 5 < data.length && currentSlide + 10 >= data.length) {
          console.log('CALLED');
          this._appendNextPageHandler();
        }
      }
    };

    if (displayType === DisplayTypes.MAP) {
      const markers = data.map(({ id, location, title, offerType }) => ({
        id,
        location,
        title,
        type: offerType,
        link: `${Routes.OFFER}/${id}/${slugify(title)}`
      }));

      return (
        <>
          {this._renderDisplayTypeForMap()}
          <div className="offerList__map-container">
            {/* <div className="offerList__map-container__list">
            <ScrollArea speed={0.8} className="area" contentClassName="content" horizontal={false}>
              {this._renderListForMap()}
            </ScrollArea>
          </div> */}

            <div className="offerList__map-container__map">
              <Map markers={markers} />
              <div className="mySlider">
                <Slider {...bannerSlider}>{this._renderListForMapSlider()}</Slider>
              </div>
            </div>
          </div>
        </>
      );
    }

    return !isRequesting && data.length === 0 ? this._renderNoDataContent() : this._renderList();
  };

  private _renderListForMapSlider = () => {
    const { data, totalOffers } = this.props.data;
    const { isRequesting } = this.props;
    const loaderClassNames = classnames({ 'spinner--hidden': !isRequesting });

    // let arr = []
    // data.map(item => arr.push(<div>{this._renderItem(item)}</div>));

    // if (data.length < totalOffers) {
    //   arr.push(
    //     <div>
    //       <label className="loadBtn" onClick={() => this._appendNextPageHandler()}>
    //         LOAD MORE
    //       </label>
    //     </div>
    //   )
    // };
    // return arr;
    return data.map(item => <div>{this._renderItem(item)}</div>);
  };

  private _renderListForMap = () => {
    const { data } = this.props.data;
    return (
      <ol className={`offerList__list offerList__list--list offerList__list--list-for-map`}>
        {data.map(item => this._renderItem(item))}
      </ol>
    );
  };

  private _transformArrayForGridColumns = (
    data: IOffer[],
    columns: number = this.props.columnsCount
  ): IOffer[] => {
    const offersListData: IOffer[] = [];
    const tmp = _.chunk(data, this.props.columnsCount);

    for (let index: number = 0; index <= this.props.columnsCount; index++) {
      tmp.forEach((chunk: IOffer[]) => {
        if (chunk[index]) {
          offersListData.push(chunk[index]);
        }
      });
    }

    return offersListData;
  };

  private _renderItem = (item: IOffer) => {
    return <OfferListItem key={item.id} {...item} />;
  };

  private _displayTypeHandler = (displayType: DisplayType) => () => {
    console.log('DISPLAY', this.state.sortBy);
    if (this.state.sortBy) {
      this.setState({ sortBy: '' });
    }
    const {
      loadPage,
      data: { itemsPerPage },
      filters,
      isOfferPage
    } = this.props;

    this.setState({ displayType });

    if (displayType === DisplayTypes.MAP) {
      return;
    }

    return isOfferPage
      ? loadPage({
          page: 1,
          itemsPerPage,
          ...filters
        })
      : loadPage({
          page: 1,
          itemsPerPage
        });
  };

  private _renderDisplayType = (types: DisplayType[]) => {
    const { displayType } = this.state;
    const {
      isDashboardPage,
      onSelectChange,
      selectDropdownValue,
      filterData,
      filterFlag,
      location,
      onClearCat,
      onClearTask,
      onClearDis,
      onClearPrice,
      onClearState,
      updateFilters
    } = this.props;
    console.log('selectDropdownValue', selectDropdownValue);
    // const categories = String(filterData.cat).split(' - ')
    const querystringValue = location ? getSearchParamsAsObject(location.search) : undefined;
    return (
      <>
        {displayType === DisplayTypes.LIST ? (
          <>
            {/* <div className="list-view">
              <div className="user-card">
                <div className="user-name">Linda Evangelista</div>
                <div className="user-location">
                  <img src={locationICon} className="" alt="" />
                  <span>Chicago, IL 60609</span>
                </div>
                <div className="rate-bio">
                  <div className="rate d-flex-colum">
                    <span className="rate-bio-title">Expected rate</span>
                    <label>$12/hr.</label>
                  </div>
                  <div className="bio d-flex-colum">
                    <span className="rate-bio-title">Bio</span>
                    <p>
                      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Amet
                      minim mollit non...
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </>
        ) : null}
        <nav className="offerList__displayType">
          {this._renderBradCrums()}
          {/* {filterFlag && filterData ? (
            <div className={filterFlag ? 'selectedFltrBlock' : 'selectedFltrNone'}>
              {String(filterData.cat).split(' - ').map((c, index) => (
                <div className={filterData.cat == 'All' ? 'dNone' : 'selectedFltr'}>
                  <label>{c}</label>
                  <div className="closeIcon" onClick={() => this._onClearPertiqularCat(c)}></div>
                </div>
              ))}
              <div className={filterData.offerType == 'All' ? 'dNone' : 'selectedFltr'}>
                <span>Type of task:</span>
                <label>{filterData.offerType}</label>
                <div className="closeIcon" onClick={onClearTask}></div>
              </div>
              <div className={filterData.distance == '10' ? 'dNone' : 'selectedFltr'}>
                <span>Distance:</span>
                <label>
                  {querystringValue && querystringValue.distance == '-1'
                    ? 'Max'
                    : querystringValue &&
                    querystringValue.MinDistance + ' - ' + querystringValue.distance + ' mi'}
                </label>
                <div className="closeIcon" onClick={onClearDis}></div>
              </div>
              <div className={filterData.range == 'All' ? 'dNone' : 'selectedFltr'}>
                <span>Price:</span>
                <label>{filterData.range}</label>
                <div className="closeIcon" onClick={onClearPrice}></div>
              </div>
              <div className={filterData.state == 'All' ? 'dNone' : 'selectedFltr'}>
                <span>State:</span>
                <label>{filterData.state}</label>
                <div className="closeIcon" onClick={onClearState}></div>
              </div>
            </div>
          ) : null} */}

          {isDashboardPage && (
            <div className="offerList__filter-selection">
              <label className="offerList__filter-selection__label">Sort by:</label>
              <SelectDropdown
                currentValue={selectDropdownValue}
                options={availableSortBys}
                onChange={onSelectChange}
              />
            </div>
          )}
          <h4 className="offerList__displayType__header">Display results as:</h4>
          <div className="offerList__displayType__item">
            {!isDashboardPage && (
              <i
                className={
                  displayType === 'map'
                    ? 'fa fa-map-marker locationIcon'
                    : 'fa fa-map-marker locationIcon mapDimColor'
                }
                title="Show on map"
                onClick={this._displayTypeHandler(DisplayTypes.MAP)}
              />
              // <Button
              //   variant="default"
              //   label="MAP VIEW"
              //   disabled={displayType === DisplayTypes.MAP}
              //   onClick={this._displayTypeHandler(DisplayTypes.MAP)}
              // />
            )}
          </div>
          <div className="offerList__displayType__item">
            <button
              className="offerList__displayType__button offerList__displayType__button--grid"
              disabled={displayType === DisplayTypes.GRID}
              onClick={this._displayTypeHandler(DisplayTypes.GRID)}
            >
              Grid
            </button>
          </div>
          <div className="offerList__displayType__item">
            <button
              className="offerList__displayType__button offerList__displayType__button--list"
              disabled={displayType === DisplayTypes.LIST}
              onClick={this._displayTypeHandler(DisplayTypes.LIST)}
            >
              List
            </button>
          </div>
        </nav>
      </>
    );
  };
  public onSelectChangeData = (e: any) => {
    console.log('TAGET', e);

    const {
      data: { page, itemsPerPage, data }
    } = this.props;
    console.log('DATTAAA', data);

    // if(e.target.value == "price")
    // {
    //   let sorting = data.sort(function(a, b) {

    //     return a.price - b.price;
    //   });
    //   console.log('TAGET====', sorting);
    //   this.setState({
    //     isSorting: true,
    //     sortingData: sorting
    //   });
    // }

    // return sorting.map(item => <div>{this._renderItem(item)}</div>);
    // {sorting.map(item => this._renderItem(item))}
    this.setState({
      sortBy: e.target.value
    });
    this.props.onselData(e.target.value, false);
  };
  private _renderList = () => {
    const {
      data: { page, itemsPerPage, data },
      isRequesting,
      columnsCount,
      selectDropdownValue,
      onSelectChange
    } = this.props;

    const { displayType } = this.state;

    let offersListData: IOffer[];

    if (displayType === DisplayTypes.GRID) {
      offersListData = this._transformArrayForGridColumns(data, columnsCount);
    } else {
      offersListData = [...data];
    }

    const listStartIndex = page * itemsPerPage - (itemsPerPage - 1);
 
    return (
      <>
      {this.props.isUserProfile  &&  this.state.UserProfile ==  false&& <Loading />}
        {displayType === DisplayTypes.LIST && isRequesting   && <Loading />}
        <ol
          className={
            detect().name == 'safari'
              ? `offerList__list offerList__list--${displayType} safari`
              : `offerList__list offerList__list--${displayType}`
          }
          start={listStartIndex}
        >
          {displayType === DisplayTypes.LIST ? (
            <>
              <div className="list-view">
                <div className="listview-sorting">
                  <label>Sort by:</label>
                  {/* <SelectDropdown
                currentValue={selectDropdownValue}
                options={sortByData}
                onChange={this.onSelectChangeData}
              /> */}
                  <select onChange={e => this.onSelectChangeData(e)}>
                    <option value="">Select</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="city">City</option>
                    <option value="dateCreated">Date - Newest First</option>
                  </select>
                </div>
              </div>

              {/* <div className="offerList__list__header">
                <div className="offerList__item__title">Name</div>
                <div className="offerList__item__price">Price</div>
                <div className="offerList__item__location">City</div>
                <div className="offerList__item__date">Posted</div>
              </div> */}
            </>
          ) : null}
          {console.log('sorting', this.props, 'IDsorting', this.state.isSorting)}
          {offersListData.map(item => this._renderItem(item))}
        </ol>
      </>
    );
  };
  private _onClearPertiqularCat = (name: any) => {
    const { updateFilters, filters, categories } = this.props;
    let id;
    categories.filter((cat: any) => {
      if (cat.label == name) {
        id = cat.value;
        return;
      }
    });
    let f = filters;
    let categoryIds = String(f.categoryIds).split(',');
    let index = categoryIds.indexOf(String(id));
    categoryIds.splice(index, 1);
    let cat = categoryIds.join(',');
    updateFilters({
      ...filters,
      categoryIds: cat
    });
  };

  private _renderDisplayTypeForMap = () => {
    const { displayType } = this.state;
    return (
      <div className="offerList__displayTypeForMap">
        <i
          className="fa fa-map-marker locationIcon"
          title="Show on map"
          onClick={this._displayTypeHandler(DisplayTypes.MAP)}
        />
        <div className="offerList__displayType__item">
          <button
            className="offerList__displayType__button offerList__displayType__button--grid"
            onClick={this._displayTypeHandler(DisplayTypes.GRID)}
          >
            Grid
          </button>
        </div>
        <div className="offerList__displayType__item">
          <button
            className="offerList__displayType__button offerList__displayType__button--list"
            onClick={this._displayTypeHandler(DisplayTypes.LIST)}
          >
            List
          </button>
          {/* <Button
          variant="default"
          label="Show on the list"
          onClick={this._displayTypeHandler(DisplayTypes.LIST)}
        /> */}
        </div>
      </div>
    );
  };

  private _appendNextPageHandler = () => {
    const {
      loadPage,
      data: { page, itemsPerPage },
      filters,
      isOfferPage
    } = this.props;

    if (isOfferPage) {
      return loadPage({
        ...filters,
        append: true,
        page: page + 1,
        itemsPerPage
      });
    } else if (this.state.sortBy) {
      // this.props.onselData(this.state.sortBy, true);
      loadPage({
        append: true,
        sortBy: this.state.sortBy,
        sortDir: SortTypes.dirAsc,
        page: page + 1,
        itemsPerPage
      });
    } else {
      loadPage({
        append: true,

        page: page + 1,
        itemsPerPage
      });
    }
    // isOfferPage
    //   ? loadPage({
    //       ...filters,
    //       append: true,
    //       page: page + 1,
    //       itemsPerPage
    //     })
    //   :
    //   // this.props.onselData();
    //   this.state.sortBy ?
    //   // this.props.getsortDetails(offerData),

    //   this.props.onselData(this.state.sortBy,true)
    //   // loadPage({
    //   //     append: true,
    //   //     sortBy: this.state.sortBy,
    //   //     sortDir : SortTypes.dirAsc,
    //   //     page: page + 1,
    //   //     itemsPerPage
    //   //   })

    //     : loadPage({
    //       append: true,

    //       page: page + 1,
    //       itemsPerPage
    //     })
  };

  private _loadPageHandler = (page: number = 1) => {
    const {
      loadPage,
      data: { itemsPerPage },
      filters,
      isOfferPage
    } = this.props;

    isOfferPage
      ? loadPage({
          page,
          itemsPerPage,
          ...filters
        })
      : loadPage({
          page,
          itemsPerPage
        });
  };

  private _toTitleCase = (phrase: String) => {
    return String(phrase)
      .toLowerCase()
      .split(' ')
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  private _renderNoDataContent(): ReactNode {
    const {
      filterData,
      filterFlag,
      onClearCat,
      onClearDis,
      onClearPrice,
      onClearState,
      onClearTask,
      location
    } = this.props;
    const querystringValue = location ? getSearchParamsAsObject(location.search) : undefined;
    return (
      <>
        {this._renderBradCrums()}
        <div className="offerList__no-data-content">
          No data was found. Please try changing your search filters.
        </div>
      </>
    );
  }
}
