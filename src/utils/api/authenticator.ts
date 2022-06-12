import AuthManager from './authManager';
import { IAuthenticator } from './types';

export default class Authenticator implements IAuthenticator {
  constructor(private _authManager: AuthManager) {}

  public authenticate = (): Promise<any> => {
    return this._authManager.reloadToken();
  };
}
