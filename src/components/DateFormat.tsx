import React from 'react';
import TimeAgo from 'react-timeago';

// import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago';

function defaultFormatter(value: any, unit: any, suffix: any) {
  console.log('unit', unit);
  // if (unit === 'second') {
  //   return 'Less than a minute ago'
  // } else {
  if (value % 10 !== 1 || value % 100 === 11) {
    unit += 's';
  }
  return value + ' ' + unit + ' ' + suffix;
  // }
}
// const formatter = new buildFormatter(defaultFormtter)
interface IProps {
  value: Date | number | string;
}

export default (props: IProps) => {
  const { value } = props;

  if (value) {
    return <TimeAgo date={value} live={true} formatter={defaultFormatter} />;
  }

  return null;
};
