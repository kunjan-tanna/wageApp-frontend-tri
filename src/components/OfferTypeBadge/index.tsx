import React from 'react';

import './styles.scss';
import { IProps } from './types';


const OfferTypeBadge = (props: IProps) => {

    const { type, size } = props;
    const modifierClass = ' offer-type-badge--';
    let extraClassName = type ? modifierClass + type : '';
    extraClassName += size ? modifierClass + size : '';


    return (
        <div className={`offer-type-badge${extraClassName}`} />
    )
};

export default OfferTypeBadge;