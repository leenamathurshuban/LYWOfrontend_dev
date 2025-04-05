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
import sectionIcon from "../../images/icons/stack-1-dark.svg";
import questionIcon from "../../images/icons/dotpoints-02-dark.svg";
import mandatoryIcon from "../../images/icons/mandatory_icon.svg";
import timerIcon from "../../images/icons/timer-default-dark.svg";
import saveProssIcon from "../../images/icons/no-save-ret-dark.svg";
import ngtscoringIcon from "../../images/icons/no-dark.svg";
import AIIcons from "../../images/icons/artificial-intelligence1.svg"
import belltedArrow from "../../images/icons/bullt_arrow.svg";
import attachmentPin from "../../images/icons/attachment_pin.svg";
import videoRecoder from "../../images/icons/video-recorder.svg";
import CollapsedButton from "../../images/icons/CollapsedButton.svg";
import NotAllowed from "../../images/icons/NotAllowed.svg";

import { useNavigate } from "react-router-dom";
import { removeToken } from "../../helpers/helper";

const InstructionAssignment = ({ showinstruction, handleInstructionClose, handleStartQuiz, EvaluationListDetails,jobData }) => {
    return (
        <>
            {/* <Modal
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
                                    className={`inst_iconbox ${!item.fixed_time ? "disabled" : ""
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
                                    className={`inst_iconbox ${!item.is_negative_scoring ? "disabled" : ""
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
                                        {item.save_progress ? (
                                            <img src={saveProssIcon} />
                                        ) : (
                                            <img src={NotAllowed} />
                                        )}
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
                <Modal.Footer>
                    <Button onClick={handleStartQuiz}>Start the Quiz</Button>
                </Modal.Footer>
            </Modal> */}
            <Modal
                show={showinstruction}
                onHide={handleInstructionClose}
                animation={false}
                size="lg"
                backdrop={false}
                className="beharlasmnt_mdl dddddd"
            >
                <Modal.Header closeButton>
                    <img src={logoIcon} className="me-4" />
                    <Modal.Title>Assignment for {jobData?.job_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="mt-3">
                            <Col md={12} className="bg-white rounded p-5 shadow-md">
                                <h5>Assignment for {jobData?.job_title}</h5>
                                <p className="text-xs-ragular mt-3">
                                    (Add the description of the test from the creator of test) This
                                    assessment is designed to evaluate [brief description of what the
                                    test assesses, e.g., your analytical skills, technical knowledge,
                                    etc: skills selected in the formation of the test] as part of the
                                    recruitment assessment procedure.
                                </p>
                                {EvaluationListDetails.map((item) => (
                                    <Row>
                                        <Col md={12} className="mb-3">
                                            <h6>Important Instructions:</h6>
                                        </Col>
                                        <Col md={2} className="quiz_infocrd">
                                            <span className="infocrd_icon"><img src={AIIcons} /></span>
                                            <h6>AI not Allowed</h6>
                                        </Col>
                                        <Col md={2} className="quiz_infocrd">
                                            <span className="infocrd_icon"><img src={sectionIcon} /></span>
                                            <h6>5 Sections</h6>
                                        </Col>
                                        <Col md={2} className="quiz_infocrd">
                                            <span className="infocrd_icon"><img src={questionIcon} /></span>
                                            <h6>50 Questions</h6>
                                        </Col>
                                        <Col md={2} className="quiz_infocrd">
                                            <span className="infocrd_icon"><img src={mandatoryIcon} /></span>
                                            <h6>No Mandatory</h6>
                                        </Col>
                                        {/* <Col md={2} className="quiz_infocrd">
                                            <span className="infocrd_icon"><img src={timerIcon} /></span>
                                            <h6>50 Mins.</h6>
                                        </Col>
                                        <Col md={2} className="quiz_infocrd">
                                            <span className="infocrd_icon"><img src={ngtscoringIcon} /></span>
                                            <h6> Negative Scoring</h6>
                                        </Col> */}
                                        <Col md={2} className="quiz_infocrd">
                                            <span className="infocrd_icon"><img src={saveProssIcon} /></span>
                                            <h6> No Save and Return</h6>
                                        </Col>
                                    </Row>
                                ))}
                                <Row className="mt-5">
                                    <Col md={12} className="keypoints">
                                        <h6>Key Points to Note </h6>
                                        <ul>
                                            <li>Use the navigation panel on the left to move between sections and questions.</li>
                                            <li>Mark questions for review to revisit before final submission.</li>
                                            <li>Ensure a stable internet connection throughout the test.</li>                                            
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleStartQuiz} >
                        Start the Assignment
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InstructionAssignment