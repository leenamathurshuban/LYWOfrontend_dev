import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import logoIcon from "../../images/logo_icon.png";
import leaderLarge from "../../images/icons/Leader-icon.svg";
import InfluencerLarge from "../../images/icons/Influencer-icon.svg";
import LeaderIcn from "../../images/icons/Leader-icon.svg";

const BehaviourAssReport = () => {
  const [selectedpersonality, setSelectedpersonality] = useState({
    modal_name: "",
    modal_data: {}
  })
  const handleClose = () => { };
  const personality = {
    behaviours_name: "Influencer",
    behaviour_type_name: "(I/DSC) High Influence",
    behaviour_desctiption: "Influencers are confident, outgoing and friendly individuals who love to be the center of attention. They seek out situations that involve meeting people and socializing. Their confidence combined with a genuine interest in ideas and people, allows them to interact easily, and positively in almost any situation. These strong communicators are assertive, intuitive, and adaptive. They thrive in meetings, committees, and conferences. They may need a constant dose of Approval. They also might sometimes lose focus on timelines and the tasks at hand.",
    suvcm: [{ Strengths: "Fun, persuasive, ideas-oriented, creative, original, networkers, intuitive", Uniqueness: "Openness, strong communication, social confidence", Value_to_ORG: "Contributing original ideas, improve and extend coordination within team", Challenges: "Needs constant approval, pressured conditions", Motivation: "Being surrounded by people, supportive and collaborative environment" }]
  }
  const handleCardClick = (behaviour) => {
    setSelectedpersonality({
      modal_isOpen: true,
      modal_data: behaviour
    });
  };
  const handleCloseModal = () => {
    setSelectedpersonality({
      modal_isOpen: false,
      modal_data: {}
    });
  };
  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        animation={false}
        size="lg"
        backdrop={false}
        className="bsreport_mdl"
      >
        <Modal.Header closeButton>
          <img src={logoIcon} className="me-4" />
          <Modal.Title>Behavioral Assessment Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-white p-5 rounded text-center">
            <h5 className="mb-3">You have completed your assessment.</h5>
            <p className="disc-text"> You have completed the LYWO behavioral test, which is based on the classic DISC personality theory and assessment. This test helps us understand your natural tendencies, allowing us to tailor job roles and subsequent assessments to complement your traits. The test broadly categorizes all candidates into personality groups.</p>
            <Row className="mt-5 justify-content-center">
              <Col md={4}>
                <div className="gray-card" onClick={() => handleCardClick(personality)}>
                  <h6> Your Dominant Personality</h6>
                  <p> The dominant personality signifies the traits and behaviors that the you most closely associate with and are easily observable.</p>
                  <img className="mt-35" src={leaderLarge} />
                  <h2>Leader</h2>
                </div>
              </Col>
              <Col md={4}>
                <div className="gray-card" onClick={() => handleCardClick(personality)}>
                  <h6>  Your Secondary Personality</h6>
                  <p>  The secondary personality is less visible and only shown in certain situations or to certain people. This could be aspects of ourselves that we keep more private or that only come out in specific contexts </p>
                  <img src={InfluencerLarge} />
                  <h2>Influencer</h2>
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Re-take Test
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={selectedpersonality.modal_isOpen}
        onHide={handleCloseModal}
        animation={false}
        size="md"
        backdrop={false}
        className="indleffort-mdl"
      >
        <Modal.Header closeButton>
          <img src={LeaderIcn} />
          <Modal.Title>
            <span className="count">{selectedpersonality?.modal_data?.behaviours_name?.slice(0, 1)}</span>
            {selectedpersonality?.modal_data?.behaviours_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-5 px-4">
          <h2 className="h2_title">
            <span className="count">{selectedpersonality?.modal_data?.behaviours_name?.slice(0, 1)}</span>
            {selectedpersonality?.modal_data?.behaviours_name}
          </h2>
          <div className="indleffort-text">
            <p>{selectedpersonality?.modal_data?.behaviour_desctiption}</p>
            {selectedpersonality?.modal_data.suvcm?.map((item, index) => (<ul>
              <li>
                <strong>Strengths</strong>
                <p>{item.Strengths}</p>
              </li>
              <li>
                <strong>Uniqueness</strong>
                <p>{item.Uniqueness}</p>
              </li>
              <li>
                <strong>Value to Org.</strong>
                <p>{item.Value_to_ORG}</p>
              </li>
              <li>
                <strong>Challenges</strong>
                <p>{item.Challenges}</p>
              </li>
              <li>
                <strong>Motivations</strong>
                <p>{item.Motivation}</p>
              </li>
            </ul>))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default BehaviourAssReport