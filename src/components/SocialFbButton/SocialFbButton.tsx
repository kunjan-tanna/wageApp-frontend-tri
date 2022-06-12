import React from 'react';
import SocialLogin from 'react-social-login';
import { IProps } from './types';
class SocialButton extends React.Component<IProps> {
  render() {
    return (
      <li onClick={this.props.triggerLogin} {...this.props}>
        {this.props.children}
      </li>
    );
  }
}

export default SocialLogin(SocialButton);
