import React from 'react';
import { Link } from 'react-router-dom';
import { Config } from '../../../../config';
import logo from '../../../../../src/styles/images/logo-dark.svg';

import { about as footerMenu } from '../../../../data/menu';
import './styles.scss';

const PageFooterMobileApps = () => {
  return (
    <nav className="page-footer__footer-menu">
      <div className="container">
        <div className="page-footer__footer-menu__container">
          <div className="page-footer__footer-menu__rest">
            <Link to="/" className="footer-logo">
              <img src={logo} className="page-header__nav-container__logo-image" alt="Wage" />
            </Link>
            <p className="copyright">All rights reserved wageapp.io &copy; 2019</p>
          </div>
          <div className="page-footer__footer-menu__menu">
            {_renderFooterMenu()}
            <ul className="page-footer__footer-menu__list footer-social">
              <li>
                <a
                  href={Config.FOOTER_FACEBOOK_LINK}
                  target="_blank"
                  title="Facebook"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  href={Config.FOOTER_INSTAGRAM_LINK}
                  target="_blank"
                  title="Instagram"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

const _renderFooterMenu = () => {
  return (
    <ul className="page-footer__footer-menu__list footer-links">
      {footerMenu.map(({ label, path }) => {
        if (path) {
          return (
            <li key={`${label}${path}`}>
              <Link to={path()}>{label}</Link>
            </li>
          );
        }
        return <li key={label}>{label}</li>;
      })}
    </ul>
  );
};

export default PageFooterMobileApps;
