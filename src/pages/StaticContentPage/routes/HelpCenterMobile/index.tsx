import React, { Component } from 'react';

import faqData from '../../../../data/static/faqMobile';
import StaticContentHeader from '../../components/StaticContentItemHeader';
import FaqList from './components/FaqList';
import SearchInput from './components/SearchInput';
import { IProps, IState } from './types';

import './styles.scss';

class HelpCenter extends Component<IProps, IState> {
  public state = {
    searchValue: ''
  };

  public render() {
    const { searchValue } = this.state;

    return (
      <>
        <StaticContentHeader title="Help center" />
        <div className="faq">
          <SearchInput placeholder="What are you looking for?" handleSubmit={this._handleSearch} />
          <FaqList data={this._filteredData(searchValue)} />
        </div>
      </>
    );
  }

  private _handleSearch = (value: string) => {
    return this.setState({
      searchValue: value
    });
  };

  private _filteredData = (searchValue: string) => {
    return faqData
      .map(item => ({
        category: item.category,
        data: item.data.filter(q => q.question.toLowerCase().indexOf(searchValue) > -1)
      }))
      .filter(item => item.data.length > 0);
  };
}

export default HelpCenter;
