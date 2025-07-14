import React from "react";
import { Offcanvas,Col,Row } from "react-bootstrap";
import behavioral02 from "../../images/behavioral_02.svg"
import onlineSurvey01 from "../../images/online-survey_01.svg"
import TechnicalQuestions from "../../images/Technical_Questions.svg"
import Transparent01 from "../../images/Transparent01.svg"
import FinalInterview from "../../images/final-rg4663.png"
import StreamlinedEfficiency from "../../images/StreamlinedEfficiency.svg"
import Convenience01 from "../../images/Convenience01.svg"
import Showcase_01 from "../../images/Showcase_01.svg"


const AboutLywoModal = ({show, handleClose}) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop={true}
      placement="end"
      className="luwoprocess_drawer lg-drawer shadow-md border-0"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>ABOUT THE LYWO PROCESS</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <h6>Welcome to LYWO's Hiring Process</h6>
        <p>
          At LYWO, we've streamlined the recruitment process to make your
          journey to your next role as simple as possible.
        </p>
        <p>
          Our hiring process is crafted to spotlight your strengths, skills, and
          unique personality far beyond the limitations of a traditional resume
          and multiple cumbersome interviews.
        </p>
        <p>
          From a detailed application to a final interview, each stage is
          meticulously designed to help you present your best self,
          acknowledging how stressful these evaluation processes can be.
        </p>
        <h6 className="mt-5">Clearly Outlined Steps</h6>
        <ul className="process_staps">
          <li>
            <img src={onlineSurvey01} />
            <div className="staps_text">
              <h6>Complete the Job Application</h6>
              <p>
                Add details specific to the job and provide clear insights into
                your experience and career.
              </p>
            </div>
          </li>
          <li>
            <img src={behavioral02} />
            <div className="staps_text">
              <h6>Behavioural Assessment</h6>
              <p>
                Let the company learn about your unique strengths without the
                stress of an interview.
              </p>
            </div>
          </li>
          <li>
            <img src={TechnicalQuestions} />
            <div className="staps_text">
              <h6>Technical Questions</h6>
              <p>
                Showcase your knowledge and intelligence on standard technical
                questions at your convenience.
              </p>
            </div>
          </li>
          <li>
            <img src={FinalInterview} />
            <div className="staps_text">
              <h6>Final Interview</h6>
              <p>
                Attend one interview to make the final decision, avoiding
                multiple and lengthy interviews.
              </p>
            </div>
          </li>
        </ul>
        <h6 className="mt-5">Benefits of this Process</h6>
        <Row>
          <Col md={3} className="col-6" >
            <div className="bnft_probox">
              <img src={StreamlinedEfficiency} />
              <h6>Streamlined Efficiency</h6>
              <p>
                Avoid lengthy back-and-forth and multiple non-decisive
                interviews.
              </p>
            </div>
          </Col>
          <Col md={3} className="col-6">
            <div className="bnft_probox">
              <img src={Convenience01} />
              <h6>Convenience at Its Best</h6>
              <p>
                Complete the process at your convenience, reducing scheduling
                conflicts.
              </p>
            </div>
          </Col>
          <Col md={3} className="col-6" >
            <div className="bnft_probox">
              <img src={Showcase_01} />
              <h6>Showcase Your Best Self</h6>
              <p>
                Present your strengths in a relaxed manner, without the pressure
                of being judged by a stranger.
              </p>
            </div>
          </Col>
          <Col md={3} className="col-6" >
            <div className="bnft_probox">
              <img src={Transparent01} />
              <h6>Transparent Process</h6>
              <p>
                Gain clear visibility into your progress, enabling you to plan
                your next career move with confidence.
              </p>
            </div>
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AboutLywoModal;
