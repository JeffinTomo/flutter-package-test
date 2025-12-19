import axios from "axios";

const envs = {
  dev: {
    baseURL: "/dev-api",
    timeout: 20000,
  },
  prod: {
    baseURL: "/api",
    timeout: 2000,
  }
};

const env = "dev";
export const config = envs[env] || envs.dev;

export const metayReq = axios.create(config); //api/

[metayReq].forEach((apiItem) => {
  apiItem.interceptors.request.use(
    async (config) => {
      config.headers["Content-Type"] = "application/json";
      const { token = "" } = getUserInfo();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      if (error?.response?.status === 401) {
        return Promise.reject({
          message: error?.response?.data?.message
        });
      }
    },
  );
  apiItem.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject({
        message: error?.response?.data
      });
    },
  );
});

export const userAPIs = {
  login: async (params): Promise<RequestType<any> | null> => {
    try {
      const res = await metayReq.post(`/api/users/login`, params);
      const data = res.data;
      setUserInfo(data);
      return data;
    } catch (err) {
      console.error("login failed: ", err);
      return err;
    }
  },
}


export const xxxAPIs = {
  search: async (params): Promise<RequestType<any> | null> => {
    try {
      const res = await metayReq.get(`/api/xxx`, params);
      return res.data;
    } catch (err) {
      console.error("exchange failed: ", err);
      return err;
    }
  },
};
