import React, { Component } from 'react';

import faqData from '../../../../data/static/faqMobile';
import StaticContentHeader from '../../components/StaticContentItemHeader';
import FaqList from './components/FaqList';
import SearchInput from './components/SearchInput';
import { IProps, IState } from './types';
import ss1 from '../../../../styles/images/ss1.png';
import ss2 from '../../../../styles/images/ss2.png';
import ss3 from '../../../../styles/images/ss3.png';

import './styles.scss';

class HelpCenter extends Component<IProps, IState> {
  public state = {
    searchValue: ''
  };

  public render() {
    const { searchValue } = this.state;

    return (
      <>
        <StaticContentHeader title="Data Deletion Instructions" />
        <div className="dataInstructionMain">
          <div className="container">
            <ol className="Instructions">
              <li>Go to Your Facebook Account’s Setting & Privacy. Click ” Setting “.</li>
              <li>Then, go to ” Apps and websites” and you will see the website Wage App.</li>
              <li>Select the option box of Wage App.</li>
            </ol>
            <img src={ss1}></img>
            <img src={ss2} className="img2"></img>
            <ol className="Instructions" start={4}>
              <li>Click ” Remove” button.</li>
            </ol>
            <img src={ss3}></img>
            <ol className="Instructions" start={5}>
              <li>Congratulation , you have successfully removed Wage App.</li>
            </ol>
          </div>
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
