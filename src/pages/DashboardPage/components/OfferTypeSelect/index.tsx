import classnames from 'classnames';
import React, { PureComponent } from 'react';

import { IProps } from './types';

import './styles.scss';

class OfferTypeSelect extends PureComponent<IProps> {
  public render() {
    const { offersTypes, changeOfferType, selectedOfferId } = this.props;

    return (
      <div className="gigs-type-select">
        <ul className="gigs-type-select__types-list">
          {offersTypes.map(gigType => {
            const elementListClassNames = classnames({ 'active': gigType.id === selectedOfferId });

            return (
              <li key={gigType.name}
                  className={elementListClassNames}
                  onClick={() => changeOfferType(gigType.id)}>
                {gigType.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};


export default OfferTypeSelect;
