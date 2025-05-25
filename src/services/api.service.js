// import axios from "axios";
import axios from "./axios.customize";
const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post(URL_BACKEND, data);
};

const fecthAllUserAPI = () => {
  const URL_BACKEND = "/api/v1/user";

  return axios.get(URL_BACKEND);
};

const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
  };

  return axios.put(URL_BACKEND, data);
};

export { createUserAPI, updateUserAPI, fecthAllUserAPI };
