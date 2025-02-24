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
import { useParams } from "react-router-dom";
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

const JobPosts = () => {
  const { id } = useParams();
  const [jobPostData, setJobPostData] = useState(null);
  const [jobPostErrorMsg, setJobPostErrorMsg] = useState("");

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
    setModalOpen((prevState) => {
      const newState = {
        showFirstModal: false,
        showSecondModal: false,
        showChatModal: false,
        showProfileViewDetailsModal: false,
      };

      // Set the modal that needs to be shown to true
      if (modalName === "first") {
        newState.showFirstModal = true;
      } else if (modalName === "second") {
        newState.showSecondModal = true;
      } else if (modalName === "chatModal") {
        newState.showChatModal = true;
      } else if (modalName === "showProfileViewDetailsModal") {
        newState.showProfileViewDetailsModal = true;
      }

      return newState;
    });
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
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleBtns = (buttonText) => {
    const userEmail = registerdUserLoginDetails?.user_login?.email;

    if (buttonText === "Apply Now") {
      handleShowModal("first");
    } else if (buttonText === "Continue") {
      handleShowModal("first");
      handleViewDetailsAPi(userEmail);
    } else if (buttonText === "View") {
      handleShowModal("showProfileViewDetailsModal");
      if (userEmail) {
        handleViewDetailsAPi(userEmail);
      }
    }
  };

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
          handleClose={() => handleCloseModals()}
          animation={false}
          size="lg"
          backdrop={false}
          className="cmprofile_mdl quizDev_model"
        >
          <Modal.Header closeButton>
            <Modal.Title>Profile Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewDetailData && (
              <>
                <Row>
                  <Col md={10}>
                    <h6>{viewDetailData?.user?.username}</h6>
                    <h5>{viewDetailData?.user?.email}</h5>
                    <p>{viewDetailData?.user?.phone_number}</p>
                  </Col>

                  <Col md={2}>{viewDetailData?.resume}</Col>
                </Row>

                <Row
                  style={{ borderBottom: "1px solid #ddd", padding: "10px" }}
                >
                  <Col md={6}>Availability</Col>
                  <Col md={6}>{viewDetailData?.availble_by}</Col>
                  <Col md={6}>Notice Period</Col>
                  <Col md={6}>{viewDetailData?.notice_period}</Col>
                  <Col md={6}>Expected Salary</Col>
                  <Col md={6}>{viewDetailData?.expected_salary}</Col>
                  <Col md={6}>Education</Col>
                  <Col md={6}>Master in Computer Science Engineering</Col>
                  <Col md={6}>Experience</Col>
                  <Col md={6}>
                    June 2022 - May2024 Software Developer, IT, Company Name
                  </Col>
                  <Col md={6}>Language </Col>
                  <Col md={6}>Hindi, English, Telugu</Col>
                  <Col md={6}>Current Location</Col>
                  {/* <Col md={6}>{viewDetailData?.current_location}</Col> */}
                  <Col md={6}>Skills</Col>
                  {/* {viewDetailData?.applicant_profile_job?.[0]?.job_applicant_skill.map(
                  (item) => console.log("i----->>>>", item)
                )} */}
                  <Col md={6}>
                    Microsoft Office, PowerPoint, Java, C#, Leadership, Database
                    Management, Product Development, Mongo DB, .Net,
                  </Col>
                  <Col md={6}>Additional Questions from Company</Col>
                  <Col md={6}>Can join Immediately</Col>
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
    if (applicantProfileData) {
      setRegisterdUserLoginDetails(applicantProfileData);
    }
  }, []);

  useEffect(() => {
    GetJobPostWithId();
  }, [id]);

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
          {buttonText === "View" && <img src={UserIcon} alt="User Icon" />}
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
                    {buttonText}
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
                  {jobDetailsList.map((item) => {
                    return (
                      <ul className="list">
                        <li>
                          <p className="mb-0 title">
                            <img src={jobRoal} />
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
          <div className="progress_box">
            <h5>
              <span className="bg_circle"></span>Profile Details
            </h5>
            {(buttonText == "View" && <p>Completed</p>) ||
              (buttonText == "Continue" && <p>Pending</p>)}
            <Button
              variant="primary"
              size="lg"
              disabled={jobPostErrorMsg}
              onClick={() => handleBtns(buttonText)}
            >
              {buttonText}
            </Button>
          </div>
          <div className="progress_box">
            <h5>
              <span className="bg_circle"></span>Behavioural Assessment
            </h5>
            <p>
              {Number(localStorage.getItem("AttemptStatus")) < 28 && "Pending"}
              {Number(localStorage.getItem("AttemptStatus")) === 28 &&
                "Completed"}
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (
                  Number(localStorage.getItem("AttemptStatus")) < 28 ||
                  Number(localStorage.getItem("AttemptStatus")) === 0
                ) {
                  navigate("/Behavioural-Assessment");
                } else if (
                  Number(localStorage.getItem("AttemptStatus")) === 28
                ) {
                  navigate("/Behaviour-Assessment-Report");
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
    </Container>
  );
};
export default JobPosts;
