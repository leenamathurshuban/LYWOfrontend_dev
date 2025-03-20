import React, { useEffect, useState } from "react";
import {
    Container, Row, Col, Tab, Nav, Card, Form, Button, InputGroup, Table, Offcanvas, Accordion, ProgressBar
} from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import angleDown from "../../images/icons/angle-down-arrow.svg"
import EvaluaBtn from "../../images/icons/evalua_icon.svg"
import AutomatBtn from "../../images/icons/automations_icon.svg"
import stopBtn from "../../images/icons/pause-circle-16x16.svg"
import gridView from "../../images/icons/grid_icon.svg"
import listView from "../../images/icons/list_icon.svg"
import baseCheckbox from "../../images/icons/Checkbox_base.svg";
import User01Gray from "../../images/icons/user-01-gray.svg";
import filterLines from "../../images/icons/filter-lines.svg";
import fileIcon from "../../images/icons/file_icon.svg";
import faRingicon from "../../images/icons/Ring.svg";
import RingSucess from "../../images/icons/ring_sucess.svg";
import quizIcon from "../../images/icons/quiz_icon.svg";
import DragDrop from "../../images/icons/dragdrop-bullet.svg";
import deleteDark from "../../images/icons/trash-Dark..svg";
import { useParams } from "react-router-dom";
import { getJobDetailsApi } from "../../services/provider";
import Evaluations from "./Evaluations";
const JobReviewTest = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { id } = useParams();
    const [assetJob, setAssetJob] = useState([]);
    const [localAssetJob, setLocalAssetJob] = useState([]);
    const handleEvalutionModel = () => {
        setShow({
            modelEvalution: true
        })
    }
    const getJobDetails = async (id) => {
        const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-api/${id}/`;
        try {
            const response = await getJobDetailsApi(url);
            if (response?.data?.success) {
                if (Array.isArray(response?.data?.response?.asset_job)) {
                    setAssetJob(response?.data?.response?.asset_job?.map((Val) => Val?.uid))
                }
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        getJobDetails(id)
    }, [id])

    return (
        <>
            <Sidebar />
            <Header />
            {/* {isLoading && (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="ml-3" />
        </div>
      )} */}

            <div className="page-body ps-0">
                <Container fluid className="bg-white">
                    <Row>
                        <Col md={6} className="d-flex justify-content-between align-items-center">
                            <h6 class="my-3 pagetitle"><i class="fa fa-suitcase text-primery me-2"></i>Java Backend Developer<img src={angleDown} className="ms-2 w-14" /></h6>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end align-items-center">
                            <button type="button" onClick={handleShow} className="icon_btnlink btn btn-primary"><img src={EvaluaBtn} className="me-1" />Evaluations</button>
                            <button type="button" className="icon_btnlink btn btn-primary"><img src={AutomatBtn} className="me-1" />Automations</button>
                            <button type="button" className="icon_btnlink btn btn-primary"><img src={stopBtn} className="me-1" />Stop Applications</button>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="bg-white">
                            <Col md={6}>
                                <Nav variant="pills" className="tab-underline">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first"><i class="far fa-folder"></i>Applications</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second"><i class="fa fa-bar-chart"></i>Insights</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third"><i class="far fa-commenting"></i>Review</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                            </Col>
                            <Col md={6} className="text-end">
                                <button className="btn btn-traspant"><img src={gridView} /></button>
                                <button className="btn btn-traspant"><img src={listView} /></button>
                            </Col>
                        </Row>
                        <Row >
                            <Tab.Content className="p-3">
                                <Tab.Pane eventKey="first">
                                    <Row className="hori_scroll">
                                        <Col md={2}>
                                            <Card className="status_cardpanel">
                                                <div className="card-header">
                                                    <h5>Application <span className="count">250</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <div className="sts_databox incopmlate">
                                                        <h6>Incomplete<span className="count">100</span></h6>
                                                    </div>
                                                    <div className="sts_databox excellent">
                                                        <h6>Excellent<span className="count">40</span></h6>
                                                    </div>
                                                    <div className="sts_databox good">
                                                        <h6>Good<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox average">
                                                        <h6>Average<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox baverage">
                                                        <h6>Below Average<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox hold">
                                                        <h6>On Hold<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox rejected">
                                                        <h6>Rejected<span className="count">20</span></h6>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={2}>
                                            <Card className="status_cardpanel">
                                                <div className="card-header">
                                                    <h5>Behaviour <span className="count">150</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <div className="sts_databox incopmlate">
                                                        <h6>Incomplete<span className="count">100</span></h6>
                                                    </div>
                                                    <div className="sts_databox excellent">
                                                        <h6>Excellent<span className="count">40</span></h6>
                                                    </div>
                                                    <div className="sts_databox good">
                                                        <h6>Good<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox average">
                                                        <h6>Average<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox baverage">
                                                        <h6>Below Average<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox hold">
                                                        <h6>On Hold<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox rejected">
                                                        <h6>Rejected<span className="count">20</span></h6>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={2}>
                                            <Card className="status_cardpanel">
                                                <div className="card-header">
                                                    <h5>Tech-Quiz1 <span className="count">100</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <div className="text-center"><button type="button" className="btn btn-link mb-3"><i className="fa fa-plus me-2"></i></button></div>
                                                    <div className="sts_databox incopmlate">
                                                        <h6>Incomplete<span className="count">100</span></h6>
                                                    </div>
                                                    <div className="sts_databox excellent">
                                                        <h6>Excellent<span className="count">40</span></h6>
                                                    </div>
                                                    <div className="sts_databox good">
                                                        <h6>Good<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox average">
                                                        <h6>Average<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox baverage">
                                                        <h6>Below Average<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox hold">
                                                        <h6>On Hold<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox rejected">
                                                        <h6>Rejected<span className="count">20</span></h6>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={3}>
                                            <Card className="status_cardpanel screening text-center">
                                                <div className="card-header">
                                                    <h5>Screening <span className="count">150</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <button type="button" onClick={handleShow} className="btn btn-link mb-3"><i className="fa fa-plus me-2"></i>Create a New Group</button>
                                                    <div className="sts_databoxlg incopmlate">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Incomplete<span className="count">100</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg excellent">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Excellent<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg good">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Good<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg average">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Average<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg baverage">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Below Average<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg hold">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>On Hold<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg rejected">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Rejected<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={2}>
                                            <Card className="status_cardpanel">
                                                <div className="card-header">
                                                    <h5>Assignment 1 <span className="count">100</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <div className="text-center"><button type="button" className="btn btn-link mb-3"><i className="fa fa-plus me-2"></i></button></div>
                                                    <div className="sts_databox incopmlate">
                                                        <h6>Incomplete<span className="count">100</span></h6>
                                                    </div>
                                                    <div className="sts_databox excellent">
                                                        <h6>Excellent<span className="count">40</span></h6>
                                                    </div>
                                                    <div className="sts_databox good">
                                                        <h6>Good<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox average">
                                                        <h6>Average<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox baverage">
                                                        <h6>Below Average<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox hold">
                                                        <h6>On Hold<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox rejected">
                                                        <h6>Rejected<span className="count">20</span></h6>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={3}>
                                            <Card className="status_cardpanel">
                                                <Card.Body className="text-center d-flex align-items-center justify-content-center flex-column">
                                                    <button type="button" className="btn btn-light-primery" onClick={handleShow}><i className="fa fa-plus me-2"></i>Add Evaluation</button>
                                                    <button type="button" className="btn btn-white mt-2"><i className="fa fa-plus me-2"></i>Finalise Selection</button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Card className="shadow-sm border-0 evaluations_data mt-4 rounded overflow-hidden">
                                        <Card.Header className="py-2">
                                            <Row>
                                                <Col md={6} className="d-flex">
                                                    <Button
                                                        className="btn btn-light-outline me-3"
                                                        onClick={handleShow}
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
                                                    <div className="d-inline">
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
                                                    </div>
                                                </Col>
                                                <Col md={6} className="d-flex justify-content-end align-items-center">
                                                    <Button className="icon_btnlink"><i className="far fa-check-circle me-2 text-primery"></i>Shortlist</Button>
                                                    <Button className="icon_btnlink"><i className="far fa-times-circle me-2 text-primery"></i>Reject</Button>
                                                    <Button className="icon_btnlink"><i className="fa fa-ban me-2 text-primery"></i>Hold</Button>
                                                    <Button className="icon_btnlink"><i className="fa fa-download me-2 text-primery"></i>Download</Button>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body className="pt-2">
                                            <div className="applid-filters">
                                                <span className="filter-tag">Filter 1 <i class="fa fa-times" aria-hidden="true"></i></span>
                                                <span className="filter-tag">Filter 2 <i class="fa fa-times" aria-hidden="true"></i></span>
                                                <span className="filter-tag">Filter 3 <i class="fa fa-times" aria-hidden="true"></i></span>
                                                <span className="filter-tag">Filter 4 <i class="fa fa-times" aria-hidden="true"></i></span>
                                            </div>
                                            <div className="elv_datatable jobreview_data">
                                                <Table striped className="m-0">
                                                    <thead>
                                                        <tr>
                                                            <th colSpan={1}>&nbsp;</th>
                                                            <th colSpan={5} className="border-b">
                                                                <div className="d-flex align-items-end justify-content-between">
                                                                    <strong>Details</strong><button type="button" className="btn btn-link font-sm pb-0"><i class="fas fa-plus-circle"></i></button>
                                                                </div>
                                                            </th>
                                                            <th colSpan={2} className="border-b"><strong>LYWO Score</strong></th>
                                                            <th colSpan={5} className="border-b"><strong>Progress</strong></th>
                                                            <th colSpan={2} className="border-b"><strong>Status</strong></th>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                <img src={baseCheckbox} alt="" className="me-2 mw-16" />
                                                                Candidate Name
                                                            </th>
                                                            <th>Education</th>
                                                            <th>Industry</th>
                                                            <th>Experience</th>
                                                            <th>Joining Date</th>
                                                            <th>Location</th>
                                                            <th>Match</th>
                                                            <th>Personality</th>
                                                            <th>Step 3</th>
                                                            <th>Step 4</th>
                                                            <th>Step 5</th>
                                                            <th>Step 6</th>
                                                            <th>Score</th>
                                                            <th>Tag</th>
                                                            <th>Decision</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag inactive"><i class="fa fa-minus"></i> Inactive</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>60%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Revisit</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag active"><i class="far fa-check-circle"></i> Active</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>80%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag rejected"><i class="far fa-times-circle"></i> Rejected</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag hold"><i class="fa fa-ban"></i> On Hold</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag Pending"><i class="far fa-circle"></i> Pending</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag shortlisted"><i class="fa fa-check-circle"></i> Shortlisted</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag Pending"><i class="far fa-circle"></i> Pending</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag hold"><i class="fa fa-ban"></i> On Hold</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag hold"><i class="fa fa-ban"></i> On Hold</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag Pending"><i class="far fa-circle"></i> Pending</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Check
                                                                    className="inline-checkbox me-2_5"
                                                                    name="group1"
                                                                    type="checkbox"

                                                                />
                                                                <span className="font-weight-600">
                                                                    Sandeep Kattamuri
                                                                </span>
                                                            </td>
                                                            <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                            <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                            <td>5 Years</td>
                                                            <td>15/09/2024</td>
                                                            <td>Hyderabad</td>
                                                            <td>40%</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <img src={User01Gray} />
                                                                    <select className="select-transpant">
                                                                        <option>76%</option>
                                                                        <option>70%</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>Invited</td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td><span className="text-elipe-40">Under Review</span></td>
                                                            <td>76%</td>
                                                            <td>
                                                                <span className="tag tag-lightprimery">Recall</span>
                                                            </td>
                                                            <td>
                                                                <span className="dic_tag shortlisted"><i class="fa fa-check-circle"></i> Shortlisted</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colspan="2"><button type="button" class="btn-light-outline btn btn-primary">Load More</button></td>
                                                            <td colspan="13" class="text-end pe-3"><span class="pagination_count">Showing 10 items</span></td>
                                                        </tr>
                                                    </tfoot>
                                                </Table>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="third">Second tab third</Tab.Pane>
                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>

            {/*======MORE FILTER======
            <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop={false}
                placement="end"
                className="shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={filterLines} alt="" />
                        More Filters
                    </Offcanvas.Title>
                    <span className="applied_count">Applied (2)</span>
                </Offcanvas.Header>
                <Offcanvas.Body className="filter_warp">
                    <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>
                        <div className="filter_item">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Match</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <ul className="filter_itemlist">
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="1"
                                                    type="checkbox"
                                                    label="0% - 50%"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="2"
                                                    type="checkbox"
                                                    label="50% - 70%"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="3"
                                                    type="checkbox"
                                                    label="More than 70%"
                                                />
                                            </li>
                                        </ul>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                        <div className="filter_item">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Personality</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <ul className="filter_itemlist">
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="leader"
                                                    type="checkbox"
                                                    label="Leader"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="influencer2"
                                                    type="checkbox"
                                                    label="Influencer"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="team"
                                                    type="checkbox"
                                                    label="Team Player"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="perfectionist"
                                                    type="checkbox"
                                                    label="Perfectionist"
                                                />
                                            </li>
                                        </ul>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                        <div className="filter_item">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Status</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <ul className="filter_itemlist">
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="4"
                                                    type="checkbox"
                                                    label="Shortlisted"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="5"
                                                    type="checkbox"
                                                    label="On Hold"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="6"
                                                    type="checkbox"
                                                    label="Rejected"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="7"
                                                    type="checkbox"
                                                    label="Review Pending"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="8"
                                                    type="checkbox"
                                                    label="Reminder Sent"
                                                />
                                            </li>
                                        </ul>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                    </Accordion>
                </Offcanvas.Body>
                <div className="offcanvas-footer text-end">
                    <Button
                        variant="light"
                        className="me-3"
                    >
                        Clear All
                    </Button>
                    <Button onClick={handleClose} variant="primary">
                        Apply
                    </Button>
                </div>
            </Offcanvas>*/}

            {/*======New Group======
            <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop={false}
                placement="end"
                className="newgroup_drawer lg-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <span className="font-weight-400">New Group</span> - Screening
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="filter_warp">
                    <Form className="row">
                        <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
                            <Form.Label>Group Title</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Group Title"
                            name="grouptitle"
                            />
                        
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
                            <Form.Label>Add Filters</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Type here to search"
                            name="typehere"
                            />
                            <div className="taglist">
                                <span className="tag-gary">Education <i className="fa fa-times"></i></span>
                                <span className="tag-gary">Experience <i className="fa fa-times"></i></span>
                                <span className="tag-gary">Target Hire <i className="fa fa-times"></i></span>
                                <span className="tag-gary">Preferred locations <i className="fa fa-times"></i></span>
                            </div>
                        </Form.Group>
                        <Col md={12}>
                            <Form.Label>Filters</Form.Label>
                            <div className="border-1 p-3 rounded">
                                <Row>
                                    <Form.Group className="col-md-6 mb-2" controlId="jobTitle">
                                        <Form.Label>Education</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Education</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 mb-2" controlId="jobTitle">
                                        <Form.Label>Target hire date</Form.Label>
                                        <Form.Control
                                        type="date"
                                        placeholder="05/10/2024"
                                        name="targetdate"
                                        />
                                    
                                    </Form.Group>
                                    <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
                                        <Form.Label>Experience</Form.Label>
                                    </Form.Group>
                                </Row>
                            </div>
                        </Col>
                    </Form>
                </Offcanvas.Body>
                <div className="offcanvas-footer text-end">
                    <Button
                        variant="light"
                        className="me-3"
                    >
                        Clear All
                    </Button>
                    <Button onClick={handleClose} variant="primary">
                        Create Group
                    </Button>
                </div>
            </Offcanvas>*/}

            {/*======Evaluations======*/}
            {/* <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop={false}
                placement="end"
                className="evaluations_drawer lg-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Evaluations
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="add_evaluwarp">
                    <Tab.Container id="left-tabs-example1" defaultActiveKey="evaluation">
                        <Row>
                            <Col sm={12}>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="evaluation">Select Evaluation</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="order">Set order of Evaluation</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="evaluation">
                                        <p className="base-text my-3">Evaluations have not been added. You can choose up to 4 evaluations from the list below for this position</p>
                                        <Card className="border-0 evaluations_data">
                                            <Card.Header className="px-0 pb-3">
                                                <Row>
                                                    <Col md={5}>
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
                                                                placeholder="Search"
                                                                aria-label="Search"
                                                                aria-describedby="basic-addon1"
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </Card.Header>
                                            <Card.Body className="p-0 mt-3">
                                                <ul class="head_filterlist">
                                                    <li class="active">View all</li>
                                                    <li class="">Quiz</li>
                                                    <li class="">Assignment</li>
                                                </ul>
                                                <div className="elv_datatable shadow-none">
                                                    <Table striped className="m-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Evaluation Title</th>
                                                                <th>Type</th>
                                                                <th>Duration</th>
                                                                <th>Avg. Score</th>
                                                                <th>Questions</th>
                                                                <th>Pass Ratio</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Pre-interview round for creative director</span>
                                                                </td>
                                                                <td><img className="me-1" src={fileIcon} alt="" />Assignment</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={faRingicon} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Quiz for Backend Developer</span>
                                                                </td>
                                                                <td><img className="me-1" src={quizIcon} alt="" />Quiz</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={faRingicon} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Assignment for Figma Designer</span>
                                                                </td>
                                                                <td><img className="me-1" src={quizIcon} alt="" />Quiz</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={RingSucess} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="success" now={60} /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Pre-interview round for creative director</span>
                                                                </td>
                                                                <td><img className="me-1" src={fileIcon} alt="" />Assignment</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={faRingicon} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Pre-interview round for creative director</span>
                                                                </td>
                                                                <td><img className="me-1" src={fileIcon} alt="" />Assignment</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={faRingicon} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    <Button
                                                                        className="btn-light-outline"
                                                                    >
                                                                        Load More
                                                                    </Button>
                                                                </td>
                                                                <td colSpan={4} className="text-end pe-3">
                                                                    <span className="pagination_count">
                                                                        Showing 10 items
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </Table>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="order">
                                        <p className="base-text my-3">Drag and drop to reorder assignments</p>
                                        <Table className="m-0 evelu_order">
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>1</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>2</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>3</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>4</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>5</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                        </Table>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Offcanvas.Body>
                <div className="offcanvas-footer text-end">
                    <span className="me-4 font-sm">0/4</span>
                    <Button onClick={handleClose} variant="primary">
                        Select
                    </Button>
                </div>
            </Offcanvas> */}
            <Evaluations
                show={show}
                handleClose={handleClose}
                assetJob={assetJob}
                setAssetJob={setAssetJob}
                localAssetJob={localAssetJob}
                setLocalAssetJob={setLocalAssetJob}
                id={id}
            />
        </>
    );
};

export default JobReviewTest;
