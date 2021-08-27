import axios, { AxiosInstance } from "axios";
import { store } from "store/store";
import { AlertVariants, Bank, Transaction, User } from "types/types";
import { base64 } from "utils/helpers/text";

export class Api {
  private static singleton: Api;
  private readonly apiInstance: AxiosInstance;
  public transactions: Transaction[];

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
      if (res.status === 404) {
        return false;
      }
    } catch (error) {
      return false;
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
        return true;
      }
      if (res.status === 401) {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
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

  public async register(
    email: string,
    password: string
  ): Promise<User | false> {
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
        return res.data;
      }
      if (res.status === 202) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_token);
      }
      if (res.status === 400) {
        store.dispatch({
          type: "TOGGLE_LOGIN_ALERT",
          payload: {
            variant: AlertVariants.error,
            text: "User not found!",
            show: true,
          },
        });
      }
      if (res.status === 401) {
        store.dispatch({
          type: "TOGGLE_LOGIN_ALERT",
          payload: {
            variant: AlertVariants.error,
            text: "Credentials wrong!",
            show: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  }

  /* Endpoints */
  /* Login */

  /* Transactions */

  // public async postTransaction(transaction: Transaction): Promise<boolean> {
  //   const headers = new Headers({
  //     Authorization: `Bearer ` + this.getAccessToken(),
  //     "Content-Type": "application/json",
  //   });
  //   try {
  //     const res = await this.apiInstance
  //       .post("/transactions", transaction, {
  //         headers: headers,
  //       })
  //       .then((res) => res);
  //     if (res.status === 401 || res.status === 403) {
  //       if (await this.refreshAccessToken()) {
  //         return true;
  //       }
  //     }
  //   } catch (error) {
  //     return false;
  //   }
  //   return true;
  // }
  public postTransaction(transaction: Transaction): Boolean {
    this.transactions.push(transaction);
    return true;
  }
  public getTransaction(): Transaction[] {
    return this.transactions;
  }

  public async updateTransaction(): Promise<boolean> {
    return true;
  }
  public async deleteTransaction(): Promise<boolean> {
    return true;
  }

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
