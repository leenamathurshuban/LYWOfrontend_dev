import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import Doc from "../../images/DocumentIcon.png";
import Download from "../../images/icons/download-12x12.svg";
import Global from "../../images/Global.png";
import HomeIcon from "../../images/icons/HomeIcon.png";
import UserIcon from "../../images/icons/UserIcon.png";
import Logo from "../../images/logo_icon.png";
import Share from "../../images/icons/share-07.svg";
import InfoCircle from "../../images/icons/info-circle16x16.svg";
import {
  ApplicationDeatilsApi,
  EvalationAssestDetails,
  getPostJobIdApi,
} from "../../services/provider";
import ApplicationJobPostModal from "./ApplicationJobPostModal";
import AboutLywoModal from "../../components/CustomModals/AboutLywoModal";
import Chat from "../../images/ChatButton.png";
import ChatModal from "../../components/CustomModals/ChatModal";
import { removeToken } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";
import Logout from "../../images/icons/Logout.png";
import jobRoal from "../../images/icons/job-role.svg";
import jobLike from "../../images/icons/job-like.svg";
import jobExp from "../../images/icons/job-expe.svg";
import jobDivision from "../../images/icons/job-division.svg";
import jobDepart from "../../images/icons/job-depart.svg";
import jobSkills from "../../images/icons/job-skills.svg";
import jobEducation from "../../images/icons/job-education.svg";
import jobArea from "../../images/icons/job-area.svg";
import jobType from "../../images/icons/job-type.svg";
import jobWorktype from "../../images/icons/job-worktype.svg";
import InfoTravel from "../../images/icons/job-travel.svg";
import InfoLanguage from "../../images/icons/job-language.svg";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import InrRuppe from "../../images/icons/currency-rupee-16x.svg";
import GlobSmall from "../../images/icons/glob-10x.svg";
import LinkdeenR from "../../images/icons/linkdeen-16x.svg";
import MarkerPIn from "../../images/icons/marker-pin-16.svg";
import ExperinecB from "../../images/icons/briefcase-0116x.svg";
import User16x from "../../images/icons/user-plus-0116x.svg";
import BehaviourAssReport from "../BehaviourAss/BehaviourAssReport";
import BehaviouralAst from "../BehaviourAss/BehaviouralAst";
import checkRight from "../../images/icons/check_green.svg";
import checkpending from "../../images/icons/pending_status.svg";
import AssignmentComponent from "./AssignmentComponent";

const jobDetailPng = [jobRoal, jobLike, jobExp, jobDivision, jobDepart, jobSkills, jobEducation, jobArea, jobType, jobWorktype, InfoTravel, InfoLanguage]

const JobPosts = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const paramemail = searchParams.get("email");
  const paramtoken = searchParams.get("token");
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      localStorage.setItem('authToken', paramtoken)
    }
  }, [])
  const [jobPostData, setJobPostData] = useState(null);
  const [jobPostErrorMsg, setJobPostErrorMsg] = useState("");
  const [behaviourAssModel, setBehaviourAssModel] = useState(false);
  const [behaviourReportModel, setBehaviourReportModel] = useState(false);

  const [modalOpen, setModalOpen] = useState({
    showFirstModal: false,
    showSecondModal: false,
    showChatModal: false,
    showProfileViewDetailsModal: false,
  });
  const [emailInput, setEmailInput] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState(jobPostData?.job_link);
  const [copied, setCopied] = useState(false);
  const [buttonText, setButtonText] = useState("Apply Now");
  const [registerdUserLoginDetails, setRegisterdUserLoginDetails] =
    useState(null);
  const [viewDetailData, setViewDetailData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  const [isYes, setIsYes] = useState({
    CurrentlyWorkingToggle: false,
    NoticeBuyOutToggle: false,
    willingToTeavelJob: false,
  });
  const [storedApplicantId, setStoredApplicantId] = useState("");
  const [selectedSpokenLanguageUids, setSelectedSpokenLanguageUids] = useState([]);
  const [selectedWrittenLanguageUids, setSelectedWrittenLanguageUids] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [ResumeFile, setResumeFile] = useState(null);
  const [ResumeFileName, setResumeFileName] = useState("");
  const [EducationRows, SetEducationRows] = useState([{
    level: "",
    areaOfEducation: "",
    gradYear: "",
    university: "",
    grade: "",
    saved: false,
  },]);
  const [WorkExpreienceRow, setWorkExpreienceRow] = useState([
    {
      TotalWorkExperience: "",
      WorkRole: "",
      WorkFrom: "",
      WorkTo: "",
      WorkComapny: "",
      WorkIndustry: "",
      WorkNote: "",
      savedWorkExp: false,
    },
  ]);
  const [isExistApplicantError, setIsExistApplicantError] = useState('');

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const navigate = useNavigate();

  const updateButtonText = (newText) => {
    setButtonText(newText);
  };

  const handleEmailId = (StoreData) => {
    setRegisterdUserLoginDetails(StoreData);
  };

  const handleShowModal = (modalName) => {
    if (modalName === "first") {
      setModalOpen({
        showFirstModal: true,
        showSecondModal: false,
        showChatModal: false,
        showProfileViewDetailsModal: false,
      })
    } else if (modalName === "second") {
      setModalOpen({
        showFirstModal: false,
        showSecondModal: true,
        showChatModal: false,
        showProfileViewDetailsModal: false,
      })
    } else if (modalName === "chatModal") {
      setModalOpen({
        showFirstModal: false,
        showSecondModal: false,
        showChatModal: true,
        showProfileViewDetailsModal: false,
      })
    } else if (modalName === "showProfileViewDetailsModal") {
      setModalOpen({
        showFirstModal: false,
        showSecondModal: false,
        showChatModal: false,
        showProfileViewDetailsModal: true,
      })
    }

    //   return newState;
    // });
  };

  // Function to close all modals
  const handleCloseModals = () => {
    setModalOpen({
      showFirstModal: false,
      showSecondModal: false,
      showChatModal: false,
      showProfileViewDetailsModal: false,
    });
  };

  const GetJobPostWithId = async () => {
    setIsLoading(true);
    try {
      const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/${id}`;
      // const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/NDFhZGM5ZWQyZg/`;
      // const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/ZTEwZmFlZmFiYw/`;
      // const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/Zjg3YmExYzlmMA/`;
      // const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/ODE2YWNmZjgwZg/`;
      const data = await getPostJobIdApi(url);
      // console.log("api datatt----->>>>>>", JSON.stringify(data?.response));
      setIsLoading(false);
      setJobPostData(data?.response);
      setLink(data?.data?.response?.job_link);
    } catch (error) {
      if (error.response) {
        setIsLoading(false);
        if (error.response.status === 400) {
          const message = error.response.data.message;
          setJobPostErrorMsg(message);
        }
      }
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.detail?.includes(
          "Given token not valid for any token type"
        )
      ) {
        removeToken();
        navigate("/loginwithpassword");
      }
    }
  };

  const jobDetailsList = [
    {
      tittle: "Role",
      value: jobPostData?.job_title,
    },
    {
      tittle: "Is Like",
      value: jobPostData?.is_like?.[0]?.is_like_name,
    },
    {
      tittle: "Experience",
      value: `${jobPostData?.min_exp} - ${jobPostData?.max_exp} years `,
    },
    {
      tittle: "Division",
      value: "Technology",
    },
    {
      tittle: "Department",
      value: jobPostData?.department?.department_name,
    },
    {
      tittle: "Key Skills ",
      // value: jobPostData?.skills[0]?.skill_name,
      value: "skilll",
    },
    {
      tittle: "Education ",
      // value: jobPostData?.area_of_education[0],
      value: "Masters",
    },
    {
      tittle: "Focus Area",
      value: "Electronics/Telecommunication, Information Technology, Computers",
    },
    {
      tittle: "Job Type ",
      value: jobPostData?.job_type,
    },
    {
      tittle: "Workplace Type",
      value: jobPostData?.workplace_type,
    },
    {
      tittle: "Requires Travel",
      value: jobPostData?.requires_travel,
    },
    {
      tittle: "Language ",
      value: "English, Hindi, Marathi",
    },
  ];

  const addEmailOnBlur = () => {
    if (emailInput && validateEmail(emailInput)) {
      setEmailList((prevList) => [...prevList, emailInput.trim()]);
      setEmailInput("");
    }
  };

  const removeEmail = (email) => {
    setEmailList((prevList) => prevList.filter((item) => item !== email));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && emailInput) {
      addEmailOnBlur();
    }
  };

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {copied ? "Link copied!" : "Click to copy link"}
    </Tooltip>
  );

  const handleViewDetailsAPi = async (EmailId) => {
    try {
      const response = await ApplicationDeatilsApi(EmailId);

      if (response.status === 200) {
        setViewDetailData(response?.data?.response);
        localStorage.setItem(
          "applicantProfileAllSavedData",
          JSON.stringify(response?.data?.response)
        );
        setProfileFormData((prevState) => ({
          ...prevState,
          name: response?.data?.response?.user?.username || "",
          email: response?.data?.response?.user?.email || "",
          confirmEmail: response?.data?.response?.user?.email || "",
          phone: response?.data?.response?.user?.phone_number || "",
          AvailableBy: response?.data?.response?.availble_by || "",
          NoticePeriod: response?.data?.response?.notice_period || "",
          ExpectedSalary: response?.data?.response?.expected_salary || "",
          CurrentLocation: response?.data?.response?.current_location || "",
          relocationChoice: response?.data?.response?.willing_to_relocate_to || false,
          requiredCompanyAssist:
            response?.data?.response?.require_company_assistance_for_relocation || false,
        }));
        setIsYes((prevState) => ({
          ...prevState,
          CurrentlyWorkingToggle: response?.data?.response?.currently_working || false,
          NoticeBuyOutToggle: response?.data?.response?.notice_buyout_available || false,
        }));
        setStoredApplicantId(response?.data?.response?.uid);
        const spokenUids = Array.from(
          new Set(response?.data?.response?.spoken_language.map((item) => item?.uid))
        );
        const writtenUids = Array.from(
          new Set(response?.data?.response?.written_reading_language.map((item) => item?.uid))
        );
        setSelectedSpokenLanguageUids((prevState) => [
          ...prevState,
          ...spokenUids.filter((uid) => !prevState.includes(uid)),
        ]);
        setSelectedWrittenLanguageUids((prevState) => [
          ...prevState,
          ...writtenUids.filter((uid) => !prevState.includes(uid)),
        ]);

        const skillsUids = response?.data?.response?.applicant_profile_job[0]?.job_applicant_skill.map((item) => item?.uid);
        setSelectedSkills((prevState) => [...prevState, ...skillsUids]);
        const resumeFileUrl = response?.data?.response?.resume || null;
        setResumeFile(resumeFileUrl);
        const resumeFileName = resumeFileUrl ? resumeFileUrl.split("/").pop() : "";
        setResumeFileName(resumeFileName);
        const educationData = response?.data?.response?.qualification_applicantprofile || [];
        const workExpData = response?.data?.response?.work_applicant || []
        if (Array.isArray(educationData)) {
          // SetEducationRows((prevState) => [
          //   // ...prevState,
          //   ...educationData.map((item) => ({
          //     level: item?.level || "",
          //     areaOfEducation: item?.applicant_area_of_education || "",
          //     gradYear: item?.grad_year || "",
          //     university: item?.university || "",
          //     grade: item?.grade || "",
          //   })),
          // ]);
          const newArry = educationData.map((item) => ({
            level: item?.level || "",
            areaOfEducation: item?.applicant_area_of_education || "",
            gradYear: item?.grad_year || "",
            university: item?.university || "",
            grade: item?.grade || "",
            saved: true
          }))
          SetEducationRows(newArry)
        }
        if (Array.isArray(workExpData)) {
          const newArray = workExpData.map((item) => ({
            TotalWorkExperience: item?.total_work_experience,
            WorkRole: item?.role,
            WorkFrom: item?.work_from,
            WorkTo: item?.work_to,
            WorkComapny: item?.work_company,
            WorkIndustry: item?.work_industry,
            WorkNote: item?.note,
            savedWorkExp: true
          }))
          setWorkExpreienceRow(newArray)
        }

        if (response?.data?.response?.applicant_status === 'Draft') {
          setButtonText('Continue Btn')
        } else if (response?.data?.response?.applicant_status === 'Completed') {
          setButtonText('View Form Btn')
        }
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleBtns = (buttonText) => {
    const userEmail = registerdUserLoginDetails?.user_login?.email;
    if (buttonText === "Apply Now") {
      handleShowModal("first");
    } else if (buttonText === "Continue Btn") {
      handleShowModal("first");
      handleViewDetailsAPi(userEmail);
    } else if (buttonText === "View Form Btn") {
      handleShowModal("showProfileViewDetailsModal");
      if (userEmail) {
        handleViewDetailsAPi(userEmail);
      }
    }
  };
  useEffect(() => {
    if (paramemail) {
      handleShowModal("first");
      handleViewDetailsAPi(paramemail);
    }
  }, [paramemail])
  console.log("buttonText", buttonText)
  console.log(jobPostData?.asset_job)
  const handleShareModal = () => {
    return (
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Share</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body ref={containerRef}>
          <Row>
            <Col md={12}>
              <p>Enter email addresses below to share the job details.</p>

              <p>Share this job post via your preferred platform!</p>
              <p>Add Email IDs</p>
              <Form.Group>
                <InputGroup>
                  <div
                    className="input-tags-container"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {emailList.slice(0, 2).map((email, index) => (
                      <div
                        key={index}
                        className="email-tag"
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          borderRadius: "20px",
                          padding: "5px 10px",
                          marginRight: "5px",
                          marginBottom: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>{email}</span>
                        <Button
                          variant="link"
                          onClick={() => removeEmail(email)}
                          style={{
                            color: "white",
                            marginLeft: "5px",
                            padding: "0",
                            fontSize: "14px",
                          }}
                        >
                          x
                        </Button>
                      </div>
                    ))}

                    {emailList.length > 2 && !showMore && (
                      <Button
                        variant="link"
                        onClick={toggleShowMore}
                        style={{
                          color: "#007bff",
                          padding: "0",
                          fontSize: "14px",
                          marginBottom: "5px",
                        }}
                      >
                        +{emailList.length - 2} more
                      </Button>
                    )}

                    {showMore &&
                      emailList.slice(2).map((email, index) => (
                        <div
                          key={index + 2}
                          className="email-tag"
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            marginRight: "5px",
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span>{email}</span>
                          <Button
                            variant="link"
                            onClick={() => removeEmail(email)}
                            style={{
                              color: "white",
                              marginLeft: "5px",
                              padding: "0",
                              fontSize: "14px",
                            }}
                          >
                            x
                          </Button>
                        </div>
                      ))}

                    {emailList.length > 2 && showMore && (
                      <Button
                        variant="link"
                        onClick={toggleShowMore}
                        style={{
                          color: "#007bff",
                          padding: "0",
                          fontSize: "14px",
                          marginBottom: "5px",
                        }}
                      >
                        Show Less
                      </Button>
                    )}

                    <Form.Control
                      type="text"
                      value={emailInput}
                      placeholder="Enter Email"
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      ref={inputRef}
                      style={{
                        border: "none",
                        boxShadow: "none",
                        outline: "none",
                        flex: 1,
                      }}
                    />
                  </div>
                </InputGroup>
              </Form.Group>
              <p>Sharing link</p>

              <InputGroup>
                <Form.Control
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  readOnly
                />
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <div
                    onClick={handleCopyClick}
                    style={{
                      cursor: "pointer",
                      padding: "8px",
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #e5e5e5",
                    }}
                  >
                    <i
                      className="fas fa-copy"
                      style={{ fontSize: "20px", color: "#e5e5e5" }}
                    />
                  </div>
                </OverlayTrigger>
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
          // onClick={handleCloseModals}
          >
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const ViewProfileFormDetailsModal = () => {
    return (
      <div>
        <Modal
          show={modalOpen.showProfileViewDetailsModal}
          onHide={handleCloseModals}
          animation={false}
          size="lg"
          backdrop={false}
          className="aplcnt_view quizDev_model"
        >
          <Modal.Header closeButton>
            <Modal.Title>Profile Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewDetailData && (
              <>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Row>
                      <Col md={12} className="d-flex justify-content-between">
                        <div className="aplcnt_info">
                          <h5>{viewDetailData?.user?.username}</h5>
                          <ul>
                            <li><i class="far fa-envelope me-2" aria-hidden="true"></i>{viewDetailData?.user?.email}</li>
                            <li>
                              <i class="fa fa-phone me-2" aria-hidden="true"></i>
                              {viewDetailData?.user?.phone_number}
                            </li>
                          </ul>
                        </div>
                        <div className="aplcnt_cv"><i class="fa fa-paperclip" aria-hidden="true"></i> {viewDetailData?.resume}</div>
                      </Col>
                    </Row>
                    <div className="aplcnt_details">
                      <ul>
                        <li><span>Availability</span> <strong>{viewDetailData?.availble_by}</strong></li>
                        <li><span>Notice Period</span> <strong>{viewDetailData?.notice_period}</strong></li>
                        <li><span>Expected Salary</span> <strong>{viewDetailData?.expected_salary}</strong></li>
                        <li><span>Education</span> <strong>Master in Computer Science Engineering</strong></li>
                        <li><span>Experience</span> <strong>June 2022 - May2024 Software Developer, IT, Company Name</strong></li>
                        <li><span>Language</span> <strong>Hindi, English, Telugu</strong></li>
                        <li><span>Current Location</span> <strong>{viewDetailData?.current_location}</strong></li>
                        <li><span>Skills</span> <strong>{viewDetailData?.applicant_profile_job?.[0]?.job_applicant_skill.map(
                          (item) => console.log("i----->>>>", item)
                        )}</strong></li>
                      </ul>
                      <div className="addti_qus">
                        <span>Additional Questions from Company</span>
                        <div className="quswarp">
                          <h6>Which area of cricket do you think needs the greatest development in senior cricket players?</h6>
                          <ul>
                            <li><i className="dot"></i>Openness to Learn</li>
                            <li><i className="dot"></i>Fitness and Energy</li>
                          </ul>
                        </div>
                        <div className="quswarp">
                          <h6>Do you think that IPL has impacted the skills of the players to play 50 over cricket negatively ?</h6>
                          <ul>
                            <li><i className="dot"></i>No</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModals}>
              Return to Job
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        emailInput
      ) {
        addEmailOnBlur();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emailInput, showModal]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [showModal]);

  useEffect(() => {
    const applicantProfileData = JSON.parse(
      localStorage.getItem("applicantProfileData")
    );
    const applicantApplyData = JSON.parse(localStorage.getItem("applicantData"))
    if (applicantProfileData) {
      setRegisterdUserLoginDetails(applicantProfileData);
    }
    if (applicantApplyData?.applicant_status === 'Draft') {
      setButtonText('Continue Btn')
    } else if (applicantApplyData?.applicant_status === 'Completed') {
      setButtonText('View Form Btn')
    }
  }, [localStorage.getItem("applicantData")]);

  useEffect(() => {
    GetJobPostWithId();
  }, [id]);

  // const quizModal = async (uId) => {
  //   // console.log("uid--------",uId)
  //   // handleShow();
  //   setIsLoading(true);
  //   // const url = `https://bittrend.shubansoftware.com/assets-api/assets-list-by-company-api/b6cadaab-69bc-4707-8656-2e8573e17547/?search=${SerachQuestion}&page=1&limit=10`;
  //   const url = `assets-api/assets-detail-api/${uId}/`;
  //   try {
  //     const response = await EvalationAssestDetails(url);
  //     setIsLoading(false);
  //     //  console.log("assest detailssss api------",response.data.response)
  //     setEvaluationListDetails(response.data.response);
  //     response?.data?.response[0]?.section_asset?.sort((a, b) => a.id - b.id).map((item, quesIndex) =>
  //       item.question_section.map((Val, sectionIndex) => {
  //         setErrorMessage((prev) => ({
  //           ...prev,
  //           [`${item?.id}-${Val?.id}-type`]: Val?.assignment_type
  //         }));
  //       })
  //     )
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error("Error fetching company user list:", error);
  //     if (
  //       error?.response?.status === 401 ||
  //       error?.response?.data?.detail?.includes(
  //         "Given token not valid for any token type"
  //       )
  //     ) {
  //       console.log("Token expired, redirecting to login");
  //       removeToken();
  //       // navigate("/loginwithpassword");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   quizModal(assignmentId)
  // }, [assignmentId])
  console.log('dauuuuuuuu++++++>', buttonText)
  return (
    <Container fluid className="applicat_flow">
      {isLoading && (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="ml-3" />
        </div>
      )}
      <Row className="page_header">
        <Col className="d-flex align-items-center">
          <img src={Logo} alt="Logo Icon" />
          <h6 className="mx-3 pagetitle">
            Job Application <strong>{jobPostData?.job_title}</strong>
          </h6>
        </Col>
        <Col className="d-flex justify-content-md-end">
          {buttonText === "Apply Now" && <img src={Logout} alt="Logout Icon" />}

          {buttonText === "Continue" && <img src={HomeIcon} alt="Home Icon" />}
          {buttonText === "View Form Btn" && <img src={UserIcon} alt="User Icon" />}
        </Col>
      </Row>

      <Row className="page_body appcaint">
        <Col md={10} className="bg-grey">
          <Row className="appcaint_head">
            <img
              src={
                jobPostData?.job_company?.logo
                  ? `https://bittrend.shubansoftware.com${jobPostData?.job_company?.logo}`
                  : Global
              }
              alt="Global"
              style={{ width: "32px", height: "32px", padding: "0" }}
            />
            <Col className="app_leftinfo">
              <h5>{jobPostData?.job_title}</h5>
              <p>
                <strong>{jobPostData?.job_company?.company_name},</strong>
                {jobPostData?.job_company?.location?.location_name}
              </p>
              <ul className="localist">
                <li>
                  <img src={MarkerPIn} alt="" />
                  {jobPostData?.job_location?.location_name}
                </li>
                <li>
                  <img src={InrRuppe} alt="" />
                  {jobPostData?.min_salary}-{jobPostData?.max_salary}{" "}
                  {jobPostData?.currency} {jobPostData?.salary_type}
                </li>
                <li>
                  <img src={ExperinecB} alt="" />
                  {jobPostData?.min_exp} - {jobPostData?.max_exp} years
                </li>
                <li>
                  <img src={User16x} alt="" />
                  {jobPostData?.number_of_positions} Positions
                </li>
              </ul>
            </Col>
            <Col className="app_rightinfo">
              <div className="d-flex flex-wrap align-items-center">
                <button
                  type="button"
                  className="btn-link"
                  onClick={toggleModal}
                >
                  <img src={Share} alt="Global" />
                </button>

                <button type="button" className="btn-link">
                  <img src={Download} alt="Global" />
                </button>
                <button type="button" className="btn-link">
                  <i className="far fa-file"></i>
                </button>
                <div className="d-flex gap-3 ms-3">
                  <Button variant="light" disabled={jobPostErrorMsg}>
                    Not for Me
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleBtns(buttonText)}
                    disabled={jobPostErrorMsg || buttonText === "View"}
                  >
                    {buttonText === "View Form Btn" ? "View" : buttonText === "Continue Btn" ? "Continue" : buttonText}
                  </Button>
                </div>
                {jobPostErrorMsg && <p className="error">{jobPostErrorMsg}</p>}
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Job Description</h5>
                  <p className="card-text">
                    {jobPostData?.detailed_description}
                  </p>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="card jobdetails">
                <div className="card-body">
                  <h5 className="card-title">Job Details</h5>
                  {jobDetailsList.map((item, index) => {
                    return (
                      <ul className="list">
                        <li>
                          <p className="mb-0 title">
                            <img src={jobDetailPng[index]} />
                            {item.tittle}
                          </p>
                          <p className="mb-0 text-end">{item.value}</p>{" "}
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col className="mt-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">About the Company</h5>

                  <Row className="appcaint_head">
                    <img
                      src={
                        jobPostData?.job_company?.logo
                          ? `https://bittrend.shubansoftware.com${jobPostData?.job_company?.logo}`
                          : Global
                      }
                      alt="Global"
                      style={{ width: "32px", height: "32px", padding: "0" }}
                    />
                    <Col className="app_leftinfo">
                      <p>
                        <strong>
                          {jobPostData?.job_company?.company_name},
                        </strong>
                        {jobPostData?.job_company?.location?.location_name}
                      </p>
                      <ul className="localist mt-1">
                        <li>
                          <img src={GlobSmall} />
                          {jobPostData?.job_company?.website_url}
                        </li>
                        <li>
                          {jobPostData?.job_company?.industry?.industry_name}
                        </li>
                        <li>{jobPostData?.job_company?.company_type}</li>
                        <li>
                          Over {jobPostData?.job_company?.number_of_employees}
                        </li>
                      </ul>

                      <p className="card-text">
                        {jobPostData?.detailed_description}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col
          md={2}
          className="bg-white app_rightsdbr"
          style={{ position: "relative" }}
        >
          <div className="d-flex justify-content-center mt-1">
            <Button
              variant="outline-dark"
              onClick={() => handleShowModal("second")}
            >
              <img src={InfoCircle} className="me-1" />
              About our Process
            </Button>
          </div>
          <h6>Your Progress</h6>
          <div className={`${buttonText === "View Form Btn" ? 'complate_status' : buttonText === "Continue Btn" ? 'pending_status' : ''} progress_box`} >
            <h5>
              {buttonText === "View Form Btn" ? <img src={checkRight} className="me-2" /> : buttonText === "Continue Btn" ? <img src={checkpending} className="me-2" /> : (<span className="bg_circle"></span>)}
              Profile Details
            </h5>
            {(buttonText == "View Form Btn" && <p>Completed</p>) ||
              (buttonText == "Continue Btn" && <p>Pending</p>)}
            <Button
              variant="primary"
              size="lg"
              disabled={jobPostErrorMsg}
              onClick={() => handleBtns(buttonText)}
            >
              {buttonText === "View Form Btn" ? "View" : buttonText === "Continue Btn" ? "Continue" : buttonText}
            </Button>
          </div>
          <div className={`${Number(localStorage.getItem("AttemptStatus")) === 28 ? 'complate_status' : buttonText === "View Form Btn" ? 'pending_status' : ''} progress_box`}>
            <h5>
              {Number(localStorage.getItem("AttemptStatus")) === 28 ? <img src={checkRight} className="me-2" /> : buttonText === "View Form Btn" ? <img src={checkpending} className="me-2" /> : (<span className="bg_circle"></span>)}
              Behavioural Assessment
            </h5>
            <p>
              {Number(localStorage.getItem("AttemptStatus")) < 28 && "Pending"}
              {Number(localStorage.getItem("AttemptStatus")) === 28 &&
                "Completed"}
            </p>
            <Button
              variant="primary"
              size="lg"
              disabled={buttonText !== "View Form Btn"}
              // className={`${Number(localStorage.getItem("AttemptStatus")) < 28?'small_btn':'view_btn'}`}
              onClick={() => {
                if (
                  Number(localStorage.getItem("AttemptStatus")) < 28 ||
                  Number(localStorage.getItem("AttemptStatus")) === 0
                ) {
                  // navigate("/Behavioural-Assessment");
                  setBehaviourAssModel(true)
                } else if (
                  Number(localStorage.getItem("AttemptStatus")) === 28
                ) {
                  // navigate("/Behaviour-Assessment-Report");
                  setBehaviourReportModel(true)
                }
              }}
            >
              {Number(localStorage.getItem("AttemptStatus")) > 0 &&
                Number(localStorage.getItem("AttemptStatus")) < 28 &&
                "Continue"}
              {Number(localStorage.getItem("AttemptStatus")) === 28 && "View"}
              {Number(localStorage.getItem("AttemptStatus")) === 0 && "Start"}
            </Button>
          </div>
          {/* {jobPostData?.asset_job?.map((Val) => (
            <div className={`${localStorage.getItem("assestQuiz") === 'Completed' ? 'complate_status' :localStorage.getItem("assestQuiz") == 'Draft'? 'pending_status':''} progress_box`}>
              <h5>
                {localStorage.getItem("assestQuiz") == 'Completed' ? <img src={checkRight} className="me-2" /> : localStorage.getItem("assestQuiz") == 'Draft' ? <img src={checkpending} className="me-2" /> : (<span className="bg_circle"></span>)}
                
                {Val?.asset_title}
              </h5>
              <p>
                {localStorage.getItem("assestQuiz") == 'Completed'?'Completed':localStorage.getItem("assestQuiz") == 'Draft'?'Pending':'Pending'}
                
              </p>
              <Button
                variant="primary"
                size="lg"
                disabled={localStorage.getItem("AttemptStatus") == 28 ? false : true}
                onClick={() => {
                  navigate(`/evaluation-quiz/${Val?.uid}`, { state: jobPostData })
                }}
              >
              {localStorage.getItem("assestQuiz") == 'Completed'?"View":localStorage.getItem("assestQuiz") == 'Draft'?"Continue":"Start"}
                
              </Button>
            </div>
          ))}           */}
          {jobPostData?.asset_job?.map((Val) => {
            if (Val?.asset_title === 'Technical round for EHS Manager') {
              return (
                <div className={`${localStorage.getItem("assestQuiz") === 'Completed' ? 'complate_status' : localStorage.getItem("assestQuiz") == 'Draft' ? 'pending_status' : ''} progress_box`}>
                  <h5>
                    {localStorage.getItem("assestQuiz") == 'Completed' ? <img src={checkRight} className="me-2" /> : localStorage.getItem("assestQuiz") == 'Draft' ? <img src={checkpending} className="me-2" /> : (<span className="bg_circle"></span>)}

                    {Val?.asset_title}
                  </h5>
                  <p>
                    {localStorage.getItem("assestQuiz") == 'Completed' ? 'Completed' : localStorage.getItem("assestQuiz") == 'Draft' ? 'Pending' : 'Pending'}

                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={localStorage.getItem("AttemptStatus") == 28 ? false : true}
                    onClick={() => {
                      navigate(`/evaluation-quiz/${Val?.uid}`, { state: jobPostData })
                    }}
                  >
                    {localStorage.getItem("assestQuiz") == 'Completed' ? "View" : localStorage.getItem("assestQuiz") == 'Draft' ? "Continue" : "Start"}

                  </Button>
                </div>
              )
            } else if (Val?.asset_title === 'Pre-interview round for creative director') {
              return (
                <div className={`${localStorage.getItem("preAssestQuiz") === 'Completed' ? 'complate_status' : localStorage.getItem("preAssestQuiz") == 'Draft' ? 'pending_status' : ''} progress_box`}>
                  <h5>
                    {localStorage.getItem("preAssestQuiz") == 'Completed' ? <img src={checkRight} className="me-2" /> : localStorage.getItem("preAssestQuiz") == 'Draft' ? <img src={checkpending} className="me-2" /> : (<span className="bg_circle"></span>)}

                    {Val?.asset_title}
                  </h5>
                  <p>
                    {localStorage.getItem("preAssestQuiz") == 'Completed' ? 'Completed' : localStorage.getItem("preAssestQuiz") == 'Draft' ? 'Pending' : 'Pending'}

                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={localStorage.getItem("assestQuiz") !== 'Completed' ? true : false}
                    onClick={() => {
                      // setShowAssignmentInstruction(true);
                      // setAssignmentId(Val?.uid)
                      navigate(`/assigntment-test/${Val?.uid}`, { state: jobPostData })
                    }}
                  >
                    {localStorage.getItem("preAssestQuiz") == 'Completed' ? "View" : localStorage.getItem("preAssestQuiz") == 'Draft' ? "Continue" : "Start"}

                  </Button>
                </div>
              )
            }
          })}

          <div>
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
            >
              <img src={Chat} onClick={() => handleShowModal("chatModal")} />
            </div>
          </div>
        </Col>
      </Row>

      {jobPostData ? (
        <ApplicationJobPostModal
          show={modalOpen.showFirstModal}
          handleClose={handleCloseModals}
          jobPostData={jobPostData}
          updateButtonText={updateButtonText}
          registerdUserLoginDetails={handleEmailId}
          profileformData={profileformData}
          setProfileFormData={setProfileFormData}
          isYes={isYes}
          setIsYes={setIsYes}
          storedApplicantId={storedApplicantId}
          setStoredApplicantId={setStoredApplicantId}
          selectedSpokenLanguageUids={selectedSpokenLanguageUids}
          setSelectedSpokenLanguageUids={setSelectedSpokenLanguageUids}
          selectedWrittenLanguageUids={selectedWrittenLanguageUids}
          setSelectedWrittenLanguageUids={setSelectedWrittenLanguageUids}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          ResumeFile={ResumeFile}
          setResumeFile={setResumeFile}
          ResumeFileName={ResumeFileName}
          setResumeFileName={setResumeFileName}
          EducationRows={EducationRows}
          SetEducationRows={SetEducationRows}
          setBehaviourAssModel={setBehaviourAssModel}
          WorkExpreienceRow={WorkExpreienceRow} setWorkExpreienceRow={setWorkExpreienceRow}
          isExistApplicantError={isExistApplicantError} setIsExistApplicantError={setIsExistApplicantError}
        />
      ) : (
        <p>Loading...</p>
      )}

      <ChatModal
        show={modalOpen.showChatModal}
        handleClose={handleCloseModals}
      />

      <AboutLywoModal
        show={modalOpen.showSecondModal}
        handleClose={handleCloseModals}
      />
      {handleShareModal()}
      {ViewProfileFormDetailsModal()}
      <BehaviouralAst behaviourAssModel={behaviourAssModel} setBehaviourAssModel={setBehaviourAssModel} jobPostData={jobPostData} />
      <BehaviourAssReport behaviourReportModel={behaviourReportModel} setBehaviourReportModel={setBehaviourReportModel} />
      {/* <AssignmentComponent
        showAssignmentInstruction={showAssignmentInstruction} setShowAssignmentInstruction={setShowAssignmentInstruction}
        jobdetail={jobPostData}
        EvaluationListDetails={EvaluationListDetails} setEvaluationListDetails={setEvaluationListDetails}
        errorMessage={errorMessage} setErrorMessage={setErrorMessage} /> */}
    </Container>
  );
};
export default JobPosts;
