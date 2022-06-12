import './styles.scss';

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Routes } from '../../config';
import logo from '../../styles/images/logo-dark.svg';
import HeaderMenu from '../HeaderMenu';
import SearchForm from './components/SearchForm';
import { IProps } from './types';
import './styles-designer.scss';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';

const PageHeader = ({ history, location, setUserLocation }: IProps) => {
  const routesWithoutSearchbar = [
    Routes.HOME,
    Routes.LOGIN,
    Routes.SIGN_UP,
    Routes.ACCOUNT_CONFIRMATION,
    Routes.EMAIL_CONFIRMATION,
    Routes.REVOKE_EMAIL,
    Routes.PASSWORD_RESET
  ];

  const querystringValue = getSearchParamsAsObject(window.location.search);
  console.log('GGGGG', window.location.search, querystringValue);
  return (
    <>
      <div className="topInfo">
        <label>
          Our goal for Wage is to match people with local jobs. To best serve you, we will soon be
          going mobile only.&nbsp;
        </label>
        <label>
          Download Wage from your mobile device’s app store to continue finding work and posting
          jobs.
        </label>
      </div>
      <header className="page-header page-header-gray">
        <div className="container">
          <nav className="page-header__nav-container searchingOptons">
            <Link
              to={Routes.HOME + window.location.search}
              className="page-header__nav-container__logo"
            >
              <img src={logo} className="page-header__nav-container__logo-image" alt="Wage" />
            </Link>
            {!routesWithoutSearchbar.includes(location.pathname) && (
              <div className="page-header__nav-container__search-form">
                <SearchForm setUserLocation={setUserLocation} />
              </div>
            )}
            <div className="page-header__nav-container__nav-menu">
              <HeaderMenu history={history} pageurl={window.location.pathname} />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default withRouter(PageHeader);
