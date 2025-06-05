import React from 'react'
import { Col, Row } from 'react-bootstrap';
import LeaderIcn from "../../../images/icons/Leader-icon.svg";
import InfluencerLarge from "../../../images/icons/Influencer-icon.svg";
// /images/icons/Leader-icon.svg";
const title = ['Your Dominant Personality', 'Your Secondary Personality']
const content = ['The dominant personality signifies the traits and behaviors that the you most closely associate with and are easily observable.',
  'The secondary personality is less visible and only shown in certain situations or to certain people. This could be aspects of ourselves that we keep more private or that only come out in specific contexts'
]

const Step3 = ({ applicantPersonality, personalityData }) => {
  // debugger
  return (
    <div className="perlity_mth mt-3">
      <Row>
        <Col md={12} className='mb-2'>
          Recommended Personalities for Java Backend Developer
        </Col>

        {personalityData?.length > 0 && personalityData?.sort((a, b) => b?.personality_percentage - a?.personality_percentage)?.map((item, index) => (
          <Col key={index} md={3}>
            <div className="perlitymth-card">
              <div className="perlitymth-head">
                <span className="prtmth_icon"><img src={LeaderIcn} /></span>
                <div className="prtmth_title">
                  <h6>{item?.behaviours_name}</h6>
                  <span>{item?.personality_percentage}%</span>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <div className="bg-white p-5 rounded text-center">
        <Row className="mt-5 justify-content-center">
          <p>Candidate’s Personality</p>
          {Array.isArray(applicantPersonality) && applicantPersonality.map((item, index) => (
            <Col md={4}>
              <div className="gray-card">
                <h6>{title[index]}</h6>
                <p>{content[index]} </p>
                <img className="mt-35" src={InfluencerLarge} />
                <h2>{item?.behaviours_name}</h2>
                <p>{item?.behaviour_desctiption}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Step3