// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Dropdown,
//   Form,
//   InputGroup,
//   Row,
//   Spinner,
//   Table
// } from "react-bootstrap";
// import Header from "../../components/Header";
// import CreateJobs from "../../components/Jobs/CreateJobs";
// import FilterJobs from "../../components/Jobs/FilterJobs";
// import Sidebar from "../../components/Sidebar";
// import baseCheckbox from "../../images/icons/Checkbox_base.svg";
// import threeDots from "../../images/icons/dots-vertical_icon.svg";
// import DropD_check from "../../images/icons/DropD_check-circle.svg";
// import DropD_copy from "../../images/icons/DropD_copy-06.svg";
// import DropD_edit from "../../images/icons/DropD_edit-03.svg";
// import DropD_eye from "../../images/icons/DropD_eye.svg";
// import DropD_link from "../../images/icons/DropD_link-03.svg";
// import DropD_mail from "../../images/icons/DropD_mail-02.svg";
// import DropD_pause from "../../images/icons/DropD_pause-circle.svg";
// import { JobList } from "../../services/provider";

// const JobsList = () => {
//   const [modal, setModal] = useState({
//     createModal : false,
//     MoreFilterModal : false
//   });
//   const [jobData, setJobData] = useState([]);
//   const [SerachList, setSerachList] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadeMoreCount, setLoadeMoreCount] = useState(10);

//   const handleShow = (modalName) => {
//     setModal((prevModals) => ({
//       ...prevModals,
//       [modalName]: true,
//     }));
//   };

//   const handleClose = (modalName) => {
//     setModal((prevModals) => ({
//       ...prevModals,
//       [modalName]: false,
//     }));
//   };

//   const JobListApi = async (SerachList) => {
//     setIsLoading(true);
//     const url = `https://bittrend.shubansoftware.com/assets-api/job-list-api/?page=1&limit=10&search=${SerachList}`;

//     try {
//       const response = await JobList(url);
//       setIsLoading(false);
//       setJobData(response?.data?.response);
//       // console.log("resposne  job-----",JSON.stringify(response?.data?.response,null,4))
//     } catch (error) {
//       setIsLoading(false);
//       console.log("resposne  error-----", error);
//     }
//   };

//   useEffect(() => {
//     JobListApi();
//   }, []);

//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       JobListApi(SerachList);
//     }, 500);

//     return () => clearTimeout(debounceTimer);
//   }, [SerachList]);

//   const handleSearch = (e) => {
//     setSerachList(e.target.value);
//   };

//   const handleLoadMore = () => {
//     setLoadeMoreCount(loadeMoreCount + 10);
//   };

//   return (
//     <>
//       <Sidebar />
//       <Header />
//       {isLoading && (
//         <div className="loader-overlay">
//           <Spinner animation="border" role="status" className="ml-3" />
//         </div>
//       )}

//       <div className="page-body">
//         <Container fluid>
//           <Row>
//             <Col
//               md={12}
//               className="d-flex justify-content-between align-items-center"
//             >
//               <h4 class="my-3 pagetitle">Create a New Job</h4>
//               <Button variant="primary" className="btn-md" onClick={()=>handleShow('createModal')}>
//                 <svg
//                   width="18"
//                   className="me-1"
//                   height="18"
//                   viewBox="0 0 18 18"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M7.99992 3.33331V12.6666M3.33325 7.99998H12.6666"
//                     stroke="white"
//                     stroke-width="1.66667"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                 </svg>
//                 Create a New Job
//               </Button>
//             </Col>
//           </Row>
//           <Card className="shadow-sm border-0 evaluations_data">
//             <Card.Header className="py-3">
//               <Row>
//                 <Col md={3}>
//                   <InputGroup className="defult_serachbox">
//                     <Button id="basic-addon1">
//                       <svg
//                         width="18"
//                         height="18"
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
//                           stroke="#667085"
//                           stroke-width="1.66667"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         />
//                       </svg>
//                     </Button>
//                     <Form.Control
//                       placeholder="Serach"
//                       aria-label="Serach"
//                       aria-describedby="basic-addon1"
//                       onChange={(e) => handleSearch(e)}
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>
//             </Card.Header>
//             <Card.Body>
//               <div className="joblist_filter d-flex justify-content-between align-items-center">
//                 <span className="jobs_count">30 Active Jobs</span>
//                 <Button className="btn btn-light-outline" onClick={()=>handleShow("MoreFilterModal")}>
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     className="me-2"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
//                       stroke="#344054"
//                       stroke-width="1.66667"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                   </svg>
//                   More filters
//                 </Button>
//               </div>
//               <div className="elv_datatable joblist_data">
//                 <Table striped className="m-0">
//                   <thead>
//                     <tr>
//                       <th>
//                         <img src={baseCheckbox} alt="" className="me-2 mw-16" />
//                         Job
//                       </th>
//                       <th>Location</th>
//                       <th>Department</th>
//                       <th>Job type</th>
//                       <th>Workplace Type</th>
//                       <th>Positions</th>
//                       <th>Total App.</th>
//                       <th>New App.</th>
//                       <th>Posted On</th>
//                       <th>Status</th>
//                       <th style={{ width: "42px" }}></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {jobData.map((item) => (
//                       <tr>
//                         <td>
//                           <Form.Check
//                             className="inline-checkbox me-2_5"
//                             name="group1"
//                             type="checkbox"
//                           />
//                           <span className="font-weight-600">
//                             {item.job_title}
//                           </span>
//                         </td>
//                         <td>{item.job_location.location_name}</td>
//                         <td>{item.department.department_name}</td>
//                         <td>{item.job_type}</td>
//                         <td>{item.workplace_type}</td>
//                         <td>{item.number_of_positions}</td>
//                         <td>2154</td>
//                         <td className="avgscore">12</td>
//                         <td>05/11/2024</td>
//                         <td>Active</td>
//                         <td className="action" style={{ width: "42px" }}>
//                           <Dropdown className="action_dropdown">
//                             <Dropdown.Toggle
//                               variant="success"
//                               id="dropdown-basic"
//                               className="btn-transpant"
//                             >
//                               <img src={threeDots} />
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                               <Dropdown.Item href="#/action-1">
//                                 <img className="me-2" src={DropD_eye} alt="" />
//                                 View
//                               </Dropdown.Item>
//                               <Dropdown.Item href="#/action-2">
//                                 <img className="me-2" src={DropD_edit} alt="" />
//                                 Edit
//                               </Dropdown.Item>
//                               <Dropdown.Item href="#/action-3">
//                                 <img className="me-2" src={DropD_copy} alt="" />
//                                 Clone
//                               </Dropdown.Item>
//                               <Dropdown.Item href="#/action-3">
//                                 <img className="me-2" src={DropD_link} alt="" />
//                                 Copy Link
//                               </Dropdown.Item>
//                               <Dropdown.Item href="#/action-3">
//                                 <img className="me-2" src={DropD_mail} alt="" />
//                                 Invite
//                               </Dropdown.Item>
//                               <Dropdown.Item href="#/action-3">
//                                 <img
//                                   className="me-2"
//                                   src={DropD_check}
//                                   alt=""
//                                 />
//                                 Close
//                               </Dropdown.Item>
//                               <Dropdown.Item href="#/action-3">
//                                 <img
//                                   className="me-2"
//                                   src={DropD_pause}
//                                   alt=""
//                                 />
//                                 Stop App.
//                               </Dropdown.Item>
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         </td>
//                       </tr>
//                     ))}

//                   </tbody>
//                   <tfoot>

//                     {loadeMoreCount < jobData.length && (
//                       <tr>
//                         <td colSpan={2}>
//                           <Button
//                             className="btn-light-outline"
//                             onClick={handleLoadMore}
//                           >
//                             Load More
//                           </Button>
//                         </td>
//                         <td colSpan={7} className="text-end pe-3">
//                           <span className="pagination_count">
//                             Showing 10 items
//                           </span>
//                         </td>
//                       </tr>
//                     )}
//                   </tfoot>
//                 </Table>
//               </div>
//             </Card.Body>
//           </Card>

//           <FilterJobs show={modal.MoreFilterModal}
//             handleClose={()=>handleClose('MoreFilterModal')}
//            />
//           <CreateJobs
//            show={modal.createModal}
//            handleClose={() => handleClose('createModal')}
//            />
//         </Container>
//       </div>
//     </>
//   );
// };

// export default JobsList;

import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  InputGroup,
  Button,
  Form,
  Table,
  Modal,
  Offcanvas,
  Dropdown,
  Accordion,
  Badge,
  Stack,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import Header from "../../components/Header";
import CreateJobs from "../../components/Jobs/CreateJobs";
import FilterJobs from "../../components/Jobs/FilterJobs";
import Sidebar from "../../components/Sidebar";
import baseCheckbox from "../../images/icons/Checkbox_base.svg";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
import DropD_check from "../../images/icons/DropD_check-circle.svg";
import DropD_copy from "../../images/icons/DropD_copy-06.svg";
import DropD_edit from "../../images/icons/DropD_edit-03.svg";
import DropD_eye from "../../images/icons/DropD_eye.svg";
import DropD_link from "../../images/icons/DropD_link-03.svg";
import DropD_mail from "../../images/icons/DropD_mail-02.svg";
import DropD_pause from "../../images/icons/DropD_pause-circle.svg";
import { JobList } from "../../services/provider";
import RangeSlider from "../../components/RangeSilder";
import logoIcon from "../../images/logo_icon.png";
import Edit03 from "../../images/icons/edit-0303.svg";
import CreateJobsRevised from "../../components/Jobs/CreateJobsRevised";

const JobsList = () => {
  const [modal, setModal] = useState({
    createModal: false,
    MoreFilterModal: false,
    createJobRevisedModal: false,
  });

  const [jobData, setJobData] = useState([]);
  const [SerachList, setSerachList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadeMoreCount, setLoadeMoreCount] = useState(10);
  const [filtersList, setFilters] = useState({
    job_type: "",
    workplace_type: "",
    job_location: "",
    job_status: "",
    targate_hire_date: "",
    department: "",
    posted_on: "",
  });

  const handleShow = (modalName) => {
    setModal((prevModals) => ({
      ...prevModals,
      [modalName]: true,
    }));
  };

  const handleClose = (modalName) => {
    setModal((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
  };

  const JobListApi = async (SerachList) => {
    setIsLoading(true);

    // Base API URL
    let url = `https://bittrend.shubansoftware.com/assets-api/job-list-api/?page=1&limit=10&search=${SerachList}`;

    // Add filters to the URL dynamically
    Object.entries(filtersList).forEach(([key, value]) => {
      if (value) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    try {
      const response = await JobList(url);
      setIsLoading(false);
      setJobData(response?.data?.response);
      // console.log("response  job-----", JSON.stringify(response?.data?.response, null, 4))
    } catch (error) {
      setIsLoading(false);
      console.log("response  error-----", error);
    }
  };

  useEffect(() => {
    JobListApi();
  }, []);

  useEffect(() => {
    if (SerachList || !modal.MoreFilterModal) {
      const debounceTimer = setTimeout(() => {
        JobListApi(SerachList);
      }, 500);

      return () => clearTimeout(debounceTimer);
    }
  }, [SerachList, modal.MoreFilterModal]);

  // const handleSearch = (e) => {
  //   setSerachList(e.target.value);
  // };

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
              <Button
                variant="primary"
                className="btn-md"
                onClick={() => handleShow("createModal")}
              >
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
                      onChange={(e) => setSerachList(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="joblist_filter d-flex justify-content-between align-items-center">
                <span className="jobs_count">30 Active Jobs</span>
                <div>
                  <Button
                    className="btn btn-light-outline"
                    onClick={() => {
                      setFilters({
                        job_type: "",
                        workplace_type: "",
                        job_location: "",
                        job_status: "",
                        targate_hire_date: "",
                        department: "",
                        posted_on: "",
                      });
                    }}
                  >
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
                    Clear All Filter
                  </Button>
                  <Button
                    className="btn btn-light-outline"
                    onClick={() => handleShow("MoreFilterModal")}
                  >
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
                  </tbody>
                  <tfoot>
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

          <FilterJobs
            show={modal.MoreFilterModal}
            handleClose={() => handleClose("MoreFilterModal")}
            setFilters={setFilters}
            filtersList={filtersList}
          />
          <CreateJobs
            show={modal.createModal}
            handleClose={() => handleClose("createModal")}
          />
        </Container>
      </div>
    </>
  );
};

export default JobsList;
