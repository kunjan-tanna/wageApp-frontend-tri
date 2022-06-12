import React, { PureComponent } from 'react';
import Select from 'react-select';

import { IProps } from './types';

import './styles.scss';

class SelectDropdown extends PureComponent<IProps> {
  public static defaultProps = {
    onChange: () => null
  };

  public render() {
    const { options, onChange, currentValue } = this.props;
    console.log('options', currentValue);

    return (
      <Select
        className={'select-dropdown'}
        classNamePrefix={'dropdown-content'}
        isSearchable={false}
        value={currentValue}
        onChange={onChange}
        options={options}
      />
    );
  }
}

export default SelectDropdown;
