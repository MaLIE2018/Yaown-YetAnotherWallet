import axios, { AxiosInstance } from "axios";

import { store } from "store/store";
import { Account, Booked, Transaction } from "types/bankAccount";
import { AlertVariants, Bank, User } from "types/types";
import { base64 } from "utils/helpers/text";

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
    // this.apiInstance.interceptors.response.use(
    //   function (response) {
    //     return response;
    //   },
    //   async (error) => {
    //     if (error.response?.status === 401 || error.response?.status === 403) {
    //       if (await this.refreshAccessToken()) {
    //         return true;
    //       }
    //     }
    //     return Promise.reject(error);
    //   }
    // );
    // this.apiInstance.interceptors.request.use(
    //   function (request) {
    //     return request;
    //   },
    //   null,
    //   { synchronous: true }
    // );
    this.transactions = [];
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      "Content-Type": "application/json",
    };
  }

  public static getSingleton(): Api {
    if (!Api.singleton) {
      Api.singleton = new Api();
    }
    return Api.singleton;
  }

  public isLoggedIn(): boolean {
    return this.getAccessToken() !== "";
  }

  public async reset() {
    await this.setAccessToken("");
    await this.setRefreshToken("");
    await this.setUser({});
  }

  /* Token */

  private getAccessToken(): string {
    const state = store.getState();
    if (state.settings.accessToken !== "") {
      return state.settings.accessToken;
    }
    return "";
  }
  private async setAccessToken(accessToken: string) {
    store.dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
  }

  private async setUser(user: User | {}) {
    store.dispatch({ type: "SET_USER", payload: user });
  }

  private async setRefreshToken(refreshToken: string) {
    store.dispatch({ type: "SET_REFRESH_TOKEN", payload: refreshToken });
  }

  private async getRefreshToken(): Promise<string> {
    const state = store.getState();
    if (state.settings.refreshToken !== "") {
      return state.settings.refreshToken;
    }
    return "";
  }

  private async refreshAccessToken(): Promise<any> {
    const refreshToken = await this.getRefreshToken();

    if (refreshToken === "") return await this.reset();

    try {
      const res = await this.apiInstance
        .post("auth/refreshToken", {
          headers: {
            Authorization: "Bearer " + refreshToken,
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
        "verify-email/" + token,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
      }
    } catch (error) {
      if (error.response.status === 404) {
        return false;
      }
    }
  }

  public async login(email: string, password: string) {
    const headers = {
      Authorization: `Basic ${base64([email, password].join(":"))}`,
    };
    try {
      const res = await this.authInstance.post(
        "auth/login",
        {},
        { headers: headers }
      );
      if (res.status === 200) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
        await this.setUser(res.data.user);
        return true;
      }
    } catch (e) {
      if (e.response.status === 401) {
        store.dispatch({
          type: "TOGGLE_LOGIN_ALERT",
          payload: {
            variant: AlertVariants.error,
            text: "Username/password combination is invalid.",
            show: true,
            type: "TOGGLE_LOGIN_ALERT",
          },
        });

        return false;
      }
    }
  }

  public async logout(): Promise<boolean> {
    try {
      const res = await this.authInstance.post(
        "auth/logout",
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
      Authorization: `Basic ${base64([email, password].join(":"))}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await this.authInstance.post(
        "auth/register",
        {},
        {
          headers: headers,
        }
      );
      if (res.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        store.dispatch({
          type: "TOGGLE_LOGIN_ALERT",
          payload: {
            variant: AlertVariants.error,
            text: "Email address is already registered.",
            show: true,
            type: "TOGGLE_LOGIN_ALERT",
          },
        });
      }

      return false;
    }
  }

  /* Transaction */

  /* Endpoints */
  /* Login */

  /* Transactions */

  public async postTransaction(transaction: Booked): Promise<boolean> {
    try {
      const cashAccount = store
        .getState()
        .settings.user.accounts.find(
          (a: Account) => a.cashAccountType === "cash"
        );
      const res = await this.apiInstance.post(
        `transaction/${cashAccount._id}`,
        transaction,
        {
          headers: this.getHeaders(),
        }
      );
      if (res.status === 200) {
        return true;
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.postTransaction(transaction);
        }
      }
      return false;
    }
    return false;
  }

  public async getTransactions(): Promise<Transaction[]> {
    try {
      const cashAccount = store
        .getState()
        .settings.user.accounts.find(
          (a: Account) => a.cashAccountType === "cash"
        );
      const res = await this.apiInstance.get(`transaction/${cashAccount._id}`, {
        headers: this.getHeaders(),
      });
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
      return [];
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return await this.getTransactions();
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
      const res = await this.apiInstance
        .get("account/", { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log("error:", error);
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

  public async getBanks(countryCode: string): Promise<Bank[]> {
    try {
      const res = await this.apiInstance
        .get("bank/" + countryCode, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (error) {
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
        .post(
          "bank/agreements/enduser",
          { aspsp_id: aspsp_id },
          { headers: this.getHeaders() }
        )
        .then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
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
        .post(
          "bank/requisitions/",
          { aspsp_id: aspsp_id },
          { headers: this.getHeaders() }
        )
        .then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
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
        .post(
          "bank/initiationLink/",
          { aspsp_id: aspsp_id },
          { headers: this.getHeaders() }
        )
        .then((res) => res);
      if (res.status === 200) {
        return (window.location.href = res.data.initiate);
      } else {
        return false;
      }
    } catch (error) {
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
        .get("bank/checkBank/" + aspsp_id, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return false;
      } else if (res.status === 204) {
        return true;
      }
      return false;
    } catch (error) {
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
        .post(
          "bank/requisitions/accounts",
          { aspsp_id: aspsp_id },
          { headers: this.getHeaders() }
        )
        .then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
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
}
