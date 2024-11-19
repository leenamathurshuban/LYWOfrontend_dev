import { AuthUrl } from "./apiUrl";
import client from "./axiosInstance";

export const LogInCall = (data) => {
  const data1 =  client.postWithoutToken(AuthUrl.Login, data);
  console.log("datata",data1)
  return data1
};


export const IsEmailVerify = (data) =>{
  const emailVerify = client.postWithoutToken(AuthUrl.EmailVerification,data)
  return emailVerify
}
export const OtpVerifyApi = (data) =>{
  const otpVerify = client.postWithoutToken(AuthUrl.OTPVerification,data)
  return otpVerify
}

export const setPasswordVerifyApi = (data) =>{
  const setPasswordVerify = client.putWithoutToken(AuthUrl.SetPassword,data)
  return setPasswordVerify
}