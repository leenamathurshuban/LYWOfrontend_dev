import React, { useState } from "react";
import { Col, Row, Modal } from 'react-bootstrap';
import LeaderIcn from "../../../images/icons/Leader-icon.svg";
import InfluencerLarge from "../../../images/icons/Influencer-icon.svg";

const title = ['Your Dominant Personality', 'Your Secondary Personality'];
const content = [
  'The dominant personality signifies the traits and behaviors that the you most closely associate with and are easily observable.',
  'The secondary personality is less visible and only shown in certain situations or to certain people. This could be aspects of ourselves that we keep more private or that only come out in specific contexts'
];
const Percentage = ['83', '58'];

const Step3 = ({ applicantPersonality, personalityData }) => {
  // ✅ put state here, inside component
  const [handleshow, handlesetShow] = useState(false);

  const handleCloseModal = () => handlesetShow(false);
  const handleShowModal = () => handlesetShow(true);

  return (
    <>
      <div className="perlity_mth ">
        <Row>
          <Col md={12} className='mb-2'>
            <p style={{fontSize:'12px', lineHeight:'24px', fontWeight:'500', marginBottom:'0'}}>
              Recommended Personalities for Java Backend Developer
            </p>
          </Col>
        </Row>

        <Row className='row-cols-5 '>
          {personalityData?.length > 0 &&
            personalityData
              ?.sort((a, b) => b?.personality_percentage - a?.personality_percentage)
              ?.map((item, index) => (
                <Col key={index}>
                  <div className="perlitymth-card">
                    <div className="perlitymth-head">
                      <span className="prtmth_icon">
                        <img src={LeaderIcn} className='img-fluid'/>
                      </span>
                      <div className="prtmth_title">
                        <h6>{item?.behaviours_name}</h6>
                        <span>{item?.personality_percentage}%</span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
        </Row>

        <hr style={{borderColor:'#F2F2F2', opacity:'1'}} />

        <div className="bg-white rounded text-center">
          <Row className="mt-2 ">
            <p className='col-md-12 text-start' style={{fontSize:'12px', lineHeight:'24px', fontWeight:'500'}} >
              Candidate’s Personality
            </p>
            {Array.isArray(applicantPersonality) && applicantPersonality.map((item, index) => (
              <Col md={6} key={index}>
                <div className="gray-card" onClick={handleShowModal}>
                  <div className='ps-card'>
                    <h6>{title[index]}</h6>
                    <p>{content[index]}</p>
                  </div>
                  <img className="mt-35 img-fluid" src={InfluencerLarge} alt='influcerimg' />
                  <h2>{item?.behaviours_name}</h2>
                  <p style={{fontSize:'16px', lineHeight: '24px'}}>{Percentage[index]} %</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <Modal
        show={handleshow}   
        onHide={handleCloseModal}
        animation={false}
        size="md"
        backdrop={true}
        className="indleffort-mdl"
        backdropClassName="custom-backdrop"
      >
        <Modal.Header closeButton>
          <img src={LeaderIcn} alt="leader-icon" />
          <Modal.Title>
            <span className="count">P</span> Persuader
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-5 px-4">
          <h2 className="h2_title">
            <span className="count">P</span> Persuader
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
              <li><strong>Strengths</strong><p>Charming, visionary, adventurous...</p></li>
              <li><strong>Uniqueness</strong><p>Sound decision making...</p></li>
              <li><strong>Value to Org.</strong><p>Thrives under pressure...</p></li>
              <li><strong>Challenges</strong><p>Stagnation; can get aggressive...</p></li>
              <li><strong>Motivations</strong><p>Success and recognition...</p></li>
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Step3;
