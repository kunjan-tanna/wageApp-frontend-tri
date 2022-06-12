export interface IToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  deprecationTime: string;
}

export interface ITokenStore {
  save: (param: IToken) => IToken;
  get: () => IToken;
  delete: () => void;
}

export interface IAuthenticator {
  authenticate: <T>() => Promise<T>;
}
