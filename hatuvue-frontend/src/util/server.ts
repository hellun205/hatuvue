import axios from "axios";

export const getServer = () => "http://localhost:3000";

export const getIp = async () => {
  const ip = await axios.get("https://api.ipify.org/");
  return `${ip.data}`;
};

export const request = {
  get: async <T>(path: string, headers?: any) => {
    try {
      const res = await axios.get<T>(`${getServer()}/${path}`, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
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
          "Content-Type": "application/json",
          ...headers,
        },
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
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return res;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
  patch: async <T>(path: string, data?: any, headers?: any) => {
    try {
      const res = await axios.patch<T>(`${getServer()}/${path}`, data, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return res;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
  put: async <T>(path: string, data?: any, headers?: any) => {
    try {
      const res = await axios.put<T>(`${getServer()}/${path}`, data, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return res;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
};
