import { AxiosInstance, AxiosResponse } from 'axios';
import moment from 'moment';
import querystring from 'querystring';

import { ApiConfig } from '../../config';

import { IToken, ITokenStore } from './types';
import Axios from 'axios';

export default class AuthManager {
  private _axiosInstance: AxiosInstance;
  private _tokenStore: ITokenStore;

  constructor(client: AxiosInstance, tokenStore: ITokenStore) {
    this._axiosInstance = client;
    this._tokenStore = tokenStore;
  }

  public login(username: string, password: string): Promise<IToken> {
    return this._fetchToken({
      username,
      password,
      grant_type: 'password'
    });
  }

  public loginExternal(
    accessToken: string,
    provider: string,
    Latitude: String,
    Longitude: String,
    loginDeviceType: string,
    zipCode: String
  ): any {
    return this._fetchTokenExternal(
      accessToken,
      provider,
      Latitude,
      Longitude,
      zipCode,
      loginDeviceType
    );
  }

  public async logout(): Promise<any> {
    const token = this._tokenStore.get();
    if (!token || this._isTokenDeprecated(token.deprecationTime)) {
      return;
    }

    return this._axiosInstance
      .post(ApiConfig.endpoints.account.logout, null, {
        baseURL: ApiConfig.URL,
        headers: {
          Authorization: `Bearer ${token.access_token}`
        },
        withCredentials: true
      })
      .then(async () => {
        return await this._tokenStore.delete();
      });
  }

  public deleteToken(): void {
    this._tokenStore.delete();
  }

  public reloadToken(): Promise<IToken> {
    return this._fetchToken({
      grant_type: 'refresh_token'
    });
  }

  private _fetchToken(params: any): Promise<IToken> {
    return Axios.get('https://api.wageapp.io/api/account/request-token-v2', {
      withCredentials: true
    }).then(res => {
      params['token'] = res.data.token;
      return this._axiosInstance
        .post(ApiConfig.endpoints.getToken, querystring.stringify(params), {
          baseURL: ApiConfig.URL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        })
        .then(async response => {
          return await this._saveToken(response);
        });
    });

    // return this._axiosInstance
    //   .post(ApiConfig.endpoints.getToken, querystring.stringify(params), {
    //     baseURL: ApiConfig.URL,
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     withCredentials: true
    //   })
    //   .then(async response => {
    //     flag = true;
    //     console.log('IN SUCC ressss--2222->', response);
    //     return await this._saveToken(response);
    //   })
  }

  private _fetchTokenExternal(
    accessToken: string,
    provider: string,
    Latitude: any,
    Longitude: any,
    zipcode: any,
    loginDeviceType: any
  ): any {
    return this._axiosInstance
      .post(
        ApiConfig.endpoints.externalLogin,
        {
          externalAccessToken: accessToken,
          provider,
          Latitude: Latitude,
          Longitude: Longitude,
          zipcode: zipcode,
          loginDeviceType: loginDeviceType
        },
        {
          baseURL: ApiConfig.URL,
          withCredentials: true
        }
      )
      .then(async response => {
        await this._saveToken(response);
      });
  }

  // private _saveToken(response: AxiosResponse<any>): IToken {
  //   const result: IToken = { ...response.data };
  //   return this._tokenStore.save(result);
  // }

  private _saveToken(response: AxiosResponse<any>): IToken {
    const result: IToken = { ...response.data };
    if (response.status === 401 || result === undefined) {
      const result: IToken = { ...response.data };
      result.refresh_token = '';
      result.access_token = '';
      console.log('jjjj', result);
      return this._tokenStore.save(result);
    } else {
      return this._tokenStore.save(result);
    }
  }

  private _isTokenDeprecated(date: string): boolean {
    const tokenDate = moment(new Date(date)).add({ seconds: -5 });

    return moment().isAfter(tokenDate);
  }
}
