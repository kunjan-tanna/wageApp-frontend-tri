import { Formik } from 'formik';
import React, { PureComponent } from 'react';
import * as yup from 'yup';

import Textarea from '../../../../components/Textarea';
import { IFormProps, IFormValues } from './types';

const initialValues: IFormValues = {
  message: ''
};

const validationSchema: any = yup.object().shape({
  message: yup.string().trim().required().label('Message')
});

class ChatMessageForm extends PureComponent<IFormProps> {
  public render() {
    const { handleSubmit } = this.props;

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
                   isSubmitting
                 }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Textarea name="message"
                        iconName="chat"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                        touched={touched.message}
                        placeholder="Message"
                        error={errors.message}
              />
            </div>
            <button className="btn btn--b btn--b-color" type="submit" disabled={isSubmitting}>Send</button>
          </form>
        )}
      />
    );
  }
}

export default ChatMessageForm;