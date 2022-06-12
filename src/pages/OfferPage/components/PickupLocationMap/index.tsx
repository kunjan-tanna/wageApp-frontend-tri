import React, { Component } from 'react';

import { IProps } from './types';

import Map from '../../../../components/Map';

import './styles.scss';

class PickupLocationMap extends Component<IProps> {

  public static defaultProps: IProps = {
    id: 0,
    location: {
      lat: 0,
      lng: 0
    },
    address: '',
    title: ''
  };

  public render() {
    const { id, location, title, type } = this.props;

    return (
      <div className="pickup-location">
        <div className="pickup-location__map">
          <Map markers={[{
            id,
            location,
            title,
            type
          }]} />
        </div>
      </div>
    );
  }
}

export default PickupLocationMap;
