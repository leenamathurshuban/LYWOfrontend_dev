import React, { useEffect, useState } from 'react';
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    Form,
    InputGroup,
    Modal,
    Nav,
    Offcanvas,
    ProgressBar,
    Row,
    Tab,
    Table,
} from "react-bootstrap";
import Select from "react-select";
import { EvalationAssestDetails, EvalationAssestList, UpdateJobForm } from '../../services/provider';
import { removeToken } from '../../helpers/helper';
import { useNavigate } from 'react-router-dom';
import fileIcon from "../../images/icons/file_icon.svg";
import Dragdropicon from "../../images/icons/dragdrop-bullet.svg"
import quizIcon from "../../images/icons/quiz_icon.svg";
import faRingicon from "../../images/icons/Ring.svg";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
import RingSucess from "../../images/icons/ring_sucess.svg";
import DragDrop from "../../images/icons/dragdrop-bullet.svg";
import deleteDark from "../../images/icons/trash-Dark..svg";

const Evaluations = ({ show, handleClose, assetJob, setAssetJob, localAssetJob, setLocalAssetJob, id }) => {
    const [activeTab, setActiveTab] = useState("viewAll");
    const [EvaluationList, setEvaluationList] = useState([]);
    const [EvaluationListDetails, setEvaluationListDetails] = useState([]);
    const [SerachList, setSerachList] = useState("");
    const [activeKeys, setActiveKeys] = useState(["0-0"]);
    const [selectedSection, setSelectedSection] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadeMoreCount, setLoadeMoreCount] = useState(10);
    const [tabActive, setTabActive] = useState("evaluation");
    const navigate = useNavigate();
    const handleShow = () => { };
    const handleSelect = (key) => {
        setTabActive(key);
    };
    const PassCriteriaOption = [
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
        { value: "3", label: "Three" },
    ]

    const revaluationsListAPI = async (SerachQuestion) => {
        setIsLoading(true);
        // const url = `https://bittrend.shubansoftware.com/assets-api/assets-list-by-company-api/b6cadaab-69bc-4707-8656-2e8573e17547/?search=${SerachQuestion}&page=1&limit=10`;
        const url = `https://bittrend.shubansoftware.com/assets-api/assets-list-api/?page=1&limit=10&search=${SerachQuestion}`;
        try {
            const response = await EvalationAssestList(url);
            setIsLoading(false);
            setEvaluationList(response.data.response);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching company user list:", error);
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

    useEffect(() => {
        revaluationsListAPI();
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            revaluationsListAPI(SerachList);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [SerachList]);

    const handleTab = (tab) => {
        setActiveTab(tab);
    };

    const EvaluationListFilterData = EvaluationList.filter((item) => {
        if (activeTab == "viewAll") return true;
        return item.asset_type.toLowerCase() === activeTab.toLowerCase();
    });

    const handleLoadMore = () => {
        // setLoadeMoreCount(loadeMoreCount + 10);
    };
    const handleMultiple = (item) => {
        // const isUidNotPresent = !assetJob.some((val)=>val.uid === item?.uid)
        // if (isUidNotPresent) {
        //     setAssetJob([...assetJob, item])
        //     setLocalAssetJob([...localAssetJob, item])
        // } else {
        //     const filterArry = assetJob.filter((Val) => Val?.uid !== item?.uid);
        //     setAssetJob(filterArry)
        //     const filterlocal = localAssetJob.filter((Val) => Val?.uid !== item?.uid);
        //     setLocalAssetJob(filterlocal)
        // }
        const isUidNotPresent = !assetJob.some((val) => val.uid === item?.uid)
        if (isUidNotPresent) {
            const obj = item;
            obj.unSelect = true;
            setAssetJob([...assetJob, obj])
            // setLocalAssetJob([...localAssetJob, item])
        } else {
            const filterArry = assetJob.filter((Val) => Val?.uid !== item?.uid);
            setAssetJob(filterArry)
            // const filterlocal = localAssetJob.filter((Val) => Val?.uid !== item?.uid);
            // setLocalAssetJob(filterlocal)
        }
    }

    const handleSearch = (e) => {
        setSerachList(e.target.value);
    };
    const quizModal = async (uId) => {
        // console.log("uid--------",uId)
        handleShow();
        setIsLoading(true);
        // const url = `https://bittrend.shubansoftware.com/assets-api/assets-list-by-company-api/b6cadaab-69bc-4707-8656-2e8573e17547/?search=${SerachQuestion}&page=1&limit=10`;
        const url = `assets-api/assets-detail-api/${uId}/`;
        try {
            const response = await EvalationAssestDetails(url);
            setIsLoading(false);
            //  console.log("assest detailssss api------",response.data.response)
            setEvaluationListDetails(response.data.response);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching company user list:", error);
            if (
                error?.response?.status === 401 ||
                error?.response?.data?.detail?.includes(
                    "Given token not valid for any token type"
                )
            ) {
                console.log("Token expired, redirecting to login");
                removeToken();
                navigate("/loginwithpassword");
            }
        }
    };
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggedIndex === null) return;

        const updatedItems = [...assetJob];
        const draggedItem = updatedItems[draggedIndex];

        // Remove the dragged item from its original position
        updatedItems.splice(draggedIndex, 1);
        // Insert it at the new position
        updatedItems.splice(index, 0, draggedItem);

        setAssetJob(updatedItems);
        setDraggedIndex(null);
    };

    const handleDeleteRow = (value) => {
        const exixtRow = assetJob.filter((CVal) => CVal.uid !== value?.uid)
        setAssetJob(exixtRow)
    }

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();
            formdata.append("asset_job", JSON.stringify(assetJob.map((Val) => Val.uid)))
            const response = await UpdateJobForm(formdata, id)
            if (response?.data?.success) {
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(assetJob, localAssetJob)
    console.log(draggedIndex)
    console.log(assetJob)
    return (
        <Offcanvas
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
                <Tab.Container id="left-tabs-example1" activeKey={tabActive} onSelect={handleSelect}>
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
                                                <li
                                                    className={activeTab === "viewAll" ? "active" : ""}
                                                    onClick={() => handleTab("viewAll")}
                                                >
                                                    View all
                                                </li>
                                                <li
                                                    className={activeTab === "Quiz" ? "active" : ""}
                                                    onClick={() => handleTab("Quiz")}
                                                >
                                                    Quiz
                                                </li>
                                                <li
                                                    className={activeTab === "Assignment" ? "active" : ""}
                                                    onClick={() => handleTab("Assignment")}
                                                >
                                                    Assignment
                                                </li>
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
                                                        {EvaluationListFilterData.length > 0 ? (
                                                            EvaluationListFilterData.slice(0, loadeMoreCount).map(
                                                                (item) => (
                                                                    <tr>
                                                                        <td
                                                                            onClick={() => quizModal(item.uid)}
                                                                            style={{ cursor: "pointer" }}
                                                                        >
                                                                            <Form.Check
                                                                                className="custom-checkbox me-1"
                                                                                id='1'
                                                                                type="checkbox"
                                                                                onChange={() => handleMultiple(item)}
                                                                                checked={assetJob.some((Val) => Val.uid == item.uid)}
                                                                            />
                                                                            <span className="font-weight-600">
                                                                                {item.asset_title}
                                                                            </span>
                                                                        </td>
                                                                        <td><img className="me-1" src={item.asset_type == "Assignment" ? fileIcon : quizIcon} alt="" />{item.asset_type}</td>
                                                                        <td>{item.fixed_time ? item.fixed_time : "Untimed"}</td>
                                                                        <td>{item.pass_criteria}{item.avg_score} <img src={item.pass_criteria >= 60 ? RingSucess : faRingicon} className="ms-1" alt="" /></td>
                                                                        <td>{item.total_number_of_question}</td>
                                                                        <td><div className="d-flex align-items-center"><span>{item.pass_criteria}{item.pass_ratio}</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                                    </tr>
                                                                )
                                                            )
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="8" style={{ textAlign: "center" }}>
                                                                    No data found of this category
                                                                </td>
                                                            </tr>
                                                        )}
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
                                                                    Showing {EvaluationListFilterData.length} items
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
                                        {assetJob.length > 0 ? (
                                            assetJob.map((item, index) => (
                                                <tr>
                                                    <td>
                                                        <button className='drag-icon' style={{border: '0', marginRight: '4px'}} >
                                                            <img src={Dragdropicon} className='img-fluid' alt='Dragdropicon' />
                                                        </button>
                                                    </td>

                                                    {item?.unSelect && (
                                                        <td style={{ cursor: "pointer" }}>
                                                            <img src={DragDrop} alt="" draggable
                                                                onDragStart={() => handleDragStart(index)}
                                                                onDragOver={handleDragOver}
                                                                onDrop={() => handleDrop(index)}
                                                            />
                                                        </td>
                                                    )}
                                                    <td style={{ width: "30px" }}>{index + 1}</td>
                                                    <td>{item?.asset_title}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span>Pass Criteria</span>
                                                            {/* <Form.Select className="select-sm w-80 ms-2" value={item?.pass_criteria}>
                                                                <option value="" disabled hidden> 60%</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </Form.Select> */}
                                                            <Select
                                                                className=" w-120 ms-2 react_selectbox"
                                                                options={PassCriteriaOption}
                                                                value={PassCriteriaOption.find((opt) => opt.value === item?.pass_criteria)}
                                                                onChange={(e) => {
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span>Duration</span>
                                                            {/* <Form.Select className="select-sm w-80 ms-2" value={item?.fixed_time}>
                                                                <option value="" disabled hidden> 30mins</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </Form.Select> */}
                                                            <Select
                                                                className=" w-120 ms-2 react_selectbox"
                                                                options={PassCriteriaOption}
                                                                value={PassCriteriaOption.find((opt) => opt.value === item?.fixed_time)}
                                                                onChange={(e) => {
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                    {item?.unSelect && (
                                                        <td>
                                                            <button type="button" className="btn-transpant" onClick={() => handleDeleteRow(item)}><img src={deleteDark} alt="" /></button>
                                                        </td>
                                                    )}


                                                    <td>
                                                        <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                    </td>



                                                </tr>
                                            )))
                                            : (
                                                <tr>
                                                    <td colSpan="8" style={{ textAlign: "center" }}>
                                                        No data found of this category
                                                    </td>
                                                </tr>
                                            )}
                                        {/* {localAssetJob.map((item) => (
                                                <tr>
                                                    <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                    <td style={{ width: "30px" }}>1</td>
                                                    <td>{item?.asset_title}</td>
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
                                                        <button type="button" className="btn-transpant" onClick={()=>handleDeleteRow(item)}><img src={deleteDark} alt="" /></button>
                                                    </td>
                                                </tr>
                                            ))} */}
                                        {/* <tr>
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
                                        </tr> */}
                                    </Table>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Offcanvas.Body>
            <div className="offcanvas-footer text-end">
                <span className="me-4 font-sm">0/4</span>
                {tabActive === 'evaluation' && (
                    <Button variant="primary" onClick={() => setTabActive('order')}>
                        Select
                    </Button>
                )}
                {tabActive === 'order' && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                )}
            </div>
        </Offcanvas>
    )
}

export default Evaluations