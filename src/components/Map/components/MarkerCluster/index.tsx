import React from 'react';

import './styles.scss';
import {IMarkerClusterExternal} from './types';


const MarkerCluster = (props: IMarkerClusterExternal) => {

    const {increaseZoomAndCenter, numPoints, lat, lng} = props;

    return (
        <div className="map__marker-cluster" onClick={() => increaseZoomAndCenter({ lat, lng })}>
            {numPoints}
        </div>
    )
};


export default MarkerCluster;