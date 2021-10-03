import axios, { AxiosInstance } from 'axios';

import { store } from 'store/store';
import { Account, Booked, Transaction, Asset } from 'types/bankAccount';
import { AlertVariants, Bank, User } from 'types/types';
import { getQueryStr } from 'utils/helpers/query';
import { base64 } from 'utils/helpers/text';

export class Api {
  private static singleton: Api;
  private readonly apiInstance: AxiosInstance;
  private readonly authInstance: AxiosInstance;
  public transactions: Booked[];

  private constructor() {
    this.authInstance = axios.create({
      baseURL: process.env.REACT_APP_BE_URL,
      timeout: 20000,
      withCredentials: true,
    });
    this.apiInstance = axios.create({
      baseURL: process.env.REACT_APP_BE_URL,
      timeout: 20000,
      withCredentials: true,
    });

    this.transactions = [];
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json',
    };
  }

  public static getSingleton(): Api {
    if (!Api.singleton) {
      Api.singleton = new Api();
    }
    return Api.singleton;
  }

  public isLoggedIn(): boolean {
    return this.getAccessToken() !== '';
  }

  public async reset() {
    store.dispatch({ type: 'RESET_SETTINGS' });
  }

  /* Token */

  private getAccessToken(): string {
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

  private async refreshAccessToken(): Promise<any> {
    const refreshToken = await this.getRefreshToken();

    if (refreshToken === '') return await this.reset();

    try {
      const res = await this.apiInstance
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
      const res = await this.authInstance.post(
        'verify-email/' + token,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
        await this.setUser(res.data.user);
        await this.getMyAccounts();
      }
    } catch (error: any) {
      if (error?.response.status === 404) {
        return false;
      }
    }
  }

  public async login(email: string, password: string) {
    const headers = {
      Authorization: `Basic ${base64([email, password].join(':'))}`,
    };
    try {
      const res = await this.authInstance.post('auth/login', {}, { headers: headers });
      if (res.status === 200) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
        await this.setUser(res.data.user);
        await this.getMyAccounts();
        await this.getMyAssets();
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
      const res = await this.authInstance.post(
        'auth/logout',
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
      const res = await this.authInstance.post(
        'auth/register',
        {},
        {
          headers: headers,
        }
      );
      if (res.status === 200) {
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

  /* Transaction */

  /* Endpoints */
  /* Login */

  /* Assets */

  public async getMyAssets(): Promise<Asset[] | []> {
    try {
      const res = await this.apiInstance.get('/asset/', { headers: this.getHeaders() }).then((res) => res);
      if (res.status === 200) {
        store.dispatch({ type: 'SET_ASSETS', payload: res.data });
        return res.data;
      }
    } catch (error: any) {
      console.log('error:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getMyAssets();
        } else {
          this.reset();
        }
      }
      return [];
    }
    return [];
  }

  /* Transactions */

  public async postTransaction(transaction: Booked): Promise<boolean> {
    try {
      const cashAccount = store.getState().settings.accounts.find((account: Account) => account.bankName === 'Cash');
      const res = await this.apiInstance.post(`/transaction/${cashAccount._id}`, transaction, {
        headers: this.getHeaders(),
      });
      if (res.status === 200) {
        return true;
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.postTransaction(transaction);
        }
      }
      return false;
    }
    return false;
  }

  public async getTransactionsByCategory(): Promise<Transaction[]> {
    try {
      const state = store.getState();
      let id = state.settings.accounts.find((a: Account) => a.name === state.accountMenu.selected)?._id;
      if (!id) id = 'All';
      const query = getQueryStr(state.timeMenu.range, id);
      const res = await this.apiInstance.get(`transaction/groupedbycategory?${query}`, {
        headers: this.getHeaders(),
      });
      if (res.status === 200) {
        store.dispatch({ type: 'SET_TXN_BY_CAT', payload: res.data });
        return res.data;
      }
      return [];
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getTransactionsByCategory();
        }
      }
      return [];
    }
  }
  public async getTransactionsByDate(): Promise<Transaction[]> {
    try {
      const state = store.getState();
      let id = state.settings.accounts.find((a: Account) => a.name === state.accountMenu.selected)?._id;
      if (!id) id = 'All';
      const query = getQueryStr(state.timeMenu.range, id);
      const res = await this.apiInstance.get(`transaction/groupedbydate/${state.timeMenu.selected}?${query}`, {
        headers: this.getHeaders(),
      });
      if (res.status === 200) {
        store.dispatch({ type: 'SET_TXN_BY_DATE', payload: res.data });
        return res.data;
      }
      return [];
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getTransactionsByDate();
        }
      }
      return [];
    }
  }
  //get income expenses
  public async getExpensesIncomes(): Promise<Transaction[]> {
    try {
      const state = store.getState();
      let id = state.settings.accounts.find((a: Account) => a.name === state.accountMenu.selected)?._id;
      if (!id) id = 'All';
      const query = getQueryStr(state.timeMenu.range, id);
      const res = await this.apiInstance.get(`transaction/incexp?${query}`, {
        headers: this.getHeaders(),
      });
      if (res.status === 200) {
        store.dispatch({ type: 'SET_STATEMENT', payload: res.data });
        return res.data;
      }
      return [];
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getExpensesIncomes();
        }
      }
      return [];
    }
  }

  public async updateTransaction(): Promise<boolean> {
    return true;
  }
  public async deleteTransaction(): Promise<boolean> {
    return true;
  }

  /* Account creation */

  /* get Account */

  public async getMyAccounts(): Promise<Account[] | []> {
    try {
      const res = await this.apiInstance.get('account/', { headers: this.getHeaders() }).then((res) => res);
      if (res.status === 200) {
        store.dispatch({ type: 'SET_ACCOUNTS', payload: res.data });
        return res.data;
      }
    } catch (error: any) {
      console.log('error:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getMyAccounts();
        } else {
          this.reset();
        }
      }
      return [];
    }
    return [];
  }

  /* Bank integration */

  //bunq App
  public async getAuth(): Promise<boolean> {
    try {
      const res = await this.apiInstance.get('bank/auth/bunq', { headers: this.getHeaders() }).then((res) => res);
      if (res.status === 200) {
        return (window.location.href = res.data.initiate);
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getAuth();
        } else {
          this.reset();
        }
      }
      return false;
    }
  }

  //get token
  public async getToken(code: string, state: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .post('bank/auth/bunq/code', { code: code, state: state }, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getToken(code, state);
        } else {
          this.reset();
        }
      }
      return false;
    }
  }

  //get available banks
  public async getBanks(countryCode: string): Promise<Bank[]> {
    try {
      const res = await this.apiInstance.get('/bank/' + countryCode, { headers: this.getHeaders() }).then((res) => res);
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getBanks(countryCode);
        } else {
          this.reset();
        }
      }
      return [];
    }
  }
  //create enduser agreement
  public async createEnduserAgreement(aspsp_id: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .post('bank/agreements/enduser', { aspsp_id: aspsp_id }, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.createEnduserAgreement(aspsp_id);
        } else {
          this.reset();
        }
      }
      return false;
    }
  }

  //create requisition
  public async createRequisition(aspsp_id: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .post('bank/requisitions/', { aspsp_id: aspsp_id }, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.createRequisition(aspsp_id);
        } else {
          this.reset();
        }
      }
      return false;
    }
  }
  //get link initiation
  public async getLink(aspsp_id: string): Promise<string | boolean> {
    try {
      const res = await this.apiInstance
        .post('bank/initiationLink/', { aspsp_id: aspsp_id }, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return (window.location.href = res.data.initiate);
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getLink(aspsp_id);
        } else {
          this.reset();
        }
      }
      return false;
    }
  }
  //check account status
  public async accountExist(aspsp_id: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .get('bank/checkBank/' + aspsp_id, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return false;
      } else if (res.status === 204) {
        return true;
      }
      return false;
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.accountExist(aspsp_id);
        } else {
          this.reset();
        }
      }
      return true;
    }
  }

  // get accounts
  public async getAccounts(aspsp_id: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .post('bank/requisitions/accounts', { aspsp_id: aspsp_id }, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getAccounts(aspsp_id);
        } else {
          this.reset();
        }
      }
      return false;
    }
  }
  // get accounts
  public async getBalances(): Promise<boolean> {
    try {
      const res = await this.apiInstance.get('/bank/balances/', { headers: this.getHeaders() }).then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getBalances();
        } else if (error.response?.status === 429) {
          store.dispatch({
            type: 'TOGGLE_BANK_ALERT',
            payload: {
              variant: AlertVariants.error,
              text: `You need to wait ${error.response.message} hours before the next refresh`,
              show: true,
              type: 'TOGGLE_BANK_ALERT',
            },
          });
        } else if (error.response?.status === 404)  {
          store.dispatch({
            type: 'TOGGLE_BANK_ALERT',
            payload: {
              variant: AlertVariants.warning,
              text: `You may want to add an account.`,
              show: true,
              type: 'TOGGLE_BANK_ALERT',
            },
          });
        }else{
          this.reset();
        }
      }
      return false;
    }
  }
}
