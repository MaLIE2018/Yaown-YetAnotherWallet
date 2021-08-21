import axios, { AxiosInstance } from "axios";
import { storePersist } from "../store/store";

export class Api {
  private static singleton: Api;
  private readonly apiInstance: AxiosInstance;
  private storePersist: any;

  private constructor() {
    this.apiInstance = axios.create({
      baseURL: process.env.REACT_APP_BE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 20000,
      withCredentials: true,
    });
    this.storePersist = storePersist();
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

  private getAccessToken(): string {
    const state = this.storePersist.store.getState();
    if (state.settings.accessToken !== "") {
      return state.settings.accessToken;
    }
    return "";
  }

  public isLoggedIn(): boolean {
    return this.getAccessToken() !== "";
  }
}
