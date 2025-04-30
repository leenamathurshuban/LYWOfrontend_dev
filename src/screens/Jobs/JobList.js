import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Spinner,
  Table,
  Modal,
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
import Applicants_mail from "../../images/icons/mail-04-primery.svg";
import arrowDprimery from "../../images/icons/chevron-down-primery.svg";
import Downloadprimery from "../../images/icons/download-01-primery.svg";
import DropD_pause from "../../images/icons/DropD_pause-circle.svg";
import logoIcon from "../../images/logo_icon.png";
import CompLogo from "../../images/comp_logo.png";
import Edit03 from "../../images/icons/edit-0303.svg";
import AchieverIcn from "../../images/icons/Achiever-icon.svg";
import LeaderIcn from "../../images/icons/Leader-icon.svg";
import InfluencerIcn from "../../images/icons/Influencer-icon.svg";
import PioneerIcn from "../../images/icons/Pioneer-icon.svg";
import flagODanger from "../../images/icons/flag-o-danger.svg";
import printer16 from "../../images/icons/printer-16x16.svg";
import download16 from "../../images/icons/download-01-16x16.svg";
import closeI from "../../images/icons/closeI-16x16.svg";
import pauseCircle16 from "../../images/icons/pause-circle-16x16.svg";
import { CloneJobGet, getJobDetailsApi, JobList, UpdateMultipleJobApi } from "../../services/provider";
import { useNavigate } from "react-router-dom";
import UpdateJobs from "../../components/Jobs/UpdateJobs";
import { CustomPopup } from "../../components/CustomPopup";

const JobsList = () => {
  const [modal, setModal] = useState({
    createModal: false,
    MoreFilterModal: false,
    createJobRevisedModal: false,
  });
  const [editModal, setEditModal] = useState({
    createModal: false,
    MoreFilterModal: false,
    createJobRevisedModal: false,
  });
  const [data, setData] = useState({})
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    jobs: [],
    total_active_job_count: 0
  });
  const [VisiblejobData, setJVisiblejobData] = useState(jobData.jobs.slice(0, 10));
  const [count, setCount] = useState(10);
  const [SerachList, setSerachList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeIds, setActiveIds] = useState([]);
  const [closeIds, setCloseIds] = useState([]);
  const [modalText, setModalText] = useState({ showPopup: false, heading: '', body: '', sure: false, sureMulti: false, state: '', item: {} })

  const [filterAppliedCount, setFilterAppliedCount] = useState(0);
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
  const handleEditShow = (modalName) => {
    setEditModal((prevModals) => ({
      ...prevModals,
      [modalName]: true,
    }));
  }
  const handleClose = (modalName) => {
    setModal((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
    setFilters({
      job_type: "",
      workplace_type: "",
      job_location: "",
      job_status: "",
      targate_hire_date: "",
      department: "",
      posted_on: "",
    })
  };
  const handleClose1 = (modalName) => {
    setEditModal((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
  };

  const getJobDetails = async (id) => {
    const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-api/${id}/`;
    try {
      const response = await getJobDetailsApi(url);
      if (response?.data?.success) {
        setData(response.data.response)
        handleEditShow('createModal');
      }
    } catch (error) {
    }
  }

  const JobListApi = async (SerachList) => {
    setIsLoading(true);

    // Base API URL
    let url = `https://bittrend.shubansoftware.com/assets-api/job-list-api/?page=1&limit=2000&search=${SerachList}`;

    try {
      const response = await JobList(url);
      setIsLoading(false);

      setJobData({
        jobs: response?.data?.response || [],
        total_active_job_count: response?.data?.total_active_job_count || 0
      });

    } catch (error) {
      setIsLoading(false);
      console.log("response  error-----", error);
    }
  };

  useEffect(() => {
    setJVisiblejobData(jobData.jobs.slice(0, 10));
    setCount(10);
  }, [jobData.jobs]);

  useEffect(() => {
    JobListApi();
  }, []);

  useEffect(() => {
    if (SerachList || !modal.MoreFilterModal) {
      let count = Object.values(filtersList).filter(
        (value) => value !== null && value !== undefined && value !== ""
      ).length;
      setFilterAppliedCount(count);
      const debounceTimer = setTimeout(() => {
        JobListApi(SerachList);
      }, 500);

      return () => clearTimeout(debounceTimer);
    }
  }, [SerachList]);

  const handleLoadMore = () => {
    const nextData = jobData.jobs.slice(count, count + 10);
    setJVisiblejobData([...VisiblejobData, ...nextData]);
    setCount(count + 10);
  };

  const handleCopy = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        // setCopied(true);
        // setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };
  const handleEmailClick = () => {
    const recipient = "";
    const subject = "";
    const body = "";
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleClone = async (id) => {
    const res = await CloneJobGet(id)
    if (res.data.success) {
      JobListApi(SerachList)
    }
  }

  const handleMultiple = (Val) => {
    if (Val.job_status === 'Active') {
      if (!activeIds.includes(Val?.uid)) {
        setActiveIds([...activeIds, Val?.uid])
      } else {
        const newVal = activeIds.filter((cv) => cv !== Val?.uid)
        setActiveIds(newVal)
      }
    } else if (Val.job_status === 'Active' || Val.job_status === 'Application-Stopped') {
      if (!closeIds.includes(Val?.uid)) {
        setCloseIds([...closeIds, Val?.uid])
      } else {
        const newVal = closeIds.filter((cv) => cv !== Val?.uid)
        setCloseIds(newVal)
      }
    }
  }
  const handleMultipleStopApp = async (status) => {
    const formData = new FormData();
    formData.append('job_uids', JSON.stringify(activeIds))
    formData.append('job_status', status)
    const res = await UpdateMultipleJobApi(formData)
    if (res.data.success) {
      JobListApi(SerachList)
      setActiveIds([])
    }
  }

  const handleMultipleCloseApp = async (status) => {
    const formData = new FormData();
    formData.append('job_uids', JSON.stringify(closeIds))
    formData.append('job_status', status)
    const res = await UpdateMultipleJobApi(formData)
    if (res.data.success) {
      JobListApi(SerachList)
      setCloseIds([])
    }
  }

  const handleCommonEvent = async (Val, status) => {
    const uids = [];
    uids.push(Val?.uid)
    const formData = new FormData();
    formData.append('job_uids', JSON.stringify(uids))
    formData.append('job_status', status)
    const res = await UpdateMultipleJobApi(formData)
    if (res.data.success) {
      JobListApi(SerachList)
    }
  }

  const handleApplyFilter = () => {
    // const filterRow = jobData.jobs?.filter((cv) => cv.job_type == filtersList.job_type && 
    // cv.workplace_type == filtersList.workplace_type && cv.job_location.location_name=== filtersList.job_location)    
    const filteredData = jobData.jobs?.filter(cv => {
      const matchJobType = filtersList.job_type ? cv.job_type === filtersList.job_type : true;
      const matchWorkplace = filtersList.workplace_type ? cv.workplace_type === filtersList.workplace_type : true;
      const matchLocation = filtersList.job_location ? 
        cv.job_location?.location_name?.toLowerCase().trim() === filtersList.job_location.toLowerCase().trim() : true;
      const matchJobStatus = filtersList.job_status?cv.job_status?.toLowerCase().trim() === filtersList.job_status.toLowerCase().trim():true;      
      const matchDepartment = filtersList.department?cv.department?.toLowerCase().trim() === filtersList.department.toLowerCase().trim():true; 
      const matchTarget = filtersList.targate_hire_date?cv.targate_hire_date === filtersList.targate_hire_date:true;
      const postOnMatch = filtersList.posted_on?cv.posted_on===filtersList.posted_on:true;

      return matchJobType && matchWorkplace && matchLocation && matchJobStatus && matchDepartment && matchTarget && postOnMatch;
    });
    setJVisiblejobData(filteredData.slice(0, 10))
    setModal((prevModals) => ({
      ...prevModals,
      ["MoreFilterModal"]: false,
    }));
  }

  useEffect(() => {
    if (modalText.sure) {
      handleCommonEvent(modalText.item, modalText.state)
    }
  }, [modalText.sure])
  useEffect(() => {
    if (modalText.sureMulti) {
      handleMultipleStopApp('Application-Stopped')
    }
  }, [modalText.sureMulti])
  // console.log("jobData------",JSON.stringify(jobData[0],null,4))
  console.log(VisiblejobData)
  console.log(activeIds)
  // console.log(location)
  console.log(modalText)
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
              <h6 class="my-3 pagetitle">Jobs</h6>
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
                <Col md={9} className="d-flex justify-content-end align-items-center">
                  <Button className="icon_btnlink" onClick={() => {
                    if (activeIds.length) {
                      setModalText({
                        showPopup: true,
                        heading: `Do you wish to Proceed?`,
                        body: `You will no longer receive new applications for the ${activeIds?.length} selected jobs.`,
                        state: 'Application-Stopped',
                        item: {}
                      })
                    }
                    // handleMultipleStopApp('Application-Stopped')
                  }}><img className="me-1" src={pauseCircle16} alt="" />Stop New Applications</Button>
                  <Button className="icon_btnlink" onClick={() => {
                    if (activeIds.length) {
                      setModalText({
                        showPopup: true,
                        heading: `Do you wish to Proceed?`,
                        body: `The ${activeIds?.length} selected jobs will be marked as closed, halting new applications and application assessments.`,
                        state: 'closed',
                        item: {}
                      })
                    }
                    // handleMultipleCloseApp('closed')
                  }}><img className="me-1" src={closeI} alt="" />Close</Button>
                  <Button className="icon_btnlink"><img className="me-1" src={printer16} alt="" />Print</Button>
                  <Button className="icon_btnlink"><img className="me-1" src={download16} alt="" />Download</Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="joblist_filter d-flex justify-content-between align-items-center">
                <span className="jobs_count">{jobData?.total_active_job_count} Active Jobs</span>
                <Button
                  className="btn btn-light-outline"
                  onClick={() => handleShow("MoreFilterModal")}
                >
                  <svg
                    width="15"
                    height="15"
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
                  {/* <tbody>
                    {VisiblejobData.map((item) => (
                      <tr>
                        <td>
                          <Form.Check
                            className="inline-checkbox me-2_5"
                            name="group1"
                            type="checkbox"
                            onChange={() => handleMultiple(item)}
                            checked={activeIds.includes(item.uid) || closeIds.includes(item.uid)}
                          />
                          <span className="font-weight-600">
                            {item.job_title}
                          </span>
                        </td>
                        <td>{item?.job_location?.location_name}</td>
                        <td>{item.department.department_name}</td>
                        <td>{item.job_type}</td>
                        <td>{item.workplace_type}</td>
                        <td>{item.number_of_positions}</td>
                        <td>-</td>
                        <td className="avgscore">-</td>
                        <td>{item.posted_on ? item.posted_on : '-'}</td>
                        <td>{item.job_status}</td>
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
                              <Dropdown.Item href={""} onClick={()=>navigate(`/jobSummary/${item?.uid}`)}>
                                <img className="me-2" src={DropD_eye} alt="" />
                                View
                              </Dropdown.Item>
                              {(item.job_status == 'Application-Stopped' || item.job_status == 'Draft' || item.job_status == 'Active') && (
                                <Dropdown.Item href="#/action-2">
                                  <img className="me-2" src={DropD_edit} alt="" />
                                  Edit
                                </Dropdown.Item>
                              )}
                              <Dropdown.Item href={""} onClick={() => handleClone(item.uid)}>
                                <img className="me-2" src={DropD_copy} alt="" />
                                Clone
                              </Dropdown.Item>
                              {item.job_status == 'Active' && (
                                <>
                                  <Dropdown.Item href={""} onClick={() => handleCopy(item?.job_link)}>
                                    <img className="me-2" src={DropD_link} alt="" />
                                    Copy Link
                                  </Dropdown.Item>
                                  <Dropdown.Item href={""} onClick={handleEmailClick}>
                                    <img className="me-2" src={DropD_mail} alt="" />
                                    Invite
                                  </Dropdown.Item>
                                </>
                              )}
                              {(item.job_status == 'Application-Stopped' || item.job_status == 'Active') && (
                                <Dropdown.Item href={""} onClick={() => handleCommonEvent(item, "closed")}>
                                  <img
                                    className="me-2"
                                    src={DropD_check}
                                    alt=""
                                  />
                                  Close
                                </Dropdown.Item>
                              )}
                              {item.job_status == 'Application-Stopped' && (
                                <Dropdown.Item href={""} onClick={() => handleCommonEvent(item, "Active")}>
                                  <img
                                    className="me-2"
                                    src={DropD_pause}
                                    alt=""
                                  />
                                  Restart App.
                                </Dropdown.Item>
                              )}
                              {item.job_status == 'Active' && (
                                <Dropdown.Item href={""} onClick={() => handleCommonEvent(item, "Application-Stopped")}>
                                  <img
                                    className="me-2"
                                    src={DropD_pause}
                                    alt=""
                                  />
                                  Stop App.
                                </Dropdown.Item>
                              )}
                              {item.job_status == 'closed' && (
                                <Dropdown.Item href={""} onClick={() => handleCommonEvent(item, "Draft")}>
                                  <img
                                    className="me-2"
                                    src={DropD_pause}
                                    alt=""
                                  />
                                  Open
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody> */}
                  <tbody>
                    {VisiblejobData.map((item) => (
                      <tr>
                        <td>
                          <Form.Check
                            className="inline-checkbox me-2_5"
                            name="group1"
                            type="checkbox"
                            onChange={() => handleMultiple(item)}
                            checked={activeIds.includes(item.uid) || closeIds.includes(item.uid)}
                          />
                          <span className="font-weight-600" onClick={() => navigate(`/JobReview/${item?.uid}`)} style={{ cursor: "pointer" }}>
                            {item?.job_title}
                          </span>
                        </td>
                        <td>{item?.job_location?.location_name}</td>
                        <td>{item?.department}</td>
                        <td>{item?.job_type}</td>
                        <td>{item?.workplace_type}</td>
                        <td>{item?.number_of_positions}</td>
                        <td>-</td>
                        <td className="avgscore">-</td>
                        <td>{item?.posted_on ? item?.posted_on : '-'}</td>
                        <td>{item?.job_status}</td>
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
                              <Dropdown.Item href={""} onClick={() => navigate(`/jobSummary/${item?.uid}`)}>
                                <img className="me-2" src={DropD_eye} alt="" />
                                View
                              </Dropdown.Item>
                              {(item?.job_status == 'Application-Stopped' || item?.job_status == 'Draft' || item?.job_status == 'Active') && (
                                <Dropdown.Item href={""} onClick={() => {
                                  // navigate('/jobs', { state: item?.uid })
                                  // handleEditShow('createModal');
                                  getJobDetails(item?.uid)
                                }}>
                                  <img className="me-2" src={DropD_edit} alt="" />
                                  Edit
                                </Dropdown.Item>
                              )}
                              <Dropdown.Item href={""} onClick={() => handleClone(item.uid)}>
                                <img className="me-2" src={DropD_copy} alt="" />
                                Clone
                              </Dropdown.Item>
                              {item.job_status == 'Active' && (
                                <>
                                  <Dropdown.Item href={""} onClick={() => handleCopy(item?.job_link)}>
                                    <img className="me-2" src={DropD_link} alt="" />
                                    Copy Link
                                  </Dropdown.Item>
                                  <Dropdown.Item href={""} onClick={handleEmailClick}>
                                    <img className="me-2" src={DropD_mail} alt="" />
                                    Invite
                                  </Dropdown.Item>
                                </>
                              )}
                              {(item.job_status == 'Application-Stopped' || item.job_status == 'Active') && (
                                <Dropdown.Item href={""} onClick={() => {
                                  setModalText({
                                    showPopup: true,
                                    heading: `Do you wish to Proceed?`,
                                    body: `The jobs will be marked as closed, halting new applications and application assessments.`,
                                    state: 'closed',
                                    item: item
                                  })
                                  // handleCommonEvent(item, "closed")
                                }}>
                                  <img
                                    className="me-2"
                                    src={DropD_check}
                                    alt=""
                                  />
                                  Close
                                </Dropdown.Item>
                              )}
                              {item.job_status == 'Application-Stopped' && (
                                <Dropdown.Item href={""} onClick={() => {
                                  setModalText({
                                    showPopup: true,
                                    heading: `Do you wish to Proceed?`,
                                    body: `You will start receiving new applications for the jobs.`,
                                    state: 'Active',
                                    item: item
                                  })
                                  // handleCommonEvent(item, "Active")
                                }}>
                                  <img
                                    className="me-2"
                                    src={DropD_pause}
                                    alt=""
                                  />
                                  Restart App.
                                </Dropdown.Item>
                              )}
                              {item.job_status == 'Active' && (
                                <Dropdown.Item href={""} onClick={() => {
                                  setModalText({
                                    showPopup: true,
                                    heading: `Do you wish to Proceed?`,
                                    body: `You will no longer receive new applications for the jobs.`,
                                    state: 'Application-Stopped',
                                    item: item
                                  })
                                  // handleCommonEvent(item, "Application-Stopped")
                                }}>
                                  <img
                                    className="me-2"
                                    src={DropD_pause}
                                    alt=""
                                  />
                                  Stop App.
                                </Dropdown.Item>
                              )}
                              {item.job_status == 'closed' && (
                                <Dropdown.Item href={""} onClick={() => handleCommonEvent(item, "Draft")}>
                                  <img
                                    className="me-2"
                                    src={DropD_pause}
                                    alt=""
                                  />
                                  Open
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    {count < jobData.jobs.length && (
                      <tr>
                        <td colSpan={2}>
                          <Button
                            className="btn-light-outline"
                            onClick={handleLoadMore}
                          >
                            Load More
                          </Button>
                        </td>
                        <td colSpan={9} className="text-end pe-3">
                          <span className="pagination_count">
                            Showing {VisiblejobData.length} items
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
            filterAppliedCount={filterAppliedCount}
            handleClose={() => handleClose("MoreFilterModal")}
            setFilters={setFilters}
            filtersList={filtersList}
            handleApplyFilter={handleApplyFilter}
          />
          <CreateJobs
            show={modal.createModal}
            handleClose={() => handleClose("createModal")}
          />
          {editModal.createModal && (
            <UpdateJobs
              show={editModal.createModal}
              handleClose={() => handleClose1("createModal")}
              editData={data}
            />
          )}
          {modalText?.showPopup && (
            <CustomPopup show={modalText?.showPopup} handleClose={() => setModalText({ ...modalText, showPopup: false })} modalText={modalText} setModalText={setModalText} />
          )}
        </Container>

        {/* create job revised 
        <Modal 
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
        backdrop={false}
        className="jobrevised_mdl"
        > 
        <Modal.Header closeButton>
          <img src={logoIcon} className="me-4" />
          <Modal.Title>
            Sr. Developer - Python
            <span className="subtitle">Mumbai, Technology, Full-Time, Remote</span>
            <button type="button" className="edit-btnicon">
              <img src={Edit03} />
            </button>
          </Modal.Title>
          <button type="button" className="view-btnicon" style={{right:'65px'}}>
            <img src={Edit03} />
          </button>
        </Modal.Header>
        <Modal.Body className="bg-lightgray px-4">
          <div className="jobrvsd_head d-flex justify-content-between align-items-center">
            <h6>Job Summary</h6>
            <ul className="list-inline">
              <li>
                <a href="#"><img src={Applicants_mail}/>Invite Applicants</a>
              </li>
              <li>
                <a href="#"><img src={Downloadprimery}/>Download</a>
              </li>
            </ul>
          </div>
          <Card className="card-light mt-3">
            <Card.Body>
              <Card.Title>Company Information</Card.Title>
              <div className="compinfo_head">
                  <span className="complogo">
                    <img src={CompLogo}/>
                  </span>
                  <div className="compinfo-text">
                      <h6>Pepsico Corporation Limited, <span className="text-lightgray"> Gurgaon, India</span></h6>
                      <ul className="list-inline">
                        <li>https://www.pepsico.com/</li>
                        <li>Food and Beverage</li>
                        <li>Public Company</li>
                        <li>Over 5000 employees</li>
                      </ul>
                  </div>
              </div>
              <Card.Text className="mt-3">Morbi vestibulum quam ac condimentum scelerisque. Nunc efficitur diam ante, nec ultrices elit mollis non. Cras nec eleifend ante, id accumsan neque. Fusce in justo scelerisque, bibendum augue non, tempus risus. Praesent ut lorem vel nulla lobortis aliquam. 
Duis eget urna lobortis, lobortis ex nec, malesuada felis. Integer bibendum sagittis diam, at condimentum dui volutpat quis. Suspendisse augue libero, porta ut lobortis tempus, eleifend et enim. 
Aliquam leo nunc, mollis sed odio sed, porta mattis ex. Pellentesque a enim sed urna blandit feugiat sit amet finibus quam. Cras efficitur dignissim erat, eu bibendum velit placerat ac.</Card.Text>
            </Card.Body>
          </Card>
          <Row>
            <Col md={6}>
              <Card className="card-light mt-3">
                <Card.Body>
                  <Card.Title>Requirements</Card.Title>
                    <table className="reqinfo_table">
                      <tr>
                        <td>Salary</td>
                        <td><strong>$10,000 - 15,000 per Annum <img src={flagODanger}/></strong></td>
                        <td><span>Don’t Display, Non Negotiable</span></td>
                      </tr>
                      <tr>
                        <td>Target Hire Date</td>
                        <td><strong>Immediate</strong></td>
                        <td><span>will explore buy out option</span></td>
                      </tr>
                      <tr>
                        <td>Experience</td>
                        <td><strong>4 - 8 Years <img src={flagODanger}/></strong></td>
                        <td><span>Industries: Pharmaceutical, Engineering <br/>Roles: Supervisor, Operator, Team Leader, Shift In-charge</span></td>
                      </tr>
                      <tr>
                        <td>Language</td>
                        <td><strong>Hindi, English, Telugu</strong></td>
                        <td><span>will explore buy out option</span></td>
                      </tr>
                      <tr>
                        <td>Education</td>
                        <td><strong>Bachelors in Science, Mathematics</strong></td>
                        <td><span>Pharmaceutical, Chemical Engineering, Mechanical Engineering</span></td>
                      </tr>
                      <tr>
                        <td>Geography</td>
                        <td><strong>Hyderabad, Mumbai, Delhi</strong></td>
                        <td><span>will explore buy out option</span></td>
                      </tr>
                    </table>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="card-light mt-3">
                <Card.Body>
                  <Card.Title>Skills</Card.Title>
                   <ul className="skills_list">
                    <li><span>Productivity Tools</span><strong>Powerpoint, Excel</strong></li>
                    <li><span>Software Languages</span><strong>Java,Python<i className="fa fa-star text-primery ms-1"></i></strong></li>
                    <li><span>Art And Design</span><strong>Adobe Photoshop,Figma,<i className="fa fa-star text-primery ms-1"></i> CorelDRAW</strong></li>
                    <li><span>Productivity Tools</span><strong>Powerpoint, Excel</strong></li>
                   </ul>
                   <h6 className="text-base mt-4">Custom Questions</h6>
                   <ul className="customq_list">
                      <li>
                        <p>Are there any constraints or considerations we should know about, such as location, work hours, or travel?</p>
                        <Form>
                          <Form.Check 
                            type="checkbox"
                            id="custom-checkbox"
                            label="No"
                            checked
                            className="success-check"
                          />
                        </Form>
                      </li>
                      <li>
                        <p>How many companies have you changed in your career? <i className="fa fa-star text-primery ms-1"></i></p>
                        <Form>
                          <Form.Check 
                            type="checkbox"
                            id="custom-checkbox"
                            checked
                            label="Response 2,Response 4"
                            className="success-check"
                          />
                        </Form>
                      </li>
                   </ul>
                   
                   
                   <a href="#" className="btn-scroll">Scroll for more</a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card className="card-light mt-3 mb-5">
            <Card.Body>
              <Card.Title>Ideal Behaviour and Personalities</Card.Title>
               <div className="bsment_tag">
                    <h6>Behaviour Assessment</h6>
                    <div className="taglist">
                      <span className="bs_tag">Accuracy<i className="fa fa-star text-primery ms-1"></i></span>
                      <span className="bs_tag">Thoughtfulness</span>
                      <span className="bs_tag">Cooperativeness</span>
                      <span className="bs_tag">Self Motivation</span>
                      <span className="bs_tag">Friendliness<i className="fa fa-star text-primery ms-1"></i></span>
                      <span className="bs_tag">Patience</span>
                    </div>
               </div>
               <Row className="mt-3">
                <Col md={3}>
                  <div className="perlitymth-card">
                      <div className="perlitymth-head">
                        <span className="prtmth_icon"><img src={LeaderIcn}/></span>
                        <div className="prtmth_title">
                          <h6>Leader</h6>
                          <span>83%</span>
                        </div>
                      </div>
                      <div className="perlitymth-body">
                        <p className="m-0">They are in constant pursuit of innovative solutions and seek new horizons</p>
                      </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="perlitymth-card">
                      <div className="perlitymth-head">
                        <span className="prtmth_icon"><img src={InfluencerIcn}/></span>
                        <div className="prtmth_title">
                          <h6>Influencer</h6>
                          <span>83%</span>
                        </div>
                      </div>
                      <div className="perlitymth-body">
                        <p className="m-0">They are in constant pursuit of innovative solutions and seek new horizons</p>
                      </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="perlitymth-card">
                      <div className="perlitymth-head">
                        <span className="prtmth_icon"><img src={PioneerIcn}/></span>
                        <div className="prtmth_title">
                          <h6>Pioneer</h6>
                          <span>83%</span>
                        </div>
                      </div>
                      <div className="perlitymth-body">
                        <p className="m-0">They are in constant pursuit of innovative solutions and seek new horizons</p>
                      </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="perlitymth-card">
                      <div className="perlitymth-head">
                        <span className="prtmth_icon"><img src={AchieverIcn}/></span>
                        <div className="prtmth_title">
                          <h6>Achiever</h6>
                          <span>83%</span>
                        </div>
                      </div>
                      <div className="perlitymth-body">
                        <p className="m-0">They are in constant pursuit of innovative solutions and seek new horizons</p>
                      </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button className="me-3 btn btn-light">
            Edit Job
          </Button>
          <Button className="btn btn-primary">
            Post Job
          </Button>
        </Modal.Footer>
        </Modal>**/}

        {/* <Modal 
          show={modal.createModal}
          onHide={handleClose}
          animation={false}
          size="md"
          backdrop={false}
          className="indleffort-mdl"
        >
          <Modal.Header closeButton>
            <img src={leaderIcon}/>
            <Modal.Title>
              <span className="count">1</span>
              Leader
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-5 px-4">
            <h2 className="h2_title">
                <span className="count">1</span>
                Leader
            </h2>
            <div className="indleffort-text">
            <p>Leaders are practical, innovative, self-reliant, and ambitious individuals that are always pushing to make
things better. They are friendly, charming, and enthusiastic in casual circumstances but tend to be direct,
forthright, and assertive in formal setups. They like taking responsibility and taking credit for both wins and
losses, as long as they have control of the results. They do not shy away from taking command when needed
and may be impatient with the inefficiencies of others. They are sensitive to the needs of the team. They
find a balance between personal ambitions and group goals. They are very clear thinkers, make good
decisions and promote harmony in the team.</p>
            <ul>
              <li>
                <strong>Strengths</strong>
                <p>Driven, innovative, practical, self-reliant, leadership ability, confident, clear thinking</p>
              </li>
              <li>
                <strong>Uniqueness</strong>
                <p>Accommodating and inspiring; drive to make things better</p>
              </li>
              <li>
                <strong>Value to Org.</strong>
                <p>Persistently accomplishes goals with inclusivity of team</p>
              </li>
              <li>
                <strong>Challenges</strong>
                <p>Impatience when things don’t go a certain way; being managed</p>
              </li>
              <li>
                <strong>Motivations</strong>
                <p>Opportunity to get things done in their way; supporting the team</p>
              </li>
            </ul>
            </div>
          </Modal.Body>
        </Modal>*/}
      </div>
    </>
  );
};

export default JobsList;
