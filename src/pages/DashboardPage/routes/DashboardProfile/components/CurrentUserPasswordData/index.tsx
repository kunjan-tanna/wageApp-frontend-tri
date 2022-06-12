import { Formik } from 'formik';
import React, { PureComponent, ReactNode } from 'react';
import * as yup from 'yup';

import ModalAlternative from '../../../../../../components/ModalAlternative';
import RegularInput from '../../../../../../components/RegularInput';
import { renderFormMessages } from '../../../../../../utils/form';
import passwordValidation from '../../../../../../utils/validation/password';

import { IChangePasswordFormValues, IProps } from './types';

import './styles.scss';

const initialValues: IChangePasswordFormValues = {
  oldPassword: '',
  newPassword: '',
  passwordConfirm: ''
};

const validationSchema: any = yup.object().shape({
  oldPassword: yup
    .string()
    .required()
    .label('Old password'),
  newPassword: passwordValidation,
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required()
    .label('Confirm password')
});

class CurrentUserPasswordData extends PureComponent<IProps> {
  public render() {
    const { editMode, toggleEditMode } = this.props;

    return (
      <div className="row password-data">
        {editMode ? this._renderPasswordForm() : this._renderPasswordInfo()}
        {!editMode && (
          <div className="data__navigation data__navigation">
            <button className="btn btn--b" onClick={toggleEditMode}>
              Change
            </button>
          </div>
        )}
      </div>
    );
  }

  private _handleChange = (e: any, setFieldValue: any, setStatus: any) => {
    setFieldValue(e.target.name, e.target.value);
    setStatus('');
  };

  private _renderPasswordForm = (): ReactNode => {
    const { handleSubmit, editMode, toggleEditMode } = this.props;

    return (
      <ModalAlternative isOpen={editMode} extraClass="edit-modal">
        <div className="modal-alternative__header">
          <button className="btn-close" onClick={toggleEditMode}>
            <i className="icon icon--close-gray" />
          </button>
          <h3>Change password</h3>
        </div>
        <div className="modal-alternative-content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              actions.setStatus('');
              handleSubmit(values, actions);
              actions.setSubmitting(false);
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
              setFieldValue,
              setStatus
            }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    readOnly={true}
                    autoComplete="username email"
                    style={{ display: 'none' }}
                  />
                  <RegularInput
                    name="oldPassword"
                    iconName="key"
                    type="password"
                    onChange={e => this._handleChange(e, setFieldValue, setStatus)}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                    touched={touched.oldPassword}
                    error={errors.oldPassword}
                    placeholder="Old password"
                    toggleVisibilityBtn={true}
                    autocomplete="current-password"
                  />
                  {/* {status && renderFormMessages(status)} */}
                  {status && status.error == 'Password is incorrect.' && renderFormMessages(status)}
                  <RegularInput
                    name="newPassword"
                    iconName="key"
                    type="password"
                    onChange={e => this._handleChange(e, setFieldValue, setStatus)}
                    onBlur={handleBlur}
                    value={values.newPassword}
                    touched={touched.newPassword}
                    error={errors.newPassword}
                    placeholder="New password"
                    toggleVisibilityBtn={true}
                    autocomplete="new-password"
                  />
                  {status &&
                    status.error == 'New password cannot be the same as the old password.' &&
                    renderFormMessages(status)}
                  <RegularInput
                    name="passwordConfirm"
                    iconName="key"
                    type="password"
                    onChange={e => this._handleChange(e, setFieldValue, setStatus)}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    touched={touched.passwordConfirm}
                    error={errors.passwordConfirm}
                    placeholder="Password confirm"
                    toggleVisibilityBtn={true}
                    autocomplete="new-password"
                  />
                  {editMode && (
                    <div className="data__form-buttons">
                      <button
                        className="btn btn--b btn--b-color"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </form>
              </>
            )}
          />
        </div>
      </ModalAlternative>
    );
  };

  private _renderPasswordInfo = (): ReactNode => (
    <div className="data__info">
      {this.props.changePasswordSuccessDisplay && this._renderSuccessMessage()}
      <RegularInput
        name="Password"
        type="text"
        onChange={e => e.preventDefault()}
        readOnly={true}
        value="*******"
        placeholder="Password"
        iconName="key"
      />
    </div>
  );

  private _renderSuccessMessage = (): ReactNode => (
    <p className="success">Password has been changed</p>
  );
}

export default CurrentUserPasswordData;
