import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { Config } from '../../../../config';

import { Actions, contactFormRequest } from '../../../../modules/ContactForm/actions';
import StaticContentHeader from '../../components/StaticContentItemHeader';
import ContactForm from './form';
import { IDispatchProps, IFormValues, IProps } from './types';

class Contact extends Component<IProps> {
  public render() {
    return (
      <>
        <StaticContentHeader title="Contact us" />
        <div className="contact container">
          <div className="row">
            <div className="contact__content">
              <div className="contact__content__block">
                <h4>Phone</h4>
                <p>877-312-9243</p>
              </div>
              <div className="contact__content__block">
                <h4>E-mail</h4>
                <p>
                  <a href={`mailto:${Config.CONTACT_EMAIL}`}>{Config.CONTACT_EMAIL}</a>
                </p>
              </div>
            </div>
            <ContactForm handleSubmit={this._sendMessage} />
          </div>
        </div>
      </>
    );
  }

  private _sendMessage = (values: IFormValues, actions: any) => {
    const { contactFormRequest } = this.props;

    return contactFormRequest({ values, actions });
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        contactFormRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(null, mapDispatchToProps))(Contact);
