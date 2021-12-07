import { Api } from 'api';
import axios, { AxiosInstance } from 'axios';
import { store } from 'store/store';
import { AlertVariants, User } from 'types/types';
import { base64 } from 'utils/helpers/text';

class AuthApi {
  private readonly authApi: AxiosInstance;
  private static instance: AuthApi;
  private constructor() {
    this.authApi = axios.create({
      baseURL: process.env.REACT_APP_BE_URL,
      timeout: 20000,
      withCredentials: true,
    });
  }

  public static getInstance(): AuthApi {
    if (!AuthApi.instance) return new AuthApi();
    return AuthApi.instance;
  }
  public async reset() {
    store.dispatch({ type: 'RESET_SETTINGS' });
  }

  public getHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json',
    };
  }
  /* Token */


  getAccessToken(): string {
    const state = store.getState();
    if (state.settings.accessToken !== '') {
      return state.settings.accessToken;
    }
    return '';
  }
  private async setAccessToken(accessToken: string) {
    store.dispatch({ type: 'SET_ACCESS_TOKEN', payload: accessToken });
  }

  private async setUser(user: User | {}) {
    store.dispatch({ type: 'SET_USER', payload: user });
    store.dispatch({ type: 'SET_PAGE', payload: 'cash' });
  }

  private async setRefreshToken(refreshToken: string) {
    store.dispatch({ type: 'SET_REFRESH_TOKEN', payload: refreshToken });
  }

  private async getRefreshToken(): Promise<string> {
    const state = store.getState();
    if (state.settings.refreshToken !== '') {
      return state.settings.refreshToken;
    }
    return '';
  }

  public async refreshToken(): Promise<any> {
    const refreshToken = await this.getRefreshToken();

    if (refreshToken === '') return await this.reset();

    try {
      const res = await this.authApi
        .post('/auth/refreshToken', {
          headers: {
            Authorization: 'Bearer ' + refreshToken,
          },
        })
        .then((res) => res);
      if (res.status === 200) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
        return true;
      }
    } catch (error) {
      await this.reset();
    }
  }

  /* Authentication */

  public async verifyEmail(token: string) {
    try {
      const res = await this.authApi.post(
        '/verify-email/' + token,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        localStorage.removeItem('csrfltoken');
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
        await this.setUser(res.data.user);
        await Api.getSingleton().getMyAccounts();
      }
    } catch (error: any) {
      if (error?.response.status === 404) {
        return false;
      }
    }
  }
public isLoggedIn(): boolean {
    return this.getAccessToken() !== '';
  }
  
  public async login(email: string, password: string) {
    const headers = {
      Authorization: `Basic ${base64([email, password].join(':'))}`,
    };
    try {
      const res = await this.authApi.post('/auth/login', {}, { headers: headers });
      if (res.status === 200) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
        await this.setUser(res.data.user);
        await Api.getSingleton().getMyAccounts();
        await Api.getSingleton().getMyAssets();
        return true;
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        store.dispatch({
          type: 'TOGGLE_LOGIN_ALERT',
          payload: {
            variant: AlertVariants.error,
            text: 'Username/password combination is invalid.',
            show: true,
            type: 'TOGGLE_LOGIN_ALERT',
          },
        });

        return false;
      }
    }
  }

  public async logout(): Promise<boolean> {
    try {
      const res = await this.authApi.post(
        '/auth/logout',
        {},
        {
          headers: this.getHeaders(),
        }
      );
      if (res.status === 200) {
        await this.reset();
      }
      if (res.status === 401) {
        await this.reset();
        return false;
      }
    } catch (error) {
      console.log(error);
      await this.reset();
      return false;
    }
    return true;
  }

  public async register(email: string, password: string) {
    const headers = {
      Authorization: `Basic ${base64([email, password].join(':'))}`,
      'Content-Type': 'application/json',
    };
    try {
      const res = await this.authApi
        .post(
          '/auth/register',
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res);
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem('csrfltoken', res.data.csrfltoken);
        return true;
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        store.dispatch({
          type: 'TOGGLE_LOGIN_ALERT',
          payload: {
            variant: AlertVariants.error,
            text: 'Email address is already registered.',
            show: true,
            type: 'TOGGLE_LOGIN_ALERT',
          },
        });
      }

      return false;
    }
  }
}

export default AuthApi;
