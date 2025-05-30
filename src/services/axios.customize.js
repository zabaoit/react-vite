import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem("access_token")) {
      config.headers.Authorization = "Bearer " + window.localStorage.getItem("access_token");
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
export default instance;
