import { AuthUrl, CompanyUrl, UsersUrl, JobsUrl, SkillsUrl, ApplicationJobPostUrl, BehaviourUrl, GraphBarChartUrl } from "./apiUrl";
import client from "./axiosInstance";

//Login Api's
export const LogInCall = (data) => {
  const data1 = client.postWithoutToken(AuthUrl.Login, data);
  return data1;
};

export const IsEmailVerify = (data) => {
  const emailVerify = client.postWithoutToken(AuthUrl.EmailVerification, data);
  return emailVerify;
};
export const OtpVerifyApi = (data) => {
  const otpVerify = client.postWithoutToken(AuthUrl.OTPVerification, data);
  return otpVerify;
};

export const setPasswordVerifyApi = (data) => {
  const setPasswordVerify = client.putWithoutToken(AuthUrl.SetPassword, data);
  return setPasswordVerify;
};

export const logoutApi = () => {
  const Logout = client.put(CompanyUrl.Logout);
  return Logout;
};

//company Api's

export const GetcompanyDetailsApi = (uid) => {
  const GetCompanyDetails = client.get(`account-api/company-detail-api/${uid}`);
  return GetCompanyDetails;
};

export const updateCompanyProfileApi = (data, uid) => {
  const setPasswordVerify = client.putWithoutToken(
    `${CompanyUrl.UpdateCompanyProfile}${uid}/`
  );
  return setPasswordVerify;
};

export const CompanyUserListGetApi = (url) => {
  const CompanyUserList = client.getWithToken(url);
  return CompanyUserList;
};

//User's Api

export const createUserApi = (data) => {
  const CreateUser = client.postWithUpload(UsersUrl.CreateUser, data);
  return CreateUser;
};

export const deleteUserApi = (data) => {
  const DeleteUser = client.deleteWithUpload(UsersUrl.DeleteUser, data);
  return DeleteUser;
};
export const UserStatusUpdateApi = (data) => {
  const UserStatusUpdate = client.putWithUpload(UsersUrl.UserStatus, data);
  return UserStatusUpdate;
};

// Assest Url

export const EvalationAssestList = (url) => {
  const EvalationList = client.getWithToken(url);
  return EvalationList;
};

export const EvalationAssestDetails = (url) => {
  const EvalationAssestDetails = client.getWithToken(url);
  return EvalationAssestDetails;
};

//Job Url

export const JobList = (url) => {
  const JobList = client.getWithToken(url);
  return JobList;
};
export const JobListByCompany=(url)=>{
  const jobList = client.getWithToken(url);
  return jobList;
}

export const IndustrySelection = (url) => {
  const Industry = client.getWithToken(url);
  return Industry;
};

export const LocationSelection = (url) => {
  const Location = client.getWithToken(url);
  return Location;
};

export const CreateJobIsLike = (url) => {
  const IsLike = client.getWithToken(url);
  return IsLike;
};

export const CreateJobDepartment = (url) => {
  const Department = client.getWithToken(url);
  return Department;
};

export const CreateJobLocation = (url) => {
  const Location = client.getWithToken(url);
  return Location;
};

export const GetBenifints = () => {
  const Benifits = client.getWithToken(JobsUrl.GetBenifitsList);
  return Benifits;
};

export const addCustomeBenifitsApi = (data) => {
  const CustomeBenifits = client.postWithUpload(
    data,
    JobsUrl.addCustomBenifits
  );

  return CustomeBenifits;
};

export const createCustomeBenifitsApi = (data) => {
  const createCustomeBenifits = client.postWithUpload(
    JobsUrl.CreateCustomBenifits,
    data
  );

  return createCustomeBenifits;
};

export const CreateJobForm = (data) => {
  const CreateJobForm = client.postWithUpload(JobsUrl.createJobForm, data);
  return CreateJobForm;
};

export const CreateJobQuestion = (data) => {
  const CreateJobQuestion = client.postWithUpload(
    JobsUrl.createJobQuestion,
    data
  );
  return CreateJobQuestion;
};

export const addSkill = (data) => {
  const addSkill = client.postWithUpload(SkillsUrl.skillPost, data);
  return addSkill;
};
export const addSkillGroupPost = (data) => {
  const addSkillGroup = client.postWithUpload(SkillsUrl.skillGroupPost, data);
  return addSkillGroup;
};

export const getSkillList = (url) => {
  const skillList = client.getWithToken(url);
  return skillList;
};

export const getSkillGroupDetailsApi = (url) => {
  const getJobDetails = client.getWithToken(url);
  return getJobDetails;
};

export const getJobDetailsApi = (url) => {
  const getJobDetails = client.getWithToken(url);
  return getJobDetails;
};

export const getPostJobIdApi = (url) => {
  const getJobPostId = client.getwithoutToken(url);
  return getJobPostId;
};

export const UpdateJobForm = (data, id) => {
  const UpdateJobForm = client.putForUpload(
    `${JobsUrl.UpdateJobForm}${id}/`,
    data
  );
  return UpdateJobForm;
};

export const CloneJobGet = (id) => {
  const getCloneJob = client.getWithToken(`${JobsUrl.cloneJobGet}${id}`);
  return getCloneJob;
};

export const UpdateMultipleJobApi = (data) => {
  const UpdateMultipleJob = client.putWithUpload(
    `${JobsUrl.UpdateMultipleJobApi}`,
    data
  );
  return UpdateMultipleJob;
};

export const JobDeleteAPI = (data) => {
  const removeresult = client.deleteWithUpload(`${JobsUrl.jobDelete}`, data)
  return removeresult;
}
export const deleteBenifitAPI=(id)=>{
  const removeBenifit = client.deleteWithUpload(`${JobsUrl.deleteBenifits}${id}`)
  return removeBenifit;
}
// Qualification List By Course Id

export const getQualificationListApi = (url) => {
  const getJobDetails = client.getWithToken(url);

  return getJobDetails;
};

export const LanguageApi = () => {
  const languageList = client.getWithToken(`${ApplicationJobPostUrl.languageList}`)
  return languageList
}

export const getQuizQuestionListAPi = () => {
  const getQuizList = client.getWithToken(`${BehaviourUrl.getQuizList}?page=1&limit=28&search=`)
  return getQuizList
}
export const postQuizQuestionApi = (data) => {
  const resultApi = client.postWithToken(`${BehaviourUrl.postQuizQuestion}`, data)
  return resultApi
}
export const getApplicantBehaviourDetailApi = (id) => {
  const getQuizList = client.getWithToken(`${BehaviourUrl.getApplicantBehaviourDetail}${id}`)
  return getQuizList
}
export const updateApplicantBehaviourApi = (id, data) => {
  const resultApi = client.putForUpload(`${BehaviourUrl.updateApplicantBehaviour}${id}/`, data)
  return resultApi
}

export const ApplicationJobApi = (data) => {
  const ApplicationJob = client.postWithoutToken(`${ApplicationJobPostUrl.JobApplication}`, data)
  return ApplicationJob
}

export const ApplicationDeatilsApi = (EmailId) => {
  const ApplicationJob = client.getWithToken(`${ApplicationJobPostUrl.JobGetDetails}${EmailId}/`)
  return ApplicationJob
}


export const EducationQualificationApi = (data) => {
  const EducationQualification = client.postWithToken(`${ApplicationJobPostUrl.EducationQualification}`, data)
  return EducationQualification
}
export const WorkExperienceApi = (data) => {
  const WorkExperience = client.postWithToken(`${ApplicationJobPostUrl.WorkExperience}`, data)
  return WorkExperience
}


export const ApplicationFormDetailsApi = (data, Id) => {
  const url = `${ApplicationJobPostUrl.ApplicationFormDetails}${Id}/`;
  const ApplicationJob = client.putWithUpload(url, data)
  return ApplicationJob
}

//evalution quiz api
export const PostQuizDataApi = (data) => {
  const quizData = client.postWithToken(`${BehaviourUrl.PostQuizQuestionAnswer}`, data);
  return quizData
}
export const getJobAssignmentReview = (id) => {
  const getJobReview = client.getWithToken(`${JobsUrl.getJobAssignmentQuestionReview}${id}`)
  return getJobReview
}
export const updateAassignmentTypeUserAnswerUpdateAPI = (data, id) => {
  const result = client.putWithUpload(`${JobsUrl.updateAssetAassignmentTypeUserAnswerUpdate}${id}/`, data);
  return result
}
export const getScreeningParameterDataAPI = (id) => {
  const getResult = client.getWithToken(`${JobsUrl.ScreeningParameterData}${id}`);
  return getResult
}
export const getJobGroupParameterListAPI = (id) => {
  const getResult = client.getWithToken(`${JobsUrl.getJobGroupParameterList}${id}/?page=1&limit=10`)
  return getResult
}
export const assetSapicreateJobGroupPostAPI = (data) => {
  const postResult = client.postWithToken(`${JobsUrl.assetSapicreateJobGroupPost}`, data)
  return postResult
}
export const postJobGroupParameterListByFetchAPI = (id, data) => {
  const resultFilter = client.postWithToken(`${JobsUrl.postJobGroupParameterListByFetch}${id}/?page=1&limit=10`, data)
  return resultFilter
}
export const getAssetDataDetailsAPI = (job_uid, applicant_uid) => {
  const resultAsset = client.get(`${ApplicationJobPostUrl.getApplicantAssetData}${job_uid}/applicant-uid/${applicant_uid}/`)
  return resultAsset
}
export const jobApplicantUpdateAPI = (data) => {
  const result = client.putWithUpload(`${JobsUrl.jobApplicantUpdateForList}`, data)
  return result
}
export const insightsListAPI=(id)=>{
  const result = client.getWithToken(`${GraphBarChartUrl.insightsBarList}${id}`)
  return result
}
export const dashboardListAPI=(id)=>{
  const result = client.getWithToken(`${CompanyUrl.DashboardList}${id}`)
  return result
}