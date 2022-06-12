import React from 'react';
import {Link} from 'react-router-dom';

import './styles.scss';
import {IMarkerInternal} from './types';


const Marker = (props: IMarkerInternal) => {

    const {link, title, type} = props;
    const marker = <div className={`map__marker ${type ? `map__marker--${type}` : ''}`} title={title} />;

    if (link) {
        return (
          <Link to={link}>
            {marker}
          </Link>
        )
    }

    return marker;
};


export default Marker;