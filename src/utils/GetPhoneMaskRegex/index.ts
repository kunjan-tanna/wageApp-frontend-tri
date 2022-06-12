export const GetPhoneMaskRegex = (value: string, length: number = 7) => {
  const digit = /\d/;
  // const regex = [digit, digit, digit, '-', digit, digit, digit, digit];
  const regex = [
    '(',
    /[1-9]/,
    digit,
    digit,
    ')',
    ' ',
    digit,
    digit,
    digit,
    '-',
    digit,
    digit,
    digit,
    digit
  ];

  // if (length >= 8) {
  //   regex.unshift(digit, digit, digit, '-');
  // }

  // if (length > 10) {
  //   regex.unshift(...Array(length - 10).fill(digit), '-');
  //   regex.unshift('+');
  // }

  return regex;
};

export default GetPhoneMaskRegex;
