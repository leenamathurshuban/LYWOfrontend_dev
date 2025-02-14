import React from "react";
import { Offcanvas, Col, Row, Button } from "react-bootstrap";
import behavioral02 from "../../images/behavioral_02.svg";
import onlineSurvey01 from "../../images/online-survey_01.svg";
import TechnicalQuestions from "../../images/Technical_Questions.svg";
import Transparent01 from "../../images/Transparent01.svg";

const ChatModal = ({ show, handleClose }) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop={false}
      placement="end"
      className="luwoprocess_drawer lg-drawer shadow-md border-0"
    >
      <Offcanvas.Header closeButton></Offcanvas.Header>

      <Offcanvas.Body
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ height: "100%" }}
      >
        <p>
          To begin the conversation with the company, start your application
          process. You can expect a response within 2-3 business days.
        </p>

        <Button variant="primary">Apply Now</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatModal;
