export const AuthUrl = {
  Login: "account-api/user-login-view/", // EmailPasswordVerifyContainer mai
  SetPassword: "account-api/set-user-password-api/", //SetPassword mai hai
  OTPVerification: "account-api/otp-verify-api/",
  EmailVerification: "account-api/verify-email-view/"
};


export const CompanyUrl = {
  CompanyList : "account-api/company-list-api/?page=1&limit=10",
  Logout : "account-api/logout-user-api/",
  UpdateCompanyProfile : "account-api/update-company-api/",
  CompanyUserList : "account-api/company-user-list-api/b6cadaab-69bc-4707-8656-2e8573e17547/?search=shivani"

}

export const UsersUrl = {
  CreateUser : "account-api/create-user-api/",
  DeleteUser : "account-api/delete-user-api/",
  UserStatus : "account-api/user-de-re-activate-unlock-api/",
  EditUser : "account-api/update-user-api/"
}

export const JobsUrl = {
  GetBenifitsList : "assets-api/benefits-list-api/?page=1&limit=10",
  addCustomBenifits : "assets-api/benefits-post-api/",
  CreateCustomBenifits : "assets-api/benefits-post-api/",
  createJobForm : "assets-api/job-post-api/",
  UpdateJobForm : "assets-api/update-job-api/",
  createJobQuestion : "assets-api/create-job-question-api/",
  cloneJobGet:"assets-api/clone-job-api/",
  UpdateMultipleJobApi:"assets-api/update-multiple-job-api/",
  getJobAssignmentQuestionReview:"assets-api/get-job-assignment-question-review/",
  updateAssetAassignmentTypeUserAnswerUpdate:"assets-api/assignment-type-user-answer-update-api/",
  ScreeningParameterData: "assets-api/get-screening-parameter-data-api/",
  getJobGroupParameterList:"assets-api/get-job-group-parameter-list-api/",
  assetSapicreateJobGroupPost:"assets-api/create-job-group-api/",
  postJobGroupParameterListByFetch:"assets-api/job-applicant-group-filter-api/"
}

export const SkillsUrl = {
  skillPost : "assets-api/skill-post-api/",
  skillGroupPost : "assets-api/skill-group-post-api/",
}
export const BehaviourUrl = {
  getQuizList:"assets-api/behaviour-question-list-api/",
  postQuizQuestion:"assets-api/applicant-behaviour-post-api/",
  getApplicantBehaviourDetail:"assets-api/applicant-behaviour-detail-api/",
  updateApplicantBehaviour:"assets-api/update-applicant-behaviour-api/",
  PostQuizQuestionAnswer:"assets-api/user-answer-post-api/"
}


export const ApplicationJobPostUrl = {
  languageList : "assets-api/laguage-list-api/?page=6&limit=10",
  JobApplication : "assets-api/applicant-post-api/",
  JobGetDetails : "assets-api/applicant-detail-api/",
  EducationQualification : "assets-api/applicant-qualification-post-api/",
  WorkExperience:"assets-api/applicant-work-experience-post-api/",
  ApplicationFormDetails : "assets-api/applicant-update-api/",
  getApplicantAssetData:"assets-api/get-job-applicant-asset-data-api/job-uid/",
}
