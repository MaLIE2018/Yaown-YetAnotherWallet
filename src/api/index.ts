import axios, { AxiosInstance } from "axios";

import { store } from "store/store";
import { Account, Booked } from "types/bankAccount";
import { AlertVariants, Bank, User } from "types/types";
import { base64 } from "utils/helpers/text";

export class Api {
  private static singleton: Api;
  private readonly apiInstance: AxiosInstance;
  public transactions: Booked[];

  private constructor() {
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
      const res = await this.apiInstance.post(
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
      const res = await this.apiInstance.post(
        "auth/login",
        {},
        { headers: headers }
      );
      if (res.status === 200) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
        console.log("res.data.user:", res.data.user);
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
      const res = await this.apiInstance.post(
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
      const res = await this.apiInstance.post(
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

  public async postTransaction(transaction: Booked) {
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
          return true;
        }
      }
      return false;
    }
  }

  public async getTransactions() {
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
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (await this.refreshAccessToken()) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  public async updateTransaction(): Promise<boolean> {
    return true;
  }
  public async deleteTransaction(): Promise<boolean> {
    return true;
  }

  /* Account creation */

  /* Bank integration */

  public async getBanks(countryCode: string): Promise<Bank[]> {
    try {
      const res = await this.apiInstance
        .get("/bank/" + countryCode, { headers: this.getHeaders() })
        .then((res) => res);
      if (res.status === 200) {
        return res.data;
      }
      if (res.status === 401 || res.status === 403) {
        if (await this.refreshAccessToken()) {
          return [];
        }
      }
      return [];
    } catch (error) {
      this.reset();
      return [];
    }
  }
}
