import axios, { AxiosInstance } from 'axios';

import { store } from 'store/store';
import { Account, Booked, Transaction, Asset } from 'types/bankAccount';
import { AlertVariants, Bank, User } from 'types/types';
import { getQueryStr } from 'utils/helpers/query';
import { base64 } from 'utils/helpers/text';
import AuthApi from './auth';

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
    this.apiInstance.interceptors.request.use(
      req => {
       req.headers.authorization = `Bearer ${AuthApi.getInstance().getAccessToken()}`;
        return req
      }
    )
   this.apiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalReq = error.config;
        if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
          originalReq._retry = true;
          await AuthApi.getInstance().refreshToken();
        }
        originalReq.headers['authorization'] = `Bearer ${AuthApi.getInstance().getAccessToken()}`;
        return axios(originalReq)
      }
    );
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
        .post('/auth/refreshToken', this.getHeaders())
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

  /* Transaction */

  /* Endpoints */
  /* Login */
  /* Assets */

  public async getMyAssets(): Promise<Asset[] | []> {
    try {
      const res = await this.apiInstance.get('/asset/').then((res) => res);
      if (res.status === 200) {
        store.dispatch({ type: 'SET_ASSETS', payload: res.data });
        return res.data;}
    } catch (error: any) {
      console.log('error:', error);
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
      const res = await this.apiInstance.get(`/transaction/groupedbycategory?${query}`, {
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
      const res = await this.apiInstance.get(`/transaction/groupedbydate/${state.timeMenu.selected}?${query}`, {
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
      const res = await this.apiInstance.get(`/transaction/incexp?${query}`, {
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
      const res = await this.apiInstance.get('/account/').then((res) => res);
      if (res.status === 200) {
        store.dispatch({ type: 'SET_ACCOUNTS', payload: res.data });
        return res.data;
      }
    } catch (error: any) {
      console.log('error:', error);
      return [];
    }
    return [];
  }

  // get accounts
  public async getAccounts(aspsp_id: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .post('/bank/requisitions/accounts', { aspsp_id: aspsp_id }, { headers: this.getHeaders() })
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
  // get balances
  public async getBalances(): Promise<boolean> {
    try {
      const res = await this.apiInstance.get('/bank/balances', { headers: this.getHeaders() }).then((res) => res.data);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response.status === 401 || error.response.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getBalances();
        } else {
          this.reset();
        }
      } else if (error.response.status === 429) {
        store.dispatch({
          type: 'TOGGLE_WEALTH_ALERT',
          payload: {
            variant: AlertVariants.warning,
            text: `You need to wait ${error.response.data.leftUntilNextRefresh} hours before the next refresh.`,
            show: true,
            type: 'TOGGLE_WEALTH_ALERT',
          },
        });
      } else if (error.response.status === 404) {
        store.dispatch({
          type: 'TOGGLE_WEALTH_ALERT',
          payload: {
            variant: AlertVariants.warning,
            text: `You may want to add an account.`,
            show: true,
            type: 'TOGGLE_WEALTH_ALERT',
          },
        });
      }
      return false;
    }
  }

  // get Transactions
  public async getTransactions(): Promise<boolean> {
    try {
      const res = await this.apiInstance.get('/bank/transactions', { headers: this.getHeaders() }).then((res) => res.data);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error.response.status === 401 || error.response.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getTransactions();
        } else {
          this.reset();
        }
      } else if (error.response.status === 429) {
        store.dispatch({
          type: 'TOGGLE_OVERVIEW_ALERT',
          payload: {
            variant: AlertVariants.warning,
            text: `You need to wait ${error.response.data.leftUntilNextRefresh} hours before the next refresh.`,
            show: true,
            type: 'TOGGLE_OVERVIEW_ALERT',
          },
        });
      } else if (error.response.status === 404) {
        store.dispatch({
          type: 'TOGGLE_OVERVIEW_ALERT',
          payload: {
            variant: AlertVariants.warning,
            text: `You may want to add an account.`,
            show: true,
            type: 'TOGGLE_OVERVIEW_ALERT',
          },
        });
      }
      return false;
    }
  }
}
