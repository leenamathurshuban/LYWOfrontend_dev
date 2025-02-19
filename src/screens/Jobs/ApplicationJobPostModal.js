import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import imgpTrash from "../../images/icons/trash-01.svg";
import logoIcon from "../../images/logo_icon.png";
import {
  ApplicationDeatilsApi,
  ApplicationFormDetailsApi,
  ApplicationJobApi,
  EducationQualificationApi,
  WorkExperienceApi,
} from "../../services/provider";
import axios from "axios";
import { compose } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const ApplicationJobPostModal = ({
  show,
  handleClose,
  jobPostData,
  updateButtonText,
  registerdUserLoginDetails,
  viewDetailData,
}) => {
  const [isYes, setIsYes] = useState({
    CurrentlyWorkingToggle: false,
    NoticeBuyOutToggle: false,
  });
  const [ResumeFile, setResumeFile] = useState(null);
  const [ResumeFileName, setResumeFileName] = useState("");
  const [error, setError] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [ApplicantProfileData, setApplicantProfileData] = useState(null);
  const [selectedSpokenLanguageUids, setSelectedSpokenLanguageUids] = useState(
    []
  );
  const navigate = useNavigate()
  const [selectedWrittenLanguageUids, setSelectedWrittenLanguageUids] =
    useState([]);

  const [EducationRows, SetEducationRows] = useState([
    {
      level: "",
      areaOfEducation: "",
      gradYear: "",
      university: "",
      grade: "",
    },
  ]);

  const [WorkExpreienceRow, setWorkExpreienceRow] = useState([
    {
      TotalWorkExperience: "",
      WorkRole: "",
      WorkFrom: "",
      WorkTo: "",
      WorkComapny: "",
      WorkIndustry: "",
      WorkNote: "",
    },
  ]);

  const [profileformData, setProfileFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    Qualification: "",
    AvailableBy: "",
    NoticePeriod: "",
    ExpectedSalary: "",
    TotalWorkExperience: "",
    CurrentLocation: "",
    relocationChoice: null,
    requiredCompanyAssist: null,
  });

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
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showModal, setShowModal] = useState({
    showSaveAsDraft: false,
    showSaveModal: false,
  });

  const [storedApplicantId, setStoredApplicantId] = useState("");

  const handleCloseModals = () => {
    setShowModal({
      showSaveAsDraft: false,
      showSaveModal: false,
    });
  };

  const handleShowModal = (modalName) => {
    setShowModal((prevState) => {
      const newState = {
        showSaveAsDraft: false,
        showSaveModal: false,
      };

      // Set the modal that needs to be shown to true
      if (modalName === "SaveAsDraft") {
        newState.showSaveAsDraft = true;
      } else if (modalName === "Save") {
        newState.showSaveModal = true;
      }

      return newState;
    });
  };

  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill.uid)) {
      setSelectedSkills(
        selectedSkills.filter((selectedSkill) => selectedSkill !== skill.uid)
      );
    } else {
      if (selectedSkills.length < 8) {
        setSelectedSkills([...selectedSkills, skill.uid]);
      } else {
        alert("You can only select upto 8 skills.");
      }
    }
  };

  const validateForProfileDetails = () => {
    const newErrors = {};
    let formIsValid = true;

    if (!profileformData.name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }

    if (!profileformData.email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    }

    if (!profileformData.confirmEmail) {
      formIsValid = false;
      newErrors.confirmEmail =
        "Your application and progress are linked to this email. Please ensure it is entered correctly.";
    } else if (profileformData.email !== profileformData.confirmEmail) {
      formIsValid = false;
      newErrors.confirmEmail =
        "The email addresses do not match. Please check both fields and try again";
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!profileformData.phone) {
      formIsValid = false;
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(profileformData.phone)) {
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
    isWorkExperienceFormValid &&
    isEducationFormValid &&
    selectedWrittenLanguageUids.length !== 0 &&
    selectedSpokenLanguageUids.length !== 0 &&
    profileformData?.CurrentLocation &&
    selectedSkills.length !== 0 &&
    profileformData?.CurrentLocation &&
    ResumeFile &&
    profileformData?.AvailableBy &&
    profileformData?.NoticePeriod &&
    profileformData?.ExpectedSalary;

  const handleProfileDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProfileFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "radio"
          ? value === "true"
          : type === "checkbox" || type === "switch"
          ? checked
          : value,
    }));
  };

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
    validateForProfileDetails();
  };

  const handleProfileDetailsApi = async () => {
    try {
      const formData = new FormData();
      formData.append("email", profileformData?.email);
      formData.append("user_name", profileformData?.name);
      formData.append("user_phone_number", profileformData?.phone);
      formData.append("job_uid", jobPostData?.uid);
      const response = await ApplicationJobApi(formData);

      if (response.status === 200) {
        setApplicantProfileData(response.data);
        setStoredApplicantId(response.data?.applcant?.uid);

        localStorage.setItem(
          "applicantProfileData",
          JSON.stringify(response.data)
        );
        updateButtonText("Continue Btn");
      } else {
        console.error("Failed to save form: ", response.data);
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const handleFormDetailsApi = async () => {
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
      formdata.append("resume", ResumeFile);
      formdata.append("availble_by", profileformData?.AvailableBy);
      formdata.append("currently_working", isYes?.CurrentlyWorkingToggle);
      formdata.append("notice_period", profileformData?.NoticePeriod);
      formdata.append("notice_buyout_available", isYes?.NoticeBuyOutToggle);
      formdata.append(
        "applicant_status",
        validationEnable ? "Completed" : "Draft"
      );
      formdata.append("expected_salary", profileformData?.ExpectedSalary);
      formdata.append(
        "spoken_language",
        JSON.stringify(selectedSpokenLanguageUids)
      );
      formdata.append(
        "written_reading_language",
        JSON.stringify(selectedWrittenLanguageUids)
      );
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
      formdata.append("question_answer_array", JSON.stringify(questionAnswerArray));
      const response = await axios.put(
        `https://bittrend.shubansoftware.com/assets-api/applicant-update-api/${storedApplicantId}/`,
        formdata,
        { headers: headers }
      );

      if (response.status === 200) {
        if (response?.data?.response.applicant_status === "Draft") {
          updateButtonText("Continue Btn");
          handleCloseModals();
          handleClose();
        } else if (response?.data?.response.applicant_status === "Completed") {
          updateButtonText("View Form Btn");
          handleCloseModals();
          handleClose();
        //   localStorage.setItem('applicantToken', ApplicantProfileData?.user_login?.access)
        //   localStorage.setItem('applicantData',JSON.stringify(ApplicantProfileData?.applcant))

        // navigate('/Behavioural-Assessment')

        }
        
        // behaviour wala navigate hoga
        // const response = await ApplicationFormDetailsApi(
        //   formdata,
        //   ApplicantProfileData?.applcant?.uid
        // );


      }
    } catch (error) {
      console.log(error)

    }
  }





  const handleSubmit = () => {
    if (!storedApplicantId) {
      alert("Please fill Profile Details");
      return;
    }

    handleShowModal("Save");
  };

  const handleSaveAsDraft = () => {
    if (!storedApplicantId) {
      alert("Please fill Profile Details");
      return;
    }
    handleShowModal("SaveAsDraft");
  };

  

  const handleButtonClick = () => setShowInput(!showInput);

  const EducationAddRow = () => {
    SetEducationRows([
      ...EducationRows,
      {
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

  const saveQualificationData = async (row) => {
    try {
      if (!storedApplicantId) {
        alert("Please fill Profile Details");
        return;
      }
      const formdata = new FormData();
      formdata.append("applicant_profile", storedApplicantId);
      formdata.append("level", row.level);
      formdata.append("applicant_area_of_education", row.areaOfEducation);
      formdata.append("grad_year", row.gradYear);
      formdata.append("university", row.university);
      formdata.append("grade", row.grade);
      const response = await EducationQualificationApi(formdata);

      if (response.status === 200) {
        console.log("Education Saved Successfully");
      } else {
        console.error("Failed to save form: ", response.data);
        alert("There was an issue saving the form.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const saveWorkExperienceData = async (row) => {
    try {
      if (!storedApplicantId) {
        alert("Please fill Profile Details");
        return;
      }
      const formdata = new FormData();
      formdata.append("work_applicant_profile", storedApplicantId);
      formdata.append("total_work_experience", row.TotalWorkExperience);
      formdata.append("role", row.WorkRole);
      formdata.append("work_from", row.WorkFrom);
      formdata.append("work_to", row.WorkTo);
      formdata.append("work_company", row.WorkComapny);
      formdata.append("work_industry", row.WorkIndustry);
      formdata.append("note", row.WorkNote);

      const response = await WorkExperienceApi(formdata);

      if (response.status === 200) {
        console.log("Data added of work experience");
      } else {
        console.error("Failed to save form: ", response.data);
        alert("There was an issue saving the form.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Please fill all field data");
    }
  };

  const WorkExpreienceAddRow = () => {
    setWorkExpreienceRow((prevState) => [
      ...prevState,
      {
        TotalWorkExperience: "",
        WorkRole: "",
        WorkFrom: "",
        WorkTo: "",
        WorkComapny: "",
        WorkIndustry: "",
        WorkNote: "",
      },
    ]);
  };

  const WorkExperienceDeleteRow = (index) => {
    const deleteRow = WorkExpreienceRow.filter((_, i) => i !== index);
    setWorkExpreienceRow(deleteRow);
  };

  const handleWorkExpeienceChange = (index, e) => {
    const { name, value } = e.target;

    const newWorkRow = [...WorkExpreienceRow];

    newWorkRow[index][name] = value;
    setWorkExpreienceRow(newWorkRow);
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

  const groupedSkills = jobPostData?.skills?.reduce((acc, skill) => {
    const groupName = skill?.skill_group?.skill_group_name;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(skill);
    return acc;
  }, {});

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
  const handleWrittenLanguageClick = (uid) => {
    if (selectedWrittenLanguageUids.includes(uid)) {
      setSelectedWrittenLanguageUids(
        selectedWrittenLanguageUids.filter((item) => item !== uid)
      );
    } else {
      setSelectedWrittenLanguageUids([...selectedWrittenLanguageUids, uid]);
    }
  };

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

  useEffect(() => {
    if (profileformData) {
      validateForProfileDetails();
    }
    if (isValid) {
      handleProfileDetailsApi();
    }
  }, [jobPostData, profileformData, isValid]);

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("applicantProfileAllSavedData")
    );

    if (storedData) {
      setProfileFormData((prevState) => ({
        ...prevState,
        name: storedData?.user?.username || "",
        email: storedData?.user?.email || "",
        confirmEmail: storedData?.user?.email || "",
        phone: storedData?.user?.phone_number || "",
        AvailableBy: storedData?.availble_by || "",
        NoticePeriod: storedData?.notice_period || "",
        ExpectedSalary: storedData?.expected_salary || "",
        CurrentLocation: storedData?.current_location || "",
        relocationChoice: storedData?.willing_to_relocate_to || false,
        requiredCompanyAssist:
          storedData?.require_company_assistance_for_relocation || false,
      }));

      setIsYes((prevState) => ({
        ...prevState,
        CurrentlyWorkingToggle: storedData?.currently_working || false,
        NoticeBuyOutToggle: storedData?.notice_buyout_available || false,
      }));

      setStoredApplicantId(storedData?.uid);

      const spokenUids = Array.from(
        new Set(storedData?.spoken_language.map((item) => item?.uid))
      );
      const writtenUids = Array.from(
        new Set(storedData?.written_reading_language.map((item) => item?.uid))
      );

      setSelectedSpokenLanguageUids((prevState) => [
        ...prevState,
        ...spokenUids.filter((uid) => !prevState.includes(uid)),
      ]);

      setSelectedWrittenLanguageUids((prevState) => [
        ...prevState,
        ...writtenUids.filter((uid) => !prevState.includes(uid)),
      ]);

      const skillsUids =
        storedData?.applicant_profile_job[0]?.job_applicant_skill.map(
          (item) => item?.uid
        );
      setSelectedSkills((prevState) => [...prevState, ...skillsUids]);

      const resumeFileUrl = storedData?.resume || null;
      setResumeFile(resumeFileUrl);

      const resumeFileName = resumeFileUrl
        ? resumeFileUrl.split("/").pop()
        : "";

      setResumeFileName(resumeFileName);
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

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size="lg"
      backdrop={false}
      className="cmprofile_mdl quizDev_model"
    >
      <Modal.Header closeButton className="p-2">
        <img src={logoIcon} className="me-2" />
        <div>
          {/* <h5>{jobPostData?.detailed_description}</h5> */}
          <p>
            {jobPostData?.job_company?.company_name},{" "}
            {/* {jobPostData?.job_company?.location},  */}
            {jobPostData?.job_type}
            {""},{jobPostData?.workplace_type}
          </p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row className="justify-content-center">
            {/* Left Column */}
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
                    isYes?.CurrentlyWorkingToggle &&
                    profileformData?.NoticePeriod &&
                    isYes?.NoticeBuyOutToggle &&
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
                <li className={`${selectedSpokenLanguageUids.length && selectedWrittenLanguageUids.length && "active"}`}>
                  <a href="#item_Geog">
                    Language <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>

                <li className={`${profileformData?.CurrentLocation && "active"}`}>
                  <a href="#item_Geog">
                    Geography <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li className={`${selectedSkills.length > 0 && "active"}`}>
                  <a href="#item_Geog">
                    Skills <i class="fa fa-check" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
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
                    <Form.Label>Email</Form.Label>
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

                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "350px" }}
                      name="phone"
                      value={profileformData.phone}
                      onChange={handleProfileDetailsChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      isInvalid={touchedFields.phone && !!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Resume</h6>

                <Row className="mb-3 mt-2">
                  <Col xs="auto" className="text-center">
                    <Form.Label>Add Document</Form.Label>
                  </Col>

                  <Col>
                    {!ResumeFile && (
                      <div
                        className="cmp_uploder file-upload-box"
                        {...getRootProps()}
                      >
                        <div className="upload-content">
                          <input {...getInputProps()} />
                          <i className="fas fa-cloud-upload-alt upload-icon"></i>
                          <h5>
                            <strong className="text-primary">
                              Click to upload
                            </strong>{" "}
                            or Drag & Drop
                          </h5>
                          <small className="text-muted mb-0">
                            PDF or Doc. Should be less than 2 MB
                          </small>
                        </div>
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
                          <p>{ResumeFile?.name || ResumeFileName}</p>

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
                    />
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

                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Notice Period</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="2 weeks"
                      size="sm"
                      style={{ width: "350px" }}
                      name="NoticePeriod"
                      value={profileformData?.NoticePeriod}
                      onChange={handleProfileDetailsChange}
                      isInvalid={!!errors.NoticePeriod}
                    />
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
                      aria-label="Default select example"
                      name="ExpectedSalary"
                      value={profileformData?.ExpectedSalary}
                      onChange={handleProfileDetailsChange}
                      isInvalid={!!errors.ExpectedSalary}
                      required
                    >
                      <option>Expected Salary</option>
                      <option value="15K">₹5 LPA - ₹ 10 LPA</option>
                      <option value="20K">₹15 LPA - ₹ 20 LPA</option>
                      <option value="30K">₹25 LPA - ₹ 30 LPA</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="error">
                      {errors.ExpectedSalary}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Educational Qualification</h6>
                {EducationRows.map((row, index) => (
                  <Row
                    className="mb-3 d-flex align-items-center border-top"
                    key={index}
                  >
                    <Col md={2}>
                      <h6>Level</h6>
                      <Form.Select
                        name="level"
                        value={row.level}
                        onChange={(e) =>
                          handleEducationQualificationChange(index, e)
                        }
                      >
                        <option>Level</option>

                        <option value="High school">High school</option>
                        <option value="Bachelors Degree">
                          Bachelors Degree
                        </option>
                        <option value="Master Degree">Master Degree</option>
                        <option value="Diploma ">Diploma </option>
                        <option value="PG Diploma">PG Diploma</option>
                        <option value="PhD">PhD</option>
                        <option value="Post Doctorate">Post Doctorate</option>
                      </Form.Select>
                    </Col>
                    <Col md={3}>
                      <h6>Area of Education</h6>
                      <Form.Control
                        name="areaOfEducation"
                        type="text"
                        placeholder="9876543210"
                        size="sm"
                        value={row.areaOfEducation}
                        onChange={(e) =>
                          handleEducationQualificationChange(index, e)
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <h6>Grad. Year</h6>
                      <Form.Control
                        name="gradYear"
                        type="date"
                        value={row.gradYear}
                        onChange={(e) =>
                          handleEducationQualificationChange(index, e)
                        }
                      />
                    </Col>
                    <Col md={2} className="p-4">
                      <h6>University</h6>
                      <Form.Control
                        name="university"
                        type="text"
                        placeholder="University"
                        size="sm"
                        value={row.university}
                        onChange={(e) =>
                          handleEducationQualificationChange(index, e)
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <h6>Grade</h6>
                      <Form.Control
                        name="grade"
                        type="text"
                        placeholder="grade"
                        size="sm"
                        value={row.grade}
                        onChange={(e) =>
                          handleEducationQualificationChange(index, e)
                        }
                      />
                      <Form.Select value={"GPA"}>
                        <option>GPA</option>
                      </Form.Select>
                    </Col>
                    <Col md={1}>
                      <img
                        src={imgpTrash}
                        alt="Delete"
                        style={{ width: "20px", height: "20px" }}
                        onClick={() => EducationdeleteRow(index)}
                      />

                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => saveQualificationData(row)}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button onClick={EducationAddRow}>+ Add</Button>
              </div>

              <div className="custom-card">
                <h6>Work Experience</h6>

                {WorkExpreienceRow.map((row, index) => (
                  <div key={index}>
                    <Row>
                      <Col xs="auto" className="text-center">
                        <Form.Label>Total Work Experience</Form.Label>
                      </Col>

                      <Col>
                        <Form.Control
                          type="text"
                          placeholder=""
                          size="sm"
                          style={{ width: "350px" }}
                          value={row?.TotalWorkExperience}
                          name="TotalWorkExperience"
                          onChange={(e) => handleWorkExpeienceChange(index, e)}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3 d-flex align-items-center border-top mt-2">
                      <Col md={2}>
                        <h6>Role</h6>
                        <Form.Control
                          type="text"
                          placeholder="9876543210"
                          size="sm"
                          style={{ width: "150px" }}
                          value={row?.WorkRole}
                          name="WorkRole"
                          onChange={(e) => handleWorkExpeienceChange(index, e)}
                        />
                      </Col>
                      <Col md={2}>
                        <h6>From</h6>
                        <Form.Control
                          placeholder="June 2019"
                          size="sm"
                          style={{ width: "150px" }}
                          type="date"
                          value={row?.WorkFrom}
                          name="WorkFrom"
                          onChange={(e) => handleWorkExpeienceChange(index, e)}
                        />
                      </Col>
                      <Col md={2}>
                        <h6>To</h6>
                        <Form.Control
                          type="date"
                          placeholder="May 2022"
                          size="sm"
                          style={{ width: "150px" }}
                          value={row?.WorkTo}
                          name="WorkTo"
                          onChange={(e) => handleWorkExpeienceChange(index, e)}
                        />
                      </Col>
                      <Col md={3} className="p-4">
                        <h6> Company</h6>
                        <Form.Control
                          type="text"
                          placeholder="9876543210"
                          size="sm"
                          style={{ width: "150px" }}
                          value={row?.WorkComapny}
                          name="WorkComapny"
                          onChange={(e) => handleWorkExpeienceChange(index, e)}
                        />
                      </Col>
                      <Col md={2} className="p-4">
                        <h6> Industry</h6>
                        <Form.Control
                          type="text"
                          placeholder="9876543210"
                          size="sm"
                          style={{ width: "150px" }}
                          name="WorkIndustry"
                          value={row?.WorkIndustry}
                          onChange={(e) => handleWorkExpeienceChange(index, e)}
                        />
                      </Col>
                      {showInput && (
                        <div style={{ marginTop: "10px" }}>
                          <Form>
                            <Form.Group controlId="noteInput">
                              <Form.Label>Note</Form.Label>
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
                      <Col md={1} className="p-4">
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={handleButtonClick}
                        >
                          Note
                        </Button>

                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => saveWorkExperienceData(row)}
                        >
                          Save
                        </Button>
                      </Col>

                      <Col md={1}>
                        <img
                          src={imgpTrash}
                          alt="Delete"
                          style={{ width: "20px", height: "20px" }}
                          onClick={() => WorkExperienceDeleteRow(index)}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}

                <Button onClick={WorkExpreienceAddRow}>+ Add</Button>
              </div>

              <div className="custom-card">
                <h6>Language</h6>
                <p>Pick as many as possible</p>

                <Row>
                  <Form.Group
                    className="mb-3 col-md-6"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className="sm-label">
                      Spoken Language
                    </Form.Label>
                    <div className="tagarea p-2">
                      {jobPostData?.spoken_language?.map((item, index) => (
                        <Badge
                          key={index}
                          bg={
                            selectedSpokenLanguageUids.includes(item.uid)
                              ? "primary"
                              : "white"
                          }
                          className="me-2 mb-2 tag-white"
                          onClick={() => handleSpokenLanguageClick(item.uid)}
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedSpokenLanguageUids.includes(item.uid)
                                ? "#007bff"
                                : "transparent",
                            color: selectedSpokenLanguageUids.includes(item.uid)
                              ? "#fff"
                              : "#007bff",
                          }}
                        >
                          {item?.language_name}
                        </Badge>
                      ))}
                    </div>
                    <span className="required_text">
                      Select all spoken languages
                    </span>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-md-6"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className="sm-label">
                      Written and Reading Language
                    </Form.Label>
                    <div className="tagarea p-2">
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
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedWrittenLanguageUids.includes(item.uid)
                                ? "#007bff"
                                : "transparent",
                            color: selectedWrittenLanguageUids.includes(
                              item.uid
                            )
                              ? "#fff"
                              : "#007bff",
                          }}
                        >
                          {item?.language_name}
                        </Badge>
                      ))}
                    </div>
                    <span className="required_text">
                      Select all written and reading languages
                    </span>
                  </Form.Group>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Geography</h6>

                <Row className="mb-3">
                  <Col xs="auto" className="text-center">
                    <Form.Label>Current Location</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Current Location"
                      size="sm"
                      style={{ width: "350px" }}
                      name="CurrentLocation"
                      value={profileformData?.CurrentLocation}
                      onChange={handleProfileDetailsChange}
                      isInvalid={!!errors.CurrentLocation}
                    />
                  </Col>

                  <Form.Control.Feedback type="invalid">
                    {errors.CurrentLocation}
                  </Form.Control.Feedback>
                </Row>

                <Row className="mb-3">
                  <Col xs="auto" className="text-center">
                    <Form.Label>Willing to relocate to XXXXXXXX</Form.Label>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start">
                      <Form.Check
                        type="radio"
                        label="Yes"
                        name="relocationChoice"
                        id="relocationChoice1"
                        className="mr-3"
                        value="true"
                        checked={profileformData.relocationChoice == true}
                        onChange={handleProfileDetailsChange}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="relocationChoice"
                        id="relocationChoice2"
                        className="ml-3"
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
                  <Col xs="auto" className="text-center">
                    <Form.Label>
                      Require company assistance for relocation?
                    </Form.Label>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start">
                      <Form.Check
                        type="radio"
                        label="Yes"
                        name="requiredCompanyAssist"
                        id="requiredCompanyAssist1"
                        className="mr-3"
                        value="true"
                        checked={profileformData.requiredCompanyAssist == true}
                        onChange={handleProfileDetailsChange}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="requiredCompanyAssist"
                        id="requiredCompanyAssist2"
                        className="ml-3"
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
                <p>Please select 8 skills</p>

                {Object.keys(groupedSkills).map((groupName, index) => (
                  <div key={index}>
                    <strong>{groupName}</strong>
                    <div>
                      {groupedSkills[groupName].map((skill, idx) => (
                        <span
                          key={idx}
                          className={`skill-tag mb-2 mr-2 ${selectedSkills.includes(skill.uid) ? "selected" : ""
                            }`}
                          onClick={() => handleSkillSelect(skill)}
                          style={{
                            padding: "5px 15px",
                            border: "1px solid #007bff",
                            borderRadius: "20px",
                            cursor: "pointer",
                            backgroundColor: selectedSkills.includes(skill.uid)
                              ? "#007bff"
                              : "transparent",
                            color: selectedSkills.includes(skill.uid)
                              ? "#fff"
                              : "#007bff",
                          }}
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

              <div className="custom-card">
                <h6>Additional Question from Company</h6>
                {jobPostData?.question_job.map((item) => (
                  <div key={item.id}>
                    <h6>{item?.question_title}</h6>

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

                    {item?.quiz_type === "Text" && (
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
                      ))}
                  </div>
                ))}
              </div>
            </Col>
            {/* Right Column */}
            <Col md={3} lg={2} className="jobpre_Rightpanel">
              <div className="custom-card">
                <h6>{profileformData?.name}</h6>
                <p>{profileformData?.email}</p>
                <p>{profileformData?.phone}</p>
                <p>{ResumeFile?.name}</p>
                <p>
                  <strong>Availability</strong>
                </p>
                {profileformData?.AvailableBy ? (
                  <p>{profileformData?.AvailableBy}</p>
                ) : (
                  <p className="error" style={{ color: "red" }}>
                    Not defined
                  </p>
                )}
                <p>{isYes?.CurrentlyWorkingToggle}</p>
                <p>{profileformData?.NoticePeriod}</p>
                <p>{isYes?.NoticeBuyOutToggle}</p>
                <p>
                  <strong>Salary</strong>
                </p>
                {profileformData?.ExpectedSalary ? (
                  <p>{profileformData?.ExpectedSalary}</p>
                ) : (
                  <p className="error" style={{ color: "red" }}>
                    Not defined
                  </p>
                )}
                <p>
                  <strong>Educational Qualification</strong>
                </p>
                {EducationRows.map((row, index) => (
                  <div key={index}>
                    <p>{row.level}</p>
                    <p>{row.areaOfEducation}</p>
                    <p>{row.gradYear}</p>
                    <p>{row.university}</p>
                    <p>{row.grade}</p>
                  </div>
                ))}
                {EducationRows.length === 0 && (
                  <p className="error" style={{ color: "red" }}>
                    Not defined
                  </p>
                )}
                <p>
                  <strong>Work Experience : </strong>
                </p>
                {WorkExpreienceRow.map((row, index) => (
                  <div key={index}>
                    <p>{row.TotalWorkExperience}</p>
                    <p>{row.WorkRole}</p>
                    <p>{row.WorkFrom}</p>
                    <p>{row.WorkTo}</p>
                    <p>{row.WorkComapny}</p>
                    <p>{row.WorkIndustry}</p>
                    <p>{row.WorkNote}</p>
                  </div>
                ))}
                <p>
                  <strong>Language</strong>
                </p>
                {jobPostData?.spoken_language?.map((item) => (
                  <p>{item.language_name}</p>
                ))}

                <p>
                  <strong>Geography</strong>
                </p>
                <p>{profileformData?.CurrentLocation}</p>
              </div>
            </Col>
          </Row>

          <Button
            variant="light"
            style={{ marginLeft: 150 }}
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
        </Container>

        <div>
          <Modal show={showModal.showSaveAsDraft} onHide={handleCloseModals}>
            <Modal.Header closeButton>
              <Modal.Title>
                Are you sure you want to exit without submitting?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your details will be saved as a draft, and you can log in with{" "}
              {profileformData?.email} later to finish your application.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={handleCloseModals}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => handleFormDetailsApi()}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div>
          <Modal show={showModal.showSaveModal} onHide={handleCloseModals}>
            <Modal.Header closeButton>
              <Modal.Title>
                Your application has been successfully submitted.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You can view your progress and complete the next steps by logging
              into LYWO with {profileformData?.email}.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={() => handleFormDetailsApi()}>
                Return to Job
              </Button>
              <Button variant="primary">Proceed to Behavioral Test</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ApplicationJobPostModal;
