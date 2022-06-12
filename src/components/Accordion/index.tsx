import React from 'react';
import Collapsible from 'react-collapsible';

import './styles.scss';
import { IProps } from './types';

const AccordionWrapper = (props: IProps) => {

    const { title, children } = props;

    return (
        <Collapsible trigger={title} transitionTime={100}>
            {children}
        </Collapsible>
    )
};




export default AccordionWrapper;