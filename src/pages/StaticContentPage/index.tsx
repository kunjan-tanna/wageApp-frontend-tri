import React, { Component } from 'react';
import { IProps } from './types';

import StaticContentPage from './page';

class StaticContentContainer extends Component<IProps> {

  public render() {

    return (
      <StaticContentPage />
    );
  }

}

export default StaticContentContainer;