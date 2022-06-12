import React, { ReactNode } from 'react';

export const renderFormMessages = (status: any): ReactNode => {
  const { success, error } = status;
  console.log('STATUS-->', status);
  if (success) {
    return <p className="success">{success}</p>;
  } else if (error) {
    return <p className="validation-error">{error}</p>;
  }

  return null;
};

export const handleErrors = (error: XMLHttpRequest, values: any) => {
  // @ToDo - DEPRECATED - API was changed
  const response = error.response;
  const status = response && response.status ? response.status : 500;
  const data = response && response.data ? response.data : {};

  let preparedError = {
    code: 500,
    status: 'Unexpected error',
    fieldErrors: {}
  };

  if (status === 400 && data.hasOwnProperty('validationMessages')) {
    const validationMessages = data.validationMessages;

    Object.keys(validationMessages)
      .filter(
        fieldName => values.hasOwnProperty(fieldName) && validationMessages[fieldName].length > 0
      )
      .map(
        fieldName =>
          (preparedError.fieldErrors = Object.assign(preparedError.fieldErrors, {
            [fieldName]: validationMessages[fieldName][0]
          }))
      );

    preparedError = {
      ...preparedError,
      code: 400,
      status: 'Validation errors:'
    };
  }

  return preparedError;
};
