import axios from "axios";
// import AuthService from "../utils/auth-utils";
//live
// var token = AuthService.getToken();
var token = "token";


export const instance = axios.create({
  baseURL: "https://bittrend.shubansoftware.com/",
  timeout: 60000,
});
export const baseHeadersForRequest = () => {
  return {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
export const baseHeadersWithoutToken = () => {
  return {
    "content-type": "application/json",
  };
};
const baseHeadersForUploads = () => {
  // var token = AuthService.getToken();
  return {
    Accept: "application/json",
    "content-type": "multipart/form-data",
    Authorization: token ? `Bearer ${token}` : null,
  };
};

export const get = async (url, params) => {
  return instance({
    url,
    method: "GET",
    data: params,
    headers: baseHeadersForRequest(),
  }).then((res) => res.data);
};
export const getwithoutToken = async (url, params) => {
  return instance({
    url,
    method: "GET",
    data: params,
  }).then((res) => res.data);
};

export const post = async (url, params) => {
  return instance({
    url,
    method: "POST",
    data: params,
    headers: baseHeadersForRequest(),
  });
};
export const postWithoutToken = async (url, params) => {
  return instance({
    url,
    method: "POST",
    data: params,
    //headers: baseHeadersWithoutToken(),
  });
};
export const putWithoutToken = async (url, params) => {
  return instance({
    url,
    method: "PUT",
    data: params,
  });
};
export const postWithUpload = async (url, params) => {
  return instance({
    url,
    method: "POST",
    data: params,
    headers: baseHeadersForUploads(),
  });
};
export const put = async (url, params) => {
  return instance({
    url,
    method: "PUT",
    data: params,
    headers: baseHeadersForRequest(),
  });
};

export const deleteReq = async (url, params) => {
  return instance({
    url,
    method: "DELETE",
    data: params,
    headers: baseHeadersForRequest(),
  });
};

const client = {
  get,
  post,
  put,
  deleteReq,
  postWithoutToken,
  postWithUpload,
  getwithoutToken,
  putWithoutToken,
};

export default client;
