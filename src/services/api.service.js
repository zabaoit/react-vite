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

const fecthAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
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

const deleteUserAPI = id => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};

const handleUploadfile = (file, folder) => {
  const URL_BACKEND = `/api/v1/file/upload`;
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);

  return axios.post(URL_BACKEND, bodyFormData, config);
};

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    avatar: avatar,
    fullName: fullName,
    phone: phone,
  };

  return axios.put(URL_BACKEND, data);
};

const registerUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post(URL_BACKEND, data);
};

const loginUserAPI = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: 2000,
  };

  return axios.post(URL_BACKEND, data);
};

const getAccountUser = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};

const logoutAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};

const fecthAlLBookAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

export {
  createUserAPI,
  updateUserAPI,
  fecthAllUserAPI,
  deleteUserAPI,
  handleUploadfile,
  updateUserAvatarAPI,
  registerUserAPI,
  loginUserAPI,
  getAccountUser,
  logoutAPI,
  fecthAlLBookAPI,
};
