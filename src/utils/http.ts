import axios, { AxiosInstance, AxiosError } from "axios";
import { toast } from "react-toastify";
import HttpStatusCode from "src/constants/httpStatusCode.enum";
import { AuthResponse } from "src/types/auth.type";
import {
  clearLS,
  getAccessTokenFromLS,
  // getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
} from "./auth";
import config from "src/constants/config";

export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  // private refreshToken: string;
  // private refreshTokenRequest: Promise<string> | null;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    // this.refreshToken = getRefreshTokenFromLS();
    // this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;

        if (url === "login" || url === "register") {
          const data = response.data as AuthResponse;
          this.accessToken = data.data.access_token;
          setAccessTokenToLS(this.accessToken);
          setProfileToLS(data.data.user);
        } else if (url === "/logout") {
          this.accessToken = "";
          clearLS();
        }
        return response;
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS();
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
