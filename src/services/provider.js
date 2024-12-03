import { AuthUrl ,CompanyUrl, UsersUrl} from "./apiUrl";
import client from "./axiosInstance";

export const LogInCall = (data) => {
  const data1 =  client.postWithoutToken(AuthUrl.Login, data);
  // console.log("datata",data1)
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



export const GetcompanyDetailsApi = (uid) =>{
  const GetCompanyDetails = client.get(`account-api/company-detail-api/${uid}`)
  return GetCompanyDetails
}


export const logoutApi = () =>{
  const Logout = client.put(CompanyUrl.Logout)
  console.log("logout------===",Logout)
  return Logout
}


export const updateCompanyProfileApi = (data,uid) =>{
  const setPasswordVerify = client.putWithoutToken(`${CompanyUrl.UpdateCompanyProfile}${uid}/`)
  return setPasswordVerify
}


export const createUserApi = (data) => {
  const CreateUser = client.postWithUpload(UsersUrl.CreateUser)
  return CreateUser
}

// export const CompanyUserList = (uid) => {

// }
