import * as yup from 'yup';

export default yup
  .string()
  .required()
  .label('Password')
  .min(8, 'Password is too short - should be 8 chars minimum')
  .matches(/(?=.*[A-Z])/, 'Password should contain at least an uppercase letter')
  .matches(/(?=.*[a-z])/, 'Password should contain at least a lowercase letter')
  .matches(/(?=.*\d)/, 'Password should contain at least a digit')
  .matches(
    /(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/,
    'Password should contain at least a special char, like: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  );
