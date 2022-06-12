import React, { FC } from 'react';

import features from '../../../../data/static/features';
import StaticContentHeader from '../../components/StaticContentItemHeader';
import { IProps } from './types';

import './styles.scss';

const Features: FC<IProps> = () => {
  return (
    <>
      <StaticContentHeader
        title="Features"
      />
      <div className="features">
        <ul className="features__list">
          {_renderFeaturesItems()}
        </ul>
      </div>
    </>
  );
};

const _renderFeaturesItems = () => {
  return features.map(item => (
    <li className="features__item" key={item.name}>
      <i className={`icon icon--${item.icon}`}/>
      <h4 className="features__title">{item.name}</h4>
      <p>{item.description}</p>
    </li>
  ));
};


export default Features;