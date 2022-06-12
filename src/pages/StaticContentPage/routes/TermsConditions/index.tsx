import React, { FC } from 'react';

import termsText from '../../../../data/static/terms';
import StaticContentHeader from '../../components/StaticContentItemHeader';
import { IProps } from './types';

const TermsConditions: FC<IProps> = () => {
  return (
    <>
      <StaticContentHeader
        title="Terms & Conditions"
      />
      <div className="terms static-content__text" dangerouslySetInnerHTML={{ __html: termsText }}/>
    </>
  );
};


export default TermsConditions;