import { Formik } from 'formik';
import React, { PureComponent } from 'react';
import * as yup from 'yup';
import locale from 'yup/lib/locale';

import RegularInput from '../../../../components/RegularInput';
import Textarea from '../../../../components/Textarea';
import { renderFormMessages } from '../../../../utils/form';
import validateDotsInRow from '../../../../utils/validation/validate-dots-in-row';
import { IFormProps, IFormValues, IState } from './types';

import './styles.scss';

const initialValues: IFormValues = {
  name: '',
  email: '',
  content: ''
};

const validationSchema: any = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
    .label('Name'),
  email: yup
    .string()
    .email()
    .trim()
    .required()
    .test(...validateDotsInRow(locale.string.email))
    .label('E-mail'),
  content: yup
    .string()
    .trim()
    .required()
    .label('Message')
});

class ContactForm extends PureComponent<IFormProps, IState> {
  public static defaultState: IState = {
    isSubmit: false
  };

  constructor(props: IFormProps) {
    super(props);

    this.state = { ...ContactForm.defaultState };
  }

  public render() {
    const { handleSubmit } = this.props;
    const { isSubmit } = this.state;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid
        }) => (
          <div className="contact__form-container">
            {status && renderFormMessages(status)}
            <h3>Or drop us an line via contact form</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit();
                if (isValid) {
                  this._showModal();
                }
              }}
            >
              <RegularInput
                name="name"
                iconName="profile-color"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Name"
                error={errors.name}
                touched={touched.name}
              />
              <RegularInput
                name="email"
                iconName="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="E-mail"
                error={errors.email}
                touched={touched.email}
              />
              <Textarea
                name="content"
                iconName="chat"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                touched={touched.content}
                placeholder="Message"
                error={errors.content}
              />
              <button className="btn btn--b btn--b-color" type="submit" disabled={isSubmitting}>
                Send
              </button>
            </form>
            {isSubmit && (
              <div className="success-modal">
                <div className="success-modal__block">
                  <h3 className="success-modal__title">Thanks!</h3>
                  <p className="success-modal__text">
                    The following email has been sent , somebody will get in touch with you. Thank
                    you.
                  </p>
                  <button onClick={this._hideModal} className="btn btn--b btn--b-color">
                    ok
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      />
    );
  }

  private _showModal = () => {
    this.setState({
      isSubmit: true
    });
  };

  private _hideModal = () => {
    this.setState({
      isSubmit: false
    });
  };
}

export default ContactForm;
