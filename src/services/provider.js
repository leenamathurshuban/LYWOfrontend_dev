import { AuthUrl ,CompanyUrl, UsersUrl} from "./apiUrl";
import client from "./axiosInstance";


//Login Api's
export const LogInCall = (data) => {
  const data1 =  client.postWithoutToken(AuthUrl.Login, data);
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

export const logoutApi = () =>{
  const Logout = client.put(CompanyUrl.Logout)
  return Logout
}

//company Api's

export const GetcompanyDetailsApi = (uid) =>{
  const GetCompanyDetails = client.get(`account-api/company-detail-api/${uid}`)
  return GetCompanyDetails
}

export const updateCompanyProfileApi = (data,uid) =>{
  const setPasswordVerify = client.putWithoutToken(`${CompanyUrl.UpdateCompanyProfile}${uid}/`)
  return setPasswordVerify
}

export const CompanyUserListGetApi = (url) =>{
  const CompanyUserList = client.getWithToken(url)
  return CompanyUserList
}


//User's Api

export const createUserApi = (data) => {
  const CreateUser = client.postWithUpload(UsersUrl.CreateUser,data)
  return CreateUser
}

export const deleteUserApi = (data) => {
  const DeleteUser = client.deleteWithUpload(UsersUrl.DeleteUser,data)
  return DeleteUser
}
export const UserStatusUpdateApi = (data) => {
  const UserStatusUpdate = client.putWithUpload(UsersUrl.UserStatus,data)
  return UserStatusUpdate
}


// Assest Url


export const EvalationAssestList = (url) =>{
  const EvalationList = client.getWithToken(url)
  return EvalationList
}

export const EvalationAssestDetails = (url) =>{
  const EvalationAssestDetails = client.getWithToken(url)
  return EvalationAssestDetails
}




