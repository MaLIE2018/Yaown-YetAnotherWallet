import axios, { AxiosInstance } from "axios";
import { store } from "store/store";
import { Transaction } from "types/types";

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
  private async setRefreshToken(accessToken: string) {
    store.dispatch({ type: "SET_REFRESH_TOKEN", payload: accessToken });
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
      const res = await this.apiInstance.post("/token").then((res) => res);
      if (res.status === 200) {
        await this.setAccessToken(res.data.accessToken);
        await this.setRefreshToken(res.data.refreshToken);
      }
    } catch (error) {
      await this.reset();
    }
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
}
