import React, {FC} from 'react';
import Accordion from '../../../../../../components/Accordion';

import {IFAQ, IFAQItem} from '../../../../../../data/static/types';
import {IProps} from './types';

import './styles.scss';

const FaqList: FC<IProps> = ({ data }) => {
    return (
        <div className="faq__items">
            {_renderFaqGroups(data)}
        </div>
    )
};

const _renderFaqItems = (items: IFAQItem[]) => {
    return items.map(item => (
        <li className="faq-group__item" key={item.question}>
            <Accordion title={item.question}>
                <div dangerouslySetInnerHTML={{ __html: item.answer}} />
            </Accordion>
        </li>
    )
)};

const _renderFaqGroups = (data: IFAQ[]) => data.map(item => (
    <div className="faq-group" key={item.category}>
        <h4 className="faq-group__title">{item.category}</h4>
        <ul className="faq-group__list">
            {_renderFaqItems(item.data)}
        </ul>
    </div>
));




export default FaqList;