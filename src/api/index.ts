import axios, { AxiosInstance } from "axios";
import { store } from "store/store";
import { Bank, Transaction, User } from "types/types";
import { base64 } from "utils/helpers/text";

export class Api {
  private static singleton: Api;
  private readonly apiInstance: AxiosInstance;
  public transactions: Transaction[];

  private constructor() {
    this.apiInstance = axios.create({
      baseURL: process.env.REACT_APP_BE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 20000,
    });
    this.transactions = [];
  }

  public static getSingleton(): Api {
    if (!Api.singleton) {
      Api.singleton = new Api();
    }
    return Api.singleton;
  }

  public isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    return !!accessToken;
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

    if (refreshToken === "") return false;

    try {
      const res = await this.apiInstance
        .post("auth/refreshToken")
        .then((res) => res);
      if (res.status === 200) {
        await this.setAccessToken(res.data.access_token);
        await this.setRefreshToken(res.data.refresh_Token);
      }
    } catch (error) {
      await this.reset();
    }
  }

  public async login(email: string, password: string): Promise<boolean> {
    const headers = new Headers({
      Authorization: `Basic ${base64([email, password].join(":"))}`,
      "Content-Type": "application/json",
    });
    try {
      const res = await this.apiInstance.post("auth/login", {
        headers: headers,
      });
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

  public async register(
    email: string,
    password: string
  ): Promise<User | false> {
    const headers = new Headers({
      Authorization: `Basic ${base64([email, password].join(":"))}`,
      "Content-Type": "application/json",
    });
    try {
      const res = await this.apiInstance.post("auth/login", {
        headers: headers,
      });
      if (res.status === 200) {
        return res.data;
      }
      if (res.status === 400) {
        return false;
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
    const headers = new Headers({
      Authorization: `Bearer ` + this.getAccessToken(),
      "Content-Type": "application/json",
    });
    try {
      const res = await this.apiInstance
        .get("/bank/" + countryCode, { headers: headers })
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
      return [];
    }
  }
}
