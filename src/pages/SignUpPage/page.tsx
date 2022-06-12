import React, { Component } from 'react';
import ReactModal from 'react-modal';

import { Link } from 'react-router-dom';

import { IPageProps } from './types';

import CheckEmailModal from '../../components/CheckEmailModal';
import Tabs from '../../components/Tabs';
import { ITabItem } from '../../components/Tabs/types';
import { Routes } from '../../config';
import BusinessClientForm from './components/BusinessClientForm';
import InternalClientForm from './components/InternalClientForm';
import logo from '../../../src/styles/images/logo-dark.svg';

import './styles.scss';

class SignUpPage extends Component<IPageProps> {
  public render() {
    const { handleSubmit, history, visible, email } = this.props;

    const tabs: ITabItem[] = [
      {
        title: 'Personal Account',
        content: <InternalClientForm history={history} handleSubmit={handleSubmit} />
      },
      {
        title: 'Business Account',
        content: <BusinessClientForm handleSubmit={handleSubmit} />
      }
    ];

    return (
      <>
        {!visible && (
          <ReactModal isOpen={!visible} className="modal-window-wrapper auth-modal">
            <div className="modal-window">
              <div className="sign-up auth-content">
                <div className="authLeft">
                  <Link to="./" className="logo">
                    <img src={logo} className="" alt="Wage" />
                  </Link>
                  <p className="get-job">Get the job done</p>
                </div>
                <div className="authRight sign-up__window">
                  <div className="modal-window__header modal-window__header--sign-up">
                    <h2>Sign Up</h2>
                    <Link to={Routes.HOME} className="modal-window__close" title="Close" />
                  </div>
                  <div className="signup-tabs">
                    <Tabs items={tabs} />
                    <div className="modal-under-window modal-under-window--sign-up">
                      <p>
                        Already have an account? <Link to={Routes.LOGIN}>Log in</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        )}
        <CheckEmailModal modalVisibility={visible} email={email} />
      </>
    );
  }
}

export default SignUpPage;
