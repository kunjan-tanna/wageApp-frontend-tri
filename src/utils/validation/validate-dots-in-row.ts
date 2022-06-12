export default (message: string): [string, string, (value: string) => boolean] => [
  'validate-dots-in-row',
  message,
  (value: string) => !/[.]{2,}/.test(value)
];
