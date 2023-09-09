import axios from "axios";

export const getServer = () => "localhost:3000";

export const request = {
  get: async <T>(path: string, headers?: any) => {
    try {
      const res = await axios.get<T>(`${getServer()}/${path}`, {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
  post: async <T>(path: string, data?: any, headers?: any) => {
    try {
      const res = await axios.post<T>(`${getServer()}/${path}`, data, {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
  delete: async <T>(path: string, headers?: any) => {
    try {
      const res = await axios.delete<T>(`${getServer()}/${path}`, {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
  patch: async <T>(path: string, data?: any, headers?: any) => {
    try {
      const res = await axios.patch<T>(`${getServer()}/${path}`, {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
  put: async <T>(path: string, data?: any, headers?: any) => {
    try {
      const res = await axios.put<T>(`${getServer()}/${path}`, {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
};
