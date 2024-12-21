import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
import baseCheckbox from "../../images/icons/Checkbox_base.svg";
import DropD_check from "../../images/icons/DropD_check-circle.svg";
import DropD_copy from "../../images/icons/DropD_copy-06.svg";
import DropD_edit from "../../images/icons/DropD_edit-03.svg";
import DropD_eye from "../../images/icons/DropD_eye.svg";
import DropD_link from "../../images/icons/DropD_link-03.svg";
import DropD_mail from "../../images/icons/DropD_mail-02.svg";
import DropD_pause from "../../images/icons/DropD_pause-circle.svg";
import filterLines from "../../images/icons/filter-lines.svg";
import threeLayers from "../../images/icons/layers-three-01.svg";
import {
  Card,
  Col,
  Container,
  Row,
  InputGroup,
  Button,
  Form,
  Table,
  Accordion,
  Offcanvas,
  Dropdown,
  Badge,
  Spinner,
} from "react-bootstrap";
import { JobList } from "../../services/provider";

const JobsList = () => {
  const [show, setShow] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [SerachList, setSerachList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadeMoreCount, setLoadeMoreCount] = useState(10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const JobListApi = async (SerachList) => {
    setIsLoading(true);
    const url = `https://bittrend.shubansoftware.com/assets-api/job-list-api/?page=1&limit=10&search=${SerachList}`;

    try {
      const response = await JobList(url);
      setIsLoading(false);
      setJobData(response?.data?.response);
      // console.log("resposne  job-----",JSON.stringify(response?.data?.response,null,4))
    } catch (error) {
      setIsLoading(false);
      console.log("resposne  error-----", error);
    }
  };

  useEffect(() => {
    JobListApi();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      JobListApi(SerachList);
    }, 500);
  
    return () => clearTimeout(debounceTimer);
  }, [SerachList]);

  const handleSearch = (e) => {
    setSerachList(e.target.value);
  };

  const handleLoadMore = () => {
    setLoadeMoreCount(loadeMoreCount + 10);
  };


  return (
    <>
      <Sidebar />
      <Header />
      {isLoading && (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="ml-3" />
        </div>
      )}

      <div className="page-body">
        <Container fluid>
          <Row>
            <Col
              md={12}
              className="d-flex justify-content-between align-items-center"
            >
              <h4 class="my-3 pagetitle">Create a New Job</h4>
              <Button variant="primary" className="btn-md" onClick={handleShow}>
                <svg
                  width="18"
                  className="me-1"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.99992 3.33331V12.6666M3.33325 7.99998H12.6666"
                    stroke="white"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Create a New Job
              </Button>
            </Col>
          </Row>
          <Card className="shadow-sm border-0 evaluations_data">
            <Card.Header className="py-3">
              <Row>
                <Col md={3}>
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
                      onChange={(e) => handleSearch(e)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="joblist_filter d-flex justify-content-between align-items-center">
                <span className="jobs_count">30 Active Jobs</span>
                <Button className="btn btn-light-outline" onClick={handleShow}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="me-2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                      stroke="#344054"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  More filters
                </Button>
              </div>
              <div className="elv_datatable joblist_data">
                <Table striped className="m-0">
                  <thead>
                    <tr>
                      <th>
                        <img src={baseCheckbox} alt="" className="me-2 mw-16" />
                        Job
                      </th>
                      <th>Location</th>
                      <th>Department</th>
                      <th>Job type</th>
                      <th>Workplace Type</th>
                      <th>Positions</th>
                      <th>Total App.</th>
                      <th>New App.</th>
                      <th>Posted On</th>
                      <th>Status</th>
                      <th style={{ width: "42px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobData.map((item) => (
                      <tr>
                        <td>
                          <Form.Check
                            className="inline-checkbox me-2_5"
                            name="group1"
                            type="checkbox"
                          />
                          <span className="font-weight-600">
                            {item.job_title}
                          </span>
                        </td>
                        <td>{item.job_location.location_name}</td>
                        <td>{item.department.department_name}</td>
                        <td>{item.job_type}</td>
                        <td>{item.workplace_type}</td>
                        <td>{item.number_of_positions}</td>
                        <td>2154</td>
                        <td className="avgscore">12</td>
                        <td>05/11/2024</td>
                        <td>Active</td>
                        <td className="action" style={{ width: "42px" }}>
                          <Dropdown className="action_dropdown">
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                              className="btn-transpant"
                            >
                              <img src={threeDots} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                <img className="me-2" src={DropD_eye} alt="" />
                                View
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                <img className="me-2" src={DropD_edit} alt="" />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                <img className="me-2" src={DropD_copy} alt="" />
                                Clone
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                <img className="me-2" src={DropD_link} alt="" />
                                Copy Link
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                <img className="me-2" src={DropD_mail} alt="" />
                                Invite
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                <img
                                  className="me-2"
                                  src={DropD_check}
                                  alt=""
                                />
                                Close
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                <img
                                  className="me-2"
                                  src={DropD_pause}
                                  alt=""
                                />
                                Stop App.
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}

                    {/* <tr>
                      <td>
                        <Form.Check
                          className="inline-checkbox me-2_5"
                          name="group1"
                          type="checkbox"
                        />
                        <span className="font-weight-600">UI Designer</span>
                      </td>
                      <td>Goa</td>
                      <td>Creative</td>
                      <td>Full-Time</td>
                      <td>Hybrid</td>
                      <td>5</td>
                      <td>513</td>
                      <td className="avgscore">0</td>
                      <td>28/10/2024</td>
                      <td>Active</td>
                      <td className="action" style={{ width: "42px" }}>
                        <img src={threeDots} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          className="inline-checkbox me-2_5"
                          name="group1"
                          type="checkbox"
                        />
                        <span className="font-weight-600">Finance Manager</span>
                      </td>
                      <td>Delhi</td>
                      <td>Finance</td>
                      <td>Part-Time</td>
                      <td>Hybrid</td>
                      <td>7</td>
                      <td>184</td>
                      <td className="avgscore">21</td>
                      <td>28/10/2024</td>
                      <td>App. Stopped</td>
                      <td className="action" style={{ width: "42px" }}>
                        <img src={threeDots} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          className="inline-checkbox me-2_5"
                          name="group1"
                          type="checkbox"
                        />
                        <span className="font-weight-600">Python Developer</span>
                      </td>
                      <td>Hyderabad</td>
                      <td>Technology</td>
                      <td>Part-Time</td>
                      <td>Hybrid</td>
                      <td>2</td>
                      <td>8541</td>
                      <td className="avgscore">8</td>
                      <td>26/10/2024</td>
                      <td>Draft</td>
                      <td className="action" style={{ width: "42px" }}>
                        <img src={threeDots} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          className="inline-checkbox me-2_5"
                          name="group1"
                          type="checkbox"
                        />
                        <span className="font-weight-600">Figma Designer</span>
                      </td>
                      <td>Mumbai</td>
                      <td>Technology</td>
                      <td>Full-Time</td>
                      <td>Remote</td>
                      <td>10</td>
                      <td>2154</td>
                      <td className="avgscore">12</td>
                      <td>05/11/2024</td>
                      <td>Active</td>
                      <td className="action" style={{ width: "42px" }}>
                        <img src={threeDots} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          className="inline-checkbox me-2_5"
                          name="group1"
                          type="checkbox"
                        />
                        <span className="font-weight-600">Figma Designer</span>
                      </td>
                      <td>Mumbai</td>
                      <td>Technology</td>
                      <td>Full-Time</td>
                      <td>Remote</td>
                      <td>10</td>
                      <td>2154</td>
                      <td className="avgscore">12</td>
                      <td>05/11/2024</td>
                      <td>Active</td>
                      <td className="action" style={{ width: "42px" }}>
                        <img src={threeDots} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          className="inline-checkbox me-2_5"
                          name="group1"
                          type="checkbox"
                        />
                        <span className="font-weight-600">Figma Designer</span>
                      </td>
                      <td>Mumbai</td>
                      <td>Technology</td>
                      <td>Full-Time</td>
                      <td>Remote</td>
                      <td>10</td>
                      <td>2154</td>
                      <td className="avgscore">12</td>
                      <td>05/11/2024</td>
                      <td>Active</td>
                      <td className="action" style={{ width: "42px" }}>
                        <img src={threeDots} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          className="inline-checkbox me-2_5"
                          name="group1"
                          type="checkbox"
                        />
                        <span className="font-weight-600">Figma Designer</span>
                      </td>
                      <td>Mumbai</td>
                      <td>Technology</td>
                      <td>Full-Time</td>
                      <td>Remote</td>
                      <td>10</td>
                      <td>2154</td>
                      <td className="avgscore">12</td>
                      <td>05/11/2024</td>
                      <td>Active</td>
                      <td className="action" style={{ width: "42px" }}>
                        <img src={threeDots} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check
                          className="inline-checkbox me-2_5"
                          name="group1"
                          type="checkbox"
                        />
                        <span className="font-weight-600">Figma Designer</span>
                      </td>
                      <td>Mumbai</td>
                      <td>Technology</td>
                      <td>Full-Time</td>
                      <td>Remote</td>
                      <td>10</td>
                      <td>2154</td>
                      <td className="avgscore">12</td>
                      <td>05/11/2024</td>
                      <td>Active</td>
                      <td className="action" style={{ width: "42px" }}>
                        <img src={threeDots} />
                      </td>
                    </tr> */}
                  </tbody>
                  <tfoot>
                    {/* <tr>
                      <td colSpan={2}>
                        <Button className="btn-light-outline">Load More</Button>
                      </td>
                      <td colSpan={9} className="text-end pe-3">
                        <span className="pagination_count">
                          Showing 10 items
                        </span>
                      </td>
                    </tr> */}

{loadeMoreCount < jobData.length && (
                    <tr>
                      <td colSpan={2}>
                        <Button
                          className="btn-light-outline"
                          onClick={handleLoadMore}
                        >
                          Load More
                        </Button>
                      </td>
                      <td colSpan={7} className="text-end pe-3">
                        <span className="pagination_count">
                          Showing 10 items
                        </span>
                      </td>
                    </tr>
                  )}
                  </tfoot>
                </Table>
              </div>
            </Card.Body>
          </Card>
          {/**Filter Drawer
          <Offcanvas show={show} onHide={handleClose} backdrop={false} placement="end" className="shadow-md border-0">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title><img src={filterLines} alt="" />More Filters</Offcanvas.Title>
              <span className="applied_count">Applied (2)</span>
            </Offcanvas.Header>
            <Offcanvas.Body className="filter_warp">
              <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen>
                <div className="filter_item">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Job Type</Accordion.Header>
                    <Accordion.Body>
                      <ul className="filter_itemlist">
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Full -Time"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Part -Time"
                          />
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <div className="filter_item">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Workplace Type</Accordion.Header>
                    <Accordion.Body>
                      <ul className="filter_itemlist">
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Work from office"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Remote"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Hybrid"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Work from Home"
                          />
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <div className="filter_item">
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Location</Accordion.Header>
                    <Accordion.Body>
                      <ul className="filter_itemlist">
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Delhi"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Mumbai"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Bengaluru"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Hyderabad"
                          />
                        </li>
                      </ul>
                      <Button variant="link">View More</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <div className="filter_item">
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Department</Accordion.Header>
                    <Accordion.Body>
                      <ul className="filter_itemlist">
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Engineering - Software"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Sales & Business Dev"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Marketing & Communication"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Customer Service"
                          />
                        </li>
                      </ul>
                      <Button variant="link">View More</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <div className="filter_item">
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Status</Accordion.Header>
                    <Accordion.Body>
                      <ul className="filter_itemlist">
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Active"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Draft"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="App. Stopped"
                          />
                        </li>
                        <li>
                          <Form.Check
                            className="inline-checkbox"
                            name="group1"
                            type="checkbox"
                            label="Closed"
                          />
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              </Accordion>
              <div className="filter_item">
                  <h5 className="fltitem_title">Target Hire Date</h5>
                  <Row>
                    <Col xs={4} className="pe-0">
                        <Form.Select>
                          <option>On</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                    <Col xs={8}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="date" placeholder="09/12/2024" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className="fltitem_title">Posted On</h5>
                  <Row>
                    <Col xs={4} className="pe-0">
                        <Form.Select>
                          <option>On</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                    <Col xs={8}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="date" placeholder="09/12/2024" />
                      </Form.Group>
                    </Col>
                  </Row>
              </div>
            </Offcanvas.Body>
             <div className="offcanvas-footer text-end">
              <Button variant="light" className="me-3">Clear All</Button>
              <Button variant="primary">Apply</Button>
             </div>
          </Offcanvas> **/}

          {/**Create JOb Drawer**/}
          <Offcanvas
            show={show}
            onHide={handleClose}
            backdrop={false}
            placement="end"
            className="createjob_drawer lg-drawer shadow-md border-0"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <img src={threeLayers} alt="" />
                Create a New Job
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className="row">
                <Form.Group
                  className="col-md-12 mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control type="text" placeholder="Job Title" />
                </Form.Group>
                <Form.Group
                  className="col-md-6 mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Is Like</Form.Label>
                  <Form.Control type="text" placeholder="Is Like" />
                </Form.Group>
                <Form.Group
                  className="col-md-6 mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>No. of Positions</Form.Label>
                  <Form.Control type="text" placeholder="No. of Positions" />
                </Form.Group>
                <Form.Group
                  className="col-md-6 mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Department</Form.Label>
                  <Form.Control type="text" placeholder="Department" />
                </Form.Group>
                <Form.Group
                  className="col-md-6 mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="Location" />
                </Form.Group>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="checkbox-group my-2">
                    <label class="form-label me-3 mb-0">Requires Travel?</label>
                    <Form.Check
                      inline
                      label="Regularly"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Sometimes"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    <Form.Check
                      inline
                      label="Rarely"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                  </div>
                ))}
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Job Description{" "}
                    <span className="font-light">(Min 50 words)</span>
                  </Form.Label>
                  <Form.Control as="textarea" rows={12} />
                </Form.Group>
                <Col md={6} className="mb-2">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Select>
                    <option>Job Type</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
                <Col md={6} className="mb-2">
                  <Form.Label>Workplace Type</Form.Label>
                  <Form.Select>
                    <option>Workplace Type</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Benefits <span className="font-light">(optional)</span>
                  </Form.Label>
                  <div className="tagarea">
                    <span className="badge-gray active">Microsoft Office</span>
                    <span className="badge-gray">Provident Fund</span>
                    <span className="badge-gray">Cell Phone Reimbursement</span>
                    <span className="badge-gray">Paid Sick Time</span>
                    <span className="badge-gray">Work From Home</span>
                    <span className="badge-gray">Food Provided</span>
                    <span className="badge-gray">Life Insurance</span>
                    <span className="badge-gray active">Paid Time Off</span>
                    <span className="badge-gray">Internet Reimbursement</span>
                    <Button className="btn-light-gray">
                      <i className="fa fa-plus text-primary me-1"></i>Add Custom
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Offcanvas.Body>
            <div className="offcanvas-footer text-end">
              <Button variant="light" className="me-3">
                Back
              </Button>
              <Button variant="primary">Next</Button>
            </div>
          </Offcanvas>
        </Container>
      </div>
    </>
  );
};

export default JobsList;
