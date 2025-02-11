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
  Tooltip,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Doc from "../../images/DocumentIcon.png";
import Download from "../../images/DownloadIcon.png";
import Global from "../../images/Global.png";
import HomeIcon from "../../images/icons/HomeIcon.png";
import UserIcon from "../../images/icons/UserIcon.png";
import Logo from "../../images/logo_icon.png";
import Share from "../../images/ShareIcon.png";
import { getPostJobIdApi } from "../../services/provider";
import ApplicationJobPostModal from "./ApplicationJobPostModal";
import AboutLywoModal from "../../components/CustomModals/AboutLywoModal";

const JobPosts = () => {
  const { id } = useParams();
  const [jobPostData, setJobPostData] = useState({});
  const [jobPostErrorMsg, setJobPostErrorMsg] = useState("");

  const [modalOpen, setModalOpen] = useState({
    showFirstModal: false,
    showSecondModal: false,
  });
  const [emailInput, setEmailInput] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState("https://example.com");
  const [copied, setCopied] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);

  const handleShowModal = (modalName) => {
    setModalOpen((prevState) => {
      const newState = {
        showFirstModal: false,
        showSecondModal: false,
      };

      // Set the modal that needs to be shown to true
      if (modalName === "first") {
        newState.showFirstModal = true;
      } else if (modalName === "second") {
        newState.showSecondModal = true;
      }

      return newState;
    });
  };

  // Function to close all modals
  const handleCloseModals = () => {
    setModalOpen({
      showFirstModal: false,
      showSecondModal: false,
    });
  };

  const GetJobPostWithId = async () => {
    try {
      const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/${id}`;
      // const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/NDFhZGM5ZWQyZg/`;
      // const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/ODE2YWNmZjgwZg/`;
      const data = await getPostJobIdApi(url);
     
      setJobPostData(data?.data?.response)
    
    } catch (error) {
      

      if (error.response) {
 
        
      
        if (error.response.status === 400) {
          const message = error.response.data.message;
          setJobPostErrorMsg(message)
          
        }
      } else if (error.request) {
        
        console.error('No response received:', error.request);
      } else {
        // Any other error
        console.error('Error Message:', error.message);
      }
    }
  };

  useEffect(() => {
    console.log("urlID----->>>>", id);

    GetJobPostWithId();
  }, [id]);

  //  useEffect(() => {
  //   GetJobPostWithId();
  // }, []);


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
      value: "skilll"
    },
    {
      tittle: "Education ",
      // value: jobPostData?.area_of_education[0],
      value: "Masters"
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

  useEffect(() => {
    inputRef.current?.focus();
  }, [showModal]);

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

  return (
    <Container fluid>
      <Row className="shadow-xs border-1 p-2 bg-grey">
        <Col className="d-flex align-items-center">
          <img src={Logo} alt="Logo Icon" />
          <h6 className="my-3 pagetitle">
            Job Application <strong>{jobPostData?.job_title}</strong>
          </h6>
        </Col>
        <Col className="d-flex justify-content-md-end">
          <img src={HomeIcon} alt="Home Icon" />
          <img src={UserIcon} alt="User Icon" />
        </Col>
      </Row>

      <Row>
        <Col md={10} className="bg-grey">
          <Row>
            <img
              src={Global}
              alt="Global"
              style={{ width: "60px", height: "40px" }}
            />
            <Col>
              <h5>{jobPostData?.job_title}</h5>
              <p>{jobPostData?.job_company?.company_name}, {jobPostData?.job_company?.location}</p>
              <div className="d-flex flex-wrap">
                <p>{jobPostData?.job_location?.location_name}</p>
                <p>{jobPostData?.currency} {jobPostData?.min_salary} - {jobPostData?.max_salary}{jobPostData?.salary_type}</p>
                <p>{jobPostData?.min_exp} - {jobPostData?.max_exp} years</p>
                <p>{jobPostData?.job_company?.number_of_employees}</p>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-wrap">
                <img
                  src={Share}
                  alt="Global"
                  style={{ width: "60px", height: "40px" }}
                  // onClick={() => handleShowModal("second")}
                  onClick={toggleModal}
                />
                <img
                  src={Download}
                  alt="Global"
                  style={{ width: "60px", height: "40px" }}
                />
                <img
                  src={Doc}
                  alt="Global"
                  style={{ width: "60px", height: "40px" }}
                />
                <div className="d-flex gap-2 mb-2">
                  <Button variant="light" disabled={jobPostErrorMsg}>Not for Me</Button>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal("first")}
                    disabled={jobPostErrorMsg}
                  >
                    Apply Now
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
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Job Details</h5>
                  {jobDetailsList.map((item) => {
                    return (
                      <div className="d-flex justify-content-between">
                        <p className="mb-0">{item.tittle}</p>
                        <p className="mb-0">{item.value}</p>{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col className="mt-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">About the Company</h5>
                  <p>
                    Nunc elementum mi augue, nec pretium massa eleifend quis.
                    Etiam mollis velit id sapien facilisis, eget feugiat felis
                    maximus. Donec interdum tortor quis lorem sollicitudin, sed
                    molestie dui rhoncus. Ut condimentum rutrum neque sit amet
                    dictum. Duis commodo quam et dui malesuada mollis. Maecenas
                    tristique, sapien id consectetur fermentum, diam velit
                    vulputate ante, at imperdiet nisl risus id lorem. Integer
                    semper mi nec sollicitudin pulvinar. Integer finibus feugiat
                    odio quis accumsan.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={2} className="bg-white">
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="outline-dark"
              onClick={() => handleShowModal("second")}
            >
              About our Process
            </Button>
          </div>
          <h6>Your Progress</h6>
          <div style={{ border: "1px solid #000", padding: 12 }}>
            <p>Profile Details</p>
            <Button variant="primary" size="lg" disabled={jobPostErrorMsg}>
              Apply Now
            </Button>
          </div>
        </Col>
      </Row>
      <ApplicationJobPostModal
        show={modalOpen.showFirstModal}
        handleClose={handleCloseModals}
      />
      {/* <button Click={() => handleShowModal("second")}>Show About LYWO Process</button> */}
      <AboutLywoModal
        show={modalOpen.showSecondModal}
        handleClose={handleCloseModals}
      />

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
                    {/* Show first 2 emails */}
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

                    {/* Show +{n} more button if there are more than 2 emails */}
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

                    {/* Show additional emails if showMore is true */}
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

                    {/* Show 'Show Less' button if emails are expanded */}
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

                    {/* Input field */}
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
    </Container>
  );
};
export default JobPosts;
