import { IParserOptions } from './types';

export const csvParserOptions: IParserOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  delimiter: ','
};
