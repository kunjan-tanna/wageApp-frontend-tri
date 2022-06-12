import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ActionTypes as actions } from '../../modules/Login/actions';
import configuredStore from '../../store';
import Authenticator from './authenticator';
import AuthManager from './authManager';
import { TokenStore } from './tokenStore';
import { IToken, ITokenStore } from './types';

class ApiClient {
  private MAX_RETRIES = 2;

  private _axiosClient: AxiosInstance;
  private _authenticator: any;
  private _tokenStore: ITokenStore;

  constructor(client: AxiosInstance, authenticator: any, tokenStore: ITokenStore) {
    this._axiosClient = client;
    this._authenticator = authenticator;
    this._tokenStore = tokenStore;

    this._addTokenInterceptor();
    this._addAuthenticationValidator();
  }

  public get<T = any>(path: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axiosClient.get<T>(path, config);
  }

  public post<T = any>(path: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axiosClient.post<T>(path, data, config);
  }

  public put<T = any>(path: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axiosClient.put<T>(path, data, config);
  }

  public patch<T = any>(path: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axiosClient.patch<T>(path, data, config);
  }

  public delete<T = any>(path: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axiosClient.delete(path, config);
  }

  private _addTokenInterceptor() {
    const authenticatedUserInterceptor = async (
      request: AxiosRequestConfig
    ): Promise<AxiosRequestConfig> => {
      const token: IToken = await this._tokenStore.get();

      if (token) {
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${token.access_token}`
        };
      }

      return Promise.resolve(request);
    };

    this._axiosClient.interceptors.request.use(authenticatedUserInterceptor);
  }

  private _addAuthenticationValidator() {
    const validator = (response: AxiosResponse): boolean => {
      return response.status === 401 || response.status === 407;
    };

    this._axiosClient.interceptors.response.use(
      response => response,
      async error => {
        if (validator(error?.response)) {
          await this._tokenStore.delete();

          if (error.config.__retryCount && error.config.__retryCount > this.MAX_RETRIES) {
            return Promise.reject(error);
          }

          try {
            await this._authenticator.authenticate();
          } catch (authError) {
            const { store } = configuredStore;
            await store.dispatch({ type: actions.LOGOUT_REQUEST });

            return Promise.reject(new Error(`Cannot fetch access_token`));
          }
        } else {
          return Promise.reject(error);
        }

        error.config.__retryCount = (error.config.__retryCount || 0) + 1;
        return this._axiosClient.request(error.config);
      }
    );
  }
}

export const tokenStore = new TokenStore(`USER_SESSION_TOKEN_STORE`);

export const authManager = new AuthManager(axios.create(), tokenStore);
export const apiClient = new ApiClient(axios.create(), new Authenticator(authManager), tokenStore);
