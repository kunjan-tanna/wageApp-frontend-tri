import * as yup from 'yup';

export default yup
  .string()
  .required()
  .label('Repeat Password')
  .min(8, 'Password is too short - should be 8 chars minimum')
  .matches(/(?=.*[A-Z])/, 'Password should contain at least an uppercase letter')
  .matches(/(?=.*\d)/, 'Password should contain at least a digit')
  .matches(
    /(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/,
    'Password should contain at least a special char, like: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  )
  .oneOf([yup.ref('password'), null], 'Password and repeat password must match.');
