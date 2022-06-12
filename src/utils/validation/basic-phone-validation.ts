export const PHONE_MAX_CHAR = 9;

export default (message: string): [string, string, (value: string) => boolean] => [
  'basic-phone-validation',
  'Phone number need be exactly 10 digits',
  (value: string) => {
    if (!value) {
      return false;
    }
    const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    let a = regex.test(value);
    console.log('\n a->', a);
    return a;
    // if (!value) {
    //   return false;
    // }

    // return value.length === 7 || (value.length > 9 && value.length <= PHONE_MAX_CHAR);
  }
];
