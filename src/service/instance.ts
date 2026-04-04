import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { API_URL } from "../constants/service";
import { navigateTo } from "../utils/navigation";
import type { PagedData } from "../types/processor";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      navigateTo("/login");
    }
    return Promise.reject(error);
  }
);

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T | null> => {
  try {
    const response = await instance.get<T>(url, config);
    return response.data;
  } catch {
    return null;
  }
};

const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T | null> => {
  try {
    const response = await instance.post<T>(url, data, config);
    return response.data;
  } catch {
    return null;
  }
};

const put = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T | null> => {
  try {
    const response = await instance.put<T>(url, data, config);
    return response.data;
  } catch {
    return null;
  }
};

const del = async <T>(url: string, data?: unknown): Promise<T | null> => {
  try {
    const response = await instance.delete<T>(url, { data });
    return response.data;
  } catch {
    return null;
  }
};

const getOData = <T>(
  resource: string,
  page = 1,
  pageSize = 100,
  odataFilter?: string
): Promise<PagedData<T> | null> =>
  get<PagedData<T>>(`${resource}/OData`, {
    params: { page, pageSize, ...(odataFilter ? { $filter: odataFilter } : {}) },
  });

export default { get, post, put, del, getOData };
