import React, { Component } from 'react';

import { distance as availableDistance } from '../../data/distanceRadius';

import { IProps } from './types';

import './styles.scss';

class SelectAlternative extends Component<IProps> {
  public render() {
    const { data, ...selectProps } = this.props;

    return (
      <div className="selectAlternative">
        <select {...selectProps} className="selectAlternative__select">
          {availableDistance.map(({ value, label }, index) => (
            <option
              key={`${index}${value}`}
              value={value}
              className="selectAlternative__selectOption"
            >
              {label}
            </option>
          ))}
        </select>
        <div className="selectAlternative__overlay" />
      </div>
    );
  }
}

export default SelectAlternative;
