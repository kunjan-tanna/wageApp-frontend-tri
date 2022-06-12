import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.scss';
import { Routes } from '../../config';

const Error404 = () => {
  let history = useHistory();
  return (
    <div id="main" className="clear">
      <div id="page-wrap">
        <div className="container">
          <div className="pagenotfound">
            <img src={require('./404-gif4.gif')} className="notfoundImg"></img>
            <div className="pagenotFoundBtmBtn">
              {/* <Link to={''}>
                <button className="gohomeBtn" onClick={history.goBack}>GO BACK</button>
              </Link> */}
              <Link to={Routes.HOME}>
                <button className="gohomeBtn">GO TO HOME</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // <div className="container">
  //   {/* <div className="error-404">
  //       <h1>Page not found</h1>
  //     </div> */}
  // </div>
};

export default Error404;
