import moment from 'moment';
import { IToken, ITokenStore } from './types';

const TOKEN_KEY = "@TOKEN_KEY";

export class TokenStore implements ITokenStore {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public save = (param: IToken): IToken => {
    param.deprecationTime = moment().add({ seconds: param.expires_in }).toString();
    window.localStorage.setItem(`${TOKEN_KEY}\\${this._name}`, JSON.stringify(param));
    return param;
  };

  public get = (): IToken => {
    const data: any = window.localStorage.getItem(`${TOKEN_KEY}\\${this._name}`);
    return JSON.parse(data!) as IToken;
  };

  public delete = () => {
    window.localStorage.removeItem(`${TOKEN_KEY}\\${this._name}`);
  };
}
