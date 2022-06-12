import React from 'react';
import { Config } from '../../../../config';

import downloadAppImg from './images/download-free-app-white.svg';
import './styles.scss';

const PageFooterMobileApps = () => {
  return (
    <>
      {/* <div className="page-footer__mobile-apps">
        <div className="page-footer__mobile-apps__container container">
          <div className="page-footer__mobile-apps__content">
            <h2>
              <img src={downloadAppImg} alt="Download free app" title="Download free app" />
              <em>Jobs and workers at your fingertips</em>
            </h2>
            <ul className="store-list">
              <li className="store-list__item">
                <a
                  href={Config.FOOTER_APP_STORE_LINK}
                  className="store-list__link store-list__link--app-store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Download on the App Store</span>
                </a>
              </li>
              <li className="store-list__item">
                <a
                  href={Config.FOOTER_GOOGLE_PLAY_LINK}
                  className="store-list__link store-list__link--google-play"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get in on Google Play</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="footer-download-app">
        <div className="container">
          <h3>Download Wage now</h3>
          <ul className="download-app-list">
            <li className="download-app-item">
              <a
                href={Config.FOOTER_APP_STORE_LINK}
                className="app-store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download on the App Store</span>
              </a>
            </li>
            <li className="download-app-item">
              <a
                href={Config.FOOTER_GOOGLE_PLAY_LINK}
                className="google-play"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Get in on Google Play</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PageFooterMobileApps;
