import './styles.scss';

import { ParsedUrlQuery } from 'querystring';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import RegularInput from '../../components/RegularInput';
import { Routes } from '../../config';
import {
  defaultDistanceValue,
  distance as availableDistance,
  distance
} from '../../data/distanceRadius';
import { sortBy as availableSortBys } from '../../data/sortList';
import { ISelectOption } from '../../types';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';
import Button from '../Button';
import FilterButton from '../FilterButton';
import SelectList from '../SelectList';
import Tooltip from '../Tooltip';
import { IProps, IState } from './types';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import OfferList from '../../components/OfferList';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};
const marks1 = {
  '0': '0 mi',
  '10': '10 mi',
  '20': '20 mi',
  '30': '30 mi',
  '40': '40 mi',
  '50': '50 mi'
};
const style1 = { margin: '12px 7px' };

class OfferFilters extends Component<IProps, IState> {
  public static defaultState: IState = {
    tooltips: {
      categoryId: false,
      distance: false,
      price: false,
      sortBy: false,
      state: false
    },
    temporary: {
      distanceIndex: 1,
      priceFrom: '',
      priceTo: '',
      distance: 10,
      min_distance: 0
    },
    catFlag: true,
    disFlag: true,
    priceFlag: true,
    taskFlag: true,
    stateFlag: true,
    filterFlag: true,
    sortByFlag: true,
    filterData: {},
    tempCatData: 5,
    tempStateData: 5,
    open: false,
    catShowLess: false,
    stateShowLess: false
  };

  constructor(props: IProps) {
    super(props);
    this.state = { ...OfferFilters.defaultState };
    this._setFilterData = this._setFilterData.bind(this);
  }

  public onOpenModal = () => {
    this.setState({ open: true });
  };

  public onCloseModal = () => {
    this.setState({ open: false });
  };

  public async componentDidMount() {
    const {
      location: { search },
      defaultFilters,
      categories,
      updateFilters,
      filters: { priceFrom, priceTo, ...filters }
    } = this.props;

    const querystringValue = getSearchParamsAsObject(search);

    await this.props.updateFilters({
      ...defaultFilters,
      ...querystringValue
    });
    this.setState({ temporary: this.setTemporaryValues(querystringValue) });
    await this._setFilterData(querystringValue);
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: any): void {
    const { search } = prevProps.location;
    const { location, updateFilters, defaultFilters, updateFilterMenu, categories } = this.props;
    const { filterFlag, filterData } = prevState;

    const querystringValue = getSearchParamsAsObject(location.search);

    if (location.search !== search && search.includes('sortBy')) {
      updateFilters(
        {
          ...defaultFilters,
          ...querystringValue
        },
        true
      );

      this.setState({ temporary: this.setTemporaryValues(querystringValue) });
      this._setFilterData(querystringValue);
    }

    if (filterFlag != this.state.filterFlag) {
      updateFilterMenu(this.state.filterFlag);
    }

    if (prevProps.categories != this.props.categories) {
      this._setFilterData(querystringValue);
    }
  }

  public render() {
    const {
      location,
      states,
      filters: { distance, priceFrom, priceTo, stateShortName },
      isOfferPage,
      data,
      isRequesting,
      columnsCount,
      filterFlag,
      categories,
      loadPage,
      updateFilters
    } = this.props;
    const { filters } = this.props;
    const querystringValue = getSearchParamsAsObject(location.search);
    const {
      tooltips,
      temporary: { distanceIndex },
      tempCatData
    } = this.state;

    const selectedRadius = availableDistance.find(
      ({ value }) => value === parseInt(`${distance}`, 10)
    );
    const defaultRadius = defaultDistanceValue;
    const buttonLabel = selectedRadius ? selectedRadius.label : defaultRadius.label;

    const selectedRadiusIndex = distanceIndex;
    const position =
      selectedRadiusIndex * (((350 / availableDistance.length) * 100) / 350) +
      (selectedRadiusIndex + 1) * ((15 * 100) / 380);

    const trackStyles = {
      backgroundImage: `linear-gradient(to right, #483ee8 ${position}%, transparent ${position}%)`
    };

    const pricebuttonLabel =
      !!priceFrom && !!priceTo
        ? `$${priceFrom} - $${priceTo}`
        : !priceFrom && !priceTo
        ? 'Price'
        : !!priceFrom
        ? `From $${priceFrom}`
        : `Up to $${priceTo}`;
    const tempPriceFrom = this.state.temporary.priceFrom;
    const tempPriceTo = this.state.temporary.priceTo;
    // let cat = categories.slice(1,5)

    const defaultState = { label: 'Select state' } as ISelectOption;
    const statesOptions = states.map(state => ({
      value: state.stateShortName,
      label: state.stateFullName
    }));
    const selectedState = statesOptions.find(({ value }) => `${value}` === `${stateShortName}`);
    const statebuttonLabel = selectedState ? selectedState.label : defaultState.label;
    return (
      <div className="offerFilters">
        <div className="container">
          <div className="filterSection">
            <div className="filterMain">
              <form
                method="get"
                action={Routes.OFFERS_LIST}
                className="offerFiltersForm"
                id="offerFiltersForm"
              >
                <div className="filterHead">
                  {/* <button
                    className="filterBtn desktopFltrBtn"
                    type="button"
                    onClick={() => this.setState({ filterFlag: !this.state.filterFlag })}
                  >
                    Filters <label>({this.state.filterData.count})</label>
                  </button> */}
                  <button
                    className="filterBtn mobileFilterBtn"
                    type="button"
                    onClick={() => this.onOpenModal()}
                  >
                    Filters <label>({this.state.filterData.count})</label>
                  </button>
                  {/* count{' '} */}
                  <div className="fltrHeadTitle">
                    <div
                      className={
                        this.state.filterFlag
                          ? 'openAllFilters offerFiltersForm__infoBox'
                          : 'closeAllFilters offerFiltersForm__infoBox'
                      }
                    >
                      {this._renderInfoHeader()}
                    </div>
                    <div
                      className={
                        this.state.filterData.cat != 'All' ||
                        this.state.filterData.offerType != 'All' ||
                        this.state.filterData.distance != '10' ||
                        this.state.filterData.range != 'All' ||
                        this.state.filterData.state != 'All'
                          ? 'openAllFilters offerFiltersForm__reset'
                          : 'closeAllFilters offerFiltersForm__reset'
                      }
                    >
                      {this._renderReset()}
                    </div>
                  </div>
                </div>
                <div className={this.state.filterFlag ? 'openAllFilters' : 'closeAllFilters'}>
                  <div className="offerFiltersForm__filters">
                    <div className="offerFiltersForm__filters__row">
                      <div className="filterBlock">{this._renderCategories()}</div>
                      <div className="filterBlock">{this._renderTypeOfTasks()}</div>
                      <div className="filterBlock">{this._renderDistance()}</div>
                      <div className="filterBlock">{this._renderPrice()}</div>
                      {states.length > 0 && (
                        <div className="filterBlock">{this._renderStates()}</div>
                      )}
                    </div>
                  </div>
                </div>
              </form>

              <div className="react-scroll-component offer-custom-grid">
                <OfferList
                  isOfferPage={true}
                  filters={filters}
                  data={data}
                  isRequesting={isRequesting}
                  columnsCount={6}
                  loadPage={loadPage}
                  filterFlag={this.state.filterFlag}
                  filterData={this.state.filterData}
                  location={location}
                  updateFilters={updateFilters}
                  categories={categories}
                  onClearCat={() => this._clearPerticularFilter('cat')}
                  onClearTask={() => this._clearPerticularFilter('task')}
                  onClearDis={() => this._clearPerticularFilter('dis')}
                  onClearPrice={() => this._clearPerticularFilter('price')}
                  onClearState={() => this._clearPerticularFilter('state')}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal open={this.state.open} onClose={this.onCloseModal}>
          <div className="filterHead modelPopup">
            {this.state.filterFlag && this.state.filterData && (
              <label className="resetText" onClick={e => this._resetHandler(e)}>
                Reset all
              </label>
            )}
            <label className="filterText">Filters</label>
          </div>
          <div>
            <div className="offerFiltersForm__filters">
              <div className="offerFiltersForm__filters__row">
                <div className="filterBlock">{this._renderCategories()}</div>
                <div className="filterBlock">{this._renderTypeOfTasks()}</div>
                <div className="filterBlock">{this._renderDistance()}</div>
                <div className="filterBlock">{this._renderPrice()}</div>
                {states.length > 0 && <div className="filterBlock">{this._renderStates()}</div>}
                <div className="filterBlock">{this._renderSortBy()}</div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  private _addTempCatData = async () => {
    const { categories } = this.props;
    let totalLength = categories.length;
    await this.setState({ tempCatData: categories.length });
    if (this.state.tempCatData >= totalLength) {
      this.setState({ catShowLess: true });
    }
  };

  private _removeTempCatData = () => {
    this.setState({ catShowLess: false, tempCatData: 5 });
  };

  private _addStateTempData = async () => {
    const { states } = this.props;
    let totalLength = states.length;
    await this.setState({ tempStateData: states.length });
    if (this.state.tempStateData >= totalLength) {
      this.setState({ stateShowLess: true });
    }
  };

  private _clearPerticularFilter = (type: any) => {
    const { updateFilters, filters } = this.props;
    let filter = filters;
    if (type == 'cat') {
      delete filter.categoryIds;
      updateFilters({
        ...filters,
        filter
      });
    } else if (type == 'dis') {
      filter.distance = 10;
      filter.MinDistance = 0;
      this.setState({
        temporary: {
          ...this.state.temporary,
          distance: 10,
          min_distance: 0
        }
      });
      updateFilters({
        ...filters,
        filter
      });
    } else if (type == 'task') {
      filter.offerType = '';
      updateFilters({
        ...filters,
        filter
      });
    } else if (type == 'price') {
      delete filter.priceFrom;
      delete filter.priceTo;
      updateFilters({
        ...filters,
        filter
      });
    } else if (type == 'state') {
      delete filter.stateShortName;
      updateFilters({
        ...filters,
        filter
      });
    }
  };

  private _toTitleCase = (phrase: String) => {
    return String(phrase)
      .toLowerCase()
      .split(' ')
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  private _setFilterData = async (data: any) => {
    const { categories, states } = this.props;
    let catData = '';
    let stateData;
    let count = 0;
    categories.filter(c => {
      if (
        String(data.categoryIds)
          .split(',')
          .includes(String(c.value))
      ) {
        if (catData.length > 0) {
          catData = catData + ' - ' + c.label;
        } else {
          catData = c.label;
        }
        return;
      }
      // if (c.value == data.categoryId) {
      //   catData = c.label;
      //   return;
      // }
    });
    states.filter(s => {
      if (s.stateShortName == data.stateShortName) {
        stateData = s.stateFullName;
        return;
      }
    });
    if (catData) {
      count += 1;
    }
    if (stateData) {
      count += 1;
    }
    if (data.distance > 5) {
      count += 1;
    }
    if (data.offerType != '') {
      count += 1;
    }
    if (data.priceFrom && data.priceTo) {
      count += 1;
    }
    let filterData = {
      cat: catData || 'All',
      state: stateData || 'All',
      distance: data.distance == -1 ? 'Max' : data.distance,
      offerType:
        data.offerType != ''
          ? data.offerType == 'gig'
            ? 'Gig'
            : data.offerType == 'service'
            ? 'Service'
            : 'All'
          : 'All',
      range:
        data.priceFrom && data.priceTo ? '$' + data.priceFrom + '-' + '$' + data.priceTo : 'All',
      count: count
    };
    await this.setState({ filterData: filterData });
  };

  private _changeTypeHandler = (e: any) => {
    const { updateFilters, filters } = this.props;
    console.log('\n\n eeeee', e.target.value, filters);
    updateFilters({
      ...filters,
      offerType: e.target.value
    });
  };

  private _catFlagChange = (data: any) => {
    this.setState({ catFlag: !this.state.catFlag });
  };

  private _setTemporaryState = (data: any) => {
    console.log('\n\n DDDDDDDDDDDDDDDDDDDDD', data);
    this.setState({
      temporary: {
        ...this.state.temporary,
        ...data
      }
    });
  };
  private _setTemporaryState2 = (data: any) => {
    // let distance = data[1] == 40 ? '-1' : data[1]
    // let min_distance = data[0]
    // this.setState({
    //   temporary: {
    //     ...this.state.temporary,
    //     distance,
    //     min_distance
    //   }
    // })
    const { updateFilters, filters } = this.props;
    console.log('\n\n 4444444444444', data);
    if (data[1] > 0) {
      updateFilters({
        ...filters,
        distance: data[1] == 40 ? '40' : data[1],
        MinDistance: data[0]
      });
    }
  };

  private _categoryFilterChangeHandler = (fieldValue: string, catName: string) => {
    const {
      updateFilters,
      filters,
      location: { search }
    } = this.props;
    if (fieldValue == '0') {
      delete filters.categoryIds;
      updateFilters({
        ...filters
      });
    } else {
      const querystringValue = getSearchParamsAsObject(search);
      let value = `${fieldValue}`;
      let categoryIds = querystringValue.categoryIds;
      if (categoryIds && categoryIds.length > 0) {
        categoryIds = String(categoryIds).split(',');
        if (categoryIds.includes(value)) {
          let index = categoryIds.indexOf(value);
          categoryIds.splice(index, 1);
        } else {
          categoryIds.push('' + fieldValue);
        }
        // value = categoryIds + `${fieldValue}`;
        value = categoryIds.map(val => `${val}`).join(',');
      }

      console.log('\n\n KKKKK', filters, value);
      if (value !== '0') {
        updateFilters({
          ...filters,
          categoryIds: value
        });
      } else {
        const { categoryId, ...filters } = this.props.filters;
        updateFilters({ ...filters });
      }
    }
    // const params = new URLSearchParams(search);
    // let foo = params.get('categoryIds');
    // let foo1 = String(foo).split(',');
    // console.log('\n %%%', foo1, decodeURI(String(search)));
  };

  private _stateFilterChangeHandler = (fieldValue: string) => {
    const { updateFilters, filters } = this.props;

    if (fieldValue) {
      const { lng, lat, ...rest } = filters;
      updateFilters({
        ...rest,
        stateShortName: fieldValue
      });
    } else {
      const { stateShortName, ...filters } = this.props.filters;
      updateFilters(filters);
    }
  };

  private _distanceFilterChangeHandler = (fieldValue: string) => {
    const { filters, updateFilters } = this.props;
    const value = `${fieldValue}`;

    updateFilters({
      ...filters,
      distance: parseInt(value, 10)
    });
  };

  private _priceChangeHandler = (priceFromValue: string, priceToValue: string) => {
    const {
      updateFilters,
      filters: { priceFrom, priceTo, ...filters }
    } = this.props;
    updateFilters({
      ...filters,
      ...(priceFromValue !== '' ? { priceFrom: parseInt(priceFromValue, 10) } : null),
      ...(priceToValue !== '' ? { priceTo: parseInt(priceToValue, 10) } : null)
    });
  };

  private _priceResetHandler = () => {
    const {
      updateFilters,
      filters: { priceFrom, priceTo, ...filters }
    } = this.props;
    updateFilters({ ...filters });
  };

  private _sortByFilterChangeHandler = (value: string) => {
    console.log('\n\n valueeee->', value);
    const { filters, updateFilters } = this.props;
    updateFilters({
      ...filters,
      sortBy: value
    });
  };

  private _resetHandler = (e: any) => {
    const { updateFilters, defaultFilters } = this.props;
    this.setState({ temporary: OfferFilters.defaultState.temporary, open: false });
    e.preventDefault();

    updateFilters({
      ...defaultFilters,
      offerType: '',
      filterToggle: true
    });
  };

  private _renderInfoHeader = () => {
    const { offerType } = this.props.filters;

    return (
      <>
        {/* Filters for {!offerType ? 'all' : ''} */}
        FILTERS
        {/* <span className="offerFiltersForm__infoBox__offerType">
          {' '}
          {offerType}
          {offerType ? 's' : ''}
        </span> */}
        :
        {/*<strong className="offerFiltersForm__infoBox__strong"> {filter ? `"${filter}"` : 'All'} </strong>*/}
        {/*<span className="offerFiltersForm__infoBox__location"> {false ? 'location' : 'everywhere'}</span>*/}
      </>
    );
  };

  private _toggleTooltip = (name: string) => () => {
    const { tooltips } = this.state;

    this.setState({
      tooltips: {
        [name]: !tooltips[name]
      }
    });
  };

  private _renderTypeOfTasks = () => {
    const { location } = this.props;
    const querystringValue = getSearchParamsAsObject(location.search);
    return (
      <>
        <label
          className={this.state.taskFlag ? 'upErrow catHeading' : 'catHeading'}
          onClick={() => this.setState({ taskFlag: !this.state.taskFlag })}
        >
          Type of offers
        </label>
        <div className={this.state.taskFlag ? 'openTask listMain' : 'closeTask listMain'}>
          <div className="collapse listitem" id="typetask">
            <div className="card card-body">
              <div className="radioBlock">
                <div className="radio">
                  <input
                    id="radio-1"
                    name="radio"
                    value=""
                    type="radio"
                    checked={querystringValue.offerType == '' ? true : false}
                    onChange={e => this._changeTypeHandler(e)}
                  />
                  <label htmlFor="radio-1" className="radio-label">
                    <span>All</span>
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-2"
                    name="radio"
                    value="gig"
                    type="radio"
                    checked={querystringValue.offerType == 'gig' ? true : false}
                    onChange={e => this._changeTypeHandler(e)}
                  />
                  <label htmlFor="radio-2" className="radio-label">
                    {/* <span>Gigs</span> */}
                    <span>Jobs</span>
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-3"
                    name="radio"
                    value="service"
                    type="radio"
                    checked={querystringValue.offerType == 'service' ? true : false}
                    onChange={e => this._changeTypeHandler(e)}
                  />
                  <label htmlFor="radio-3" className="radio-label">
                    <span>Workers</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  private _renderCategories = () => {
    const {
      categories,
      filters: { categoryIds }
    } = this.props;
    const { tooltips, tempCatData, catShowLess } = this.state;

    const selectedCats = String(categoryIds).split(',');
    const selectedCategory = categories.find(({ value }) => `${value}` === `${categoryIds}`);
    const defaultCategory = categories[0];
    const buttonLabel = selectedCategory ? selectedCategory.label : defaultCategory.label;
    return (
      // <div>
      //   <FilterButton
      //     label={buttonLabel}
      //     isSelected={!!selectedCategory && selectedCategory.value !== defaultCategory.value}
      //     isActive={tooltips.categoryId}
      //     onClick={this._toggleTooltip('categoryId')}
      //     onClear={() => this._categoryFilterChangeHandler(defaultCategory.value)}
      //   />
      //   <Tooltip isOpen={tooltips.categoryId} onClickOutside={this._toggleTooltip('categoryId')}>
      //     <SelectList
      //       data={categories}
      //       name="categoryId"
      //       onChange={this._categoryFilterChangeHandler}
      //       multiple={false}
      //       selected={selectedCategory ? selectedCategory : defaultCategory}
      //     />
      //   </Tooltip>
      // </div>
      <>
        <label
          className={this.state.catFlag ? 'upErrow catHeading' : 'catHeading'}
          onClick={() => this.setState({ catFlag: !this.state.catFlag })}
        >
          Categories
        </label>
        <div className={this.state.catFlag ? 'openCat listMain' : 'closeCat listMain'}>
          <ul className={catShowLess === true ? 'showMoreCss' : ''}>
            {categories.map((c, index) => {
              if (index <= Number(tempCatData)) {
                return (
                  <li
                    value={c.value}
                    className={
                      selectedCats.includes(String(c.value)) == true
                        ? 'ticTrue'
                        : c.value == 0 &&
                          (selectedCats.includes('') || selectedCats.includes('undefined'))
                        ? 'ticTrue'
                        : ''
                    }
                    onClick={() => this._categoryFilterChangeHandler(c.value, c.label)}
                  >
                    {this._toTitleCase(c.label)}
                  </li>
                );
              }
            })}
          </ul>
          <p
            className="showMore"
            onClick={
              catShowLess === true ? () => this._removeTempCatData() : () => this._addTempCatData()
            }
          >
            <b>{catShowLess === true ? '- SHOW LESS' : '+ SHOW MORE'}</b>
          </p>
        </div>
      </>
    );
  };

  private _renderStates = () => {
    const {
      filters: { stateShortName },
      states,
      location
    } = this.props;
    const { tooltips, stateShowLess } = this.state;

    const defaultState = { label: 'Select state' } as ISelectOption;
    const statesOptions = states.map(state => ({
      value: state.stateShortName,
      label: state.stateFullName
    }));
    const selectedState = statesOptions.find(({ value }) => `${value}` === `${stateShortName}`);
    const buttonLabel = selectedState ? selectedState.label : defaultState.label;
    const querystringValue = getSearchParamsAsObject(location.search);
    return (
      <>
        <label
          className={this.state.stateFlag ? 'upErrow catHeading' : 'catHeading'}
          onClick={() => this.setState({ stateFlag: !this.state.stateFlag })}
        >
          State
        </label>
        <div className={this.state.stateFlag ? 'openState listMain' : 'closeState listMain'}>
          <ul className={stateShowLess === true ? 'showMoreCss' : ''}>
            {states.map((s, index) => {
              if (index <= this.state.tempStateData) {
                return (
                  <li
                    value={s.stateShortName}
                    className={querystringValue.stateShortName == s.stateShortName ? 'ticTrue' : ''}
                    onClick={() => this._stateFilterChangeHandler(s.stateShortName)}
                  >
                    {s.stateFullName}
                  </li>
                );
              }
            })}
          </ul>
          <p
            className="showMore"
            onClick={
              stateShowLess === true
                ? () => this.setState({ stateShowLess: false, tempStateData: 5 })
                : () => this._addStateTempData()
            }
          >
            <b>{stateShowLess === true ? '- SHOW LESS' : '+ SHOW MORE'}</b>
          </p>
        </div>
      </>
      // <div>
      //   <FilterButton
      //     label={buttonLabel}
      //     isSelected={!!selectedState && selectedState.value !== defaultState.value}
      //     isActive={tooltips.state}
      //     onClick={this._toggleTooltip('state')}
      //     onClear={() => this._stateFilterChangeHandler(defaultState.value)}
      //   />
      //   <Tooltip isOpen={tooltips.state} onClickOutside={this._toggleTooltip('state')}>
      //     <SelectList
      //       data={statesOptions}
      //       name="state"
      //       onChange={this._stateFilterChangeHandler}
      //       multiple={false}
      //       selected={selectedState ? selectedState : defaultState}
      //     />
      //   </Tooltip>
      // </div>
    );
  };

  private _renderDistance = () => {
    const {
      filters: { distance },
      location: { search }
    } = this.props;
    const {
      tooltips,
      temporary: { distanceIndex }
    } = this.state;

    const querystringValue = getSearchParamsAsObject(search);

    const selectedRadius = availableDistance.find(
      ({ value }) => value === parseInt(`${distance}`, 10)
    );
    const defaultRadius = defaultDistanceValue;
    const buttonLabel = selectedRadius ? selectedRadius.label : defaultRadius.label;

    const selectedRadiusIndex = distanceIndex;
    const position =
      selectedRadiusIndex * (((350 / availableDistance.length) * 100) / 350) +
      (selectedRadiusIndex + 1) * ((15 * 100) / 380);

    const trackStyles = {
      backgroundImage: `linear-gradient(to right, #483ee8 ${position}%, transparent ${position}%)`
    };

    return (
      <>
        <label
          className={this.state.disFlag ? 'upErrow catHeading noBorder' : 'catHeading noBorder'}
          onClick={() => this.setState({ disFlag: !this.state.disFlag })}
        >
          Distance
        </label>
        <div className={this.state.disFlag ? 'openDis listMain' : 'closeDis listMain'}>
          <span className="disSpan">
            {querystringValue.distance == '-1'
              ? 'Max'
              : `within ${querystringValue.MinDistance || 0}-${
                  querystringValue.distance == '0' ? 10 : querystringValue.distance
                } mi`}
          </span>
          <div style={style1}>
            <Range
              min={0}
              max={50}
              marks={marks1}
              step={10}
              dots={false}
              allowCross={false}
              value={[
                Number(querystringValue.MinDistance) || 0,
                Number(querystringValue.distance == '-1' ? 40 : querystringValue.distance) || 10
              ]}
              onChange={e => this._setTemporaryState2(e)}
              defaultValue={[5, 10]}
            />
          </div>
          {/* <div className="offerFiltersForm__distanceSlider">
            <h3 className="offerFiltersForm__distanceSlider__header">{buttonLabel}</h3>
          <div className="offerFiltersForm__distanceSlider__labels">
              <span>{availableDistance[0].label}</span>
              {availableDistance.slice(1, -1).map(({ value, label }) => (
                <span key={`${value}${label}`}>{label}</span>
              ))}
              <span>{availableDistance.slice(-1)[0].label}</span>
              
            </div>
              <div className="offerFiltersForm__distanceSlider__inputWrapper">
              <div className="offerFiltersForm__distanceSlider__track" style={trackStyles}>
                .
              </div>
              <input
                className="offerFiltersForm__distanceSlider__input"
                name="distance"
                type="range"
                min="0"
                max={`${availableDistance.length - 1}`}
                step="1"
                value={distanceIndex}
                onChange={e =>
                  this._setTemporaryState({ distanceIndex: parseInt(e.currentTarget.value, 10) })
                }
              /> 
            </div>
          </div>*/}
          {/* <div className="offerFiltersActions">
            <Button
              label="Clear"
              variant="clear2"
             // onClick={this._clearDistanceFilter(defaultRadius)}
            />
            <Button
              label="Apply"
              variant="clear"
              onClick={() => this._applyDistanceFilter2()}
            // onClick={this._applyDistanceFilter(distanceIndex)}
            />
          </div> */}
        </div>
      </>
      // <div>
      //   <FilterButton
      //     label={buttonLabel}
      //     isSelected={!!selectedRadius && selectedRadius.value !== defaultRadius}
      //     isActive={tooltips.distance}
      //     onClick={this._toggleTooltip('distance')}
      //     onClear={this._clearDistanceFilter(defaultRadius)}
      //   />
      //   <Tooltip
      //     isOpen={tooltips.distance}
      //     fixedWidth={true}
      //     onClickOutside={this._toggleTooltip('distance')}
      //   >
      //     <div className="offerFiltersForm__distanceSlider">
      //       <h3 className="offerFiltersForm__distanceSlider__header">{buttonLabel}</h3>
      //       <div className="offerFiltersForm__distanceSlider__labels">
      //         <span>{availableDistance[0].label}</span>
      //         {availableDistance.slice(1, -1).map(({ value, label }) => (
      //           <span key={`${value}${label}`}>{label}</span>
      //         ))}
      //         <span>{availableDistance.slice(-1)[0].label}</span>
      //       </div>
      //       <div className="offerFiltersForm__distanceSlider__inputWrapper">
      //         <div className="offerFiltersForm__distanceSlider__track" style={trackStyles}>
      //           .
      //         </div>
      //         <input
      //           className="offerFiltersForm__distanceSlider__input"
      //           name="distance"
      //           type="range"
      //           min="0"
      //           max={`${availableDistance.length - 1}`}
      //           step="1"
      //           value={distanceIndex}
      //           onChange={e =>
      //             this._setTemporaryState({ distanceIndex: parseInt(e.currentTarget.value, 10) })
      //           }
      //         />
      //       </div>
      //     </div>
      //     <div className="offerFiltersActions">
      //       <Button
      //         label="Clear"
      //         variant="clear2"
      //         onClick={this._clearDistanceFilter(defaultRadius)}
      //       />
      //       <Button
      //         label="Apply"
      //         variant="clear"
      //         onClick={this._applyDistanceFilter(distanceIndex)}
      //       />
      //     </div>
      //   </Tooltip>
      // </div>
    );
  };

  private _clearDistanceFilter = (defaultRadiusValue: string) => (e?: any) => {
    e.preventDefault();
    this._setTemporaryState({ distanceIndex: OfferFilters.defaultState.temporary.distanceIndex });
    this._distanceFilterChangeHandler(defaultRadiusValue);
  };

  private _applyDistanceFilter = (distanceIndex: number) => (e: any) => {
    e.preventDefault();
    this._distanceFilterChangeHandler(`${availableDistance[distanceIndex].value}`);
  };
  private _applyDistanceFilter2 = () => {
    const { filters, updateFilters } = this.props;
    const { temporary } = this.state;
    let distance = temporary.distance;
    let MinDistance = temporary.min_distance;
    updateFilters({
      ...filters,
      distance,
      MinDistance
    });
  };

  private _renderPrice = () => {
    const {
      filters: { priceFrom, priceTo }
    } = this.props;
    const { tooltips } = this.state;
    const buttonLabel =
      !!priceFrom && !!priceTo
        ? `$${priceFrom} - $${priceTo}`
        : !priceFrom && !priceTo
        ? 'Price'
        : !!priceFrom
        ? `From $${priceFrom}`
        : `Up to $${priceTo}`;
    const tempPriceFrom = this.state.temporary.priceFrom;
    const tempPriceTo = this.state.temporary.priceTo;

    return (
      <>
        <label
          className={this.state.priceFlag ? 'upErrow catHeading noBorder' : 'catHeading noBorder'}
          onClick={() => this.setState({ priceFlag: !this.state.priceFlag })}
        >
          Price
        </label>
        <div className={this.state.priceFlag ? 'openPrice listMain' : 'closePrice listMain'}>
          <div className="tooltip__number-inputs">
            <RegularInput
              name="priceFrom"
              type="number"
              onChange={(e: any) =>
                this._setTemporaryState({ priceFrom: Math.abs(e.currentTarget.value) })
              }
              value={tempPriceFrom}
              placeholder="Min"
              iconName="dolar"
            />
            <span className="tooltip__number-inputs__between">to</span>
            <RegularInput
              name="priceTo"
              type="number"
              onChange={(e: any) =>
                this._setTemporaryState({ priceTo: Math.abs(e.currentTarget.value) })
              }
              value={tempPriceTo}
              placeholder="Max"
              iconName="dolar"
            />
          </div>
          <div className="offerFiltersActions">
            <Button label="Clear" variant="clear2" onClick={this._clearPriceFilter} />
            <Button label="Apply" variant="clear" onClick={this._applyPriceFilter} />
          </div>
        </div>
      </>
      // <div>
      //   <FilterButton
      //     label={buttonLabel}
      //     isSelected={!!priceFrom || !!priceTo}
      //     isActive={tooltips.price}
      //     onClick={this._toggleTooltip('price')}
      //     onClear={this._priceResetHandler}
      //   />
      //   <Tooltip isOpen={tooltips.price} onClickOutside={this._toggleTooltip('price')}>
      //     <div className="tooltip__number-inputs">
      //       <RegularInput
      //         name="priceFrom"
      //         type="number"
      //         onChange={(e: any) =>
      //           this._setTemporaryState({ priceFrom: Math.abs(e.currentTarget.value) })
      //         }
      //         value={tempPriceFrom}
      //         placeholder="Min"
      //         iconName="dolar"
      //       />
      //       <span className="tooltip__number-inputs__between">to</span>
      //       <RegularInput
      //         name="priceTo"
      //         type="number"
      //         onChange={(e: any) =>
      //           this._setTemporaryState({ priceTo: Math.abs(e.currentTarget.value) })
      //         }
      //         value={tempPriceTo}
      //         placeholder="Max"
      //         iconName="dolar"
      //       />
      //     </div>
      //     <div className="offerFiltersActions">
      //       <Button label="Clear" variant="clear2" onClick={this._clearPriceFilter} />
      //       <Button label="Apply" variant="clear" onClick={this._applyPriceFilter} />
      //     </div>
      //   </Tooltip>
      // </div>
    );
  };

  private _clearPriceFilter = (e: any) => {
    e.preventDefault();
    this._setTemporaryState({
      priceFrom: OfferFilters.defaultState.temporary.priceFrom,
      priceTo: OfferFilters.defaultState.temporary.priceTo
    });
    this._priceResetHandler();
  };

  private _applyPriceFilter = (e: any) => {
    e.preventDefault();

    let {
      temporary: { priceFrom }
    } = this.state;
    const {
      temporary: { priceTo }
    } = this.state;

    priceFrom = (Number(priceFrom) > Number(priceTo) ? 0 : Number(priceFrom)).toString();

    this._setTemporaryState({
      priceFrom
    });

    this._priceChangeHandler(`${priceFrom}`, `${priceTo}`);
  };

  private _renderSortBy = () => {
    const {
      filters: { sortBy },
      location
    } = this.props;
    const { tooltips } = this.state;

    const selectedSortBy = availableSortBys.find(({ value }) => value === sortBy);
    const defaultSortBy = availableSortBys[0];
    const buttonLabel = selectedSortBy ? selectedSortBy.label : defaultSortBy.label;
    const querystringValue = getSearchParamsAsObject(location.search);

    return (
      <>
        <label
          className={this.state.sortByFlag ? 'upErrow catHeading noBorder' : 'catHeading noBorder'}
          onClick={() => this.setState({ sortByFlag: !this.state.sortByFlag })}
        >
          Sort by
        </label>
        <div className={this.state.sortByFlag ? 'openState listMain' : 'closeState listMain'}>
          <div className="radioBlock">
            {availableSortBys.map((s, index) => {
              return (
                <div className="radio">
                  <input
                    id={'' + index + 1 * 100}
                    name="radio2"
                    value=""
                    type="radio"
                    checked={querystringValue.sortBy == s.value ? true : false}
                    onChange={() => this._sortByFilterChangeHandler(s.value)}
                  />
                  <label htmlFor={'' + index + 1 * 100} className="radio-label">
                    <span>{s.value}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </>

      // <div>
      //   <FilterButton
      //     label={buttonLabel}
      //     isSelected={!!selectedSortBy && selectedSortBy.value !== defaultSortBy.value}
      //     isActive={tooltips.sortBy}
      //     onClick={this._toggleTooltip('sortBy')}
      //     onClear={() => this._sortByFilterChangeHandler(defaultSortBy.value)}
      //   />
      //   <Tooltip isOpen={tooltips.sortBy} onClickOutside={this._toggleTooltip('sortBy')}>
      //     <SelectList
      //       data={availableSortBys}
      //       name="sortBy"
      //       onChange={this._sortByFilterChangeHandler}
      //       multiple={false}
      //       selected={selectedSortBy ? selectedSortBy : defaultSortBy}
      //     />
      //   </Tooltip>
      // </div>
    );
  };

  private _renderReset = () => {
    return <Button label="Reset all" variant="clear-reset" onClick={this._resetHandler} />;
  };

  private setTemporaryValues(querystringValue: ParsedUrlQuery): any {
    const distance = availableDistance.find(ad => ad.value === Number(querystringValue.distance));

    return {
      distanceIndex:
        querystringValue.distance && distance
          ? distance.distanceIndex
          : OfferFilters.defaultState.temporary.distanceIndex,
      priceFrom: querystringValue.priceFrom
        ? (querystringValue.priceFrom as string)
        : OfferFilters.defaultState.temporary.priceFrom,
      priceTo: querystringValue.priceTo
        ? (querystringValue.priceTo as string)
        : OfferFilters.defaultState.temporary.priceTo
    };
  }
}

export default withRouter(OfferFilters);
