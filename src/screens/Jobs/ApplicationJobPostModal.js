import React, { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
  Container,
} from "react-bootstrap";
import logoIcon from "../../images/logo_icon.png";

const ApplicationJobPostModal = ({ show, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState("");
  const [isYes, setIsYes] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSwitchChange = () => {
    setIsYes((prevState) => !prevState);
  };

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
          <h5>Job Application for Sr. Developer - Python</h5>
          <p>Mumbai, Technology, Full-Time, Remote</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            {/* Left Column */}
            <Col md={2}>
              <div className="custom-card">
                <h6>Profile</h6>
                <ul className="checklist">
                  <li className="active">
                    <a href="#item_salary">
                      Basic Details{" "}
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#item_edu">
                      Resume <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#item_Exp">
                      Availability{" "}
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#item_Target">
                      Expected Salary{" "}
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#item_lang">
                      Education <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#item_Geog">
                      Experience <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#item_Geog">
                      Language <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#item_Geog">
                      Experience <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#item_Geog">
                      Geography <i class="fa fa-check" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
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
              </div>
            </Col>

            {/* Center Column */}
            <Col md={8}>
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
                    />
                  </Col>
                </Row>
                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Email</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="email@mail.com"
                      size="sm"
                      style={{ width: "350px" }}
                    />
                  </Col>
                </Row>

                <Row className="mb-3 mt-2">
                  <Col md={2}>
                    <Form.Label>Confirm Email ID</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="email@mail.com"
                      size="sm"
                      style={{ width: "350px" }}
                    />
                    <p>
                      Your application and progress are linked to this email.
                      <p>Please ensure it is entered correctly.</p>
                    </p>
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
                    />
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
                    <Form.Control
                      type="text"
                      placeholder="Enter full name"
                      size="sm"
                      style={{ width: "350px" }}
                    />
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Availability</h6>

                {/* Currently Working Row with Switch */}
                {/* <Row className="mb-3 d-flex align-items-center">
                  {" "}
                 
                  <Col xs="auto">
                    <Form.Label>Currently Working?</Form.Label>
                  </Col>
                  <Col>
                    
                    <Form.Check
                      type="switch"
                      id="currentlyWorkingSwitch"
                      label={isCurrentlyWorking ? "Yes" : "No"} 
                      checked={isCurrentlyWorking}
                      onChange={handleSwitchChange}
                    />
                  </Col>
                </Row> */}

                <Row className="align-items-center">
                  {/* Left Label for "No" */}
                  <Col xs="auto">
                    <Form.Label style={{ color: isYes ? 'grey' : 'black' }}>
                      {!isYes ? 'No' : 'No'}
                    </Form.Label>
                  </Col>

                  {/* The Switch Button */}
                  <Col xs="auto">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={isYes}
                      onChange={handleSwitchChange}
                    />
                  </Col>

                  {/* Right Label for "Yes" */}
                  <Col xs="auto">
                    <Form.Label style={{ color: isYes ? 'black' : 'grey' }}>
                      {isYes ? 'Yes' : 'Yes'}
                    </Form.Label>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Salary</h6>
                <Row className="mb-3 d-flex align-items-center">
                  {" "}
                  {/* Flexbox to align items */}
                  <Col xs="auto">
                    <Form.Label>Expected Salary</Form.Label>
                  </Col>
                  <Col>
                    <Form.Select aria-label="Default select example">
                      <option>Expected Salary</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Educational Qualification</h6>
                <Row className="mb-3 d-flex align-items-center border-top">
                  <Col md={2}>
                    <h6>Level</h6>
                    <Form.Select aria-label="Default select example">
                      <option>Expected Salary</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <h6>Area of Education</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={2}>
                    <h6>Grad. Year</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={3} className="p-4">
                    <h6> University</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={2}>
                    <h6> Grade</h6>
                    <Form.Select aria-label="Default select example">
                      <option>Expected Salary</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Work Experience</h6>

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
                    />
                  </Col>
                  <Col md={3}>
                    <h6>Area of Education</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={2}>
                    <h6>Grad. Year</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={3} className="p-4">
                    <h6> University</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={2}>
                    <h6> Grade</h6>
                    <Form.Select aria-label="Default select example">
                      <option>Expected Salary</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Language</h6>
                <p>Pick as many as possible</p>
                <Row>
                  <Col xs="auto" className="text-center">
                    <Form.Label>Spoken Language</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder=""
                      size="sm"
                      style={{ width: "650px", height: "120px" }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="auto" className="text-center">
                    <Form.Label>Written & Reading Language</Form.Label>
                  </Col>

                  <Col>
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder=""
                      size="sm"
                      style={{ width: "650px", height: "120px" }}
                    />
                  </Col>
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
                    />
                  </Col>
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
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        className="mr-3"
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        className="ml-3"
                      />
                    </div>
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
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        className="mr-3"
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        className="ml-3"
                      />
                    </div>
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
                    />
                  </Col>
                  <Col md={3}>
                    <h6>Area of Education</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={2}>
                    <h6>Grad. Year</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={3} className="p-4">
                    <h6> University</h6>
                    <Form.Control
                      type="text"
                      placeholder="9876543210"
                      size="sm"
                      style={{ width: "150px" }}
                    />
                  </Col>
                  <Col md={2}>
                    <h6> Grade</h6>
                    <Form.Select aria-label="Default select example">
                      <option>Expected Salary</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label as="legend" column sm={2}>
                        Radios
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Skills</h6>
                <p>Please select 8 skills</p>
                <Row>
                  <Col md={4}>
                    <h6>Productivity Tools</h6>
                  </Col>
                  <Col md={8}>
                    <p>Microsoft Excel</p>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <h6>Software Languages</h6>
                  </Col>
                  <Col md={8}>
                    <p>Microsoft Excel</p>
                  </Col>
                </Row>
              </div>

              <div className="custom-card">
                <h6>Additional Question from Company</h6>
                <p>
                  Please complete the questions below and complete your Job
                  Application. These are specific questions that the company
                  would like to ask you as a part of the Application process
                </p>
                <h6>
                  {" "}
                  Which area of cricket do you think needs the greatest
                  development in senior cricket players?
                </h6>
                <Form.Check
                  type="checkbox"
                  id="custom-checkbox"
                  label="Self Confidence"
                //checked={true}
                />
                <Form.Check
                  type="checkbox"
                  id="custom-checkbox"
                  label="Openness to Learn"
                //checked={true}
                />
                <Form.Check
                  type="checkbox"
                  id="custom-checkbox"
                  label="Leadership Skillss"
                //checked={true}
                />
                <Form.Check
                  type="checkbox"
                  id="custom-checkbox"
                  label="Fitness and Energy"
                //checked={true}
                />
                <h6>
                  {" "}
                  Do you think that IPL has impacted the skills of the players
                  to play 50 over cricket negatively ?
                </h6>
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  className="mr-3"
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  className="ml-3"
                />
              </div>
            </Col>

            <Col md={2}>
              <div className="custom-card">
                <h6>Sandeep Kattamuri</h6>
                <small>Sandeep@lywo.in</small>
                <small>9125487630</small>
                <p>MyResume.pdf</p>
                <p>Availability</p>
                <small className="text-danger">Not defined</small>
                <p>Expected Salary</p>
                <p>Educational Qualification</p>
                <p>Work Experience </p>
                <p>Language</p>
                <p>Geography</p>
                <p>Skills</p>
                <p>Additional Questions from Company</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Save as Draft
        </Button>
        <Button variant="primary">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicationJobPostModal;
