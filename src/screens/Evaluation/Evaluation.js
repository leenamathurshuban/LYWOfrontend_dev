import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Nav,
  ProgressBar,
  Row,
  Spinner,
  Tab,
  Table,
} from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import faRingicon from "../../images/icons/Ring.svg";
import checkVerified from "../../images/icons/check-verified-02.svg";
import clockStopwatch from "../../images/icons/clock-stopwatch.svg";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
import expandIcon from "../../images/icons/expand-01.svg";
import eyePrimery from "../../images/icons/eye_icon_primery.svg";
import fileIcon from "../../images/icons/file_icon.svg";
import listQuestions from "../../images/icons/list-question.svg";
import mcqIcon from "../../images/icons/mcq_icon.png";
import quizIcon from "../../images/icons/quiz_icon.svg";
import logoIcon from "../../images/logo_icon.png";
import {
  EvalationAssestDetails,
  EvalationAssestList,
} from "../../services/provider";
import sectionIcon from "../../images/icons/sections_icon.svg";
import questionIcon from "../../images/icons/questions_icon.svg";
import mandatoryIcon from "../../images/icons/mandatory_icon.svg";
import timerIcon from "../../images/icons/timer_icon.svg";
import saveProssIcon from "../../images/icons/save_progress.svg";
import ngtscoringIcon from "../../images/icons/negative_scoring.svg";
import belltedArrow from "../../images/icons/bullt_arrow.svg";
import attachmentPin from "../../images/icons/attachment_pin.svg";
import videoRecoder from "../../images/icons/video-recorder.svg";
import CollapsedButton from "../../images/icons/CollapsedButton.svg";
import NotAllowed from "../../images/icons/NotAllowed.svg";

import { useNavigate } from "react-router-dom";
import { removeToken } from "../../helpers/helper";

const Evalation = () => {
  const [show, setShow] = useState(false);
  const [showinstruction, setShowinstruction] = useState(false);
  const handleInstructionClose = () => setShowinstruction(false);
  const handleInstructionShow = () => setShowinstruction(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [activeKeys, setActiveKeys] = useState([]);
  const [loadeMoreCount, setLoadeMoreCount] = useState(10);

  //List state
  const [activeTab, setActiveTab] = useState("viewAll");
  const [EvaluationList, setEvaluationList] = useState([]);
  const [EvaluationListDetails, setEvaluationListDetails] = useState([]);
  const [SerachList, setSerachList] = useState("");
  // const [activeItem, setActiveItem] = useState([]);

  const accordionItems = [
    {
      id: "0",
      header: "How many companies have you changed in your career?",
      body: "Content for item 1",
    },
    {
      id: "1",
      header: "How many companies have you changed in your career?",
      body: "Content for item 2",
    },
    {
      id: "2",
      header: "How many companies have you changed in your career?",
      body: "Content for item 3",
    },
    {
      id: "3",
      header: "How many companies have you changed in your career?",
      body: "Content for item 3",
    },
    {
      id: "4",
      header: "How many companies have you changed in your career?",
      body: "Content for item 3",
    },
    {
      id: "5",
      header: "How many companies have you changed in your career?",
      body: "Content for item 3",
    },
    {
      id: "6",
      header: "How many companies have you changed in your career?",
      body: "Content for item 3",
    },
    {
      id: "7",
      header: "How many companies have you changed in your career?",
      body: "Content for item 3",
    },
  ];

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
    setLoadeMoreCount(loadeMoreCount + 10);
  };

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

  const getPosition = (answer) => {
    const cleanAnswer = answer.replace(/['"]/g, " ").trim();
    const position =
      EvaluationListDetails[0].section_asset[0].question_section[0]?.question_option.part1.findIndex(
        (item) => item.includes(cleanAnswer)
      ) + 1;

    return position;
  };

  const handleToggle = (id) => {
    if (activeKeys.includes(id)) {
      setActiveKeys((prevActiveKeys) =>
        prevActiveKeys.filter((key) => key !== id)
      );
    } else {
      setActiveKeys((prevActiveKeys) => [...prevActiveKeys, id]);
    }
  };

  const handleListItemClick = (id) => {
    const element = document.getElementById(`accordion-item-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
// Scroll to the top of the page
// window.scrollTo({ top: 0, behavior: 'smooth' });

    handleToggle(id);
  };

  const handleToggleExpandCollapse = () => {
    const totalItems = EvaluationListDetails?.[0]?.section_asset.reduce(
      (acc, section) => acc + section.question_section.length + 1, // +1 to include the section header
      0
    );

    if (activeKeys.length === totalItems) {
      setActiveKeys([]); // Collapse all
    } else {
      const keys = [];

      EvaluationListDetails?.[0]?.section_asset.forEach(
        (section, sectionIndex) => {
          keys.push(`${sectionIndex}`);
          section.question_section.forEach((_, questionIndex) => {
            keys.push(`${sectionIndex}-${questionIndex}`);
          });
        }
      );

      setActiveKeys(keys); // Expand all
    }
  };

  return (
    <>
      <Sidebar />
      <Header />
      <div className="page-body">
        {isLoading && (
          <div className="loader-overlay">
            <Spinner animation="border" role="status" className="ml-3" />
          </div>
        )}
        <Container fluid>
          <Row>
            <Col md={12}>
              <h4 className="my-3 pagetitle">Evaluations</h4>
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
              <ul className="head_filterlist">
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
              <div className="elv_datatable">
                <Table striped className="m-0">
                  <thead>
                    <tr>
                      <th>Evaluation Title</th>
                      <th>Type</th>
                      <th>Duration</th>
                      <th>Pass %</th>
                      <th>Jobs</th>
                      <th>Questions</th>
                      <th>Pass Ratio</th>
                      <th>Avg. Score</th>
                      <th style={{ width: "72px" }}></th>
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
                              <span className="font-weight-600">
                                {item.asset_title}
                              </span>
                            </td>
                            <td>
                              <img
                                src={
                                  item.asset_type == "Assignment"
                                    ? fileIcon
                                    : quizIcon
                                }
                                className="me-1"
                                style={{ width: "16px" }}
                              />
                              {item.asset_type}
                            </td>
                            <td>
                              {item.fixed_time ? item.fixed_time : "Untimed"}
                            </td>
                            <td>{item.pass_criteria}</td>
                            <td>20 Active of 200</td>
                            <td>{item.total_number_of_question}</td>
                            <td>
                              <div className="passratio">
                                {item.pass_ratio}
                                <ProgressBar variant="warning" now={60} />
                              </div>
                            </td>
                            <td className="avgscore">
                              {item.avg_score}
                              <img src={faRingicon} />
                            </td>
                            <td className="action" style={{ width: "72px" }}>
                              <Dropdown className="action_dropdown">
                                <Dropdown.Toggle
                                  variant="success"
                                  id="dropdown-basic"
                                  className="btn-transpant"
                                >
                                  <img src={threeDots} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => quizModal(item.uid)}
                                  >
                                    Preview
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">
                                    Print
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">
                                    Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
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
                    {loadeMoreCount < EvaluationList.length && (
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
        </Container>
      </div>

      {EvaluationListDetails.map((item) => (
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          size="lg"
          className="cmprofile_mdl quizDev_model"
        >
          <Modal.Header closeButton>
            <Col md={4}>
              <Modal.Title>
                <img src={logoIcon} className="me-4" />
                {item.asset_title}
              </Modal.Title>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <p className="m-0 font-13">
                <span className="font-weight-600 me-2">100%</span>completed
              </p>
              <ProgressBar
                className="ms-3"
                style={{ width: "215px", height: "8px" }}
                now={100}
              />
            </Col>
            <Col md={4} className="score_panel">
              <ul>
                <li>
                  <span className="outline_scorebtn">
                    <img src={listQuestions} />
                    {item.total_score}
                  </span>
                  <p className="text-muted font-sm m-0">Total Score</p>
                </li>
                <li>
                  <span className="outline_scorebtn">
                    <img src={clockStopwatch} />
                    {item.fixed_time}
                  </span>
                  <p className="text-muted font-sm m-0">Duration</p>
                </li>
                <li>
                  <span className="outline_scorebtn">
                    <img src={checkVerified} />
                    {item.pass_criteria}
                  </span>
                  <p className="text-muted font-sm m-0">Pass Criteria</p>
                </li>

                <li onClick={handleToggleExpandCollapse}>
                  <span className="outline_scorebtn">
                    {activeKeys.length > 2 ? <img src={CollapsedButton} className="m-0" /> : <img src={expandIcon} className="m-0" />}
                    
                  </span>

                  <p className="text-muted font-sm m-0">
                    {activeKeys.length > 2 ? "Collapse" : "Expand"}
                  </p>
                </li>

                <li>
                  <Button variant="link" className="ms-5">
                    <img src={eyePrimery} />
                  </Button>
                </li>
              </ul>
            </Col>
          </Modal.Header>
          <Modal.Body className="p-0">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row className="justify-content-center">
                <Col md={3} lg={2} className="queLeft_panel pe-0">
                  <div className="p-3">
                    <Form.Select
                      aria-label="Default select example"
                      className="h-36"
                    >
                      <option>Show All</option>
                      {EvaluationListDetails[0].section_asset.map((item) => (
                        <option value="1">{item.section_title}</option>
                      ))}
                    </Form.Select>
                  </div>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link
                      //href="#qes_section02"
                      // eventKey="second"
                      >
                        {EvaluationListDetails[0].section_asset.map(
                          (item, sectionIndex) => (
                            <>
                              <h5>{item.section_title}</h5>
                              <p>{item.total_number_of_question} Q’s{" "}
                              {item.total_questions_point} points ~
                              {item.total_question_time}
                              {item?.section_pass_criteria ?  item?.section_pass_criteria : null}
                              </p>

                      
                              <ul className="qs_numlist">
                                {item.question_section.map(
                                  (quesItem, quesIndex) => (
                                    <li
                                      key={quesItem.id}
                                      style={{ cursor: "pointer" }}
                                      // onClick={() =>
                                      //   handleListItemClick(quesItem.id)

                                      // }
                                      onClick={() =>
                                        handleListItemClick(
                                          // `${sectionIndex}-${quesIndex}`
                                          `${quesIndex}-${sectionIndex}`
                                        )
                                      }
                                    >
                                      <span className="qs_count">
                                        {" "}
                                        {quesIndex + 1}
                                      </span>



                                    </li>
                                  )
                                )}
                              </ul>
                            </>
                          )
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col md={6} lg={8} className="queMain_panel">
                  <div className="que_mainsection">
                    {EvaluationListDetails[0].section_asset.map(
                      (item, quesIndex) => (
                        <div 
                       // id="qes_section01" 
                        className="qes_section01 mb-4">
                          <div
                            className={
                              activeKeys.length > 0
                                ? "que_head"
                                : "que_head ellipsis"
                            }
                          >
                             
                            <div className="d-flex justify-content-between mb-2">
                              <h6> {item.section_title}</h6>
                              {/* <h6>{quesIndex + 1} {item.section_title}</h6> */}
                             

                              <span>
                                Questions 
                                <strong className="font-weight-600 ms-1">
                                  {item.total_number_of_question}
                                </strong>
                              </span>
                            </div>
                            <p className="text-sm">
                              {item.section_description}
                            </p>
                            {/* <strong className="qus_number">1{item.id}</strong> */}
                            <strong className="qus_number">{quesIndex + 1}</strong>
                          </div>
                          <Accordion
                            className="quetions_list mt-4"
                            activeKey={activeKeys}
                          >
                            {item.question_section.map((item, sectionIndex) => (
                              <Accordion.Item
                                id={`accordion-item-${item.id}`}
                                eventKey={`${sectionIndex}-${quesIndex}`}
                                key={quesIndex}
                              >
                                <Accordion.Header
                                  onClick={() =>
                                    handleToggle(`${sectionIndex}-${quesIndex}`)
                                  }
                                >
                                  <span
                                    className={item.is_mandatory && "question"}
                                  >
                                    {item.question_title}
                                  </span>{" "}
                                  <span className="que_points">
                                    {item.question_points} points
                                    <img src={mcqIcon} />
                                  </span>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {item.quiz_type === "MCQ-Multi" && (
                                    <ul className="que_options">
                                      {item.question_option.part1?.map(
                                        (option, index) => {
                                          const isChecked =
                                            item.questions_answer.some(
                                              (answer) =>
                                                answer.replace(/'/g, "") ===
                                                option
                                            );

                                          return (
                                            <li key={index}>
                                              <Form.Check
                                                type="radio"
                                                id={`custom-radio${index + 1}`}
                                                label={option}
                                                checked={isChecked}
                                              />
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  )}

                                  {item.quiz_type === "MCQ" && (
                                    <ul className="que_options">
                                      {item.question_option.part1?.map(
                                        (option, index) => {
                                          const isChecked =
                                            item.questions_answer.some(
                                              (answer) =>
                                                answer.replace(/'/g, "") ===
                                                option
                                            );

                                          return (
                                            <li key={index}>
                                              <Form.Check
                                                type="radio"
                                                id={`custom-radio${index + 1}`}
                                                label={option}
                                                checked={isChecked}
                                              />
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  )}

                                  {item.quiz_type === "Match" && (
                                    <ol className="qus_crossed">
                                      {item?.question_option.part1?.map(
                                        (data, index) => {
                                          const correctCapital =
                                            item?.questions_answer[index]
                                              ?.replace("'", "")
                                              ?.replace("'", "");

                                          return (
                                            <li key={index}>
                                              <div className="crossd_answarp">
                                                <span className="crossd_ans">
                                                  {data}
                                                </span>
                                                <img
                                                  src={belltedArrow}
                                                  alt=""
                                                />
                                                <span className="crossd_ans">
                                                  {correctCapital}
                                                </span>
                                              </div>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ol>
                                  )}

                                  {item.quiz_type === "Arrange" && (
                                    <ul className="qus_numbered">
                                      {item.questions_answer.map(
                                        (answer, index) => (
                                          <li key={index}>
                                            <div className="crossd_answarp">
                                              <span className="option_count">
                                                {getPosition(answer)}
                                              </span>
                                              <span>{answer}</span>
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}

                                  {item.assignment_type ==
                                  "Text-Video-Mandatory" ? (
                                    <>
                                      <div className="que_attachment me-2">
                                        <h6>
                                          <img src={fileIcon} alt="" />
                                          Text
                                          <span className="text-danger">*</span>
                                        </h6>
                                        <p className="text-muted">
                                          Max 3,000 Words
                                        </p>
                                      </div>

                                      <div className="que_attachment me-2">
                                        <h6>
                                          <img src={videoRecoder} alt="" />
                                          Video
                                          <span className="text-danger">*</span>
                                          <span className="text-muted font-light">
                                            (Record Online)
                                          </span>
                                        </h6>
                                        <p className="text-muted">
                                          5 - 10 mins
                                        </p>
                                      </div>
                                      <div className="accordion_footer">
                                        <p>{item.question_points} Point</p>
                                        {item.is_random && (
                                          <Form.Check
                                            type="checkbox"
                                            id="custom-checkbox"
                                            label="Randomise Responses"
                                            checked={true}
                                          />
                                        )}
                                      </div>
                                    </>
                                  ) : item.assignment_type == "Video-Only" ? (
                                    <>
                                      <div className="que_attachment me-2">
                                        <h6>
                                          <img src={videoRecoder} alt="" />
                                          Video
                                          <span className="text-danger">*</span>
                                          <span className="text-muted font-light">
                                            (Record Online)
                                          </span>
                                        </h6>
                                        <p className="text-muted">
                                          5 - 10 mins
                                        </p>
                                      </div>
                                      <div className="accordion_footer">
                                        <p>{item.question_points} Point</p>
                                        {item.is_random && (
                                          <Form.Check
                                            type="checkbox"
                                            id="custom-checkbox"
                                            label="Randomise Responses"
                                            checked={true}
                                          />
                                        )}
                                      </div>
                                    </>
                                  ) : item.assignment_type ==
                                    "Text-Attachment-Optional" ? (
                                    <>
                                      <div className="que_attachment me-2">
                                        <h6>
                                          <img src={fileIcon} alt="" />
                                          Text
                                          <span className="text-danger">*</span>
                                        </h6>
                                        <p className="text-muted">
                                          Max 3,000 Words
                                        </p>
                                      </div>
                                      <div className="que_attachment me-2">
                                        <h6>
                                          <img src={attachmentPin} alt="" />
                                          Attachment
                                          <span className="text-muted font-light">
                                            (Optional)
                                          </span>
                                        </h6>
                                        <p className="text-muted">
                                          <span className="att_img">PDF</span>
                                          <span className="att_img">PNG</span>
                                          (Size Limit: 1MB)
                                        </p>
                                      </div>
                                      <div className="accordion_footer">
                                        <p>{item.question_points} Point</p>
                                        {item.is_random && (
                                          <Form.Check
                                            type="checkbox"
                                            id="custom-checkbox"
                                            label="Randomise Responses"
                                            checked={true}
                                          />
                                        )}
                                      </div>
                                    </>
                                  ) : item.assignment_type == "Text-Only" ? (
                                    <>
                                      <div className="que_attachment me-2">
                                        <h6>
                                          <img src={fileIcon} alt="" />
                                          Text
                                          <span className="text-danger">*</span>
                                        </h6>
                                        <p className="text-muted">
                                          Max 3,000 Words
                                        </p>
                                      </div>
                                      <div className="accordion_footer">
                                        <p>{item.question_points} Point</p>
                                        {item.is_random && (
                                          <Form.Check
                                            type="checkbox"
                                            id="custom-checkbox"
                                            label="Randomise Responses"
                                            checked={true}
                                          />
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                </Accordion.Body>
                              </Accordion.Item>
                            ))}
                          </Accordion>
                        </div>
                      )
                    )}
                  </div>
                </Col>
                <Col md={3} lg={2} className="queRight_panel">
                  <h5>Instructions</h5>
                  <ul className="bullet_list mb-0">
                    <li>This is a multiple Choice Quiz</li>
                    <li>There is only 1 Section in this Quiz</li>
                    <li>Freely move between questions and sections</li>
                    <li>There are 50/100 Mandatory Questions in this Quiz</li>
                    <li>This quiz has no time limit</li>
                    <li>Negative Scoring is Not applicable</li>
                    <li>Save and Return is Not allowed</li>
                  </ul>
                  <Button
                    variant="link"
                    className="p-0 font-sm font-weight-600"
                    onClick={handleInstructionShow}
                  >
                    See Detailed Instructions{" "}
                    <i class="fa fa-external-link ms-1" aria-hidden="true"></i>
                  </Button>
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      ))}

      <Modal
        show={showinstruction}
        onHide={handleInstructionClose}
        className="instructions_mdl model-md"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Instructions</h4>
          <p>
            (Add the description of the test from the creator of test) This
            assessment is designed to evaluate [brief description of what the
            test assesses, e.g., your analytical skills, technical knowledge,
            etc: skills selected in the formation of the test] as part of the
            recruitment assessment procedure.
          </p>
          {EvaluationListDetails.map((item) => (
            <Row>
              <Col md={4}>
                <div className="inst_iconbox">
                  <span className="inst_icon">
                    <img src={sectionIcon} />
                  </span>
                  <label>Sections</label>
                  <h4>{item?.total_number_of_sections}</h4>
                </div>
              </Col>
              <Col md={4}>
                <div className="inst_iconbox">
                  <span className="inst_icon">
                    <img src={questionIcon} />
                  </span>
                  <label>Questions</label>
                  <h4>{item.total_number_of_question}</h4>
                </div>
              </Col>
              <Col md={4}>
                <div className="inst_iconbox">
                  <span className="inst_icon">
                    <img src={mandatoryIcon} />
                  </span>
                  <label>Mandatory</label>
                  {item.total_mandatory_questions ==
                  item.total_number_of_question ? (
                    <h4>All</h4>
                  ) : (
                    `${item.total_mandatory_questions} / ${item.total_number_of_question}`
                  )}
                </div>
              </Col>
              <Col md={4}>
                <div
                  className={`inst_iconbox ${
                    !item.fixed_time ? "disabled" : ""
                  }`}
                >
                  <span className="inst_icon">
                    <img src={timerIcon} />
                  </span>
                  <label>Duration</label>
                  <h4>{item.fixed_time ? item.fixed_time : "Untimed"}</h4>
                </div>
              </Col>
              <Col md={4}>
                <div
                  className={`inst_iconbox ${
                    !item.is_negative_scoring ? "disabled" : ""
                  }`}
                >
                  <span className="inst_icon">
                    <img src={ngtscoringIcon} />
                  </span>
                  <label>Negative Scoring</label>
                  {item.is_negative_scoring ? (
                    <h4>Applicable</h4>
                  ) : (
                    <h4>Not Applicable</h4>
                  )}
                </div>
              </Col>
              <Col md={4}>
                <div className="inst_iconbox">
                  <span className="inst_icon">
                  {item.save_progress ? <img src={saveProssIcon} /> : <img src={NotAllowed} />}
                    
                  </span>
                  <label>Save Progress</label>
                  {item.save_progress ? <h4>Allowed</h4> : <h4>Not Allowed</h4>}
                </div>
              </Col>
            </Row>
          ))}

          <h5 className="border_hadding">Key Points to Note</h5>
          <ul>
            <li>
              Use the navigation panel on the left to move between sections.{" "}
            </li>
            <li>
              You have the option to mark questions for review. This allows you
              to revisit questions before final submission.{" "}
            </li>
            <li>
              Negative scoring is enabled in the test. Please answer carefully.
            </li>
            <li>Once you start the test, you can save and return later. </li>
            <li>Ensure you have a stable internet connection.</li>
            <li>
              Have all necessary resources, such as a pen and paper, ready
              before starting the test.{" "}
            </li>
            <li>
              If you encounter any technical issues, contact support
              immediately.{" "}
            </li>
            <li>
              Choose the most accurate answers based on your knowledge. Read
              each question carefully before responding. All the best.
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Evalation;
