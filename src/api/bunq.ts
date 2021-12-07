import axios, { AxiosInstance } from 'axios';
import AuthApi from './auth';
import { Bank } from 'types/types';

class BunqApi {
  private static instance: BunqApi;
  private readonly apiInstance: AxiosInstance;

  private constructor() {
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
  }

public static getInstance(): BunqApi {
    if (!BunqApi.instance) {
      BunqApi.instance = new BunqApi();
    }

    return BunqApi.instance;
  }

  public async getAuth(): Promise<boolean> {
    try {
      const res = await this.apiInstance.get('/bank/auth/bunq').then((res) => res);
      if (res.status === 200) {
        return (window.location.href = res.data.initiate);
      } else {
        return false;
      }
    } catch (error: any) {
      console.log(error)
      return false;
    }
  }

  //get token
  public async getToken(code: string, state: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .post('/bank/auth/bunq/code', { code: code, state: state })
        .then((res) => res);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.log(error)
      return false;
    }
  }

 

}

export default BunqApi;