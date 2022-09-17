import Vue from "vue";
import axios from "axios";
import { Global } from "../helpers/global";

// base url
axios.defaults.baseURL = Global.getBaseUrl();
// set common headers here
axios.defaults.headers.common["Accept-Language"] = "";

axios.interceptors.request.use((config) => {
  // Do something before request is sent
  // If request is different than any of the URLS in urlsExcludedForBearerHeader
  // then send Authorization header with token from Secure LS
  const urlsExcludedForBearerHeader = ["/login"];
  if (urlsExcludedForBearerHeader.indexOf(config.url) === -1) {
    config.headers.Authorization = `Bearer ${secureLS.get(Global.tokenKey)}`;
  }
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      Global.showErrorAlert(true, "error", "You are unauthorized");
      secureLS.removeAll();
      router.push({ name: "Login" });
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
export const ApiService = {
  // get request
  get(endPoint, params) {
    return axios.get(endPoint, {
      params: params,
    });
  },

  // post request
  post(endPoint, params) {
    return axios.post(endPoint, params);
  },

  // post image request
  postImage(endPoint, params) {
    return axios.post(endPoint, params, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },

  // put request
  put(endPoint, params) {
    return axios.put(endPoint, params);
  },

  // delete request
  delete(endPoint) {
    return axios.delete(endPoint);
  },

  // download file
  download(endPoint) {
    return axios.get(endPoint, {
      responseType: "blob",
    });
  },
};
