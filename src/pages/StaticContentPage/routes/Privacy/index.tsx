import React, { FC } from 'react';

import privacyText from '../../../../data/static/privacy';
import StaticContentHeader from '../../components/StaticContentItemHeader';
import { IProps } from './types';

const Privacy: FC<IProps> = () => {
  return (
    <>
      <StaticContentHeader
        title="Privacy"
      />
      <div className="privacy static-content__text" dangerouslySetInnerHTML={{ __html: privacyText }}/>
    </>
  );
};


export default Privacy;