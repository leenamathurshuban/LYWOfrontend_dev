// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Badge,
//   Button,
//   Col,
//   Container,
//   Form,
//   Modal,
//   Row,
// } from "react-bootstrap";
// import { useDropzone } from "react-dropzone";
// import imgpTrash from "../../images/icons/trash-01.svg";
// import logoIcon from "../../images/logo_icon.png";
// import {
//   ApplicationDeatilsApi,
//   ApplicationFormDetailsApi,
//   ApplicationJobApi,
//   EducationQualificationApi,
//   WorkExperienceApi,
// } from "../../services/provider";
// import axios from "axios";
// import { compose } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ApplicationJobPostModal = ({
//   show,
//   handleClose,
//   jobPostData,
//   updateButtonText,
//   registerdUserLoginDetails,
//   viewDetailData,
// }) => {
//   const [isYes, setIsYes] = useState({
//     CurrentlyWorkingToggle: false,
//     NoticeBuyOutToggle: false,
//     willingToTeavelJob: false,
//   });
//   const [ResumeFile, setResumeFile] = useState(null);
//   const [ResumeFileName, setResumeFileName] = useState("");
//   const [error, setError] = useState(null);
//   const [showInput, setShowInput] = useState(false);
//   const [ApplicantProfileData, setApplicantProfileData] = useState(null);
//   const [selectedSpokenLanguageUids, setSelectedSpokenLanguageUids] = useState(
//     []
//   );
//   const navigate = useNavigate();
//   const [selectedWrittenLanguageUids, setSelectedWrittenLanguageUids] =
//     useState([]);

//   const [EducationRows, SetEducationRows] = useState([
//     {
//       level: "",
//       areaOfEducation: "",
//       gradYear: "",
//       university: "",
//       grade: "",
//     },
//   ]);

//   const [WorkExpreienceRow, setWorkExpreienceRow] = useState([
//     {
//       TotalWorkExperience: "",
//       WorkRole: "",
//       WorkFrom: "",
//       WorkTo: "",
//       WorkComapny: "",
//       WorkIndustry: "",
//       WorkNote: "",
//     },
//   ]);

//   const [profileformData, setProfileFormData] = useState({
//     name: "",
//     email: "",
//     confirmEmail: "",
//     phone: "",
//     Qualification: "",
//     AvailableBy: "",
//     NoticePeriod: "",
//     ExpectedSalary: "",
//     TotalWorkExperience: "",
//     CurrentLocation: "",
//     relocationChoice: null,
//     requiredCompanyAssist: null,
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     confirmEmail: "",
//     phone: "",
//     Qualification: "",
//     ResumeFile: null,
//     AvailableBy: "",
//     CurrentlyWorkingToggle: "",
//     NoticePeriod: "",
//     ExpectedSalary: "",
//     TotalWorkExperience: "",
//     CurrentLocation: "",
//     relocationChoice: "",
//     requiredCompanyAssist: "",
//     selectedSkills: "",
//   });

//   const [isValid, setIsValid] = useState(false);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [isAllFormDetailsValid, setisAllFormDetailsValid] = useState(false);
//   const [touchedFields, setTouchedFields] = useState({
//     name: false,
//     email: false,
//     confirmEmail: false,
//     phone: false,
//   });
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [showModal, setShowModal] = useState({
//     showSaveAsDraft: false,
//     showSaveModal: false,
//   });

//   const [storedApplicantId, setStoredApplicantId] = useState("");

//   const handleCloseModals = () => {
//     setShowModal({
//       showSaveAsDraft: false,
//       showSaveModal: false,
//     });
//   };

//   const handleShowModal = (modalName) => {
//     setShowModal((prevState) => {
//       const newState = {
//         showSaveAsDraft: false,
//         showSaveModal: false,
//       };

//       // Set the modal that needs to be shown to true
//       if (modalName === "SaveAsDraft") {
//         newState.showSaveAsDraft = true;
//       } else if (modalName === "Save") {
//         newState.showSaveModal = true;
//       }

//       return newState;
//     });
//   };

//   const handleSkillSelect = (skill) => {
//     if (selectedSkills.includes(skill.uid)) {
//       setSelectedSkills(
//         selectedSkills.filter((selectedSkill) => selectedSkill !== skill.uid)
//       );
//     } else {
//       if (selectedSkills.length < 8) {
//         setSelectedSkills([...selectedSkills, skill.uid]);
//       } else {
//         alert("You can only select upto 8 skills.");
//       }
//     }
//   };

//   const validateForProfileDetails = () => {
//     const newErrors = {};
//     let formIsValid = true;

//     if (!profileformData.name) {
//       formIsValid = false;
//       newErrors.name = "Name is required";
//     }

//     if (!profileformData.email) {
//       formIsValid = false;
//       newErrors.email = "Email is required";
//     }

//     if (!profileformData.confirmEmail) {
//       formIsValid = false;
//       newErrors.confirmEmail =
//         "Your application and progress are linked to this email. Please ensure it is entered correctly.";
//     } else if (profileformData.email !== profileformData.confirmEmail) {
//       formIsValid = false;
//       newErrors.confirmEmail =
//         "The email addresses do not match. Please check both fields and try again";
//     }

//     const phonePattern = /^[0-9]{10}$/;
//     if (!profileformData.phone) {
//       formIsValid = false;
//       newErrors.phone = "Phone number is required";
//     } else if (!phonePattern.test(profileformData.phone)) {
//       formIsValid = false;
//       newErrors.phone = "Phone number must be 10 digits";
//     }

//     setErrors(newErrors);
//     setIsValid(formIsValid);
//     return formIsValid;
//   };

//   const isEducationFormValid = EducationRows.every((row) =>
//     Object.values(row).every((field) => field !== "")
//   );

//   const isWorkExperienceFormValid = WorkExpreienceRow.every((row) =>
//     Object.values(row).every((field) => field !== "")
//   );

//   const validationEnable =
//     isWorkExperienceFormValid &&
//     isEducationFormValid &&
//     selectedWrittenLanguageUids.length !== 0 &&
//     selectedSpokenLanguageUids.length !== 0 &&
//     profileformData?.CurrentLocation &&
//     selectedSkills.length !== 0 &&
//     profileformData?.CurrentLocation &&
//     ResumeFile &&
//     profileformData?.AvailableBy &&
//     profileformData?.NoticePeriod &&
//     profileformData?.ExpectedSalary;

//   const handleProfileDetailsChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setProfileFormData((prevData) => ({
//       ...prevData,
//       [name]:
//         type === "radio"
//           ? value === "true"
//           : type === "checkbox" || type === "switch"
//           ? checked
//           : value,
//     }));
//   };

//   const handleSwitchChange = (toggleName) => {
//     setIsYes((prevState) => ({
//       ...prevState,
//       [toggleName]: !prevState[toggleName],
//     }));
//   };

//   const handleFocus = (e) => {
//     const { name } = e.target;
//     setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));
//     validateForProfileDetails();
//   };

//   const handleProfileDetailsApi = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("email", profileformData?.email);
//       formData.append("user_name", profileformData?.name);
//       formData.append("user_phone_number", profileformData?.phone);
//       formData.append("job_uid", jobPostData?.uid);
//       const response = await ApplicationJobApi(formData);

//       if (response.status === 200) {
//         setApplicantProfileData(response.data);
//         setStoredApplicantId(response.data?.applcant?.uid);

//         localStorage.setItem(
//           "applicantProfileData",
//           JSON.stringify(response.data)
//         );
//         updateButtonText("Continue");
//       } else {
//         console.error("Failed to save form: ", response.data);
//       }
//     } catch (error) {
//       // toast.error(error?.response?.data?.response?.user[0])
//       console.log("ERROR------->>>>:", error);
//     }
//   };

//   const handleFormDetailsApi = async () => {
//     const questionAnswerArray = generateQuestionAnswerArray();

//     try {
//       const dataToSend = selectedSkills.length === 0 ? [] : selectedSkills;
//       const applicantProfileData = JSON.parse(
//         localStorage.getItem("applicantProfileData")
//       );
//       const accessToken = applicantProfileData?.user_login?.access;
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       const formdata = new FormData();
//       formdata.append("resume", ResumeFile);
//       formdata.append("availble_by", profileformData?.AvailableBy);
//       formdata.append("currently_working", isYes?.CurrentlyWorkingToggle);
//       formdata.append("notice_period", profileformData?.NoticePeriod);
//       formdata.append("notice_buyout_available", isYes?.NoticeBuyOutToggle);
//       formdata.append("willing_to_travel_for_job", isYes?.willingToTeavelJob);
//       formdata.append(
//         "applicant_status",
//         validationEnable ? "Completed" : "Draft"
//       );
//       formdata.append("expected_salary", profileformData?.ExpectedSalary);
//       formdata.append(
//         "spoken_language",
//         JSON.stringify(selectedSpokenLanguageUids)
//       );
//       formdata.append(
//         "written_reading_language",
//         JSON.stringify(selectedWrittenLanguageUids)
//       );
//       formdata.append("current_location", profileformData?.CurrentLocation);
//       formdata.append(
//         "willing_to_relocate_to",
//         profileformData?.relocationChoice
//       );
//       formdata.append(
//         "require_company_assistance_for_relocation",
//         profileformData.requiredCompanyAssist
//       );
//       formdata.append("job_uid", jobPostData?.uid);

//       formdata.append("skills", JSON.stringify(dataToSend));
//       formdata.append(
//         "question_answer_array",
//         JSON.stringify(questionAnswerArray)
//       );
//       const response = await axios.put(
//         `https://bittrend.shubansoftware.com/assets-api/applicant-update-api/${storedApplicantId}/`,
//         formdata,
//         { headers: headers }
//       );

//       if (response.status === 200) {
//         if (response?.data?.response.applicant_status === "Draft") {
//           updateButtonText("Continue");
//           handleCloseModals();
//           handleClose();
//         } else if (response?.data?.response.applicant_status === "Completed") {
//           updateButtonText("View");
//           handleCloseModals();
//           handleClose();
//           //   localStorage.setItem('applicantToken', ApplicantProfileData?.user_login?.access)
//           //   localStorage.setItem('applicantData',JSON.stringify(ApplicantProfileData?.applcant))

//           // navigate('/Behavioural-Assessment')
//         }

//         // behaviour wala navigate hoga
//         // const response = await ApplicationFormDetailsApi(
//         //   formdata,
//         //   ApplicantProfileData?.applcant?.uid
//         // );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleProceedBtn = async () => {
//     console.log("proceed calll---->>>>>");
//     try {
//       await handleFormDetailsApi(); // Make sure the form details are submitted
//       navigate("/Behavioural-Assessment"); // Then navigate to Behavioral Assessment
//     } catch (error) {
//       console.error("Error during behavioral test submission:", error);
//     }
//   };

//   const handleSubmit = () => {
//     if (!storedApplicantId) {
//       toast.error("Please fill Profile Details");
//       return;
//     }

//     handleShowModal("Save");
//   };

//   const handleSaveAsDraft = () => {
//     if (!storedApplicantId) {
//       alert("Please fill Profile Details");
//       return;
//     }
//     handleShowModal("SaveAsDraft");
//   };

//   const handleButtonClick = () => setShowInput(!showInput);

//   const EducationAddRow = () => {
//     SetEducationRows([
//       ...EducationRows,
//       {
//         level: "",
//         areaOfEducation: "",
//         gradYear: "",
//         university: "",
//         grade: "",
//       },
//     ]);
//   };

//   const EducationdeleteRow = (index) => {
//     const newRows = EducationRows.filter((_, i) => i !== index);
//     SetEducationRows(newRows);
//   };

//   const handleEducationQualificationChange = (index, e) => {
//     const { name, value } = e.target;
//     const newRows = [...EducationRows];
//     newRows[index][name] = value;
//     SetEducationRows(newRows);
//   };

//   const saveQualificationData = async (row) => {
//     try {
//       if (!storedApplicantId) {
//         alert("Please fill Profile Details");
//         return;
//       }
//       const formdata = new FormData();
//       formdata.append("applicant_profile", storedApplicantId);
//       formdata.append("level", row.level);
//       formdata.append("applicant_area_of_education", row.areaOfEducation);
//       formdata.append("grad_year", row.gradYear);
//       formdata.append("university", row.university);
//       formdata.append("grade", row.grade);
//       const response = await EducationQualificationApi(formdata);

//       if (response.status === 200) {
//         console.log("Education Saved Successfully");
//       } else {
//         console.error("Failed to save form: ", response.data);
//         alert("There was an issue saving the form.");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     }
//   };

//   const saveWorkExperienceData = async (row) => {
//     try {
//       if (!storedApplicantId) {
//         alert("Please fill Profile Details");
//         return;
//       }
//       const formdata = new FormData();
//       formdata.append("work_applicant_profile", storedApplicantId);
//       formdata.append("total_work_experience", row.TotalWorkExperience);
//       formdata.append("role", row.WorkRole);
//       formdata.append("work_from", row.WorkFrom);
//       formdata.append("work_to", row.WorkTo);
//       formdata.append("work_company", row.WorkComapny);
//       formdata.append("work_industry", row.WorkIndustry);
//       formdata.append("note", row.WorkNote);

//       const response = await WorkExperienceApi(formdata);

//       if (response.status === 200) {
//         console.log("Data added of work experience");
//       } else {
//         console.error("Failed to save form: ", response.data);
//         alert("There was an issue saving the form.");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//       alert("Please fill all field data");
//     }
//   };

//   const WorkExpreienceAddRow = () => {
//     setWorkExpreienceRow((prevState) => [
//       ...prevState,
//       {
//         TotalWorkExperience: "",
//         WorkRole: "",
//         WorkFrom: "",
//         WorkTo: "",
//         WorkComapny: "",
//         WorkIndustry: "",
//         WorkNote: "",
//       },
//     ]);
//   };

//   const WorkExperienceDeleteRow = (index) => {
//     const deleteRow = WorkExpreienceRow.filter((_, i) => i !== index);
//     setWorkExpreienceRow(deleteRow);
//   };

//   const handleWorkExpeienceChange = (index, e) => {
//     const { name, value } = e.target;

//     const newWorkRow = [...WorkExpreienceRow];

//     newWorkRow[index][name] = value;
//     setWorkExpreienceRow(newWorkRow);
//   };

//   const onDrop = (acceptedFiles) => {
//     const selectedFile = acceptedFiles[0];
//     if (selectedFile) {
//       const isValidType = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ].includes(selectedFile.type);
//       const isValidSize = selectedFile.size <= 2 * 1024 * 1024;

//       if (isValidType && isValidSize) {
//         setResumeFile(selectedFile);
//         setError(null);
//       } else {
//         if (!isValidType) {
//           setError("Please upload a valid PDF or DOC file.");
//         } else {
//           setError("File size should be less than 2MB.");
//         }
//       }
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: ".pdf",
//     multiple: false,
//   });

//   const handleDeleteImage = () => {
//     setResumeFile(null);
//   };

//   const groupedSkills = jobPostData?.skills?.reduce((acc, skill) => {
//     const groupName = skill?.skill_group?.skill_group_name;
//     if (!acc[groupName]) {
//       acc[groupName] = [];
//     }
//     acc[groupName].push(skill);
//     return acc;
//   }, {});

//   const checkAllFieldsFilled = (rows) => {
//     return rows.some((row) =>
//       Object.values(row).every((fieldValue) => fieldValue !== "")
//     );
//   };

//   const isAllEducationFieldsFilled = checkAllFieldsFilled(EducationRows);
//   const isAllWorkExperienceFieldsFilled =
//     checkAllFieldsFilled(WorkExpreienceRow);

//   const handleSpokenLanguageClick = (uid) => {
//     if (selectedSpokenLanguageUids.includes(uid)) {
//       setSelectedSpokenLanguageUids(
//         selectedSpokenLanguageUids.filter((item) => item !== uid)
//       );
//     } else {
//       setSelectedSpokenLanguageUids([...selectedSpokenLanguageUids, uid]);
//     }
//   };
//   const handleWrittenLanguageClick = (uid) => {
//     if (selectedWrittenLanguageUids.includes(uid)) {
//       setSelectedWrittenLanguageUids(
//         selectedWrittenLanguageUids.filter((item) => item !== uid)
//       );
//     } else {
//       setSelectedWrittenLanguageUids([...selectedWrittenLanguageUids, uid]);
//     }
//   };

//   // question answer
//   const handleAnswerChange = (questionUid, answer) => {
//     setSelectedAnswers((prevState) => ({
//       ...prevState,
//       [questionUid]: answer,
//     }));
//   };

//   const generateQuestionAnswerArray = () => {
//     return jobPostData?.question_job.map((item) => ({
//       answer_uid: "", // Add logic to populate this if needed
//       question_uid: item?.uid,
//       selected_answer: selectedAnswers[item?.uid]
//         ? Array.isArray(selectedAnswers[item?.uid])
//           ? selectedAnswers[item?.uid]
//           : [selectedAnswers[item?.uid]]
//         : [],
//     }));
//   };

//   useEffect(() => {
//     if (profileformData) {
//       validateForProfileDetails();
//     }
//     if (isValid) {
//       handleProfileDetailsApi();
//     }
//   }, [jobPostData, profileformData, isValid]);

//   useEffect(() => {
//     const storedData = JSON.parse(
//       localStorage.getItem("applicantProfileAllSavedData")
//     );

//     if (storedData) {
//       setProfileFormData((prevState) => ({
//         ...prevState,
//         name: storedData?.user?.username || "",
//         email: storedData?.user?.email || "",
//         confirmEmail: storedData?.user?.email || "",
//         phone: storedData?.user?.phone_number || "",
//         AvailableBy: storedData?.availble_by || "",
//         NoticePeriod: storedData?.notice_period || "",
//         ExpectedSalary: storedData?.expected_salary || "",
//         CurrentLocation: storedData?.current_location || "",
//         relocationChoice: storedData?.willing_to_relocate_to || false,
//         requiredCompanyAssist:
//           storedData?.require_company_assistance_for_relocation || false,
//       }));

//       setIsYes((prevState) => ({
//         ...prevState,
//         CurrentlyWorkingToggle: storedData?.currently_working || false,
//         NoticeBuyOutToggle: storedData?.notice_buyout_available || false,
//       }));

//       setStoredApplicantId(storedData?.uid);

//       const spokenUids = Array.from(
//         new Set(storedData?.spoken_language.map((item) => item?.uid))
//       );
//       const writtenUids = Array.from(
//         new Set(storedData?.written_reading_language.map((item) => item?.uid))
//       );

//       setSelectedSpokenLanguageUids((prevState) => [
//         ...prevState,
//         ...spokenUids.filter((uid) => !prevState.includes(uid)),
//       ]);

//       setSelectedWrittenLanguageUids((prevState) => [
//         ...prevState,
//         ...writtenUids.filter((uid) => !prevState.includes(uid)),
//       ]);

//       const skillsUids =
//         storedData?.applicant_profile_job[0]?.job_applicant_skill.map(
//           (item) => item?.uid
//         );
//       setSelectedSkills((prevState) => [...prevState, ...skillsUids]);

//       const resumeFileUrl = storedData?.resume || null;
//       setResumeFile(resumeFileUrl);

//       const resumeFileName = resumeFileUrl
//         ? resumeFileUrl.split("/").pop()
//         : "";

//       setResumeFileName(resumeFileName);
//     }

//     const educationData = storedData?.qualification_applicantprofile || [];
//     if (Array.isArray(educationData)) {
//       SetEducationRows((prevState) => [
//         ...prevState,
//         ...educationData.map((item) => ({
//           level: item?.level || "",
//           areaOfEducation: item?.applicant_area_of_education || "",
//           gradYear: item?.grad_year || "",
//           university: item?.university || "",
//           grade: item?.grade || "",
//         })),
//       ]);
//     }
//   }, []);

//   return (
//     <Modal
//       show={show}
//       onHide={handleClose}
//       animation={false}
//       size="lg"
//       backdrop={false}
//       className="cmprofile_mdl quizDev_model jobpost_view"
//     >
//       <Modal.Header closeButton>
//         <img src={logoIcon} className="me-4" />
//         <div className="modal-title h4">
//           {jobPostData?.job_company?.company_name},{" "}
//           {/* {jobPostData?.job_company?.location},  */}
//           <span className="subtitle">
//             {" "}
//             {jobPostData?.job_type}
//             {""},{jobPostData?.workplace_type}
//           </span>
//         </div>
//       </Modal.Header>
//       <Modal.Body className="p-0 bg-lightgray">
//         <Container fluid>
//           <Row className="justify-content-center">
//             {/* Left Column */}
//             <Col md={3} lg={2} className="jobpre_leftpanel px-2">
//               <h6>Profile</h6>
//               <ul className="checklist">
//                 <li
//                   className={`${
//                     profileformData?.name &&
//                     profileformData?.email &&
//                     profileformData?.phone &&
//                     "active"
//                   }`}
//                 >
//                   <a href="#item_salary">
//                     Basic Details <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>

//                 <li className={`${ResumeFile && "active"}`}>
//                   <a href="#item_edu">
//                     Resume <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>
//                 <li
//                   className={`${
//                     profileformData?.AvailableBy &&
//                     isYes?.CurrentlyWorkingToggle &&
//                     profileformData?.NoticePeriod &&
//                     isYes?.NoticeBuyOutToggle &&
//                     "active"
//                   }`}
//                 >
//                   <a href="#item_Exp">
//                     Availability <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>
//                 <li
//                   className={`${profileformData?.ExpectedSalary && "active"}`}
//                 >
//                   <a href="#item_Target">
//                     Expected Salary{" "}
//                     <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>
//                 <li className={`${isAllEducationFieldsFilled && "active"}`}>
//                   <a href="#item_lang">
//                     Education <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>
//                 <li
//                   className={`${isAllWorkExperienceFieldsFilled && "active"}`}
//                 >
//                   <a href="#item_Geog">
//                     Experience <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>
//                 <li
//                   className={`${
//                     selectedSpokenLanguageUids.length &&
//                     selectedWrittenLanguageUids.length &&
//                     "active"
//                   }`}
//                 >
//                   <a href="#item_Geog">
//                     Language <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>

//                 <li
//                   className={`${profileformData?.CurrentLocation && "active"}`}
//                 >
//                   <a href="#item_Geog">
//                     Geography <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>
//                 <li className={`${selectedSkills.length > 0 && "active"}`}>
//                   <a href="#item_Geog">
//                     Skills <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>

//                 <li
//                   className={
//                     Object.keys(selectedAnswers).length > 0 ? "active" : ""
//                   }
//                 >
//                   <a href="#item_Geog">
//                     Custom Questions{" "}
//                     <i class="fa fa-check" aria-hidden="true"></i>
//                   </a>
//                 </li>
//               </ul>
//             </Col>

//             {/* Center Column */}
//             <Col md={7} lg={8} className="jobMain_panel">
//               <div className="custom-card">
//                 <h6>Basic Details</h6>

//                 <Row>
//                   <Col md={2}>
//                     <Form.Label>Name</Form.Label>
//                   </Col>

//                   <Col md={8}>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter full name"
//                       size="sm"
//                       style={{ width: "350px" }}
//                       name="name"
//                       value={profileformData.name}
//                       onChange={handleProfileDetailsChange}
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                       isInvalid={touchedFields.name && !!errors.name}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.name}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3 mt-2">
//                   <Col md={2}>
//                     <Form.Label>Email</Form.Label>
//                   </Col>

//                   <Col>
//                     <Form.Control
//                       type="email"
//                       placeholder="email@mail.com"
//                       size="sm"
//                       style={{ width: "350px" }}
//                       name="email"
//                       value={profileformData.email}
//                       onChange={handleProfileDetailsChange}
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                       isInvalid={touchedFields.email && !!errors.email}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.email}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3 mt-2">
//                   <Col md={2}>
//                     <Form.Label>Confirm Email ID</Form.Label>
//                   </Col>

//                   <Col>
//                     <Form.Control
//                       type="email"
//                       placeholder="email@mail.com"
//                       size="sm"
//                       style={{ width: "350px" }}
//                       name="confirmEmail"
//                       value={profileformData.confirmEmail}
//                       onChange={handleProfileDetailsChange}
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                       isInvalid={
//                         touchedFields.confirmEmail && !!errors.confirmEmail
//                       }
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.confirmEmail}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3 mt-2">
//                   <Col md={2}>
//                     <Form.Label>Phone No.</Form.Label>
//                   </Col>

//                   <Col>
//                     <Form.Control
//                       type="text"
//                       placeholder="9876543210"
//                       size="sm"
//                       style={{ width: "350px" }}
//                       name="phone"
//                       value={profileformData.phone}
//                       onChange={handleProfileDetailsChange}
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                       isInvalid={touchedFields.phone && !!errors.phone}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.phone}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Row>
//               </div>

//               <div className="custom-card">
//                 <h6>Resume</h6>

//                 <Row className="mb-3 mt-2">
//                   <Col xs="auto" className="text-center">
//                     <Form.Label>Add Document</Form.Label>
//                   </Col>

//                   <Col>
//                     {!ResumeFile && (
//                       <div
//                         className="cmp_uploder file-upload-box"
//                         {...getRootProps()}
//                       >
//                         <div className="upload-content">
//                           <input {...getInputProps()} />
//                           <i className="fas fa-cloud-upload-alt upload-icon"></i>
//                           <h5>
//                             <strong className="text-primary">
//                               Click to upload
//                             </strong>{" "}
//                             or Drag & Drop
//                           </h5>
//                           <small className="text-muted mb-0">
//                             PDF or Doc. Should be less than 2 MB
//                           </small>
//                         </div>
//                       </div>
//                     )}
//                     {!ResumeFile && (
//                       <p className="error">{errors.ResumeFile}</p>
//                     )}

//                     {error && (
//                       <Alert variant="danger" className="mt-2">
//                         {error}
//                       </Alert>
//                     )}

//                     {/* Display Selected File Details and Upload Button */}
//                     {ResumeFile && (
//                       <>
//                         <div className="selected_logo">
//                           <p>{ResumeFile?.name || ResumeFileName}</p>

//                           <div className="d-flex">
//                             <Button
//                               variant="link"
//                               className=" me-2"
//                               onClick={handleDeleteImage}
//                             >
//                               <img src={imgpTrash} />
//                             </Button>
//                           </div>
//                         </div>
//                         <small className="text-muted mb-0">
//                           PDF or Doc. Should be less than 2 MB
//                         </small>
//                       </>
//                     )}
//                   </Col>
//                 </Row>
//               </div>

//               <div className="custom-card">
//                 <h6>Availability</h6>
//                 <Row className="mb-3 mt-2">
//                   <Col md={2}>
//                     <Form.Label>Available by</Form.Label>
//                   </Col>

//                   <Col>
//                     <Form.Control
//                       name="AvailableBy"
//                       type="date"
//                       placeholder="DD/MM/YYYY"
//                       style={{ width: "350px" }}
//                       value={profileformData?.AvailableBy}
//                       onChange={handleProfileDetailsChange}
//                       isInvalid={!!errors.AvailableBy}
//                     />
//                   </Col>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.AvailableBy}
//                   </Form.Control.Feedback>
//                 </Row>

//                 <Row className="mb-3 mt-2">
//                   <Col md={2}>
//                     <Form.Label>Currently Working?</Form.Label>
//                   </Col>

//                   <Col>
//                     <Row className="align-items-center">
//                       {/* Left Label for "No" */}
//                       <Col xs="auto">
//                         <Form.Label
//                         className="mb-0"
//                           style={{
//                             color: isYes?.CurrentlyWorkingToggle
//                               ? "grey"
//                               : "black",
//                           }}
//                         >
//                           {!isYes?.CurrentlyWorkingToggle ? "No" : "No"}
//                         </Form.Label>
//                       </Col>

//                       <Col xs="auto">
//                         <Form.Check
//                           type="switch"
//                           id="custom-switch"
//                           checked={isYes?.CurrentlyWorkingToggle}
//                           onChange={() =>
//                             handleSwitchChange("CurrentlyWorkingToggle")
//                           }
//                         />
//                       </Col>

//                       <Col xs="auto">
//                         <Form.Label
//                         className="mb-0"
//                           style={{
//                             color: isYes?.CurrentlyWorkingToggle
//                               ? "black"
//                               : "grey",
//                           }}
//                         >
//                           {isYes?.CurrentlyWorkingToggle ? "Yes" : "Yes"}
//                         </Form.Label>
//                       </Col>
//                     </Row>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3 mt-2">
//                   <Col md={2}>
//                     <Form.Label>Notice Period</Form.Label>
//                   </Col>

//                   <Col>
//                     <Form.Control
//                       type="text"
//                       placeholder="2 weeks"
//                       size="sm"
//                       style={{ width: "350px" }}
//                       name="NoticePeriod"
//                       value={profileformData?.NoticePeriod}
//                       onChange={handleProfileDetailsChange}
//                       isInvalid={!!errors.NoticePeriod}
//                     />
//                   </Col>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.NoticePeriod}
//                   </Form.Control.Feedback>
//                 </Row>

//                 <Row className="mb-3 mt-2">
//                   <Col md={2}>
//                     <Form.Label>Notice Buyout Available</Form.Label>
//                   </Col>

//                   <Col>
//                     <Row className="align-items-center">
//                       <Col xs="auto">
//                         <Form.Label
//                         className="mb-0"
//                           style={{
//                             color: isYes?.NoticeBuyOutToggle ? "grey" : "black",
//                           }}
//                         >
//                           {!isYes?.NoticeBuyOutToggle ? "No" : "No"}
//                         </Form.Label>
//                       </Col>

//                       <Col xs="auto">
//                         <Form.Check
//                           type="switch"
//                           id="custom-switch"
//                           checked={isYes?.NoticeBuyOutToggle}
//                           onChange={() =>
//                             handleSwitchChange("NoticeBuyOutToggle")
//                           }
//                         />
//                       </Col>

//                       <Col xs="auto">
//                         <Form.Label
//                         className="mb-0"
//                           style={{
//                             color: isYes?.NoticeBuyOutToggle ? "black" : "grey",
//                           }}
//                         >
//                           {isYes?.NoticeBuyOutToggle ? "Yes" : "Yes"}
//                         </Form.Label>
//                       </Col>
//                     </Row>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3 mt-2">
//                   <Col md={2}>
//                     <Form.Label>Willing to Travel for Job?</Form.Label>
//                   </Col>

//                   <Col>
//                     <Row className="align-items-center">
//                       <Col xs="auto">
//                         <Form.Label
//                         className="mb-0"
//                           style={{
//                             color: isYes?.willingToTeavelJob ? "grey" : "black",
//                           }}
//                         >
//                           {!isYes?.willingToTeavelJob ? "No" : "No"}
//                         </Form.Label>
//                       </Col>

//                       <Col xs="auto">
//                         <Form.Check
//                           type="switch"
//                           id="custom-switch"
//                           checked={isYes?.willingToTeavelJob}
//                           onChange={() =>
//                             handleSwitchChange("willingToTeavelJob")
//                           }
//                         />
//                       </Col>

//                       <Col xs="auto">
//                         <Form.Label
//                         className="mb-0"
//                           style={{
//                             color: isYes?.willingToTeavelJob ? "black" : "grey",
//                           }}
//                         >
//                           {isYes?.willingToTeavelJob ? "Yes" : "Yes"}
//                         </Form.Label>
//                       </Col>
//                     </Row>
//                   </Col>
//                 </Row>
//               </div>

//               <div className="custom-card">
//                 <h6>Salary</h6>
//                 <Row className="mb-3 d-flex align-items-center">
//                   {" "}
//                   <Col xs="auto">
//                     <Form.Label>Expected Salary</Form.Label>
//                   </Col>
//                   <Col>
//                     <Form.Select
//                     className="form-control-sm mx-w350"
//                       aria-label="Default select example"
//                       name="ExpectedSalary"
//                       value={profileformData?.ExpectedSalary}
//                       onChange={handleProfileDetailsChange}
//                       isInvalid={!!errors.ExpectedSalary}
//                       required
//                     >
//                       <option>Expected Salary</option>
//                       <option value="15K">₹5 LPA - ₹ 10 LPA</option>
//                       <option value="20K">₹15 LPA - ₹ 20 LPA</option>
//                       <option value="30K">₹25 LPA - ₹ 30 LPA</option>
//                     </Form.Select>
//                     <Form.Control.Feedback type="invalid" className="error">
//                       {errors.ExpectedSalary}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Row>
//               </div>

//               <div className="custom-card">
//                 <h6>Educational Qualification</h6>
//                 {EducationRows.map((row, index) => (
//                   <Row
//                     className="mb-3 d-flex align-items-center border-top"
//                     key={index}
//                   >
//                     <Col md={2}>
//                       <h6>Level</h6>
//                       <Form.Select
//                         name="level"
//                         value={row.level}
//                         onChange={(e) =>
//                           handleEducationQualificationChange(index, e)
//                         }
//                       >
//                         <option>Level</option>

//                         <option value="High school">High school</option>
//                         <option value="Bachelors Degree">
//                           Bachelors Degree
//                         </option>
//                         <option value="Master Degree">Master Degree</option>
//                         <option value="Diploma ">Diploma </option>
//                         <option value="PG Diploma">PG Diploma</option>
//                         <option value="PhD">PhD</option>
//                         <option value="Post Doctorate">Post Doctorate</option>
//                       </Form.Select>
//                     </Col>
//                     <Col md={3}>
//                       <h6>Area of Education</h6>
//                       <Form.Control
//                         name="areaOfEducation"
//                         type="text"
//                         placeholder="9876543210"
//                         size="sm"
//                         value={row.areaOfEducation}
//                         onChange={(e) =>
//                           handleEducationQualificationChange(index, e)
//                         }
//                       />
//                     </Col>
//                     <Col md={2}>
//                       <h6>Grad. Year</h6>
//                       <Form.Control
//                         name="gradYear"
//                         type="date"
//                         value={row.gradYear}
//                         onChange={(e) =>
//                           handleEducationQualificationChange(index, e)
//                         }
//                       />
//                     </Col>
//                     <Col md={2} className="p-4">
//                       <h6>University</h6>
//                       <Form.Control
//                         name="university"
//                         type="text"
//                         placeholder="University"
//                         size="sm"
//                         value={row.university}
//                         onChange={(e) =>
//                           handleEducationQualificationChange(index, e)
//                         }
//                       />
//                     </Col>
//                     <Col md={2}>
//                       <h6>Grade</h6>
//                       <Form.Control
//                         name="grade"
//                         type="text"
//                         placeholder="grade"
//                         size="sm"
//                         value={row.grade}
//                         onChange={(e) =>
//                           handleEducationQualificationChange(index, e)
//                         }
//                       />
//                       <Form.Select value={"GPA"}>
//                         <option>GPA</option>
//                       </Form.Select>
//                     </Col>
//                     <Col md={1}>
//                       <img
//                         src={imgpTrash}
//                         alt="Delete"
//                         style={{ width: "20px", height: "20px" }}
//                         onClick={() => EducationdeleteRow(index)}
//                       />

//                       <Button
//                         variant="link"
//                         className="p-0"
//                         onClick={() => saveQualificationData(row)}
//                       >
//                         Save
//                       </Button>
//                     </Col>
//                   </Row>
//                 ))}
//                 <Button onClick={EducationAddRow}>+ Add</Button>
//               </div>

//               <div className="custom-card">
//                 <h6>Work Experience</h6>

//                 {WorkExpreienceRow.map((row, index) => (
//                   <div key={index}>
//                     <Row>
//                       <Col xs="auto" className="text-center">
//                         <Form.Label>Total Work Experience</Form.Label>
//                       </Col>

//                       <Col>
//                         <Form.Control
//                           type="text"
//                           placeholder=""
//                           size="sm"
//                           style={{ width: "350px" }}
//                           value={row?.TotalWorkExperience}
//                           name="TotalWorkExperience"
//                           onChange={(e) => handleWorkExpeienceChange(index, e)}
//                         />
//                       </Col>
//                     </Row>

//                     <Row className="mb-3 d-flex align-items-center border-top mt-2">
//                       <Col md={2}>
//                         <h6>Role</h6>
//                         <Form.Control
//                           type="text"
//                           placeholder="9876543210"
//                           size="sm"
//                           style={{ width: "150px" }}
//                           value={row?.WorkRole}
//                           name="WorkRole"
//                           onChange={(e) => handleWorkExpeienceChange(index, e)}
//                         />
//                       </Col>
//                       <Col md={2}>
//                         <h6>From</h6>
//                         <Form.Control
//                           placeholder="June 2019"
//                           size="sm"
//                           style={{ width: "150px" }}
//                           type="date"
//                           value={row?.WorkFrom}
//                           name="WorkFrom"
//                           onChange={(e) => handleWorkExpeienceChange(index, e)}
//                         />
//                       </Col>
//                       <Col md={2}>
//                         <h6>To</h6>
//                         <Form.Control
//                           type="date"
//                           placeholder="May 2022"
//                           size="sm"
//                           style={{ width: "150px" }}
//                           value={row?.WorkTo}
//                           name="WorkTo"
//                           onChange={(e) => handleWorkExpeienceChange(index, e)}
//                         />
//                       </Col>
//                       <Col md={3} className="p-4">
//                         <h6> Company</h6>
//                         <Form.Control
//                           type="text"
//                           placeholder="9876543210"
//                           size="sm"
//                           style={{ width: "150px" }}
//                           value={row?.WorkComapny}
//                           name="WorkComapny"
//                           onChange={(e) => handleWorkExpeienceChange(index, e)}
//                         />
//                       </Col>
//                       <Col md={2} className="p-4">
//                         <h6> Industry</h6>
//                         <Form.Control
//                           type="text"
//                           placeholder="9876543210"
//                           size="sm"
//                           style={{ width: "150px" }}
//                           name="WorkIndustry"
//                           value={row?.WorkIndustry}
//                           onChange={(e) => handleWorkExpeienceChange(index, e)}
//                         />
//                       </Col>
//                       {showInput && (
//                         <div style={{ marginTop: "10px" }}>
//                           <Form>
//                             <Form.Group controlId="noteInput">
//                               <Form.Label>Note</Form.Label>
//                               <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 value={row?.WorkNote}
//                                 name="WorkNote"
//                                 onChange={(e) =>
//                                   handleWorkExpeienceChange(index, e)
//                                 }
//                                 placeholder="Write your note here..."
//                               />
//                             </Form.Group>
//                           </Form>
//                         </div>
//                       )}
//                       <Col md={1} className="p-4">
//                         <Button
//                           variant="link"
//                           className="p-0"
//                           onClick={handleButtonClick}
//                         >
//                           Note
//                         </Button>

//                         <Button
//                           variant="link"
//                           className="p-0"
//                           onClick={() => saveWorkExperienceData(row)}
//                         >
//                           Save
//                         </Button>
//                       </Col>

//                       <Col md={1}>
//                         <img
//                           src={imgpTrash}
//                           alt="Delete"
//                           style={{ width: "20px", height: "20px" }}
//                           onClick={() => WorkExperienceDeleteRow(index)}
//                         />
//                       </Col>
//                     </Row>
//                   </div>
//                 ))}

//                 <Button onClick={WorkExpreienceAddRow}>+ Add</Button>
//               </div>

//               <div className="custom-card">
//                 <h6>Language</h6>
//                 <p>Pick as many as possible</p>

//                 <Row>
//                   <Form.Group
//                     className="mb-3 col-md-6"
//                     controlId="exampleForm.ControlTextarea1"
//                   >
//                     <Form.Label className="sm-label">
//                       Spoken Language
//                     </Form.Label>
//                     <div className="tagarea p-2">
//                       {jobPostData?.spoken_language?.map((item, index) => (
//                         <Badge
//                           key={index}
//                           bg={
//                             selectedSpokenLanguageUids.includes(item.uid)
//                               ? "primary"
//                               : "white"
//                           }
//                           className="me-2 mb-2 tag-white"
//                           onClick={() => handleSpokenLanguageClick(item.uid)}
//                           style={{
//                             cursor: "pointer",
//                             backgroundColor:
//                               selectedSpokenLanguageUids.includes(item.uid)
//                                 ? "#007bff"
//                                 : "transparent",
//                             color: selectedSpokenLanguageUids.includes(item.uid)
//                               ? "#fff"
//                               : "#007bff",
//                           }}
//                         >
//                           {item?.language_name}
//                         </Badge>
//                       ))}
//                     </div>
//                     <span className="required_text">
//                       Select all spoken languages
//                     </span>
//                   </Form.Group>
//                   <Form.Group
//                     className="mb-3 col-md-6"
//                     controlId="exampleForm.ControlTextarea1"
//                   >
//                     <Form.Label className="sm-label">
//                       Written and Reading Language
//                     </Form.Label>
//                     <div className="tagarea p-2">
//                       {jobPostData?.read_write_language?.map((item, index) => (
//                         <Badge
//                           key={index}
//                           bg={
//                             selectedWrittenLanguageUids.includes(item.uid)
//                               ? "primary"
//                               : "white"
//                           }
//                           className="me-2 mb-2 tag-white"
//                           onClick={() => handleWrittenLanguageClick(item.uid)}
//                           style={{
//                             cursor: "pointer",
//                             backgroundColor:
//                               selectedWrittenLanguageUids.includes(item.uid)
//                                 ? "#007bff"
//                                 : "transparent",
//                             color: selectedWrittenLanguageUids.includes(
//                               item.uid
//                             )
//                               ? "#fff"
//                               : "#007bff",
//                           }}
//                         >
//                           {item?.language_name}
//                         </Badge>
//                       ))}
//                     </div>
//                     <span className="required_text">
//                       Select all written and reading languages
//                     </span>
//                   </Form.Group>
//                 </Row>
//               </div>

//               <div className="custom-card">
//                 <h6>Geography</h6>

//                 <Row className="mb-3">
//                   <Col xs="auto" className="text-center">
//                     <Form.Label>Current Location</Form.Label>
//                   </Col>

//                   <Col>
//                     <Form.Control
//                       type="text"
//                       placeholder="Current Location"
//                       size="sm"
//                       style={{ width: "350px" }}
//                       name="CurrentLocation"
//                       value={profileformData?.CurrentLocation}
//                       onChange={handleProfileDetailsChange}
//                       isInvalid={!!errors.CurrentLocation}
//                     />
//                   </Col>

//                   <Form.Control.Feedback type="invalid">
//                     {errors.CurrentLocation}
//                   </Form.Control.Feedback>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col xs="auto" className="text-center">
//                     <Form.Label>Willing to relocate to XXXXXXXX</Form.Label>
//                   </Col>
//                   <Col>
//                     <div className="d-flex justify-content-start">
//                       <Form.Check
//                         type="radio"
//                         label="Yes"
//                         name="relocationChoice"
//                         id="relocationChoice1"
//                         className="mr-3"
//                         value="true"
//                         checked={profileformData.relocationChoice == true}
//                         onChange={handleProfileDetailsChange}
//                       />
//                       <Form.Check
//                         type="radio"
//                         label="No"
//                         name="relocationChoice"
//                         id="relocationChoice2"
//                         className="ml-3"
//                         value="false"
//                         checked={profileformData.relocationChoice == false}
//                         onChange={handleProfileDetailsChange}
//                       />
//                     </div>

//                     {errors.relocationChoice && (
//                       <p className="error">{errors.relocationChoice}</p>
//                     )}
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col xs="auto" className="text-center">
//                     <Form.Label>
//                       Require company assistance for relocation?
//                     </Form.Label>
//                   </Col>
//                   <Col>
//                     <div className="d-flex justify-content-start">
//                       <Form.Check
//                         type="radio"
//                         label="Yes"
//                         name="requiredCompanyAssist"
//                         id="requiredCompanyAssist1"
//                         className="mr-3"
//                         value="true"
//                         checked={profileformData.requiredCompanyAssist == true}
//                         onChange={handleProfileDetailsChange}
//                       />
//                       <Form.Check
//                         type="radio"
//                         label="No"
//                         name="requiredCompanyAssist"
//                         id="requiredCompanyAssist2"
//                         className="ml-3"
//                         value="false"
//                         checked={profileformData.requiredCompanyAssist == false}
//                         onChange={handleProfileDetailsChange}
//                       />
//                     </div>
//                     {errors.requiredCompanyAssist && (
//                       <p className="error">{errors.requiredCompanyAssist}</p>
//                     )}
//                   </Col>
//                 </Row>
//               </div>

//               <div className="custom-card">
//                 <h6>Skills</h6>
//                 <p>Please select 8 skills</p>

//                 {Object.keys(groupedSkills).map((groupName, index) => (
//                   <div key={index}>
//                     <strong>{groupName}</strong>
//                     <div>
//                       {groupedSkills[groupName].map((skill, idx) => (
//                         <span
//                           key={idx}
//                           className={`skill-tag mb-2 mr-2 ${
//                             selectedSkills.includes(skill.uid) ? "selected" : ""
//                           }`}
//                           onClick={() => handleSkillSelect(skill)}
//                           style={{
//                             padding: "5px 15px",
//                             border: "1px solid #007bff",
//                             borderRadius: "20px",
//                             cursor: "pointer",
//                             backgroundColor: selectedSkills.includes(skill.uid)
//                               ? "#007bff"
//                               : "transparent",
//                             color: selectedSkills.includes(skill.uid)
//                               ? "#fff"
//                               : "#007bff",
//                           }}
//                         >
//                           {skill?.skill_name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//                 {errors?.selectedSkills && (
//                   <p className="error">{errors?.selectedSkills}</p>
//                 )}
//               </div>

//               <div className="custom-card">
//                 <h6>Additional Question from Company</h6>
//                 {jobPostData?.question_job.map((item) => (
//                   <div key={item.id}>
//                     <h6>{item?.question_title}</h6>

//                     {item?.quiz_type === "MCQ" &&
//                       item?.question_option?.part1?.map((option, index) => (
//                         <Form.Check
//                           key={index}
//                           type="radio"
//                           label={option}
//                           name={`formHorizontalRadios-${item.id}`}
//                           id={`formHorizontalRadios-${item.id}-${index}`}
//                           className="mr-3"
//                           onChange={() => handleAnswerChange(item?.uid, option)}
//                         />
//                       ))}

//                     {item?.quiz_type === "Text" && (
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter your answer"
//                         className="mb-3"
//                       />
//                     )}

//                     {item?.quiz_type === "Checkbox" &&
//                       item?.question_option?.part1?.map((option, index) => (
//                         <Form.Check
//                           key={index}
//                           type="checkbox"
//                           label={option}
//                           name={`formCheckbox-${item.id}`}
//                           id={`formCheckbox-${item.id}-${index}`}
//                           className="mr-3"
//                         />
//                       ))}
//                   </div>
//                 ))}
//               </div>
//             </Col>
//             {/* Right Column */}
//             <Col md={3} lg={2} className="jobpre_Rightpanel">
//               <div className="custom-card">
//                 <h6>{profileformData?.name}</h6>
//                 <p>{profileformData?.email}</p>
//                 <p>{profileformData?.phone}</p>
//                 <p>{ResumeFile?.name}</p>
//                 <p>
//                   <strong>Availability</strong>
//                 </p>
//                 {profileformData?.AvailableBy ? (
//                   <p>{profileformData?.AvailableBy}</p>
//                 ) : (
//                   <p className="error" style={{ color: "red" }}>
//                     Not defined
//                   </p>
//                 )}
//                 <p>{isYes?.CurrentlyWorkingToggle}</p>
//                 <p>{profileformData?.NoticePeriod}</p>
//                 <p>{isYes?.NoticeBuyOutToggle}</p>
//                 <p>
//                   <strong>Salary</strong>
//                 </p>
//                 {profileformData?.ExpectedSalary ? (
//                   <p>{profileformData?.ExpectedSalary}</p>
//                 ) : (
//                   <p className="error" style={{ color: "red" }}>
//                     Not defined
//                   </p>
//                 )}
//                 <p>
//                   <strong>Educational Qualification</strong>
//                 </p>
//                 {EducationRows.map((row, index) => (
//                   <div key={index}>
//                     <p>{row.level}</p>
//                     <p>{row.areaOfEducation}</p>
//                     <p>{row.gradYear}</p>
//                     <p>{row.university}</p>
//                     <p>{row.grade}</p>
//                   </div>
//                 ))}
//                 {EducationRows.length === 0 && (
//                   <p className="error" style={{ color: "red" }}>
//                     Not defined
//                   </p>
//                 )}
//                 <p>
//                   <strong>Work Experience : </strong>
//                 </p>
//                 {WorkExpreienceRow.map((row, index) => (
//                   <div key={index}>
//                     <p>{row.TotalWorkExperience}</p>
//                     <p>{row.WorkRole}</p>
//                     <p>{row.WorkFrom}</p>
//                     <p>{row.WorkTo}</p>
//                     <p>{row.WorkComapny}</p>
//                     <p>{row.WorkIndustry}</p>
//                     <p>{row.WorkNote}</p>
//                   </div>
//                 ))}
//                 <p>
//                   <strong>Language</strong>
//                 </p>
//                 {jobPostData?.spoken_language?.map((item) => (
//                   <p>{item.language_name}</p>
//                 ))}

//                 <p>
//                   <strong>Geography</strong>
//                 </p>
//                 <p>{profileformData?.CurrentLocation}</p>
//               </div>
//             </Col>
//           </Row>

//           <Button
//             variant="light"
//             style={{ marginLeft: 150 }}
//             onClick={() => handleSaveAsDraft()}
//           >
//             Save as Draft
//           </Button>
//           <Button
//             disabled={!validationEnable}
//             variant="primary"
//             onClick={() => handleSubmit()}
//           >
//             Submit
//           </Button>
//         </Container>

//         <div>
//           <Modal show={showModal.showSaveAsDraft} onHide={handleCloseModals}>
//             <Modal.Header closeButton>
//               <Modal.Title>
//                 Are you sure you want to exit without submitting?
//               </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               Your details will be saved as a draft, and you can log in with{" "}
//               {profileformData?.email} later to finish your application.
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="light" onClick={handleCloseModals}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={() => handleFormDetailsApi()}>
//                 Save
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </div>

//         <div>
//           <Modal show={showModal.showSaveModal} onHide={handleCloseModals}>
//             <Modal.Header closeButton>
//               <Modal.Title>
//                 Your application has been successfully submitted.
//               </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               You can view your progress and complete the next steps by logging
//               into LYWO with {profileformData?.email}.
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="light" onClick={() => handleFormDetailsApi()}>
//                 Return to Job
//               </Button>
//               <Button variant="primary" onClick={handleProceedBtn}>
//                 Proceed to Behavioral Test
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </Modal.Body>
//       <Modal.Footer></Modal.Footer>
//     </Modal>
//   );
// };

// export default ApplicationJobPostModal;

//dinesh sir code 20 feb

import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import imgpTrash from "../../images/icons/trash-01.svg";
import saveIcon from "../../images/icons/save_pc .svg";
import logoIcon from "../../images/logo_icon.png";
import closeBtn from "../../images/icons/closeX.svg";
import uploadIcon from "../../images/upload_gray.svg";

import {
  ApplicationDeatilsApi,
  ApplicationFormDetailsApi,
  ApplicationJobApi,
  CreateJobIsLike,
  CreateJobLocation,
  EducationQualificationApi,
  getQualificationListApi,
  getSkillGroupDetailsApi,
  WorkExperienceApi,
} from "../../services/provider";
import axios from "axios";
import { compose } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../helpers/helper";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ApplicantFormValidation } from "../../utils/validation";
import { toast } from "react-toastify";

const ApplicationJobPostModal = ({
  show,
  handleClose,
  jobPostData,
  updateButtonText,
  registerdUserLoginDetails,
  viewDetailData,
  profileformData, setProfileFormData, isYes, setIsYes,
  storedApplicantId, setStoredApplicantId, selectedSpokenLanguageUids, setSelectedSpokenLanguageUids,
  selectedWrittenLanguageUids, setSelectedWrittenLanguageUids, selectedSkills, setSelectedSkills,
  ResumeFile, setResumeFile, ResumeFileName, setResumeFileName,
  EducationRows, SetEducationRows, setBehaviourAssModel, WorkExpreienceRow, setWorkExpreienceRow,
  isExistApplicantError, setIsExistApplicantError, spokenLanguageBadges, setSpokenLanguageBadges,
  rdnwBadges, setrdnwBadges, totalWorkExperience, settotalWorkExperience, handleViewDetailsAPi
}) => {
  // const [isYes, setIsYes] = useState({
  //   CurrentlyWorkingToggle: false,
  //   NoticeBuyOutToggle: false,
  //   willingToTeavelJob: false,
  // });
  // const [ResumeFile, setResumeFile] = useState(null);
  // const [ResumeFileName, setResumeFileName] = useState("");
  const [error, setError] = useState(null);
  const [showNotesByIndex, setShowNotesByIndex] = useState([])
  const [ApplicantProfileData, setApplicantProfileData] = useState(null);
  const [dynamicArray, setDynamicArray] = useState([]);
  const [skillError, setSkillError] = useState("")
  const [selectedGroupUid, setSelectedGroupUid] = useState([]);
  const [skillGroupData, setSkillGroupsData] = useState([]);
  const countryCodes = ["+91"];
  const [countryCode, setCountryCode] = useState("+91");
  const [spokenLanguage, setSpokenLanguage] = useState([])
  const [writtenLanguage, setWittenLanguage] = useState([])
  const [locationList, setLocationList] = useState([])
  const [isOpen, setIsOpen] = useState({});

  // const [geographyLocaton,setGeographyLocaton] = useState("")
  // const [selectedSpokenLanguageUids, setSelectedSpokenLanguageUids] = useState(
  //   []
  // );
  const navigate = useNavigate();
  const isBinaryFile = (file) => {
    // List of common binary MIME types
    const binaryMimeTypes = [
      "application/pdf",
      "application/octet-stream", // Generic binary file
      "image/png",
      "image/jpeg",
      "image/gif",
      "application/zip",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
      "application/x-executable", // EXE
    ];

    return binaryMimeTypes.includes(file.type);
  };
  // const [selectedWrittenLanguageUids, setSelectedWrittenLanguageUids] =
  //   useState([]);

  // const [EducationRows, SetEducationRows] = useState([
  //   {
  //     level: "",
  //     areaOfEducation: "",
  //     gradYear: "",
  //     university: "",
  //     grade: "",
  //     saved: false,
  //   },
  // ]);

  // const [WorkExpreienceRow, setWorkExpreienceRow] = useState([
  //   {
  //     TotalWorkExperience: "",
  //     WorkRole: "",
  //     WorkFrom: "",
  //     WorkTo: "",
  //     WorkComapny: "",
  //     WorkIndustry: "",
  //     WorkNote: "",
  //     savedWorkExp: false,
  //   },
  // ]);

  // const [profileformData, setProfileFormData] = useState({
  //   name: "",
  //   email: "",
  //   confirmEmail: "",
  //   phone: "",
  //   Qualification: "",
  //   AvailableBy: "",
  //   NoticePeriod: "",
  //   ExpectedSalary: "",
  //   TotalWorkExperience: "",
  //   CurrentLocation: "",
  //   relocationChoice: null,
  //   requiredCompanyAssist: null,
  // });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    Qualification: "",
    ResumeFile: null,
    AvailableBy: "",
    CurrentlyWorkingToggle: "",
    NoticePeriod: "",
    ExpectedSalary: "",
    TotalWorkExperience: "",
    CurrentLocation: "",
    relocationChoice: "",
    requiredCompanyAssist: "",
    selectedSkills: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAllFormDetailsValid, setisAllFormDetailsValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    confirmEmail: false,
    phone: false,
  });
  // const [selectedSkills, setSelectedSkills] = useState([]);
  const [showModal, setShowModal] = useState({
    showSaveAsDraft: false,
    showSaveModal: false,
  });
  const [inputValue, setInputValue] = useState("");
  const [aresEducationOption, setAreaEducationOption] = useState([])
  const [roleList, setRoleList] = useState([]);
  const [industriesList, setIndustriesList] = useState([]);
  // const [spokenLanguageBadges, setSpokenLanguageBadges] = useState([]);
  // const [rdnwBadges, setrdnwBadges] = useState([]);
  // const [storedApplicantId, setStoredApplicantId] = useState("");

  const handleCloseModals = () => {
    setShowModal({
      showSaveAsDraft: false,
      showSaveModal: false,
    });
  };

  const handleShowModal = (modalName) => {
    if (modalName === "SaveAsDraft") {
      // setShowModal({
      //   showSaveAsDraft: true,
      //   showSaveModal: false
      // })
      setShowModal({
        ...showModal,
        ["showSaveAsDraft"]: true
      })
    } else if (modalName === "Save") {
      // setShowModal({
      //   showSaveAsDraft: false,
      //   showSaveModal: true
      // })
      setShowModal({
        ...showModal,
        ["showSaveModal"]: true
      })
    }
  };
  const groupedSkills = jobPostData?.skills?.reduce((acc, skill) => {
    const groupName = skill?.skill_group?.skill_group_name;
    if (!selectedGroupUid.includes(skill?.skill_group?.uid)) {
      setSelectedGroupUid([...selectedGroupUid, skill?.skill_group?.uid])
    }
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(skill);
    return acc;
  }, {});

  const getTotalValues = (array) => {
    return array.reduce((total, arr) => total + arr.length, 0);
  };
  const handleSkillSelect = (skill, index, groupname) => {
    setSkillError("")
    const array = groupedSkills[groupname].length + 1;
    setDynamicArray((prevArray) => {
      const totalValues = getTotalValues(prevArray);
      return prevArray.map((arr, i) => {
        if (i === index && arr.length < array && !arr.includes(skill)) {
          return [...arr, skill];
        } else if (i === index && arr.includes(skill)) {
          if (arr.length === 1) { setSkillError("A minimum of 1 to be selected from each Skill Group") }
          return arr.filter((item2) => item2 !== skill);
        }
        //validation
        else if (i === index && !arr.includes(skill)) {
          setSkillError("No more skills can be selected")
        } else if (Object.keys(groupedSkills).map((groupName) => groupedSkills[groupName]).flat().length === 8) {
          setSkillError("maximum of [N+1] [N+1] be selected from all Skill Group")
        }
        return arr;
      });
    });
    // setDynamicArray((prevArray) => {
    //   const totalValues = getTotalValues(prevArray);
    //   return prevArray.map((arr, i) => {
    //     if (i === index && arr.length < 8 && totalValues < 12 && !arr.includes(skill)) {
    //       return [...arr, skill];
    //     } else if (i === index && arr.includes(skill)) {
    //       return arr.filter((item2) => item2 !== skill);
    //     }
    //     //validation on skills
    //     else if (i === index && totalValues < 12 && !arr.includes(skill)) {
    //       setSkillError(" A maximum of 70% or (N-3) which ever is lower can be selected from any Skill Group")
    //     } else if (totalValues === 12) {
    //       setSkillError("There cannot be more than 12 Skills within a Skill Group and There have to be a minimum of 5 Skills within a Skill Group")
    //     }//end validation
    //     return arr;
    //   });
    // });

    // if (selectedSkills.includes(skill.uid)) {
    //   setSelectedSkills(
    //     selectedSkills.filter((selectedSkill) => selectedSkill !== skill.uid)
    //   );
    // } else {
    //   if (selectedSkills.length < 8) {
    //     setSelectedSkills([...selectedSkills, skill.uid]);
    //   } else {
    //     alert("You can only select upto 8 skills.");
    //   }
    // }
  };
  useEffect(() => {
    setSelectedSkills(dynamicArray.flat()?.map((val) => val?.uid))
  }, [dynamicArray])
  console.log('AAAAAAAAAAAAAAAAAAAAAAA', selectedSkills)

  const handleAreaOfEducation = async (index, e) => {
    const { name, value } = e.target;
    const newRows = [...EducationRows];
    newRows[index]["areaOfEducation"] = value;
    let search = newRows[index]["areaOfEducation"]
    SetEducationRows(newRows);
    setIsOpen((prev) => ({ ...prev, [index]: true }));
    let url;

    try {
      if (value != "") {
        url = `https://bittrend.shubansoftware.com/assets-api/education-qualification-list-by-course-api?page=1&limit=10&search=${search}`;
        const response = await getQualificationListApi(url);
        if (response?.data?.response.length > 0) {
          setAreaEducationOption(response?.data?.response)
          // setBadges((prevBadges) => [
          //   ...prevBadges,
          //   response?.data?.response[0],
          // ]);
          // setInputValue("");          
        }
      } else {
        setAreaEducationOption([])
      }

    } catch (error) {
      console.log("error response----->>>>>>", error);
    }
  };
  const handleRolelist = (index, e) => {
    const { name, value } = e.target;
    const newWorkRow = [...WorkExpreienceRow];
    newWorkRow[index]["WorkRole"] = value;
    let search = newWorkRow[index]["WorkRole"]
    setWorkExpreienceRow(newWorkRow);
    setIsOpen((prev) => ({ ...prev, [index]: true }));
    const url = `https://bittrend.shubansoftware.com/assets-api/islike-list-api/?search=${search}&page=1&limit=10`;
    CreateJobIsLike(url)
      .then((res) => {
        if (res?.data?.success) {
          if (value) {
            setRoleList(res?.data?.response)
          }
        }
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.data?.detail?.includes(
            "Given token not valid for any token type"
          )
        ) {
          //console.log("Token expired, redirecting to login");
          removeToken();
          navigate("/loginwithpassword");
        }
      });
  };
  const handleIndustries = async (index, e) => {
    const { name, value } = e.target;
    const newWorkRow = [...WorkExpreienceRow];
    newWorkRow[index]["WorkIndustry"] = value;
    let search = newWorkRow[index]["WorkIndustry"]
    setWorkExpreienceRow(newWorkRow);
    setIsOpen((prev) => ({ ...prev, [index]: true }));
    if (typeof search !== "string" || search.trim() === "") {
      setIndustriesList([])
      return;
    }

    try {
      if (value != "") {
        const response = await axios.get(
          "https://bittrend.shubansoftware.com/account-api/industry-list-api/",
          {
            params: {
              page: 1,
              limit: 500,
              search: search,
            },
          }
        );
        if (response?.data?.success) {
          setIndustriesList(response.data.response)
        }
      } else {
        setIndustriesList([])
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const handleSelectAreaEducation = (index, value) => {
    const newRows = [...EducationRows];
    newRows[index]["areaOfEducation"] = value;
    SetEducationRows(newRows);
    setAreaEducationOption([]);
    setIsOpen((prev) => ({ ...prev, [index]: false }));
  }
  const handleWorkRole = (index, value) => {
    const newWorkRow = [...WorkExpreienceRow];
    newWorkRow[index]["WorkRole"] = value;
    setWorkExpreienceRow(newWorkRow);
    setRoleList([])
    setIsOpen((prev) => ({ ...prev, [index]: false }));
  };
  const handleSelectIndustries = (index, value) => {
    const newWorkRow = [...WorkExpreienceRow];
    newWorkRow[index]["WorkIndustry"] = value;
    setWorkExpreienceRow(newWorkRow);
    setIndustriesList([])
    setIsOpen((prev) => ({ ...prev, [index]: false }));
  }

  const handleKeyPressForlanguages = async (e, from) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      getLanguages(inputValue, from);
    }
  };
  const handleRemoveSpokenLanguageBadge = (index) => {
    setSpokenLanguageBadges((prevBadges) =>
      prevBadges.filter((_, i) => i !== index)
    );
  };
  const handleRemoveReadAndWriteLanguageBadge = (index) => {
    setrdnwBadges((prevBadges) => prevBadges.filter((_, i) => i !== index));
  };

  const getLanguages = async (inputVal, from) => {
    let url;
    if (inputVal != "") {
      url = `https://bittrend.shubansoftware.com/assets-api/laguage-list-api/?page=1&limit=10&search=${inputVal}`;
    }

    try {
      const response = await getQualificationListApi(url);
      if (response?.data?.response.length > 0) {
        if (inputVal) {
          if (from === "spoken") {
            setSpokenLanguageBadges((prevBadges) => [
              ...prevBadges,
              response?.data?.response[0],
            ]);
          } else if (from === "rdnw") {
            setrdnwBadges((prevBadges) => [
              ...prevBadges,
              response?.data?.response[0],
            ]);
          }

          setInputValue("");
        }
      }
    } catch (error) {
      console.log("error response----->>>>>>", error);
    }
  };
  const handleWaSlanguages = async (e, from) => {
    const { name, value } = e.target;
    let url;
    if (value != "") {
      url = `https://bittrend.shubansoftware.com/assets-api/laguage-list-api/?page=1&limit=10&search=${value}`;
    }

    try {
      if (value != "") {
        const response = await getQualificationListApi(url);
        if (response?.data?.response.length > 0) {

          if (from === "spoken") {
            setSpokenLanguage(response?.data?.response)
            // setSpokenLanguageBadges((prevBadges) => [
            //     ...prevBadges,
            //     response?.data?.response[0],
            // ]);
          } else if (from === "rdnw") {
            setWittenLanguage(response?.data?.response)
            // setrdnwBadges((prevBadges) => [
            //     ...prevBadges,
            //     response?.data?.response[0],
            // ]);
          }
          // setInputValue("");        
        }
      } else {
        setSpokenLanguage([])
        setWittenLanguage([])
      }
    } catch (error) {
      console.log("error response----->>>>>>", error);
    }
  };
  const handleSelectSpokenLang = (option) => {
    setSpokenLanguageBadges((prevBadges) => [
      ...prevBadges,
      option,
    ]);
    setSpokenLanguage([])
  }
  const handleSelectWrittenLang = (option) => {
    setrdnwBadges((prevBadges) => [
      ...prevBadges,
      option,
    ]);
    setWittenLanguage([])
  }

  const handleLocationAPIList = (e) => {
    const { name, value } = e.target;
    setProfileFormData({ ...profileformData, [name]: e.target.value })
    let url;
    if (value != "") {
      url = `https://bittrend.shubansoftware.com/account-api/location-list-api/?page=1&limit=500&search=${value}`;
    }
    try {
      if (value != "") {
        CreateJobLocation(url)
          .then((res) => {
            // setLocationData(res.data.response);
            if (res.data.response.length > 0) {
              setLocationList(res?.data?.response)
              //   setLocationBadges((prevBadges) => [
              //     ...prevBadges,
              //     res?.data?.response[0],
              //   ]);
            }
          })
          .catch((error) => {
            if (
              error?.response?.status === 401 ||
              error?.response?.data?.detail?.includes(
                "Given token not valid for any token type"
              )
            ) {
              //console.log("Token expired, redirecting to login");
              //   removeToken();
              //   navigate("/loginwithpassword");
            }
          });
      }
    } catch (error) {
      console.log(error)
    }
  };
  // useEffect(() => {
  //   if (profileformData?.CurrentLocation) {
  //     handleLocationAPIList()
  //   }
  // }, [profileformData?.CurrentLocation])
  const handleSelectGeographyLocaton = (value) => {
    setProfileFormData({
      ...profileformData,
      ["CurrentLocation"]: value
    })
    setLocationList([])
  }
  const getSelectedSkillsNames = () => {
    const selectedSkillNames = [];

    selectedSkills.forEach((uid) => {
      Object.keys(groupedSkills).forEach((groupName) => {
        const skill = groupedSkills[groupName].find(
          (skill) => skill.uid === uid
        );
        if (skill) {
          selectedSkillNames.push(skill.skill_name);
        }
      });
    });

    return selectedSkillNames;
  };

  const selectedSkillsNames = getSelectedSkillsNames();
  console.log("Selected Skill Names: ", selectedSkillsNames);

  const validateForProfileDetails = (newData) => {
    const newErrors = {};
    let formIsValid = true;

    if (!newData.name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }

    if (!newData.email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    }

    if (!newData.confirmEmail) {
      formIsValid = false;
      newErrors.confirmEmail =
        "Your application and progress are linked to this email. Please ensure it is entered correctly.";
    } else if (newData.email !== newData.confirmEmail) {
      formIsValid = false;
      newErrors.confirmEmail =
        "The email addresses do not match. Please check both fields and try again";
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!newData.phone) {
      formIsValid = false;
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(newData.phone)) {
      formIsValid = false;
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const isEducationFormValid = EducationRows.every((row) =>
    Object.values(row).every((field) => field !== "")
  );

  const isWorkExperienceFormValid = WorkExpreienceRow.every((row) =>
    Object.values(row).every((field) => field !== "")
  );

  const validationEnable =
    totalWorkExperience &&
    isEducationFormValid &&
    rdnwBadges.length !== 0 &&
    spokenLanguageBadges.length !== 0 &&
    profileformData?.CurrentLocation &&
    selectedSkills.length !== 0 &&
    profileformData?.CurrentLocation &&
    ResumeFile &&
    profileformData?.AvailableBy &&
    profileformData?.NoticePeriod &&
    profileformData?.ExpectedSalary;

  const handleProfileDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = { [name]: type === "radio" ? value === "true" : type === "checkbox" || type === "switch" ? checked : value }
    const { isErrors, isValid } = ApplicantFormValidation(newValue)
    setErrors({
      ...errors,
      ...isErrors
    });
    setProfileFormData({
      ...profileformData,
      ...newValue
    })
    setIsValid(isValid)
  };
  const handleWillingToTeavelJob = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSwitchChange = (toggleName) => {
    setIsYes((prevState) => ({
      ...prevState,
      [toggleName]: !prevState[toggleName],
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));
    // validateForProfileDetails();
  };

  const handleProfileDetailsApi = async () => {
    try {
      const formData = new FormData();
      formData.append("email", profileformData?.email);
      formData.append("user_name", profileformData?.name);
      formData.append("user_phone_number", profileformData?.phone);
      formData.append("job_uid", jobPostData?.uid);
      formData.append("applicant_status", "Draft");
      const response = await ApplicationJobApi(formData);
      if (response.status === 200) {
        setApplicantProfileData(response.data);
        setStoredApplicantId(response.data?.applcant?.uid);
        localStorage.setItem('authToken', response?.data?.user_login?.access)
        // localStorage.setItem('authToken',response?.data?.user_login?.access)
        localStorage.setItem(
          "applicantProfileData",
          JSON.stringify(response.data)
        );
        updateButtonText("Continue Btn");
        setIsValid(false);
      } else {
        console.error("Failed to save form: ", response.data);
        setIsValid(false);
      }
    } catch (error) {
      console.log("ERROR:", error);
      setStoredApplicantId(error?.response?.data?.user_login?.uid)
      localStorage.setItem('authToken', error?.response?.data?.user_login?.access)
      localStorage.setItem(
        "applicantProfileData",
        JSON.stringify(error?.response?.data)
      );
      updateButtonText("Continue Btn");
      setIsExistApplicantError(error?.response?.data?.applcant?.user?.[0])
      setIsValid(false);
    }
  };

  const handleFormDetailsApi = async (status, flag) => {
    const questionAnswerArray = generateQuestionAnswerArray();

    try {
      const dataToSend = selectedSkills.length === 0 ? [] : selectedSkills;
      const applicantProfileData = JSON.parse(
        localStorage.getItem("applicantProfileData")
      );
      const accessToken = applicantProfileData?.user_login?.access;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const formdata = new FormData();
      if (ResumeFile && isBinaryFile(ResumeFile)) {
        formdata.append("resume", ResumeFile);
      }
      formdata.append("availble_by", profileformData?.AvailableBy);
      formdata.append("currently_working", isYes?.CurrentlyWorkingToggle);
      formdata.append("notice_period", profileformData?.NoticePeriod);
      formdata.append("notice_buyout_available", isYes?.NoticeBuyOutToggle);
      formdata.append("willing_to_travel_for_job", profileformData?.willing_to_travel_for_job);
      formdata.append(
        "Job_applicant_status",
        status
      );
      formdata.append("expected_salary", profileformData?.ExpectedSalary);
      if (spokenLanguageBadges.length) {
        formdata.append(
          "spoken_language",
          JSON.stringify(spokenLanguageBadges.map((Val) => Val?.uid))
        );
      }
      if (rdnwBadges.length) {
        formdata.append(
          "written_reading_language",
          JSON.stringify(rdnwBadges.map((Val) => Val?.uid))
        );
      }
      formdata.append("current_location", profileformData?.CurrentLocation);
      formdata.append(
        "willing_to_relocate_to",
        profileformData?.relocationChoice
      );
      formdata.append(
        "require_company_assistance_for_relocation",
        profileformData.requiredCompanyAssist
      );
      formdata.append("job_uid", jobPostData?.uid);

      formdata.append("skills", JSON.stringify(dataToSend));
      formdata.append(
        "question_answer_array",
        JSON.stringify(questionAnswerArray)
      );
      formdata.append("applicant_status", status);
      const response = await axios.put(
        `https://bittrend.shubansoftware.com/assets-api/applicant-update-api/${storedApplicantId}/`,
        formdata,
        { headers: headers }
      );
      if (response?.data?.success) {
        if (response?.data?.response.applicant_status === "Draft") {
          updateButtonText("Continue Btn");
          handleCloseModals();
          handleClose();
        } else if (response?.data?.response.applicant_status === "Completed") {
          updateButtonText("View Form Btn");
          handleCloseModals();
          handleClose();
          if (flag === 'test') {
            // navigate('/Behavioural-Assessment')
            setBehaviourAssModel(true)
          }
          // localStorage.setItem('applicantToken', ApplicantProfileData?.user_login?.access)
          // localStorage.setItem('applicantData', JSON.stringify(response?.data?.response))         
        }
        localStorage.setItem('applicantData', JSON.stringify(response?.data?.response))
      }
    } catch (error) {
      console.log(error);
      handleClose()
    }
  };

  const handleSubmit = () => {
    // if (!storedApplicantId) {
    //   alert("Please fill Profile Details");
    //   return;
    // }

    handleShowModal("Save");
  };

  const handleSaveAsDraft = () => {
    // if (!storedApplicantId) {
    //   alert("Please fill Profile Details");
    //   return;
    // }
    handleShowModal("SaveAsDraft");
  };
  console.log(showModal.showSaveAsDraft)
  const handleButtonClick = (id) => {
    if (!showNotesByIndex.includes(id)) {
      setShowNotesByIndex([...showNotesByIndex, id])
    }
  }
  const handleEditRowEducation = (row, index) => {
    const newRows = [...EducationRows];
    newRows[index]["saved"] = false;
    SetEducationRows(newRows);
  }
  const handleButtonEdit = (val, index) => {
    if (!showNotesByIndex.includes(val?.id)) {
      setShowNotesByIndex([...showNotesByIndex, val?.id])
    }
    const newRows = [...WorkExpreienceRow];
    newRows[index]["savedWorkExp"] = false;
    setWorkExpreienceRow(newRows);
  }

  const EducationAddRow = () => {
    SetEducationRows([
      ...EducationRows,
      {
        id: Math.random().toString(36).slice(2),
        level: "",
        areaOfEducation: "",
        gradYear: "",
        university: "",
        grade: "",
      },
    ]);
  };

  const EducationdeleteRow = (index) => {
    const newRows = EducationRows.filter((_, i) => i !== index);
    SetEducationRows(newRows);
  };

  const handleEducationQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...EducationRows];
    newRows[index][name] = value;
    SetEducationRows(newRows);
  };
  const handleGradYear = (index, dateString) => {
    const newRows = [...EducationRows];
    newRows[index]['gradYear'] = dateString;
    SetEducationRows(newRows);
  }

  const saveQualificationData = async (row, index) => {
    try {
      if (!storedApplicantId) {
        alert("Please fill Profile Details");
        return;
      }
      const date = new Date(row.gradYear);
      const grad_year = date.getFullYear(); // Extract the year
      let gradeValue;
      if (row.gpa == 'GPA in %') {
        gradeValue = `${row.grade}%`;
      } else if (row.gpa == '4 Point GPA') {
        gradeValue = `${row.grade}/4.0`;
      } else if (row.gpa == '10 Point GPA') {
        gradeValue = `${row.grade}/10.0`;
      }
      const formdata = new FormData();
      formdata.append("applicant_profile", storedApplicantId);
      formdata.append("level", row.level);
      formdata.append("applicant_area_of_education", row.areaOfEducation);
      formdata.append("grad_year", grad_year);
      formdata.append("university", row.university);
      formdata.append("grade", gradeValue);
      const response = await EducationQualificationApi(formdata);

      if (response.status === 200) {
        const newRows = [...EducationRows];
        newRows[index].saved = true;
        newRows[index].id = Math.random().toString(36).slice(2);
        SetEducationRows(newRows);
      } else {
        console.error("Failed to save form: ", response.data);
        alert("There was an issue saving the form.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  // useEffect(() => {
  //   EducationRows?.map((row, index) => {
  //     if (!row.level || !row.areaOfEducation || !row.gradYear || !row.university
  //       || !row.grade || !row.gpa) {

  //     } else {
  //       saveQualificationData(row, index)
  //     }
  //   })
  // }, [EducationRows])

  const saveWorkExperienceData = async (row, index) => {
    try {
      if (!storedApplicantId || !totalWorkExperience || !row.WorkRole || !row.WorkFrom || !row.WorkTo || !row.WorkComapny || !row.WorkIndustry || !row.WorkNote) {
        // alert("Please fill Profile Details");
        toast.error("Please fill Profile Details");
        return;
      }
      const formdata = new FormData();
      formdata.append("work_applicant_profile", storedApplicantId);
      formdata.append("total_work_experience", totalWorkExperience);
      formdata.append("role", row.WorkRole);
      formdata.append("work_from", row.WorkFrom);
      formdata.append("work_to", row.WorkTo);
      formdata.append("work_company", row.WorkComapny);
      formdata.append("work_industry", row.WorkIndustry);
      formdata.append("note", row.WorkNote);

      const response = await WorkExperienceApi(formdata);

      if (response.status === 200) {
        console.log("Data added of work experience");
        const newRows = [...WorkExpreienceRow];
        newRows[index].savedWorkExp = true;
        newRows[index].id = Math.random().toString(36).slice(2);
        setWorkExpreienceRow(newRows);
      } else {
        console.error("Failed to save form: ", response.data);
        alert("There was an issue saving the form.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // alert("Please fill all field data");
    }
  };
  // useEffect(() => {
  //   WorkExpreienceRow?.map((row, index) => {
  //     if (!totalWorkExperience || !row.WorkRole || !row.WorkFrom || !row.WorkTo
  //       || !row.WorkComapny || !row.WorkIndustry || !row.WorkNote) {

  //     } else {
  //       // if (!isExistApplicantError) {
  //       saveWorkExperienceData(row, index)
  //       // }
  //     }
  //   })
  // }, [WorkExpreienceRow])

  const WorkExpreienceAddRow = () => {
    setWorkExpreienceRow((prevState) => [
      ...prevState,
      {
        id: Math.random().toString(36).slice(2),
        // TotalWorkExperience: "",
        WorkRole: "",
        WorkFrom: "",
        WorkTo: "",
        WorkComapny: "",
        WorkIndustry: "",
        WorkNote: "",
      },
    ]);
  };

  const WorkExperienceDeleteRow = (index, id) => {
    const deleteRow = WorkExpreienceRow.filter((_, i) => i !== index);
    setWorkExpreienceRow(deleteRow);
    const deleteRowNotes = showNotesByIndex.filter((cv, i) => cv !== id);
    setShowNotesByIndex(deleteRowNotes)
  };

  const handleWorkExpeienceChange = (index, e) => {
    const { name, value } = e.target;
    const newWorkRow = [...WorkExpreienceRow];
    newWorkRow[index][name] = value;
    setWorkExpreienceRow(newWorkRow);
  };
  const handleTotalWorkExpeienceChange = (e) => {
    const { name, value } = e.target;
    settotalWorkExperience(value)
  }
  const calculateWorkExperience = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    // Calculate the difference in years
    const years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();

    // If months are negative, adjust the years and months
    if (months < 0) {
      months += 12; // Add 12 months to handle the negative value
    }

    return `${years} years, ${months} months`; // You can format it as needed
  };

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const isValidType = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selectedFile.type);
      const isValidSize = selectedFile.size <= 2 * 1024 * 1024;

      if (isValidType && isValidSize) {
        setResumeFile(selectedFile);
        setError(null);
      } else {
        if (!isValidType) {
          setError("Please upload a valid PDF or DOC file.");
        } else {
          setError("File size should be less than 2MB.");
        }
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf",
    multiple: false,
  });

  const handleDeleteImage = () => {
    setResumeFile(null);
  };

  const checkAllFieldsFilled = (rows) => {
    return rows.some((row) =>
      Object.values(row).every((fieldValue) => fieldValue !== "")
    );
  };

  const isAllEducationFieldsFilled = checkAllFieldsFilled(EducationRows);
  const isAllWorkExperienceFieldsFilled =
    checkAllFieldsFilled(WorkExpreienceRow);

  const handleSpokenLanguageClick = (uid) => {
    if (selectedSpokenLanguageUids.includes(uid)) {
      setSelectedSpokenLanguageUids(
        selectedSpokenLanguageUids.filter((item) => item !== uid)
      );
    } else {
      setSelectedSpokenLanguageUids([...selectedSpokenLanguageUids, uid]);
    }
  };
  const getSelectedSpokenLanguageNames = () => {
    const selectedLanguageNames = [];

    spokenLanguageBadges.forEach((val) => {
      const language = jobPostData?.spoken_language?.find(
        (lang) => lang.uid === val?.uid
      );
      if (language) {
        selectedLanguageNames.push(language.language_name);
      }
    });

    return selectedLanguageNames;
  };

  const selectedSpokenLanguageNames = getSelectedSpokenLanguageNames();
  console.log("Selected Language Names: ", selectedSpokenLanguageNames);

  const handleWrittenLanguageClick = (uid) => {
    if (selectedWrittenLanguageUids.includes(uid)) {
      setSelectedWrittenLanguageUids(
        selectedWrittenLanguageUids.filter((item) => item !== uid)
      );
    } else {
      setSelectedWrittenLanguageUids([...selectedWrittenLanguageUids, uid]);
    }
  };

  const getSelectedWrittenLanguageNames = () => {
    const selectedLanguageNames = [];

    rdnwBadges.forEach((val) => {
      const language = jobPostData?.read_write_language?.find(
        (lang) => lang.uid === val?.uid
      );
      if (language) {
        selectedLanguageNames.push(language.language_name);
      }
    });

    return selectedLanguageNames;
  };

  const getSelectedWrittenLanguageName = getSelectedWrittenLanguageNames();
  console.log("Selected spokennnn Names: ", getSelectedWrittenLanguageName);

  // question answer
  const handleAnswerChange = (questionUid, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionUid]: answer,
    }));
  };
  const generateQuestionAnswerArray = () => {
    return jobPostData?.question_job.map((item) => ({
      answer_uid: "", // Add logic to populate this if needed
      question_uid: item?.uid,
      selected_answer: selectedAnswers[item?.uid]
        ? Array.isArray(selectedAnswers[item?.uid])
          ? selectedAnswers[item?.uid]
          : [selectedAnswers[item?.uid]]
        : [],
    }));
  };

  const getSkillGroupDetails = async (id) => {
    // setSkillGroupsData(null);
    const url = `https://bittrend.shubansoftware.com/assets-api/skill-group-detail-api/${id}/`;
    try {
      const response = await getSkillGroupDetailsApi(url);
      if (response) {
        // setShowSkillList(false);
        setSkillGroupsData((prevItem) => {
          const itemExists = prevItem.some((item) => item.uid === response.data.response.uid);
          if (itemExists) {
            return prevItem.map((item) =>
              item.uid === response.data.response.uid ? { ...item, group_skill: response.data.response.group_skill } : item
            );
          } else {
            return [...prevItem, response.data.response].sort((a, b) => a.id - b.id);
          }
        })
        // setSelectedIndex([])
        // setSkillGroupsData([...skillGroupData, response.data.response]);
        // setskillngroupList([]);
      }
    } catch (error) {
      console.log("error response----->>>>>>", error);
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.detail?.includes(
          "Given token not valid for any token type"
        )
      ) {
        //console.log("Token expired, redirecting to login");
        removeToken();
        // navigate("/loginwithpassword");
      }
    }
  };

  // useEffect(() => {
  //   // if (profileformData) {
  //   //   validateForProfileDetails();
  //   // }
  //   if (isValid) {
  //     handleProfileDetailsApi();
  //   }
  // }, [jobPostData, profileformData, isValid]);
  useEffect(() => {
    if (isValid) {
      if (profileformData.name && profileformData.email && profileformData.phone) {
        handleProfileDetailsApi();
        setIsExistApplicantError("")
      }
    }
  }, [profileformData.name, profileformData.email, profileformData.phone])
  useEffect(() => {
    if (isExistApplicantError) {
      // setTimeout(()=>{
      // debugger
      handleViewDetailsAPi(profileformData?.email)
      // alert(isExistApplicantError)
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500)
      // },500)
    } else {
      setProfileFormData((prevState) => ({
        ...prevState,
        AvailableBy: "",
        NoticePeriod: "",
        ExpectedSalary: "",
        CurrentLocation: "",
        relocationChoice: false,
        willing_to_travel_for_job: "",
        requiredCompanyAssist: false,
      }));
      setIsYes({
        CurrentlyWorkingToggle: false,
        NoticeBuyOutToggle: false,
        willingToTeavelJob: false,
      });
      // setStoredApplicantId(response?.data?.response?.uid);
      setSelectedSpokenLanguageUids([]);
      setSelectedWrittenLanguageUids([]);
      setSpokenLanguageBadges([]);
      setrdnwBadges([])
      setSelectedSkills([]);
      setResumeFile(null);
      setResumeFileName("");
      SetEducationRows([{
        id: Math.random().toString(36).slice(2),
        level: "",
        areaOfEducation: "",
        gradYear: "",
        university: "",
        grade: "",
        saved: false,
        gpa: ""
      },])
      setWorkExpreienceRow([
        {
          // TotalWorkExperience: "",
          id: Math.random().toString(36).slice(2),
          WorkRole: "",
          WorkFrom: "",
          WorkTo: "",
          WorkComapny: "",
          WorkIndustry: "",
          WorkNote: "",
          savedWorkExp: false,
        },
      ])
      settotalWorkExperience("")
    }
  }, [isExistApplicantError])

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("applicantProfileAllSavedData")
    );

    if (storedData) {
      // setProfileFormData((prevState) => ({
      //   ...prevState,
      //   name: storedData?.user?.username || "",
      //   email: storedData?.user?.email || "",
      //   confirmEmail: storedData?.user?.email || "",
      //   phone: storedData?.user?.phone_number || "",
      //   AvailableBy: storedData?.availble_by || "",
      //   NoticePeriod: storedData?.notice_period || "",
      //   ExpectedSalary: storedData?.expected_salary || "",
      //   CurrentLocation: storedData?.current_location || "",
      //   relocationChoice: storedData?.willing_to_relocate_to || false,
      //   requiredCompanyAssist:
      //     storedData?.require_company_assistance_for_relocation || false,
      // }));

      // setIsYes((prevState) => ({
      //   ...prevState,
      //   CurrentlyWorkingToggle: storedData?.currently_working || false,
      //   NoticeBuyOutToggle: storedData?.notice_buyout_available || false,
      // }));

      // setStoredApplicantId(storedData?.uid);

      // const spokenUids = Array.from(
      //   new Set(storedData?.spoken_language.map((item) => item?.uid))
      // );
      // const writtenUids = Array.from(
      //   new Set(storedData?.written_reading_language.map((item) => item?.uid))
      // );

      // setSelectedSpokenLanguageUids((prevState) => [
      //   ...prevState,
      //   ...spokenUids.filter((uid) => !prevState.includes(uid)),
      // ]);

      // setSelectedWrittenLanguageUids((prevState) => [
      //   ...prevState,
      //   ...writtenUids.filter((uid) => !prevState.includes(uid)),
      // ]);

      // const skillsUids =
      //   storedData?.applicant_profile_job[0]?.job_applicant_skill.map(
      //     (item) => item?.uid
      //   );
      // setSelectedSkills((prevState) => [...prevState, ...skillsUids]);

      // const resumeFileUrl = storedData?.resume || null;
      // setResumeFile(resumeFileUrl);

      // const resumeFileName = resumeFileUrl
      //   ? resumeFileUrl.split("/").pop()
      //   : "";

      // setResumeFileName(resumeFileName);
    }

    const educationData = storedData?.qualification_applicantprofile || [];
    if (Array.isArray(educationData)) {
      SetEducationRows((prevState) => [
        ...prevState,
        ...educationData.map((item) => ({
          level: item?.level || "",
          areaOfEducation: item?.applicant_area_of_education || "",
          gradYear: item?.grad_year || "",
          university: item?.university || "",
          grade: item?.grade || "",
        })),
      ]);
    }
  }, []);
  useEffect(() => {
    const length = Object.keys(groupedSkills).length
    setDynamicArray(Array.from({ length }, () => []));
  }, []);

  useEffect(() => {
    if (selectedGroupUid.length && storedApplicantId && localStorage.getItem('authToken')) {
      selectedGroupUid.map((id) => {
        getSkillGroupDetails(id)
      })
    }
  }, [selectedGroupUid, storedApplicantId])
  const spokenRef = useRef()
  const writtenRef = useRef()
  const handleClosecomboEdu = (index, e) => {
    const { name } = e.target;
    const newRows = [...EducationRows];
    newRows[index][name] = '';
    setTimeout(() => {
      setAreaEducationOption([])
      SetEducationRows(newRows)
      setIsOpen((prev) => ({ ...prev, [index]: false }));
    }, 200); // delay to allow click on list items
  };
  const handleClosecomboExp = (index, e) => {
    const { name } = e.target;
    const newRows = [...WorkExpreienceRow];
    newRows[index][name] = '';
    setTimeout(() => {
      setRoleList([])
      setIndustriesList([])
      setWorkExpreienceRow(newRows)
      setIsOpen((prev) => ({ ...prev, [index]: false }));
    }, 200); // delay to allow click on list items
  };
  const handleClosecomboLang = (e, key) => {
    const { name } = e.target;
    if (key == "spoken") {
      spokenRef.current.value = '';
    } else {
      writtenRef.current.value = '';
    }
    setTimeout(() => {
      setSpokenLanguage([])
      setWittenLanguage([])
    }, 200); // delay to allow click on list items
  };
  const handleDropDownCurrent = (e) => {
    const { name } = e.target;
    setProfileFormData({ ...profileformData, [name]: '' })
    setTimeout(() => {
      setLocationList([])
    }, 200);
  }
  useEffect(() => {
    if (!isYes?.CurrentlyWorkingToggle) {
      setIsYes({
        ...isYes,
        ["NoticeBuyOutToggle"]: false
      })
      setProfileFormData({ ...profileformData, ["NoticePeriod"]: "" })
    }
  }, [isYes?.CurrentlyWorkingToggle])

  // console.log(dynamicArray)
  // console.log('Fixed', skillGroupData.sort((a, b) => a.id - b.id))
  console.log(isYes, profileformData)
  console.log(groupedSkills)
  console.log(EducationRows)
  console.log('checkvalid====>', isValid)
  console.log('testing', profileformData)
  console.log(spokenLanguageBadges, rdnwBadges)
  console.log(WorkExpreienceRow)
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      animation={false}
      backdrop={false}
      // className="cmprofile_mdl quizDev_model jobpost_view"
      className="cmprofile_mdl quizDev_model jobpost_view ps-0"
    >
      <Modal.Header closeButton>
        <img src={logoIcon} className="me-4" />
        <div className="modal-title h4">
          Job Application <strong className="font-weight500">{jobPostData?.job_title}</strong>
          <p className="subtitle m-0">
            {jobPostData?.job_location?.location_name},{jobPostData?.job_type} ,{" "}
            {jobPostData?.workplace_type}
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="p-0 bg-lightgray">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={3} lg={2} className="jobpre_leftpanel px-2">
              <h6>Profile</h6>
              <ul className="checklist">
                <li
                  className={`${profileformData?.name &&
                    profileformData?.email &&
                    profileformData?.phone &&
                    "active"
                    }`}
                >
                  <a href="#item_salary">
                    Basic Details <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>

                <li className={`${ResumeFile && "active"}`}>
                  <a href="#item_edu">
                    Resume <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li
                  className={`${profileformData?.AvailableBy &&
                    // isYes?.CurrentlyWorkingToggle &&
                    // profileformData?.NoticePeriod &&
                    // isYes?.NoticeBuyOutToggle &&
                    "active"
                    }`}
                >
                  <a href="#item_Exp">
                    Availability <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li
                  className={`${profileformData?.ExpectedSalary && "active"}`}
                >
                  <a href="#item_Target">
                    Expected Salary{" "}
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li className={`${isAllEducationFieldsFilled && "active"}`}>
                  <a href="#item_lang">
                    Education <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li
                  className={`${isAllWorkExperienceFieldsFilled && "active"}`}
                >
                  <a href="#item_Geog">
                    Experience <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li
                  className={`${spokenLanguageBadges.length &&
                    rdnwBadges.length &&
                    "active"
                    }`}
                >
                  <a href="#item_Geog">
                    Language <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>

                <li
                  className={`${profileformData?.CurrentLocation && "active"}`}
                >
                  <a href="#item_Geog">
                    Geography <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li className={`${selectedSkills.length > 0 && "active"}`}>
                  <a href="#item_Geog">
                    Skills <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li
                  className={
                    Object.keys(selectedAnswers).length > 0 ? "active" : ""
                  }
                >
                  <a href="#item_Geog">
                    Custom Questions{" "}
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </Col>

            {/* Center Column */}
            <Col md={7} lg={8} className="jobMain_panel">
              <div className="custom-card">
                <h6>Basic Details</h6>

                <Row>
                  <Col md={2}>
                    <Form.Label>Name</Form.Label>
                  </Col>

                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter full name"
                      size="sm"
                      style={{ width: "350px" }}
                      name="name"
                      value={profileformData.name}
                      onChange={handleProfileDetailsChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      isInvalid={touchedFields.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Email ID</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      type="email"
                      placeholder="email@mail.com"
                      size="sm"
                      style={{ width: "350px" }}
                      name="email"
                      value={profileformData.email}
                      onChange={handleProfileDetailsChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      isInvalid={touchedFields.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Confirm Email ID</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      type="email"
                      placeholder="email@mail.com"
                      size="sm"
                      style={{ width: "350px" }}
                      name="confirmEmail"
                      value={profileformData.confirmEmail}
                      onChange={handleProfileDetailsChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      isInvalid={
                        touchedFields.confirmEmail && !!errors.confirmEmail
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmEmail}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Phone No.</Form.Label>
                  </Col>

                  <Col className="phone-input">
                    <InputGroup className="mb-3" size="sm" style={{ maxWidth: "350px" }}>
                      <DropdownButton
                        variant="outline-secondary"
                        title={countryCode}
                        id="input-group-dropdown-1"
                      >
                        {countryCodes.map((code) => (
                          <Dropdown.Item key={code} onClick={() => setCountryCode(code)}>
                            {code}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                      <Form.Control
                        type="text"
                        placeholder="Phone No."
                        size="sm"
                        name="phone"
                        value={profileformData.phone}
                        onChange={handleProfileDetailsChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        isInvalid={touchedFields.phone && !!errors.phone}
                        maxLength={10}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </InputGroup>
                    {/* <Form.Control
                      type="text"
                      placeholder="Phone No."
                      size="sm"
                      style={{ width: "350px" }}
                      name="phone"
                      value={profileformData.phone}
                      onChange={handleProfileDetailsChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      isInvalid={touchedFields.phone && !!errors.phone}
                    /> */}

                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Resume</h6>

                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Add Document</Form.Label>
                  </Col>

                  <Col md={5}>
                    {!ResumeFile && (
                      <div
                        className="cmp_uploder file-upload-box"
                        {...getRootProps()}
                      >
                        <div className="upload-content">
                          <input {...getInputProps()} />
                          <img src={uploadIcon} className="mx-2" />
                          {/* <i className="fas fa-cloud-upload-alt upload-icon"></i> */}
                          <h5>
                            <strong className="text-primary">
                              Click to upload
                            </strong>{" "}
                            or drag & drop
                          </h5>
                          {/* <small className="text-muted mb-0">
                            PDF or Doc. Should be less than 2 MB
                          </small> */}
                        </div>
                        <small className="text-muted mb-0">
                          PDF or Doc. Should be less than 2 MB
                        </small>
                      </div>
                    )}
                    {!ResumeFile && (
                      <p className="error">{errors.ResumeFile}</p>
                    )}

                    {error && (
                      <Alert variant="danger" className="mt-2">
                        {error}
                      </Alert>
                    )}

                    {/* Display Selected File Details and Upload Button */}
                    {ResumeFile && (
                      <>
                        <div className="selected_logo">
                          <strong className="strong-label ms-2">{ResumeFile?.name || ResumeFileName}</strong>

                          <div className="d-flex">
                            <Button
                              variant="link"
                              className=" me-2"
                              onClick={handleDeleteImage}
                            >
                              <img src={imgpTrash} />
                            </Button>
                          </div>
                        </div>
                        <small className="text-muted mb-0">
                          PDF or Doc. Should be less than 2 MB
                        </small>
                      </>
                    )}
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Availability</h6>
                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Available by</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      name="AvailableBy"
                      type="date"
                      placeholder="DD/MM/YYYY"
                      style={{ width: "350px" }}
                      value={profileformData?.AvailableBy}
                      onChange={handleProfileDetailsChange}
                      isInvalid={!!errors.AvailableBy}
                      className="form-control-sm"
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <small className="text-muted mb-4">
                      Consider you notice period before providing this information
                    </small>
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.AvailableBy}
                  </Form.Control.Feedback>
                </Row>

                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Currently Working?</Form.Label>
                  </Col>

                  <Col>
                    <Row className="align-items-center">
                      {/* Left Label for "No" */}
                      <Col xs="auto">
                        <Form.Label
                          className="mb-0"
                          style={{
                            color: isYes?.CurrentlyWorkingToggle
                              ? "grey"
                              : "black",
                          }}
                        >
                          {!isYes?.CurrentlyWorkingToggle ? "No" : "No"}
                        </Form.Label>
                      </Col>

                      <Col xs="auto">
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          checked={isYes?.CurrentlyWorkingToggle}
                          onChange={() =>
                            handleSwitchChange("CurrentlyWorkingToggle")
                          }
                        />
                      </Col>

                      <Col xs="auto">
                        <Form.Label
                          className="mb-0"
                          style={{
                            color: isYes?.CurrentlyWorkingToggle
                              ? "black"
                              : "grey",
                          }}
                        >
                          {isYes?.CurrentlyWorkingToggle ? "Yes" : "Yes"}
                        </Form.Label>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {isYes?.CurrentlyWorkingToggle && (
                  <>
                    <Row className="mb-3 mt-2">
                      <Col md={2}>
                        <Form.Label>Notice Period</Form.Label>
                      </Col>

                      <Col>
                        <Form.Select
                          placeholder="Notice Period"
                          size="sm"
                          style={{ width: "350px" }}
                          name="NoticePeriod"
                          value={profileformData?.NoticePeriod}
                          onChange={handleProfileDetailsChange}
                          isInvalid={!!errors.NoticePeriod}
                        >
                          <option value="" disabled hidden>Notice Period</option>
                          <option value='Less than 30 Days'>Less than 30 Days</option>
                          <option value='30-60 Days'>30 - 60 Days</option>
                          <option value='60-90 Days'>60 - 90 Days</option>
                          <option value='More than 90'>More than 90 Days</option>
                        </Form.Select>
                      </Col>
                      <Form.Control.Feedback type="invalid">
                        {errors.NoticePeriod}
                      </Form.Control.Feedback>
                    </Row>
                    <Row className="mb-3 mt-2">
                      <Col md={2}>
                        <Form.Label>Notice Buyout Available</Form.Label>
                      </Col>

                      <Col>
                        <Row className="align-items-center">
                          <Col xs="auto">
                            <Form.Label
                              className="mb-0"
                              style={{
                                color: isYes?.NoticeBuyOutToggle ? "grey" : "black",
                              }}
                            >
                              {!isYes?.NoticeBuyOutToggle ? "No" : "No"}
                            </Form.Label>
                          </Col>

                          <Col xs="auto">
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              checked={isYes?.NoticeBuyOutToggle}
                              onChange={() =>
                                handleSwitchChange("NoticeBuyOutToggle")
                              }
                            />
                          </Col>

                          <Col xs="auto">
                            <Form.Label
                              className="mb-0"
                              style={{
                                color: isYes?.NoticeBuyOutToggle ? "black" : "grey",
                              }}
                            >
                              {isYes?.NoticeBuyOutToggle ? "Yes" : "Yes"}
                            </Form.Label>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                )}
                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Willing to Travel for Job?</Form.Label>
                  </Col>

                  <Col>
                    {/* <Row className="align-items-center">
                      <Col xs="auto">
                        <Form.Label
                          className="mb-0"
                          style={{
                            color: isYes?.willingToTeavelJob ? "grey" : "black",
                          }}
                        >
                          {!isYes?.willingToTeavelJob ? "No" : "No"}
                        </Form.Label>
                      </Col>

                      <Col xs="auto">
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          checked={isYes?.willingToTeavelJob}
                          onChange={() =>
                            handleSwitchChange("willingToTeavelJob")
                          }
                        />
                      </Col>

                      <Col xs="auto">
                        <Form.Label
                          className="mb-0"
                          style={{
                            color: isYes?.willingToTeavelJob ? "black" : "grey",
                          }}
                        >
                          {isYes?.willingToTeavelJob ? "Yes" : "Yes"}
                        </Form.Label>
                      </Col>
                    </Row> */}
                    <div className="d-flex justify-content-start">
                      <Form.Check
                        type="radio"
                        label="Regularly"
                        name="willing_to_travel_for_job"
                        id="willingToTeavelJob1"
                        className="me-3"
                        value="Regularly"
                        checked={profileformData.willing_to_travel_for_job == "Regularly"}
                        onChange={handleWillingToTeavelJob}
                      />
                      <Form.Check
                        type="radio"
                        label="Sometimes"
                        name="willing_to_travel_for_job"
                        id="willingToTeavelJob2"
                        className="ms-3"
                        value="Sometimes"
                        checked={profileformData.willing_to_travel_for_job == "Sometimes"}
                        onChange={handleWillingToTeavelJob}
                      />
                      <Form.Check
                        type="radio"
                        label="Rarely"
                        name="willing_to_travel_for_job"
                        id="willingToTeavelJob3"
                        className="ms-3"
                        value="Rarely"
                        checked={profileformData.willing_to_travel_for_job == "Rarely"}
                        onChange={handleWillingToTeavelJob}
                      />
                      <Form.Check
                        type="radio"
                        label="Not Willing to Travel"
                        name="willing_to_travel_for_job"
                        id="willingToTeavelJob4"
                        className="ms-3"
                        value="Not Willing to Travel"
                        checked={profileformData.willing_to_travel_for_job == "Not Willing to Travel"}
                        onChange={handleWillingToTeavelJob}
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Salary</h6>
                <Row className="mb-3 d-flex align-items-center">
                  {" "}
                  <Col xs="auto">
                    <Form.Label>Expected Salary</Form.Label>
                  </Col>
                  <Col>
                    <Form.Select
                      className="form-control-sm mx-w350"
                      aria-label="Default select example"
                      name="ExpectedSalary"
                      value={profileformData?.ExpectedSalary}
                      onChange={handleProfileDetailsChange}
                      isInvalid={!!errors.ExpectedSalary}
                      required
                    >
                      <option value="" disabled hidden>Expected Salary</option>
                      {/* <option value="15K">₹5 LPA - ₹ 10 LPA</option>
                      <option value="20K">₹15 LPA - ₹ 20 LPA</option>
                      <option value="30K">₹25 LPA - ₹ 30 LPA</option> */}
                      <option value="Below 3 Lacs per Annum">Below 3 Lacs per Annum</option>
                      <option value="3-5 Lacs per Annum">3 - 5 Lacs per Annum</option>
                      <option value="5-7 Lacs per Annum">5 - 7 Lacs per Annum</option>
                      <option value="7-10 Lacs per Annum">7 - 10 Lacs per Annum</option>
                      <option value="10-12 Lacs per Annum">10 - 12 Lacs per Annum</option>
                      <option value="12-15 Lacs per Annum">12 - 15 Lacs per Annum</option>
                      <option value="15-20 Lacs per Annum">15 - 20 Lacs per Annum</option>
                      <option value="20-25 Lacs per Annum">20 - 25 Lacs per Annum</option>
                      <option value="25-30 Lacs per Annum">25 - 30 Lacs per Annum</option>
                      <option value="30-35 Lacs per Annum">30 - 35 Lacs per Annum</option>
                      <option value="35-40 Lacs per Annum">35 - 40 Lacs per Annum</option>
                      <option value="40-45 Lacs per Annum">40 - 45 Lacs per Annum</option>
                      <option value="45-50 Lacs per Annum">45 - 50 Lacs per Annum</option>
                      <option value="50-55 Lacs per Annum">50 - 55 Lacs per Annum</option>
                      <option value="55-60 Lacs per Annum">55 - 60 Lacs per Annum</option>
                      <option value="Above 60 Lacs per Annum">Above 60 Lacs per Annum</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="error">
                      {errors.ExpectedSalary}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Educational Qualification</h6>
                <table className="mb-2 form_table">
                  <thead>
                    <tr>
                      <td>Level</td>
                      <td>Area of Education</td>
                      <td>Grad. Year</td>
                      <td>University</td>
                      <td>Grade</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                  </thead>
                  {EducationRows.map((row, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>
                          <Form.Select
                            name="level"
                            value={row.level}
                            onChange={(e) =>
                              handleEducationQualificationChange(index, e)
                            }
                            disabled={row.saved}
                          >
                            <option value="" disabled hidden>Level</option>
                            <option value="Below Secondary Education">Below Secondary Education</option>
                            <option value="Upper Secondary (Intermediate, High School, Grade 12)">Upper Secondary (Intermediate, High School, Grade 12)</option>
                            <option value="Certification  / Vocational / Technical Training">Certification  / Vocational / Technical Training</option>
                            <option value="Diploma / Associate Degree">Diploma / Associate Degree</option>
                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                            <option value="Master's Degree">Master's Degree</option>
                            <option value="Professional Degree (e.g., MD, JD)">Professional Degree (e.g., MD, JD)</option>
                            <option value="Doctoral Degree (Ph.D., Ed.D.)">Doctoral Degree (Ph.D., Ed.D.)</option>
                            <option value="Postdoctoral Research">Postdoctoral Research</option>
                          </Form.Select>
                        </td>
                        <td>
                          {/* <Form.Control
                            name="areaOfEducation"
                            type="text"
                            placeholder="Area of Education"
                            size="sm"
                            value={row.areaOfEducation}
                            onChange={(e) =>
                              handleEducationQualificationChange(index, e)
                            }
                            disabled={row.saved}
                          /> */}

                          {/* <Dropdown show={true} >
                            <Dropdown.Menu className="w-100 dropdown_ctm">

                              <FormControl
                                autoFocus
                                name="areaOfEducation"
                                placeholder="Area of Education"
                                size="sm"
                                value={row.areaOfEducation}
                                disabled={row.saved}
                                onChange={(e) => handleAreaOfEducation(index, e)}
                              />
                              <div class={`${aresEducationOption.length ? 'droplist' : ''}`}>
                                {aresEducationOption.map((option, idx) => (
                                  <Dropdown.Item
                                    key={idx}
                                    onClick={(e) =>
                                      handleSelectAreaEducation(index, option?.qualification_name)
                                    }
                                  >
                                    {option?.qualification_name}
                                  </Dropdown.Item>
                                ))}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown> */}
                          <div className="mw-230 relative">

                            <FormControl
                              // autoFocus
                              name="areaOfEducation"
                              placeholder="Area of Education"
                              size="sm"
                              value={row.areaOfEducation}
                              disabled={row.saved}
                              onChange={(e) => handleAreaOfEducation(index, e)}
                              onBlur={(e) => handleClosecomboEdu(index, e)} // Close dropdown on blur
                            />
                            <div class={`${aresEducationOption.length ? 'ctm_dropdown ct_scrollbar' : ''}`}>
                              {isOpen[index] && (
                                <ul className="m-0">
                                  {aresEducationOption.map((option, idx) => (
                                    <li
                                      key={idx}
                                      onClick={(e) =>
                                        handleSelectAreaEducation(index, option?.qualification_name)
                                      }
                                    >
                                      {option?.qualification_name}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                        </td>
                        <td>
                          {/* <Form.Control
                            name="gradYear"
                            type="date"
                            value={row.gradYear}
                            onChange={(e) =>
                              handleEducationQualificationChange(index, e)
                            }
                            disabled={row.saved}
                          /> */}
                          <Form.Group>
                            <DatePicker
                              name="gradYear"
                              selected={row.gradYear}
                              value={row.gradYear}
                              onChange={(date) => handleGradYear(index, date)}
                              showYearPicker
                              dateFormat="yyyy"
                              className="form-control"
                              placeholderText="Select year"
                              disabled={row.saved}
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Control
                            name="university"
                            type="text"
                            placeholder="University"
                            size="sm"
                            value={row.university}
                            onChange={(e) =>
                              handleEducationQualificationChange(index, e)
                            }
                            disabled={row.saved}
                          />
                        </td>
                        <td>
                          <div className="mix-inputs">
                            <Form.Control
                              name="grade"
                              type="text"
                              placeholder="grade"
                              size="sm"
                              value={row.grade}
                              onChange={(e) =>
                                handleEducationQualificationChange(index, e)
                              }
                              disabled={row.saved}
                            />
                            <Form.Select name="gpa" value={row.gpa} onChange={(e) => handleEducationQualificationChange(index, e)}>
                              <option value="" hidden>GPA</option>
                              <option value="4 Point GPA">4 Point GPA</option>
                              <option value="10 Point GPA">10 Point GPA</option>
                              <option value="GPA in %">GPA in %</option>
                            </Form.Select>
                          </div>
                        </td>
                        {!row.saved && (
                          <td>
                            <Button
                              variant="link"
                              className="p-1 font-sm mt-1 link-iconbtn"
                              // onClick={handleButtonClick}
                              onClick={() => saveQualificationData(row, index)}
                            >
                              <img
                                src={saveIcon}
                                alt="Delete"
                                className="me-1"
                                style={{ width: "16px", height: "16px" }}
                              />
                              Save
                            </Button>
                          </td>
                        )}
                        {row.saved && (
                          <td>
                            <Button
                              variant="link"
                              className="p-1 font-sm mt-1 link-iconbtn"
                              // onClick={handleButtonClick}
                              onClick={() => handleEditRowEducation(row, index)}
                            >
                              <img
                                src={saveIcon}
                                alt="Delete"
                                style={{ width: "16px", height: "16px" }}
                              />
                              Edit
                            </Button>
                          </td>
                        )}
                        <td>
                          <button
                            type="button"
                            className="btn-transpant"
                            onClick={() => EducationdeleteRow(index)}
                          >
                            <img
                              src={imgpTrash}
                              alt="Delete"
                              style={{ width: "20px", height: "20px" }}
                            />
                          </button>
                        </td>
                        {/* <td>
                          {!row.saved && (
                            <Button
                              variant="link"
                              className="p-1 mt-1 font-sm"
                              onClick={() => saveQualificationData(row, index)}
                            >
                              Save
                            </Button>
                          )}
                        </td> */}

                      </tr>
                    </tbody>
                  ))}
                </table>

                <Button onClick={EducationAddRow} variant="link">
                  + Add
                </Button>
              </div>

              <div className="custom-card">
                <h6>Work Experience</h6>
                <div >
                  <Row className="align-items-center bg-lightgray py-2">
                    <Col xs="auto" className="text-center">
                      <Form.Label>Total Work Experience</Form.Label>
                    </Col>
                    <Col>
                      {/* <Form.Control
                          type="text"
                          placeholder=""
                          size="sm"
                          style={{ width: "350px" }}
                          value={row?.TotalWorkExperience}
                          name="TotalWorkExperience"
                          onChange={(e) => handleWorkExpeienceChange(index, e)}
                          disabled={row.savedWorkExp}
                        /> */}
                      <Form.Select
                        className="form-control-sm mx-w350"
                        aria-label="Default select example"
                        name="TotalWorkExperience"
                        value={totalWorkExperience}
                        onChange={handleTotalWorkExpeienceChange}
                        isInvalid={!!errors.totalWorkExperience}
                        required
                      // disabled={row.savedWorkExp}
                      >
                        <option value="" disabled hidden>Work Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Less than 1 Year">Less than 1 Year</option>
                        <option value="1-2 Years">1 - 2 Years</option>
                        <option value="2-4 Years">2 - 4 Years</option>
                        <option value="4-6 Years">4 - 6 Years</option>
                        <option value="6-9 Years">6 - 9 Years</option>
                        <option value="9-12 Years">9 - 12 Years</option>
                        <option value="12-15 Years">12 - 15 Years</option>
                        <option value="15-20 Years">15 - 20 Years</option>
                        <option value="20-25 Years">20 - 25 Years</option>
                        <option value="25-30 Years">25 - 30 Years</option>
                        <option value="30-40 Years">30 - 40 Years</option>
                        <option value="Above 40 Years">Above 40 Years</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <table className="mb-2 form_table">
                    <thead>
                      <tr>
                        <td>Role</td>
                        <td>From</td>
                        <td>To</td>
                        <td>Company</td>
                        <td>Industry</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {WorkExpreienceRow.map((row, index) => (
                        <>
                          <tr>
                            <td>
                              <div className="mw-130 relative">
                                <FormControl
                                  // autoFocus
                                  name="WorkRole"
                                  placeholder="Role"
                                  size="sm"
                                  value={row.WorkRole}
                                  disabled={row.savedWorkExp}
                                  onChange={(e) => handleRolelist(index, e)}
                                  onBlur={(e) => handleClosecomboExp(index, e)}
                                />
                                <div class={`${roleList.length ? 'ctm_dropdown ct_scrollbar' : ''}`}>
                                  {isOpen[index] && (
                                    <ul className="m-0">
                                      {roleList.map((option, idx) => (
                                        <li
                                          key={idx}
                                          onClick={(e) =>
                                            handleWorkRole(index, option?.is_like_name)
                                          }
                                        >
                                          {option?.is_like_name}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>

                            </td>
                            <td>
                              <Form.Control
                                placeholder="June 2019"
                                size="sm"
                                style={{ width: "150px" }}
                                type="date"
                                value={row?.WorkFrom}
                                name="WorkFrom"
                                onChange={(e) =>
                                  handleWorkExpeienceChange(index, e)
                                }
                                disabled={row.savedWorkExp}
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="date"
                                placeholder="May 2022"
                                size="sm"
                                style={{ width: "150px" }}
                                value={row?.WorkTo}
                                name="WorkTo"
                                onChange={(e) =>
                                  handleWorkExpeienceChange(index, e)
                                }
                                disabled={row.savedWorkExp}
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                placeholder="Company"
                                size="sm"
                                style={{ width: "150px" }}
                                value={row?.WorkComapny}
                                name="WorkComapny"
                                onChange={(e) =>
                                  handleWorkExpeienceChange(index, e)
                                }
                                disabled={row.savedWorkExp}
                              />
                            </td>
                            <td>
                              <div className="mw-130 relative">
                                <FormControl
                                  // autoFocus
                                  name="WorkIndustry"
                                  placeholder="Industry"
                                  size="sm"
                                  value={row.WorkIndustry}
                                  disabled={row.savedWorkExp}
                                  onChange={(e) => handleIndustries(index, e)}
                                  onBlur={(e) => handleClosecomboExp(index, e)}
                                />
                                <div class={`${industriesList.length ? 'ctm_dropdown ct_scrollbar' : ''}`}>
                                  {isOpen[index] && (
                                    <ul className="m-0">
                                      {industriesList.map((option, idx) => (
                                        <li
                                          key={idx}
                                          onClick={(e) =>
                                            handleSelectIndustries(index, option?.industry_name)
                                          }
                                        >
                                          {option?.industry_name}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                {!row.savedWorkExp && !showNotesByIndex.includes(row?.id) && (
                                  <Button
                                    variant="link"
                                    className="p-1 font-sm mt-1 link-iconbtn"
                                    onClick={() => handleButtonClick(row?.id)}
                                  >
                                    <i className="far fa-file me-1 "></i>
                                    Note
                                  </Button>
                                )}
                                {!row.savedWorkExp && showNotesByIndex.includes(row?.id) && (
                                  <Button
                                    variant="link"
                                    className="p-1 font-sm mt-1 link-iconbtn"
                                    // onClick={handleButtonClick}
                                    onClick={() => saveWorkExperienceData(row, index)}
                                  >
                                    <img
                                      src={saveIcon}
                                      className="me-1"
                                      alt="Delete"
                                      style={{ width: "16px", height: "16px" }}
                                    />
                                    Save
                                  </Button>
                                )}

                                {row.savedWorkExp && (
                                  <Button
                                    variant="link"
                                    className="p-1 font-sm mt-1 link-iconbtn"
                                    onClick={() => handleButtonEdit(row, index)}
                                  >
                                    <svg className="me-1" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6.99998 12.3341H13M1 12.3341H2.11636C2.44248 12.3341 2.60554 12.3341 2.75899 12.2973C2.89504 12.2646 3.0251 12.2108 3.1444 12.1377C3.27895 12.0552 3.39425 11.9399 3.62486 11.7093L12 3.33414C12.5523 2.78185 12.5523 1.88642 12 1.33413C11.4477 0.781851 10.5523 0.781851 10 1.33414L1.62484 9.7093C1.39424 9.9399 1.27894 10.0552 1.19648 10.1898C1.12338 10.3091 1.0695 10.4391 1.03684 10.5752C1 10.7286 1 10.8917 1 11.2178V12.3341Z" stroke="#3538CD" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Edit
                                  </Button>
                                )}

                                <Button
                                  variant="link"
                                  className="p-1"
                                  onClick={() => WorkExperienceDeleteRow(index, row?.id)}
                                >
                                  <img
                                    src={imgpTrash}
                                    alt="Delete"
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={7}>
                              {!row.savedWorkExp && showNotesByIndex.includes(row?.id) && (
                                <div className="abt-textbox">
                                  <Form>
                                    <Form.Group controlId="noteInput">
                                      <Form.Label>
                                        About your experience
                                      </Form.Label>
                                      <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={row?.WorkNote}
                                        name="WorkNote"
                                        onChange={(e) =>
                                          handleWorkExpeienceChange(index, e)
                                        }
                                        placeholder="Write your note here..."
                                      />
                                    </Form.Group>
                                  </Form>
                                </div>
                              )}
                              {row.savedWorkExp && row?.WorkNote && (
                                <p style={{ marginTop: "5px" }}>{row.WorkNote}</p>
                              )}
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button variant="link" onClick={WorkExpreienceAddRow}>
                  + Add
                </Button>
              </div>

              <div className="custom-card">
                <h6 className="mb-0">Language</h6>
                <p className="font-sm">Pick as many as possible</p>

                <Form.Group
                  className="mb-3 row"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="sm-label col-md-3">
                    Spoken Language
                  </Form.Label>
                  <div className="col-md-9">
                    {/* <div className="tagarea p-2"> */}
                    {/* {jobPostData?.spoken_language?.map((item, index) => (
                        <Badge
                          key={index}
                          bg={
                            selectedSpokenLanguageUids.includes(item.uid)
                              ? "primary"
                              : "white"
                          }
                          className="me-2 mb-2 tag-white"
                          onClick={() => handleSpokenLanguageClick(item.uid)}
                        >
                          {item?.language_name}
                        </Badge>
                      ))}
                      {spokenLanguageBadges.map((badge, index) => (
                        <Badge
                          key={index}
                          bg={
                            // selectedSpokenLanguageUids.includes(badge.uid)
                            //   ? "primary"
                            //   : "white"
                            "primary"
                          }
                          className="me-2 mb-2 tag-white"
                        // onClick={() => handleSpokenLanguageClick(badge.uid)}
                        >
                          {badge?.language_name}
                          <button
                            className="btn close_tag"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleRemoveSpokenLanguageBadge(index)
                            }
                          >
                            <i className="fa fa-close ms-1"></i>
                          </button>
                        </Badge>
                      ))}
                      <Form.Control
                        type="text"
                        className="inline-input"
                        placeholder="Enter text"
                        onChange={(e) => {
                          setInputValue(e?.target?.value);
                        }}
                        onKeyDown={(e) => {
                          handleKeyPressForlanguages(e, "spoken");
                        }}
                      /> */}
                    {/* </div> */}

                    <div className="tagarea p-2 position-relative">
                      {spokenLanguageBadges?.map((badge, index) => (
                        <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                          {badge?.language_name}
                          <button
                            className="btn close_tag"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleRemoveSpokenLanguageBadge(index)
                            }
                          >
                            <i className="fa fa-close ms-1"></i>
                          </button>
                        </Badge>
                      ))}
                      <div className="inline-dropdown-container position-relative d-inline-block">
                        <Form.Control
                          type="text"
                          className="inline-input"
                          placeholder="Enter text"
                          ref={spokenRef}
                          // value={row.areaOfEducation}
                          // disabled={row.saved}
                          onChange={(e) => handleWaSlanguages(e, "spoken")}
                          onBlur={(e) => handleClosecomboLang(e, "spoken")}
                        />
                        {spokenLanguage?.length > 0 ? (
                          <Dropdown show={true} >
                            <Dropdown.Menu className="w-100 dropdown_ctm">
                              <div class={`${spokenLanguage.length ? 'droplistmulti' : ''}`}>
                                {spokenLanguage.map((option, idx) => (
                                  <Dropdown.Item
                                    key={idx}
                                    onClick={(e) =>
                                      handleSelectSpokenLang(option)
                                    }
                                  >
                                    {option?.language_name}
                                  </Dropdown.Item>
                                ))}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        ) : ('')}
                      </div>
                    </div>

                    <span className="required_text">
                      Select all spoken languages
                    </span>
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3 row"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="sm-label col-md-3">
                    Written and Reading Language
                  </Form.Label>
                  <div className="col-md-9">
                    {/* <div className="tagarea p-2">
                      {jobPostData?.read_write_language?.map((item, index) => (
                        <Badge
                          key={index}
                          bg={
                            selectedWrittenLanguageUids.includes(item.uid)
                              ? "primary"
                              : "white"
                          }
                          className="me-2 mb-2 tag-white"
                          onClick={() => handleWrittenLanguageClick(item.uid)}
                        >
                          {item?.language_name}
                        </Badge>
                      ))}
                      {rdnwBadges.map((badge, index) => (
                        <Badge
                          key={index}
                          bg={
                            // selectedWrittenLanguageUids.includes(badge.uid)
                            //   ? "primary"
                            //   : "white"
                            "primary"
                          }
                          className="me-2 mb-2 tag-white"
                        // onClick={() => handleWrittenLanguageClick(badge.uid)}
                        >
                          {badge?.language_name}
                          <button
                            className="btn close_tag"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleRemoveReadAndWriteLanguageBadge(index)
                            }
                          >
                            <i className="fa fa-close ms-1"></i>
                          </button>
                        </Badge>
                      ))}
                      <Form.Control
                        type="text"
                        className="inline-input"
                        placeholder="Enter text"
                        onChange={(e) => {
                          setInputValue(e?.target?.value);
                        }}
                        onKeyDown={(e) => {
                          handleKeyPressForlanguages(e, "rdnw");
                        }}
                      />
                    </div> */}
                    <div className="tagarea p-2 position-relative">
                      {rdnwBadges.map((badge, index) => (
                        <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                          {badge?.language_name}
                          <button
                            className="btn close_tag"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleRemoveReadAndWriteLanguageBadge(index)
                            }
                          >
                            <i className="fa fa-close ms-1"></i>
                          </button>
                        </Badge>
                      ))}
                      <div className="inline-dropdown-container position-relative d-inline-block">
                        <Form.Control
                          type="text"
                          className="inline-input"
                          placeholder="Enter text"
                          ref={writtenRef}
                          // value={row.areaOfEducation}
                          // disabled={row.saved}
                          onChange={(e) => handleWaSlanguages(e, "rdnw")}
                          onBlur={(e) => handleClosecomboLang(e, "rdnw")}
                        />
                        {writtenLanguage?.length > 0 ? (
                          <Dropdown show={true} >
                            <Dropdown.Menu className="w-100 dropdown_ctm">
                              <div class={`${writtenLanguage.length ? 'droplistmulti' : ''}`}>
                                {writtenLanguage.map((option, idx) => (
                                  <Dropdown.Item
                                    key={idx}
                                    onClick={(e) =>
                                      handleSelectWrittenLang(option)
                                    }
                                  >
                                    {option?.language_name}
                                  </Dropdown.Item>
                                ))}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        ) : ('')}
                      </div>
                    </div>
                    <span className="required_text">
                      Select all written and reading languages
                    </span>
                  </div>
                </Form.Group>
              </div>

              <div className="custom-card">
                <h6>Geography</h6>

                <Row className="mb-3">
                  <Col md="3">
                    <Form.Label>Current Location</Form.Label>
                  </Col>

                  <Col md={9}>
                    {/* <Form.Control
                      type="text"
                      placeholder="Current Location"
                      size="sm"
                      style={{ width: "350px" }}
                      name="CurrentLocation"
                      value={profileformData?.CurrentLocation}
                      onChange={handleProfileDetailsChange}
                      isInvalid={!!errors.CurrentLocation}
                    /> */}
                    {/* <Dropdown show={true} >
                      <Dropdown.Menu className="w-100 dropdown_cti">
                        <FormControl
                          // autoFocus
                          placeholder="Current Location"
                          size="sm"
                          style={{ width: "350px" }}
                          name="CurrentLocation"
                          value={profileformData?.CurrentLocation}
                          onChange={(e) => setProfileFormData({ ...profileformData, ['CurrentLocation']: e.target.value })}
                        />
                        <div class={`${locationList.length ? 'droplist' : ''}`}>
                          {locationList.map((option, idx) => (
                            <Dropdown.Item
                              key={idx}
                              onClick={(e) =>
                                handleSelectGeographyLocaton(option?.location_name)
                              }
                            >
                              {option?.location_name}
                            </Dropdown.Item>
                          ))}
                        </div>
                      </Dropdown.Menu>
                    </Dropdown> */}
                    <div className="w-100  mx-w350 relative">
                      <FormControl
                        // autoFocus
                        placeholder="Current Location"
                        size="sm"
                        style={{ width: "350px" }}
                        name="CurrentLocation"
                        value={profileformData?.CurrentLocation}
                        onChange={handleLocationAPIList}
                        // setProfileFormData({ ...profileformData, ['CurrentLocation']: e.target.value })
                        // }
                        onBlur={(e) => handleDropDownCurrent(e)}
                      />
                      <div class={`${locationList.length ? 'ctm_dropdown ct_scrollbar' : ''}`}>
                        <ul className="m-0">
                          {locationList.map((option, idx) => (
                            <li
                              key={idx}
                              onClick={(e) =>
                                handleSelectGeographyLocaton(option?.location_name)
                              }
                            >
                              {option?.location_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Col>

                  <Form.Control.Feedback type="invalid">
                    {errors.CurrentLocation}
                  </Form.Control.Feedback>
                </Row>

                <Row className="mb-3">
                  <Col md="3">
                    <Form.Label>Willing to relocate to {jobPostData?.job_location?.location_name}</Form.Label>
                  </Col>
                  <Col md="9">
                    <div className="d-flex justify-content-start">
                      <Form.Check
                        type="radio"
                        label="Yes"
                        name="relocationChoice"
                        id="relocationChoice1"
                        className="me-3"
                        value="true"
                        checked={profileformData.relocationChoice == true}
                        onChange={handleProfileDetailsChange}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="relocationChoice"
                        id="relocationChoice2"
                        className="ms-3"
                        value="false"
                        checked={profileformData.relocationChoice == false}
                        onChange={handleProfileDetailsChange}
                      />
                    </div>

                    {errors.relocationChoice && (
                      <p className="error">{errors.relocationChoice}</p>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md="3">
                    <Form.Label>
                      Require company assistance for relocation?
                    </Form.Label>
                  </Col>
                  <Col md="9">
                    <div className="d-flex justify-content-start">
                      <Form.Check
                        type="radio"
                        label="Yes"
                        name="requiredCompanyAssist"
                        id="requiredCompanyAssist1"
                        className="me-3"
                        value="true"
                        checked={profileformData.requiredCompanyAssist == true}
                        onChange={handleProfileDetailsChange}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="requiredCompanyAssist"
                        id="requiredCompanyAssist2"
                        className="ms-3"
                        value="false"
                        checked={profileformData.requiredCompanyAssist == false}
                        onChange={handleProfileDetailsChange}
                      />
                    </div>
                    {errors.requiredCompanyAssist && (
                      <p className="error">{errors.requiredCompanyAssist}</p>
                    )}
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Skills</h6>
                <p className="font-sm">Please identify the skills you hold</p>

                {/* {Object.keys(groupedSkills).map((groupName, index) => (
                  <div key={index} className="row mb-3">
                    <strong className="col-md-3 strong-label">
                      {groupName}
                    </strong>
                    <div className="col-md-9">
                      {groupedSkills[groupName].map((skill, idx) => (
                        <span
                          key={idx}
                          className={`skill-tag mb-2 mr-2 ${selectedSkills.includes(skill.uid) ? "selected" : ""
                            }`}
                          onClick={() => handleSkillSelect(skill, index, groupedSkills[groupName])}
                        >
                          {skill?.skill_name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))} */}
                {skillGroupData.map((groupName, index) => (
                  <div key={index} className="row mb-3">
                    <strong className="col-md-3 strong-label">
                      {groupName?.skill_group_name}
                    </strong>
                    <div className="col-md-9">
                      {groupName?.group_skill.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`skill-tag mb-2 mr-2 ${selectedSkills.includes(skill.uid) ? "selected" : ""
                            }`}
                          onClick={() => handleSkillSelect(skill, index, groupName?.skill_group_name)}
                        >
                          {skill?.skill_name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {errors?.selectedSkills && (
                  <p className="error">{errors?.selectedSkills}</p>
                )}
              </div>

              <div className="custom-card mb-5">
                <h6 className="mb-4">Additional Question from Company</h6>
                {jobPostData?.question_job.map((item) => (
                  <div key={item.id} className="mb-3">
                    <h6 className="strong-label">{item?.question_title}</h6>

                    {item?.quiz_type === "MCQ" &&
                      item?.question_option?.part1?.map((option, index) => (
                        <Form.Check
                          key={index}
                          type="radio"
                          label={option}
                          name={`formHorizontalRadios-${item.id}`}
                          id={`formHorizontalRadios-${item.id}-${index}`}
                          className="mr-3"
                          onChange={() => handleAnswerChange(item?.uid, option)}
                        />
                      ))}

                    {/* {item?.quiz_type === "Text" && (
                      <Form.Control
                        type="text"
                        placeholder="Enter your answer"
                        className="mb-3"
                      />
                    )}

                    {item?.quiz_type === "Checkbox" &&
                      item?.question_option?.part1?.map((option, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={option}
                          name={`formCheckbox-${item.id}`}
                          id={`formCheckbox-${item.id}-${index}`}
                          className="mr-3"
                        />
                      ))} */}
                  </div>
                ))}
              </div>
              {skillError && (
                <div className="custom-card mb-5">
                  <div className="toster">
                    <img src={closeBtn} className='closebtn' onClick={() => setSkillError("")} />
                    <span>{skillError}</span>
                  </div>
                </div>
              )}
            </Col>
            {/* Right Column */}
            <Col md={3} lg={2} className="jobpre_Rightpanel">
              <div className="custom-card">
                <div className="custom-card">
                  <h5>{profileformData?.name}</h5>
                  <p>{profileformData?.email}</p>
                  <p>{profileformData?.phone}</p>
                  <p>{ResumeFile?.name}</p>
                  <div className="ct_scrollbar pb-2 mt-3">
                    <div className="user_bsinfo">
                      <h6>Availability</h6>

                      {profileformData?.AvailableBy ? (
                        <>
                          <p>Can join {profileformData?.AvailableBy}</p>
                          <p>
                            Currently Working{" "}
                            {isYes?.CurrentlyWorkingToggle ? "Yes" : "No"}
                          </p>
                          <p>
                            {profileformData?.NoticePeriod && `Notice period ${profileformData?.NoticePeriod} notice
                            period`}
                          </p>
                          <p>
                            Buyout option available{" "}
                            {isYes?.NoticeBuyOutToggle ? "Yes" : "No"}
                          </p>
                          <p>
                            Willing to travel for job{" "}
                            {isYes?.willingToTeavelJob ? "Yes" : "No"}
                          </p>
                        </>
                      ) : (
                        <p className="error" style={{ color: "red" }}>
                          Not defined
                        </p>
                      )}
                    </div>
                    <div className="user_bsinfo">
                      {profileformData?.ExpectedSalary ? (
                        <strong>
                          <p>{profileformData?.ExpectedSalary} Per Annum</p>
                        </strong>
                      ) :
                        (
                          <p>
                            <h6>Expected Salary</h6>
                            <p className="error" style={{ color: "red" }}>
                              Not defined
                            </p>
                          </p>
                        )}
                    </div>

                    <div className="user_bsinfo">
                      <h6>Educational Qualification</h6>

                      {isAllEducationFieldsFilled &&
                        EducationRows.map((row, index) => (
                          <div key={index}>
                            <p>
                              {row.level} in {row.areaOfEducation}{" "}
                            </p>
                          </div>
                        ))}
                      {EducationRows.length < 0 && (
                        <p className="error" style={{ color: "red" }}>
                          Not defined
                        </p>
                      )}
                      {!isAllEducationFieldsFilled && (
                        <p className="error" style={{ color: "red" }}> Not defined</p>
                      )}
                    </div>
                    <div className="user_bsinfo">
                      <h6>Work Experience</h6>
                      {totalWorkExperience ? (<p>{totalWorkExperience}</p>) : (
                        <p className="error" style={{ color: "red" }}> Not defined</p>
                      )}
                      {isAllWorkExperienceFieldsFilled &&
                        WorkExpreienceRow.map((row, index) => (
                          <div key={index}>
                            <strong>
                              {" "}
                              <p>{row.TotalWorkExperience} Experience </p>
                            </strong>
                            <p>{row.WorkRole}</p>
                            <p>{row.WorkFrom}</p>
                            <p>{row.WorkTo}</p>
                            <p>{row.WorkComapny}</p>
                            <p>{row.WorkIndustry}</p>
                            <p>{row.WorkNote}</p>
                            <p>
                              Work Experience Duration{" "}
                              {
                                calculateWorkExperience(
                                  row.WorkFrom,
                                  row.WorkTo
                                ).split(" ")[0]
                              }{" "}
                              years
                            </p>
                          </div>
                        ))}
                    </div>
                    <div className="user_bsinfo">
                      <h6>Language</h6>
                      {selectedSpokenLanguageNames.length > 0 ||
                        getSelectedWrittenLanguageName.length > 0 ? (
                        <>

                          {selectedSpokenLanguageNames.length > 0 && (
                            <div className="lang_list">
                              {selectedSpokenLanguageNames.map(
                                (skillName, index) => (
                                  <span key={index}>
                                    {skillName}
                                    {index <
                                      selectedSpokenLanguageNames.length - 1 &&
                                      ", "}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                          {getSelectedWrittenLanguageName.length > 0 && (
                            <div className="lang_list">
                              {getSelectedWrittenLanguageName.map(
                                (skillName, index) => (
                                  <span key={index}>
                                    {skillName}
                                    {index <
                                      getSelectedWrittenLanguageName.length - 1 &&
                                      ", "}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="error" style={{ color: "red" }}>
                          Not defined
                        </p>
                      )}

                    </div>
                    <div className="user_bsinfo">
                      <h6>Geography</h6>

                      {!profileformData?.CurrentLocation ||
                        profileformData.relocationChoice === null ||
                        profileformData.requiredCompanyAssist === null ? (
                        <p className="error" style={{ color: "red" }}>
                          Not defined
                        </p>
                      ) : (
                        <>
                          <p>
                            Current Location {profileformData?.CurrentLocation}
                          </p>
                          <p>
                            Willing to relocate{" "}
                            {profileformData.relocationChoice === true
                              ? "Yes"
                              : "No"}
                          </p>
                          <p>
                            Require company assistance for relocation{" "}
                            {profileformData.requiredCompanyAssist === true
                              ? "Yes"
                              : "No"}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="user_bsinfo">
                      <h6>Skills</h6>

                      <div className="lang_list">
                        {selectedSkillsNames.length > 0 ? (
                          selectedSkillsNames.map((skillName, index) => (
                            <span key={index}>
                              {skillName}
                              {index < selectedSkillsNames.length - 1 && ", "}{" "}

                            </span>
                          ))
                        ) : (
                          <p className="error" style={{ color: "red" }}>
                            Not defined
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="user_bsinfo">
                      <h6>Additional Questions from Company</h6>
                      {jobPostData?.question_job.map((item) => (
                        <div key={item.id} className="mb-3">
                          <h6 className="strong-label">{item?.question_title}</h6>
                          <strong className="strong-label">{" "}
                            {selectedAnswers[item?.uid] || (
                              <p className="error" style={{ color: "red" }}>Not defined</p>
                            )}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <div>
          <Modal backdrop={false} aria-labelledby="contained-modal-title-vcenter"
            centered show={showModal.showSaveAsDraft} onHide={handleCloseModals} className="model_sm alartmdl">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="text-center">
              <Modal.Title>
                Are you sure you want to exit<br /> without submitting?
              </Modal.Title>
              <p className="mdl_description">
                Your details will be saved as a draft, and you can log in with{" "}<br />
                {profileformData?.email} later to finish your application.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={handleCloseModals}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => handleFormDetailsApi('Draft', '')}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>


        <div>
          <Modal backdrop={false} aria-labelledby="contained-modal-title-vcenter"
            centered show={showModal.showSaveModal} onHide={handleCloseModals} className="model_sm alartmdl alart-submited">
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body className="text-center">
              <Modal.Title>
                Your application has been successfully submitted.
              </Modal.Title>
              <p className="mdl_description">
                You can view your progress and complete the next steps by logging
                into LYWO with {profileformData?.email}.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={() => handleFormDetailsApi('Completed', '')}>
                Return to Job
              </Button>
              <Button variant="primary" onClick={() => handleFormDetailsApi('Completed', 'test')}>Proceed to Behavioral Test</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          style={{ marginLeft: 150 }}
          // disabled={validationEnable ? true : false}
          hidden={validationEnable ? true : false}
          onClick={() => handleSaveAsDraft()}
        >
          Save as Draft
        </Button>
        <Button
          disabled={!validationEnable}
          variant="primary"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicationJobPostModal;
