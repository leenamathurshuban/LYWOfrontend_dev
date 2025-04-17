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
import { EvalationAssestDetails, EvalationAssestList, UpdateJobForm } from '../../services/provider';
import { removeToken } from '../../helpers/helper';
import { useNavigate } from 'react-router-dom';
import fileIcon from "../../images/icons/file_icon.svg";
import quizIcon from "../../images/icons/quiz_icon.svg";
import faRingicon from "../../images/icons/Ring.svg";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
import RingSucess from "../../images/icons/ring_sucess.svg";
import DragDrop from "../../images/icons/dragdrop-bullet.svg";
import deleteDark from "../../images/icons/trash-Dark..svg";

const CreateGroupModal = ({ show, handleClose, assetJob, setAssetJob, localAssetJob, setLocalAssetJob, id }) => {
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
                    Create New Group
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="add_evaluwarp">
                <Tab.Container id="left-tabs-example1" activeKey={tabActive} onSelect={handleSelect}>
                    <Row>
                        {/* <Col sm={12}>
                            <Nav variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="evaluation">Select Evaluation</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="order">Set order of Evaluation</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col> */}
                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="evaluation">
                                    <p className="base-text my-3">Group Title</p>
                                    <Card className="border-0 evaluations_data">
                                        <Card.Header className="px-0 pb-3">
                                            <Row>
                                                <Col md={10}>
                                                    <InputGroup className="defult_serachbox">
                                                        <Form.Control
                                                            placeholder="Group Title"
                                                            aria-label="Search"
                                                            aria-describedby="basic-addon1"
                                                        />
                                                    </InputGroup>
                                                    <Button variant="primary">
                                                        Create Group
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body className="p-0 mt-3">                                            
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
                                                                                
                                    </Table>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Offcanvas.Body>            
        </Offcanvas>
    )
}

export default CreateGroupModal