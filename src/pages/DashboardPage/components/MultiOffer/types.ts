export interface IParserOptions {
  delimiter?: string;
  newline?: string;
  quoteChar?: string;
  escapeChar?: string;
  header?: boolean;
  transformHeader?: boolean;
  dynamicTyping?: boolean;
  preview?: number;
  encoding?: string;
  worker?: boolean;
  comments?: boolean;
  step?: void;
  complete?: void;
  error?: void;
  download?: boolean;
  downloadRequestHeaders?: object;
  skipEmptyLines?: boolean;
  chunk?: void;
  fastMode?: boolean;
  beforeFirstChunk?: void;
  withCredentials?: boolean;
  transform?: void;
  delimitersToGuess?: [];
}
