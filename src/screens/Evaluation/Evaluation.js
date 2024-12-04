// import React from "react";
// import Header from "../../components/Header";
// import Sidebar from "../../components/Sidebar";

// const Evalation = () => {
  

//   return (
//     <>
//       <Sidebar />
//       <Header />
     
//     </>
//   );
// };

// export default Evalation;


import React from "react";
import { useState } from 'react';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Col, Container, Row, InputGroup, Button, Form, Table, ProgressBar, Dropdown,Modal,Tab,Nav,Accordion } from "react-bootstrap";
import faRingicon from "../../images/icons/Ring.svg";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
import fileIcon from "../../images/icons/file_icon.svg";
import quizIcon from "../../images/icons/quiz_icon.svg";
import listQuestions from "../../images/icons/list-question.svg";
import clockStopwatch from "../../images/icons/clock-stopwatch.svg";
import checkVerified from "../../images/icons/check-verified-02.svg";
import expandIcon from "../../images/icons/expand-01.svg";
import logoIcon from "../../images/logo_icon.png";
import eyePrimery from "../../images/icons/eye_icon_primery.svg";
import mcqIcon from "../../images/icons/mcq_icon.png";
import sectionIcon from "../../images/icons/sections_icon.svg";
import questionIcon from "../../images/icons/questions_icon.svg";
import mandatoryIcon from "../../images/icons/mandatory_icon.svg";
import timerIcon from "../../images/icons/timer_icon.svg";
import saveProssIcon from "../../images/icons/save_progress.svg";
import ngtscoringIcon from "../../images/icons/negative_scoring.svg";
const Evalation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activeKeys, setActiveKeys] = useState([]); // Keeps track of open accordion items

  const accordionItems = [
    { id: "0", header: "How many companies have you changed in your career?", body: "Content for item 1" },
    { id: "1", header: "How many companies have you changed in your career?", body: "Content for item 2" },
    { id: "2", header: "How many companies have you changed in your career?", body: "Content for item 3" },
    { id: "3", header: "How many companies have you changed in your career?", body: "Content for item 3" },
    { id: "4", header: "How many companies have you changed in your career?", body: "Content for item 3" },
    { id: "5", header: "How many companies have you changed in your career?", body: "Content for item 3" },
    { id: "6", header: "How many companies have you changed in your career?", body: "Content for item 3" },
    { id: "7", header: "How many companies have you changed in your career?", body: "Content for item 3" },
  ];

  const toggleAll = () => {
    // Toggle all items
    if (activeKeys.length === accordionItems.length) {
      setActiveKeys([]); // Collapse all
    } else {
      setActiveKeys(accordionItems.map((item) => item.id)); // Expand all
      console.log(accordionItems.map((item) => item.id));
    }
  };

  const toggleItem = (id) => {
    // Toggle a single item
    if (activeKeys.includes(id)) {
      setActiveKeys(activeKeys.filter((key) => key !== id)); // Collapse item
    } else {
      setActiveKeys([...activeKeys, id]); // Expand item
    }
};
  
  return (
    <>
      <Sidebar />
      <Header />
      <div className="page-body">
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
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <ul className="head_filterlist">
                <li className="active">View all</li>
                <li>Quiz</li>
                <li>Assignment</li>
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
                    <tr>
                      <td><span className="font-weight-600">Assignment for Figma Designer</span></td>
                      <td><img src={quizIcon} className="me-1" style={{ width: "16px" }} />Quiz</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                          <Dropdown className="action_dropdown">
                          <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-transpant">
                            <img src={threeDots} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={handleShow}>Preview</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Print</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Download</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Self Driven Interview for UI Designer</span></td>
                      <td><img src={fileIcon} className="me-1" style={{ width: "16px" }} />Assignment</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action"><Button variant="link"> <img src={threeDots} /></Button></td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Assignment for Figma Designer</span></td>
                      <td><img src={fileIcon} className="me-1" style={{ width: "16px" }} />Quiz</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Self Driven Interview for UI Designer</span></td>
                      <td><img src={quizIcon} className="me-1" style={{ width: "16px" }} />Quiz</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Assignment for Figma Designer</span></td>
                      <td><img src={fileIcon} className="me-1" style={{ width: "16px" }} />Assignment</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Self Driven Interview for UI Designer</span></td>
                      <td><img src={quizIcon} className="me-1" style={{ width: "16px" }} />Quiz</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Assignment for Figma Designer</span></td>
                      <td><img src={fileIcon} className="me-1" style={{ width: "16px" }} />Assignment</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Self Driven Interview for UI Designer</span></td>
                      <td><img src={quizIcon} className="me-1" style={{ width: "16px" }} />Quiz</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Assignment for Figma Designer</span></td>
                      <td><img src={fileIcon} className="me-1" style={{ width: "16px" }} />Assignment</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Self Driven Interview for UI Designer</span></td>
                      <td><img src={quizIcon} className="me-1" style={{ width: "16px" }} />Quiz</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Assignment for Figma Designer</span></td>
                      <td><img src={fileIcon} className="me-1" style={{ width: "16px" }} />Assignment</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Self Driven Interview for UI Designer</span></td>
                      <td><img src={quizIcon} className="me-1" style={{ width: "16px" }} />Quiz</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="font-weight-600">Assignment for Figma Designer</span></td>
                      <td><img src={fileIcon} className="me-1" style={{ width: "16px" }} />Assignment</td>
                      <td>25 Min</td>
                      <td>40%</td>
                      <td>20 Active of 200</td>
                      <td>112</td>
                      <td><div className="passratio">40%<ProgressBar variant="warning" now={60} /></div></td>
                      <td className="avgscore">40%<img src={faRingicon} /></td>
                      <td className="action" style={{ width: "72px" }}>
                        <Button variant="link"> <img src={threeDots}/></Button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}><Button className="btn-light-outline">Load More</Button></td>
                      <td colSpan={7} className="text-end pe-3"><span className="pagination_count">Showing 10 items</span></td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Modal 
        show={show} 
        onHide={handleClose}
        animation={false}
        size="lg"
        className="cmprofile_mdl quizDev_model"
        >
        <Modal.Header closeButton>
            <Col md={4}><Modal.Title><img src={logoIcon} className="me-4"/>Quiz for Backend Developers</Modal.Title></Col>
            <Col md={4} className="d-flex align-items-center">
                <p className="m-0 font-13"><span className="font-weight-600 me-2">20%</span>completed</p>
                <ProgressBar className="ms-3" style={{ width: "215px",height:"8px" }} now={20} />
            </Col>
            <Col md={4} className="score_panel">
                <ul>
                  <li>
                    <span className="outline_scorebtn"><img src={listQuestions}/>100 pts.</span>
                    <p className="text-muted font-sm m-0">Total Score</p>
                  </li>
                  <li>
                    <span className="outline_scorebtn"><img src={clockStopwatch}/>30mins</span>
                    <p className="text-muted font-sm m-0">Duration</p>
                  </li>
                  <li>
                    <span className="outline_scorebtn"><img src={checkVerified}/>60%</span>
                    <p className="text-muted font-sm m-0">Pass Criteria</p>
                  </li>
                  <li onClick={toggleAll}>
                    <span className="outline_scorebtn"><img src={expandIcon} className="m-0"/></span>
                    <p className="text-muted font-sm m-0">{activeKeys.length === accordionItems.length ? "Collapse" : "Expand"}</p>
                  </li>
                  <li>
                    <Button variant="link" className="ms-5"><img src={eyePrimery}/></Button>
                  </li>
                </ul>    
            </Col>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="justify-content-center">
              <Col md={3} lg={2} className="queLeft_panel pe-0">
                <div className="p-3">
                  <Form.Select aria-label="Default select example" className="h-36">
                    <option>Show All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link  href="#qes_section01" eventKey="first">
                      <h5>Section 1</h5>
                      <p>12 Q’s 12 points ~10mins, 60%</p>
                      <ul className="qs_numlist">
                        <li><span className="qs_count">1</span></li>
                        <li><span className="qs_count">2</span></li>
                        <li><span className="qs_count">3</span></li>
                        <li><span className="qs_count">4</span></li>
                        <li><span className="qs_count">5</span></li>
                        <li><span className="qs_count">6</span></li>
                        <li><span className="qs_count">7</span></li>
                        <li><span className="qs_count">8</span></li>
                        <li><span className="qs_count">9</span></li>
                        <li><span className="qs_count">10</span></li>
                        <li><span className="qs_count">11</span></li>
                        <li><span className="qs_count">12</span></li>
                        <li><span className="qs_count">13</span></li>
                        <li><span className="qs_count">14</span></li>
                        <li><span className="qs_count">15</span></li>
                        <li><span className="qs_count">16</span></li>
                        <li><span className="qs_count">17</span></li>
                        <li><span className="qs_count">18</span></li>
                        <li><span className="qs_count">19</span></li>
                        <li><span className="qs_count">20</span></li>
                      </ul>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#qes_section02" eventKey="second">
                    <h5>Section 2</h5>
                      <p>12 Q’s 12 points ~10mins, 60%</p>
                      <ul className="qs_numlist">
                        <li><span className="qs_count">1</span></li>
                        <li><span className="qs_count">2</span></li>
                        <li><span className="qs_count">3</span></li>
                        <li><span className="qs_count">4</span></li>
                        <li><span className="qs_count">5</span></li>
                        <li><span className="qs_count">6</span></li>
                        <li><span className="qs_count">7</span></li>
                        <li><span className="qs_count">8</span></li>
                        <li><span className="qs_count">9</span></li>
                        <li><span className="qs_count">10</span></li>
                        <li><span className="qs_count">11</span></li>
                        <li><span className="qs_count">12</span></li>
                        <li><span className="qs_count">13</span></li>
                        <li><span className="qs_count">14</span></li>
                        <li><span className="qs_count">15</span></li>
                        <li><span className="qs_count">16</span></li>
                        <li><span className="qs_count">17</span></li>
                        <li><span className="qs_count">18</span></li>
                        <li><span className="qs_count">19</span></li>
                        <li><span className="qs_count">20</span></li>
                      </ul>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="three">
                    <h5>Section 3</h5>
                      <p>12 Q’s 12 points ~10mins, 60%</p>
                      <ul className="qs_numlist">
                        <li><span className="qs_count">1</span></li>
                        <li><span className="qs_count">2</span></li>
                        <li><span className="qs_count">3</span></li>
                        <li><span className="qs_count">4</span></li>
                        <li><span className="qs_count">5</span></li>
                        <li><span className="qs_count">6</span></li>
                        <li><span className="qs_count">7</span></li>
                        <li><span className="qs_count">8</span></li>
                        <li><span className="qs_count">9</span></li>
                        <li><span className="qs_count">10</span></li>
                        <li><span className="qs_count">11</span></li>
                        <li><span className="qs_count">12</span></li>
                        <li><span className="qs_count">13</span></li>
                        <li><span className="qs_count">14</span></li>
                        <li><span className="qs_count">15</span></li>
                        <li><span className="qs_count">16</span></li>
                        <li><span className="qs_count">17</span></li>
                        <li><span className="qs_count">18</span></li>
                        <li><span className="qs_count">19</span></li>
                        <li><span className="qs_count">20</span></li>
                      </ul>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="four">
                    <h5>Section 4</h5>
                      <p>12 Q’s 12 points ~10mins, 60%</p>
                      <ul className="qs_numlist">
                        <li><span className="qs_count">1</span></li>
                        <li><span className="qs_count">2</span></li>
                        <li><span className="qs_count">3</span></li>
                        <li><span className="qs_count">4</span></li>
                        <li><span className="qs_count">5</span></li>
                        <li><span className="qs_count">6</span></li>
                        <li><span className="qs_count">7</span></li>
                        <li><span className="qs_count">8</span></li>
                        <li><span className="qs_count">9</span></li>
                        <li><span className="qs_count">10</span></li>
                        <li><span className="qs_count">11</span></li>
                        <li><span className="qs_count">12</span></li>
                        <li><span className="qs_count">13</span></li>
                        <li><span className="qs_count">14</span></li>
                        <li><span className="qs_count">15</span></li>
                        <li><span className="qs_count">16</span></li>
                        <li><span className="qs_count">17</span></li>
                        <li><span className="qs_count">18</span></li>
                        <li><span className="qs_count">19</span></li>
                        <li><span className="qs_count">20</span></li>
                      </ul>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={6} lg={8} className="queMain_panel">
                    <div className="que_mainsection">
                      <div id="qes_section01" className="qes_section01 mb-4">
                        <div className={activeKeys.length>0? "que_head":"que_head ellipsis"}>
                          <div className="d-flex justify-content-between mb-2">
                            <h6>Section 01</h6>
                            <span>Questions<strong className="font-weight-600 ms-1">10</strong></span>
                          </div>
                          <p className="text-sm">This section presents a comprehensive collection of questions that delve deep into the core of the subject matter. As you navigate through these thought-provoking questions, you will uncover new insights and perspectives that will enrich your understanding. Each question has been meticulously crafted to challenge your critical thinking skills and encourage you to explore different facets of the topic. Embrace this opportunity to expand your knowledge and analytical abilities by engaging with the diverse range of questions provided.</p>
                          <strong className="qus_number">1</strong>
                        </div>
                        <Accordion className="quetions_list mt-4" activeKey={activeKeys} alwaysOpen>
                        {accordionItems.map((item) => (
                          <Accordion.Item eventKey={item.id} key={item.id}>
                            <Accordion.Header onClick={() => toggleItem(item.id)}><span className="question">{item.header}</span> <span className="que_points">2 points <img src={mcqIcon}/></span></Accordion.Header>
                            <Accordion.Body>
                            <Form>
                              <ul className="que_options">
                                <li>
                                    <Form.Check // prettier-ignore
                                      type="radio"
                                      id="custom-radio"
                                      label="Response 1"
                                    />
                                </li>
                                <li>
                                    <Form.Check // prettier-ignore
                                      type="radio"
                                      id="custom-radio2"
                                      label="Response 2"
                                      checked
                                    />
                                </li>
                                <li>
                                    <Form.Check // prettier-ignore
                                      type="radio"
                                      id="custom-radio3"
                                      label="Response 3"
                                    />
                                </li>
                                <li>
                                    <Form.Check // prettier-ignore
                                      type="radio"
                                      id="custom-radio4"
                                      label="Response 4"
                                    />
                                </li>
                              </ul>
                              </Form>
                            </Accordion.Body>
                          </Accordion.Item>
                           ))}
                        </Accordion>
                      </div>
                      <div id="qes_section02" className="qes_section02 mb-4">
                        <div className={activeKeys.length>0? "que_head":"que_head ellipsis"}>
                          <div className="d-flex justify-content-between mb-2">
                            <h6>Section 02</h6>
                            <span>Questions<strong className="font-weight-600 ms-1">10</strong></span>
                          </div>
                          <p className="text-sm">This section presents a comprehensive collection of questions that delve deep into the core of the subject matter. As you navigate through these thought-provoking questions, you will uncover new insights and perspectives that will enrich your understanding. Each question has been meticulously crafted to challenge your critical thinking skills and encourage you to explore different facets of the topic. Embrace this opportunity to expand your knowledge and analytical abilities by engaging with the diverse range of questions provided.</p>
                          <strong className="qus_number">2</strong>
                        </div>
                        <Accordion className="quetions_list mt-4" activeKey={activeKeys} alwaysOpen>
                        {accordionItems.map((item) => (
                          <Accordion.Item eventKey={item.id} key={item.id}>
                            <Accordion.Header onClick={() => toggleItem(item.id)}><span className="question">{item.header}</span> <span className="que_points">2 points <img src={mcqIcon}/></span></Accordion.Header>
                            <Accordion.Body>
                            <Form>
                              <ul className="que_options">
                                <li>
                                    <Form.Check // prettier-ignore
                                      type="radio"
                                      id="custom-radio"
                                      label="Response 1"
                                    />
                                </li>
                                <li>
                                    <Form.Check // prettier-ignore
                                      type="radio"
                                      id="custom-radio2"
                                      label="Response 2"
                                      checked
                                    />
                                </li>
                                <li>
                                    <Form.Check // prettier-ignore
                                      type="radio"
                                      id="custom-radio3"
                                      label="Response 3"
                                    />
                                </li>
                                <li>
                                    <Form.Check // prettier-ignore
                                      type="radio"
                                      id="custom-radio4"
                                      label="Response 4"
                                    />
                                </li>
                              </ul>
                              </Form>
                            </Accordion.Body>
                          </Accordion.Item>
                           ))}
                        </Accordion>
                      </div>
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
                <Button variant="link" className="p-0 font-sm font-weight-600">See Detailed Instructions <i class="fa fa-external-link ms-1" aria-hidden="true"></i></Button>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
      </Modal>
      {/* <Modal show={show} onHide={handleClose} className="instructions_mdl model-md">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Instructions</h4>
          <p>(Add the description of the test from the creator of test) This assessment is designed to evaluate
[brief description of what the test assesses, e.g., your analytical skills, technical knowledge, etc:
skills selected in the formation of the test] as part of the recruitment assessment procedure.</p>
        <Row>
          <Col md={4}>
              <div className="inst_iconbox">
                <span className="inst_icon">
                  <img src={sectionIcon}/>
                </span>
                <label>Sections</label>
                <h4>5</h4>
              </div>
          </Col>
          <Col md={4}>
              <div className="inst_iconbox">
                <span className="inst_icon">
                  <img src={questionIcon}/>
                </span>
                <label>Questions</label>
                <h4>50</h4>
              </div>
          </Col>
          <Col md={4}>
              <div className="inst_iconbox">
                <span className="inst_icon">
                  <img src={mandatoryIcon}/>
                </span>
                <label>Mandatory</label>
                <h4>All</h4>
              </div>
          </Col>
          <Col md={4}>
              <div className="inst_iconbox disabled">
                <span className="inst_icon">
                  <img src={timerIcon}/>
                </span>
                <label>Duration</label>
                <h4>50 mins</h4>
              </div>
          </Col>
          <Col md={4}>
              <div className="inst_iconbox disabled">
                <span className="inst_icon">
                  <img src={saveProssIcon}/>
                </span>
                <label>Negative Scoring</label>
                <h4>Applicable</h4>
              </div>
          </Col>
          <Col md={4}>
              <div className="inst_iconbox">
                <span className="inst_icon">
                  <img src={ngtscoringIcon}/>
                </span>
                <label>Save Progress</label>
                <h4>Allowed</h4>
              </div>
          </Col>
        </Row>
        <h5 className="border_hadding">Key Points to Note</h5>
        <ul>
          <li>Use the navigation panel on the left to move between sections. </li>
          <li>You have the option to mark questions for review. This allows you to revisit questions before final submission. </li>
          <li>Negative scoring is enabled in the test. Please answer carefully.</li>
          <li>Once you start the test, you can save and return later. </li>
          <li>Ensure you have a stable internet connection.</li>
          <li>Have all necessary resources, such as a pen and paper, ready before starting the test.          </li>
          <li>If you encounter any technical issues, contact support immediately.          </li>
          <li>Choose the most accurate answers based on your knowledge. Read each question carefully before responding. All the best.</li>
        </ul>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default Evalation;
