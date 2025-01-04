import { AuthUrl ,CompanyUrl, UsersUrl,JobsUrl} from "./apiUrl";
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


//Job Url




export const JobList = (url) =>{
  const JobList = client.getWithToken(url)
  return JobList
}


export const CreateJobIsLike = (url) =>{
  const IsLike = client.getWithToken(url)
  return IsLike
}


export const CreateJobDepartment = (url) =>{
  const Department= client.getWithToken(url)
  return Department
}


export const CreateJobLocation = (url) =>{
  const Location= client.getWithToken(url)
  return Location

}

export const GetBenifints = ()=>{
  const Benifits = client.getWithToken(JobsUrl.GetBenifitsList)
  return Benifits
  
}

export const addCustomeBenifitsApi = (data) =>{
  const CustomeBenifits = client.postWithUpload(data,JobsUrl.addCustomBenifits)

  return CustomeBenifits
}


export const createCustomeBenifitsApi = (data) =>{
  const createCustomeBenifits = client.postWithUpload(JobsUrl.CreateCustomBenifits,data)

  return createCustomeBenifits
}


export const CreateJobForm = (data) =>{
  const CreateJobForm = client.postWithUpload(JobsUrl.createJobForm,data)
  return CreateJobForm
}


export const getJobDetailsApi = (url) =>{
  const getJobDetails = client.getWithToken(url)
  return getJobDetails
}


export const UpdateJobForm = (data,id) =>{

  console.log(data)

  const UpdateJobForm = client.putForUpload(`${JobsUrl.UpdateJobForm}${id}/`,data)

  return UpdateJobForm

}


// Qualification List By Course Id



export const getQualificationListApi = (url) =>{

  const getJobDetails = client.getWithToken(url)

  return getJobDetails

}

