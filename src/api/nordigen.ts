import axios, { AxiosInstance } from 'axios';
import AuthApi from './auth';
import { Bank } from 'types/types';

class NordigenApi {
  private static instance: NordigenApi;
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

  public static getInstance(): NordigenApi {
    if (!NordigenApi.instance) {
      NordigenApi.instance = new NordigenApi();
    }

    return NordigenApi.instance;
  }

  //get available banks
  public async getBanks(countryCode: string): Promise<Bank[]> {
    try {
      const res = await this.apiInstance
        .get('/bank/selection/' + countryCode)
        .then((res) => res);
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error)
      return [];
    }
  }
  //create enduser agreement
  public async createEnduserAgreement(aspsp_id: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .post('/bank/agreements/enduser', { aspsp_id: aspsp_id })
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

  //create requisition
  public async createRequisition(aspsp_id: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .post('/bank/requisitions/', { aspsp_id: aspsp_id })
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
  //get link initiation
  public async getLink(aspsp_id: string): Promise<string | boolean> {
    try {
      const res = await this.apiInstance
        .post('/bank/initiationLink/', { aspsp_id: aspsp_id })
        .then((res) => res);
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
  //check account status
  public async accountExist(aspsp_id: string): Promise<boolean> {
    try {
      const res = await this.apiInstance
        .get('/bank/checkBank/' + aspsp_id)
        .then((res) => res);
      if (res.status === 200) {
        return false;
      } else if (res.status === 204) {
        return true;
      }
      return false;
    } catch (error: any) {
      console.log(error)
      return false
    }
  }

}

export default NordigenApi;
