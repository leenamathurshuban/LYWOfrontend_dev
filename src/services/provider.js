import { AuthUrl } from "./apiUrl";
import client from "./axiosInstance";

export const LogInCall = (data) => {
  const data1 =  client.postWithoutToken(AuthUrl.Login, data);
  console.log("datata",data1)
  return data1
};