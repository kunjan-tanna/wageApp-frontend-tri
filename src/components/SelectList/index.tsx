import React, { Component } from 'react';
import slugify from 'react-slugify';

import { ISelectOption } from '../../types';

import { IProps, ItemType } from './types';

import './styles.scss';

class SelectList extends Component<IProps> {
  public static defaultProps: IProps = {
    data: [],
    multiple: false,
    name: '',
    perColumn: 7,
    maxColumns: 4
  };

  public render() {
    const { data, perColumn, maxColumns } = this.props;
    const columnsClass = () => {
      const columns: number = Math.ceil(data.length / perColumn!);
      return columns <= maxColumns!
        ? `selectList--columns${columns}`
        : `selectList--columns${maxColumns!}`;
    };

    return <div className={`selectList ${columnsClass()}`}>{this._renderOptions()}</div>;
  }

  private _renderOptions = () => {
    const { data, multiple } = this.props;
    if (multiple) {
      return data.map(item => this._renderItem('checkbox', item));
    }

    return data.map(item => this._renderItem('radio', item));
  };

  private _renderItem = (type: ItemType, item: ISelectOption) => {
    const { name, selected, onChange } = this.props;
    const { label, value } = item;

    const id = `${slugify(name)}${Math.random()}`;

    return (
      <div
        key={`${name}${value}`}
        className={[
          'selectList__item',
          selected && selected.value === value ? 'selectList__item--selected' : null
        ]
          .filter(item => !!item)
          .join(' ')}
      >
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          className="selectList__input"
          onChange={() => onChange!(value)}
          checked={selected && selected.value === value}
        />
        <label htmlFor={id} className="selectList__label">
          {label}
        </label>
      </div>
    );
  };
}

export default SelectList;
