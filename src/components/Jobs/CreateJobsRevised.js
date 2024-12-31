import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";

import RangeSlider from "../../components/RangeSilder";
import Edit03 from "../../images/icons/edit-0303.svg";
import logoIcon from "../../images/logo_icon.png";
import { getJobDetailsApi } from "../../services/provider";
import { removeToken } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";


const CreateJobsRevised = ({ show, handleClose }) => {

  const [createRevisedJobData,setCreateRevisedJobData] = useState([])
  const navigate = useNavigate();


const getJobDetails = async() => {
  const url = "https://bittrend.shubansoftware.com/assets-api/job-detail-api/03c2f0bb-43b5-4b43-a36d-56109383116b/"
try {
  const response = await getJobDetailsApi(url)
  setCreateRevisedJobData(response.data.response)
  console.log("response----->>>>>>",JSON.stringify(response.data.response,null,4))
  
} catch (error) {
  console.log("error response----->>>>>>",error)
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
}
}

  useEffect(()=>{
    getJobDetails()
  },[])

  return (
    
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size="lg"
      backdrop={false}
      className="cmprofile_mdl quizDev_model"
    >
      <Modal.Header closeButton>
        <img src={logoIcon} className="me-4" />
        <Modal.Title>
          Sr. Developer - Python
          <span className="subtitle">
            Mumbai, Technology, Full-Time, Remote
          </span>
          <button type="button" className="edit-btnicon">
            <img src={Edit03} />
          </button>
        </Modal.Title>
        <button type="button" className="view-btnicon">
          <i className="fa fa-eye"></i>
        </button>
      </Modal.Header>
      <Modal.Body className="p-0 bg-lightgray">
        <Row className="justify-content-center">
          <Col md={3} lg={2} className="jobpre_leftpanel px-2">
            <h6>Requirements</h6>
            <ul className="checklist">
              <li className="active">
                <a href="#item_salary">
                  Salary <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_edu">
                  Education <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_Exp">
                  Experience <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_Target">
                  Target Hire Date{" "}
                  <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_lang">
                  Language <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_Geog">
                  Geography <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            <h6>Skills</h6>
            <ul className="checklist">
              <li>
                <a href="#">
                  Skills <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  Custom Questions{" "}
                  <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            <h6>Personality</h6>
            <ul className="checklist">
              <li>
                <a href="#">
                  Behaviours <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </Col>
          <Col md={7} lg={8} className="jobMain_panel">
            <Accordion defaultActiveKey={["0", "8", "7", "10"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Requirements</Accordion.Header>
                <Accordion.Body>
                  <p>
                    Use this section to define your ideal hire in more detail.
                    All the information required in this section is mandatory.
                    The information from this section will play an essential
                    role in scoring and screening candidates based on their
                    profile.
                  </p>
                  <p>
                    If there is any one parameter that is very important [Yellow
                    Flag] or a must have [Red Flag], use the flags to indicate
                    the same. This information will allow us to rate each
                    application as below.
                  </p>
                  <ul className="applicant_info">
                    <li>
                      <h6>Applicant Name</h6>
                      <strong>Match</strong>
                    </li>
                    <li>
                      <p>James Winslow</p>
                      <Badge bg="success">Good 85%</Badge>
                    </li>
                    <li>
                      <p>Rajesh Sundaran</p>
                      <Badge bg="danger">Poor 23%</Badge>
                    </li>
                    <li>
                      <p>Abhilasha Choudhary</p>
                      <Badge bg="warning">Average 49%</Badge>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="1"
                className="accd_child"
                id="item_salary"
              >
                <Accordion.Header>
                  Salary
                  <svg
                    className="flag_icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                      stroke="#98A2B3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="align-items-center mb-3">
                    <div className="form-group w-auto mb-0">
                      <Form.Select
                        aria-label="Default select example"
                        className="sm-fselect"
                      >
                        <option>Salary Range</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                    <div className="form-group  w-150 mb-0">
                      <Form.Control
                        type="text"
                        placeholder="₹ 25,000"
                        className="sm-fcontrol"
                      />
                    </div>
                    <div className="form-group  w-auto mb-0 px-0">
                      <span>to</span>
                    </div>
                    <div className="form-group  w-150 mb-0">
                      <Form.Control
                        type="text"
                        placeholder="₹ 75,000"
                        className="sm-fcontrol"
                      />
                    </div>
                    <div className="form-group w-auto mb-0 pe-1">
                      <Form.Select
                        aria-label="Default select example"
                        className="sm-fselect"
                      >
                        <option>INR</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                    <div className="form-group w-auto mb-0 ps-1">
                      <Form.Select
                        aria-label="Default select example"
                        className="sm-fselect"
                      >
                        <option>Per Month</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                  </Row>
                  <div className="accordion_footer">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="me-3">
                          <Form.Check
                            inline
                            label="Don’t Display"
                            name="group1"
                            type={type}
                            checked
                            id={`inline-${type}-1`}
                          />
                          <Form.Check
                            inline
                            label="Non Negotiable"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button type="button" class="btn btn-lightgray">
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="accd_child" id="item_edu">
                <Accordion.Header>
                  Educational Qualification{" "}
                  <svg
                    className="flag_icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                      stroke="#98A2B3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="sm-label">
                        Minimum Education
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="sm-fselect"
                      >
                        <option>Masters</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                      <span className="required_text">
                        Select the minimum level of education that you would
                        require
                      </span>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="sm-label">
                        Areas of Education
                      </Form.Label>
                      <div className="tagarea p-2">
                        <span className="tag-white">
                          Mathematics <i className="fa fa-close ms-1"></i>
                        </span>
                        <span className="tag-white">
                          Mathematics <i className="fa fa-close ms-1"></i>
                        </span>
                      </div>
                      <span className="required_text">
                        Select all relevant areas of education
                      </span>
                    </Form.Group>
                  </Form>
                  <div className="accordion_footer">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="me-3">
                          <Form.Check
                            inline
                            label="Higher Qualification Preferrable"
                            name="group1"
                            type={type}
                            checked
                            id={`inline-${type}-1`}
                          />
                          <Form.Check
                            inline
                            label="Other Areas are Acceptable"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button type="button" class="btn btn-lightgray">
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="accd_child" id="item_Exp">
                <Accordion.Header>
                  Experience{" "}
                  <svg
                    className="flag_icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                      stroke="#98A2B3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="sm-label">
                        Ideal Years of Experience
                      </Form.Label>
                      <Row className="gap-2 align-items-center mx-0">
                        <Form.Select
                          aria-label="Default select example"
                          className="sm-fselect w-150"
                        >
                          <option>Range</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <Form.Select
                          aria-label="Default select example"
                          className="sm-fselect w-150"
                        >
                          <option>2 Years</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <span className="w-auto to_divider">to</span>
                        <Form.Select
                          aria-label="Default select example"
                          className="sm-fselect w-150"
                        >
                          <option>5 Years</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <RangeSlider />
                      </Row>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="sm-label">
                        Mention Shorlisted Industries
                      </Form.Label>
                      <div className="tagarea p-2">
                        <span className="tag-white">
                          Pharmaceutical <i className="fa fa-close ms-1"></i>
                        </span>
                      </div>
                      <span className="required_text">
                        Add a comprehensive list as this can significantly
                        impact applicant shortlisting
                      </span>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="sm-label">
                        Restrict Roles
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        className="sm-fcontrol"
                        rows={4}
                        placeholder="Start by typing in role names"
                      />
                      <span className="required_text">
                        Please add multiple versions of the role and multiple
                        roles that can ensure you do not exclude any deserving
                        applicants
                      </span>
                    </Form.Group>
                  </Form>
                  <div className="accordion_footer">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="me-3">
                          <Form.Check
                            inline
                            label="Restrict Industries"
                            name="group1"
                            type={type}
                            checked
                            id={`inline-${type}-1`}
                          />
                          <Form.Check
                            inline
                            label="Define Current Role"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button type="button" class="btn btn-lightgray">
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="4"
                className="accd_child"
                id="item_Target"
              >
                <Accordion.Header>
                  Target Hire Date{" "}
                  <svg
                    className="flag_icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                      stroke="#98A2B3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="align-items-center">
                    <Form.Group
                      className="mb-3 col-md-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control type="date" placeholder="" />
                    </Form.Group>
                  </Row>
                  <div className="accordion_footer">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="me-3">
                          <Form.Check
                            inline
                            label="Immediate Hiring"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                          />
                          <Form.Check
                            inline
                            label="Explore Buy-Out Option"
                            name="group1"
                            checked
                            type={type}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button type="button" class="btn btn-lightgray">
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="5"
                className="accd_child"
                id="item_lang"
              >
                <Accordion.Header>
                  Language{" "}
                  <svg
                    className="flag_icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                      stroke="#98A2B3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Form className="row">
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="sm-label">
                        Spoken Language
                      </Form.Label>
                      <div className="tagarea p-2">
                        <span className="tag-white">
                          English <i className="fa fa-close ms-1"></i>
                        </span>
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
                        <span className="tag-white">
                          English <i className="fa fa-close ms-1"></i>
                        </span>
                      </div>
                      <span className="required_text">
                        Select all written and reading languages
                      </span>
                    </Form.Group>
                  </Form>
                  <div className="accordion_footer">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="me-3">
                          <Form.Check
                            inline
                            label="No Specific Language Requirements"
                            name="group1"
                            type={type}
                            checked
                            id={`inline-${type}-1`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button type="button" class="btn btn-lightgray">
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="6"
                className="accd_child"
                id="item_Geog"
              >
                <Accordion.Header>
                  Geography{" "}
                  <svg
                    className="flag_icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                      stroke="#98A2B3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="sm-label">
                        Preferred States / Cities / Towns
                      </Form.Label>
                      <div className="tagarea p-2">
                        <span className="tag-white">
                          Mumbai <i className="fa fa-close ms-1"></i>
                        </span>
                        <span className="tag-white">
                          Bengaluru <i className="fa fa-close ms-1"></i>
                        </span>
                      </div>
                      <span className="required_text">
                        Select all relevant locations
                      </span>
                    </Form.Group>
                  </Form>
                  <div className="accordion_footer">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="me-3">
                          <Form.Check
                            inline
                            label="No Specific Location"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                          />
                          <Form.Check
                            inline
                            label="Relocation Expenses Covered"
                            name="group1"
                            type={type}
                            checked
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button type="button" class="btn btn-lightgray">
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  Skills and Other Requirements
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    In this section, you can add additional optional details
                    such as Skills expected from the ideal candidate and also
                    add some specific questions that will allow you to gain a
                    deeper insight about the candidate.
                    <br />
                    <br />
                    Don’t forget that here too Skills or Questions can be marked
                    as very important [Yellow Flag] or a must have [Red Flag] to
                    indicate the Importance to you.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8" className="accd_child">
                <Accordion.Header>
                  Skills
                  <div className="head_actions">
                    <span className="imprt_icon text-primery">
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span className="imprt_icon">
                      <i class="far fa-star" aria-hidden="true"></i>
                    </span>
                    <span className="imprt_icon">
                      <i class="far fa-star" aria-hidden="true"></i>
                    </span>
                    <span className="count ms-1">1 of 3</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="skills_seraching">
                    <Col md={9}>
                      <InputGroup className="defult_serachbox">
                        <Button id="basic-addon1">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                              stroke="#667085"
                              stroke-width="1.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Button>
                        <Form.Control
                          placeholder="Serach"
                          aria-label="Serach"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={3}>
                      <button type="button" class="btn btn-lightgray w-100">
                        <i className="fa fa-plus me-2"></i>Create Skill Group
                      </button>{" "}
                    </Col>
                  </Row>
                  <div className="starttag_box">
                    <div className="stagbox_head">
                      <h6>Productivity Tools</h6>
                      <div className="d-flex">
                        <button type="button" className="icon-btn">
                          <i className="fa fa-undo"></i>
                        </button>
                        <button type="button" className="icon-btn">
                          <i className="fa fa-close"></i>
                        </button>
                      </div>
                    </div>
                    <div className="stag_list mt-2">
                      <span className="stag_item">
                        Microsoft Excel <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Powerpoint <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Slack <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Microsoft Word <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Google Docs <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Trello <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Asana <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Evernote <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Zoom <i className="far fa-star ms-1"></i>
                      </span>
                    </div>
                  </div>
                  <div className="starttag_box">
                    <div className="stagbox_head">
                      <h6>Sales</h6>
                      <div className="d-flex">
                        <button type="button" className="icon-btn">
                          <i className="fa fa-undo"></i>
                        </button>
                        <button type="button" className="icon-btn">
                          <i className="fa fa-close"></i>
                        </button>
                      </div>
                    </div>
                    <div className="stag_list mt-2">
                      <span className="stag_item">
                        Lead Generation <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        CRM Tools <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Negotiation <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Customer Relationship Management{" "}
                        <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Sales Strategy <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Prospecting <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Pipeline Management <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Product Knowledge <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Closing Techniques <i className="far fa-star ms-1"></i>
                      </span>
                      <span className="stag_item">
                        Account Management <i className="far fa-star ms-1"></i>
                      </span>
                    </div>
                  </div>
                  <div className="accordion_footer mt-3 justify-content-end">
                    <button type="button" class="btn btn-lightgray">
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9" className="accd_child">
                <Accordion.Header>
                  Custom Questions{" "}
                  <svg
                    className="flag_icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                      stroke="#98A2B3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="align-items-center">
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>Salary Range</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <Form.Control type="text" placeholder="₹ 25,000" />
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <span>to</span>
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <Form.Control type="text" placeholder="₹ 75,000" />
                    </div>
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>INR</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>Per Month</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="10">
                <Accordion.Header>
                  Ideal Behaviour and Personalities
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="align-items-center">
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>Salary Range</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <Form.Control type="text" placeholder="₹ 25,000" />
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <span>to</span>
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <Form.Control type="text" placeholder="₹ 75,000" />
                    </div>
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>INR</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>Per Month</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="11" className="accd_child">
                <Accordion.Header>
                  Behaviour Assessment{" "}
                  <svg
                    className="flag_icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                      stroke="#98A2B3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="align-items-center">
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>Salary Range</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <Form.Control type="text" placeholder="₹ 25,000" />
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <span>to</span>
                    </div>
                    <div className="form-group  w-auto mb-0">
                      <Form.Control type="text" placeholder="₹ 75,000" />
                    </div>
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>INR</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                    <div className="form-group w-auto mb-0">
                      <Form.Select aria-label="Default select example">
                        <option>Per Month</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col md={3} lg={2} className="jobpre_Rightpanel">
            <h5>Sr. Developer - Python</h5>
            <p>
              Like Software Developer, 10 Positions
              <br />
              Technology, Mumbai,
              <br />
              Full-Time, Remote
            </p>
            <div className="ct_scrollbar pb-3">
              <div className="user_bsinfo">
                <h6>Expectations</h6>
                <ul>
                  <li>4-8 Years Experience </li>
                  <li>
                    Salary{" "}
                    <span className="text-danger italic">Not defined</span>{" "}
                  </li>
                  <li>
                    Minimum Qualification{" "}
                    <span className="text-danger italic">Not defined</span>{" "}
                  </li>
                  <li>
                    Education{" "}
                    <span className="text-danger italic">Not defined</span>{" "}
                  </li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Additional</h6>
                <ul>
                  <li>
                    Required By{" "}
                    <span className="text-danger italic">Not defined</span>
                  </li>
                  <li>Needs to Travel Rarely </li>
                  <li>Must Speak English, Telugu, Hindi</li>
                  <li>Must Read/Write in English</li>
                  <li>Should be from Mumbai, Hyderabad, Delhi, Bangalore</li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Skills</h6>
                <ul>
                  <li>
                    <span className="text-danger italic">Not defined</span>
                  </li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Behaviours</h6>
                <ul>
                  <li>
                    <span className="text-danger italic">Not defined</span>
                  </li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Benefits</h6>
                <ul>
                  <li>
                    <span className="text-danger italic">Not defined</span>
                  </li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Description</h6>
                <ul>
                  <li>Job details-Chemical engineer</li>
                  <li>Acharya Group </li>
                  <li>Area: Ambernath, Maharashtra, India</li>
                  <li>Experience: 4-8 Years</li>
                  <li>Role: Manager-Design Engineering/Process Engineering</li>
                  <li>
                    Industry type: Specialty Chemicals, Pharmaceuticals,
                    agro-chemicals, intermediates plants
                  </li>
                  <li>Employment: Fulltime/Contract</li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Key Responsibilities</h6>
                <ul>
                  <li>
                    Collecting plant data and providing design feedback to team
                  </li>
                  <li>
                    Performing material balance, energy balance for the plant
                    along with utility calculations.
                  </li>
                  <li>
                    Determining sizes and specifications for equipment and
                    instruments before procurement.
                  </li>
                </ul>
              </div>
            </div>
            <div className="recomed_panel">
              <div className="recomed_head">
                <h6>Recommendations</h6>
                <ProgressBar now={60} />
              </div>
              <ul class="rects_list2 px-3">
                <li class="active">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1L5.34925 3.60299C5.22227 4.11092 5.15878 4.36489 5.02654 4.57154C4.90958 4.75434 4.75434 4.90958 4.57154 5.02654C4.36489 5.15878 4.11092 5.22227 3.603 5.34925L1 6L3.60299 6.65075C4.11092 6.77773 4.36489 6.84122 4.57154 6.97346C4.75434 7.09042 4.90958 7.24566 5.02654 7.42846C5.15878 7.63511 5.22227 7.88908 5.34925 8.397L6 11L6.65075 8.39701C6.77773 7.88908 6.84122 7.63511 6.97346 7.42846C7.09042 7.24566 7.24566 7.09042 7.42846 6.97346C7.63511 6.84122 7.88908 6.77773 8.397 6.65075L11 6L8.39701 5.34925C7.88908 5.22227 7.63511 5.15878 7.42846 5.02654C7.24566 4.90958 7.09042 4.75434 6.97346 4.57154C6.84122 4.36489 6.77773 4.11092 6.65075 3.603L6 1Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>
                    Add a preferred <strong>salary</strong> even if not
                    displayed to applicant.
                  </p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1L5.34925 3.60299C5.22227 4.11092 5.15878 4.36489 5.02654 4.57154C4.90958 4.75434 4.75434 4.90958 4.57154 5.02654C4.36489 5.15878 4.11092 5.22227 3.603 5.34925L1 6L3.60299 6.65075C4.11092 6.77773 4.36489 6.84122 4.57154 6.97346C4.75434 7.09042 4.90958 7.24566 5.02654 7.42846C5.15878 7.63511 5.22227 7.88908 5.34925 8.397L6 11L6.65075 8.39701C6.77773 7.88908 6.84122 7.63511 6.97346 7.42846C7.09042 7.24566 7.24566 7.09042 7.42846 6.97346C7.63511 6.84122 7.88908 6.77773 8.397 6.65075L11 6L8.39701 5.34925C7.88908 5.22227 7.63511 5.15878 7.42846 5.02654C7.24566 4.90958 7.09042 4.75434 6.97346 4.57154C6.84122 4.36489 6.77773 4.11092 6.65075 3.603L6 1Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>
                    Add a preferred work <strong>experience</strong>
                  </p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1L5.34925 3.60299C5.22227 4.11092 5.15878 4.36489 5.02654 4.57154C4.90958 4.75434 4.75434 4.90958 4.57154 5.02654C4.36489 5.15878 4.11092 5.22227 3.603 5.34925L1 6L3.60299 6.65075C4.11092 6.77773 4.36489 6.84122 4.57154 6.97346C4.75434 7.09042 4.90958 7.24566 5.02654 7.42846C5.15878 7.63511 5.22227 7.88908 5.34925 8.397L6 11L6.65075 8.39701C6.77773 7.88908 6.84122 7.63511 6.97346 7.42846C7.09042 7.24566 7.24566 7.09042 7.42846 6.97346C7.63511 6.84122 7.88908 6.77773 8.397 6.65075L11 6L8.39701 5.34925C7.88908 5.22227 7.63511 5.15878 7.42846 5.02654C7.24566 4.90958 7.09042 4.75434 6.97346 4.57154C6.84122 4.36489 6.77773 4.11092 6.65075 3.603L6 1Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>
                    Select multiple <strong>educational fields</strong> to
                    expand candidate pool
                  </p>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CreateJobsRevised;
