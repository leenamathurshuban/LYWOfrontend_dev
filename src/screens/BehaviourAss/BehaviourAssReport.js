import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import logoIcon from "../../images/logo_icon.png";
import leaderLarge from "../../images/icons/Leader-icon.svg";
import InfluencerLarge from "../../images/icons/Influencer-icon.svg";
import LeaderIcn from "../../images/icons/Leader-icon.svg";
import { ApplicationDeatilsApi } from '../../services/provider';
const title = ['Your Dominant Personality', 'Your Secondary Personality']
const content = ['The dominant personality signifies the traits and behaviors that the you most closely associate with and are easily observable.',
  'The secondary personality is less visible and only shown in certain situations or to certain people. This could be aspects of ourselves that we keep more private or that only come out in specific contexts'
]
const behaviourResponse = [
  {
    behaviours_name: "Pioneer",
    behaviour_type_name: "(D/ISC) High Dominance",
    behaviour_desctiption: "Pioneers are often ambitious, competitive, and strong-willed individuals. They have a very high need to achieve and continually seek new horizons. Their self-reliance and independent thinking drive them to escape convention and create innovative solutions. They are direct and assertive and apt at influencing people. They are dynamic, adaptable, and willing to do anything to overcome obstacles. Pioneers are persistent in their pursuit of desired results. Overcome by their desire to achieve their goals, they might fail to take other people’s feelings into consideration. Additionally, they have high expectations of others and can be critical if their standards are not met.",
    suvcm: [{ Strengths: "Action-oriented, resourceful, self-reliant, decisive, proactive, strong-willed, direct", Uniqueness: "Sound decision making, self-motivated, excels in emergencies", Value_to_ORG: "Innovative solutions; taking responsibility", Challenges: "Too independent, tends to be blunt, boredom", Motivation: "New opportunities, strong need to achieve, power and structure." }]
  },
  {
    behaviours_name: "Influencer",
    behaviour_type_name: "(I/DSC) High Influence",
    behaviour_desctiption: "Influencers are confident, outgoing and friendly individuals who love to be the center of attention. They seek out situations that involve meeting people and socializing. Their confidence combined with a genuine interest in ideas and people, allows them to interact easily, and positively in almost any situation. These strong communicators are assertive, intuitive, and adaptive. They thrive in meetings, committees, and conferences. They may need a constant dose of Approval. They also might sometimes lose focus on timelines and the tasks at hand.",
    suvcm: [{ Strengths: "Fun, persuasive, ideas-oriented, creative, original, networkers, intuitive", Uniqueness: "Openness, strong communication, social confidence", Value_to_ORG: "Contributing original ideas, improve and extend coordination within team", Challenges: "Needs constant approval, pressured conditions", Motivation: "Being surrounded by people, supportive and collaborative environment" }]
  },
  {
    behaviours_name: "Team Player",
    behaviour_type_name: "(S/DIC) High Steadiness",
    behaviour_desctiption: "Team players are friendly, calm, and thoughtful individuals that like doing practical jobs. Amidst their calm nature, controlled stance, modest attitude, and excellent listening skills, they tend to empathize with others ’perspectives. They value positive interactions and are always willing to help. They depend on more socially assertive people to take the lead. Their persistence and patience enable them to work steadily until the task is completed. They value trust strongly and enjoy being part of a smaller team where they are valued and appreciated. Typically, they resist change and need help in developing alternative solutions.",
    suvcm: [{ Strengths: "Flexibility, dependability, harmony, warmth, listening, team-focused, loyal", Uniqueness: "Listens effectively, supportive, works steadily", Value_to_ORG: "Capable of dealing with laborious tasks; works on a task until it is achieved", Challenges: "Sudden change; interruptions and distractions", Motivation: "Helping others succeed; support of people; doing practical jobs" }]
  },
  {
    behaviours_name: "Logical Thinker",
    behaviour_type_name: "(C/DIS) High Compliance",
    behaviour_desctiption: "Logical thinkers are hardworking, logical, and detail-oriented individuals with high critical thinking abilities. Their habit of meticulous preparation, accuracy, and correctness helps them to manage tasks effectively. Despite being shy and mild-mannered, logical thinkers have a strong need to control their environment. They exert rules, structure, and standards, to accomplish their goals, in conflicting situations. Their cautiousness makes them reluctant to reveal information about themselves or their thoughts unless necessary. Being natural risk avoiders, they only undertake tasks when they are completely certain about the outcome.",
    suvcm: [{ Strengths: "Quality control, handling detail, analyzing data, logical, avoiding the risk, building structure, being deliberate and methodical", Uniqueness: "Accuracy; ability to think logically; building structure", Value_to_ORG: "Completes the undertaken task; great at quality control; organizing information", Challenges: "Spotting deficiencies first; controlling; lacks assertiveness", Motivation: "Certainty of situation and consequences; getting things right" }]
  },
  {
    behaviours_name: "Persuader",
    behaviour_type_name: "(DI/SC) High Dominance and Influence",
    behaviour_desctiption: "Persuaders are assertive, adventurous, and confident individuals with strong social skills. They can be charming or demanding, based on the circumstances. They tend to approach people and situations with energy. While communicating, they can be both assertive and persuasive. Their ability to think and react quickly lets them easily adapt to challenging situations. They have no fear of confrontation and address issues directly. They have clear goals in life and achieve them with sheer determination and commitment. Persuaders thrive in situations that others would find impossibly stressful and difficult. They live for and are happiest when on adventures",
    suvcm: [{ Strengths: "Charming, visionary, adventurous, bold, high energy, results-focused, exciting and fun", Uniqueness: "Sound decision making, self-motivated, excels in emergencies", Value_to_ORG: "Thrives under pressure; motivates people; commits and achieves results", Challenges: "Stagnation; can get aggressive under pressure", Motivation: "Success and recognition; new experiences and challenges" }]
  },
  {
    behaviours_name: "Achiever",
    behaviour_type_name: "(DS/IC) High Dominance and Steadiness",
    behaviour_desctiption: "This is an extremely rare profile with radically different sets of values and motivations. Achievers are reliable, persistent, tenacious, and industrious individuals with a strong sense of personal accountability. They like to get things done in a friendly but thorough manner. They are focused on results with a strong inclination towards fair play and respect. Their careful planning allows them to complete tasks within realistic timescales. They tend to be thoughtful in favorable conditions and demanding at times of pressure. Achievers are usually cautious and only open up to a small set of people they completely trust. They function at peak efficiency and expect recognition equal to their contribution.",
    suvcm: [{ Strengths: "Patient, tenacious, dependable, consistent, protective, kind, watchful", Uniqueness: "Methodical in approach; accountability of work", Value_to_ORG: "Self-driven and completes tasks effectively", Challenges: "Poor communication; inferior work", Motivation: "Personal and professional accomplishments" }]
  },
  {
    behaviours_name: "Perfectionist",
    behaviour_type_name: "(DC/IS) High Dominance and Compliance",
    behaviour_desctiption: "Perfectionists are tenacious, competitive, systematic, and creative individuals with opposing behavioral forces. They seek immediate results and have an equally strong desire for perfection. Their ability to plan and achieve quality allows them to make sound decisions. They think and act quickly but also evaluate all options before agreeing to a course of action. In their drive for results and perfection, they demand the freedom to explore and the authority to examine. They are straightforward and enjoy working by themselves. They tend to be careful with relationships and prefer a strategic approach when dealing with others. They are open to change but extremely cautious.",
    suvcm: [{ Strengths: "Tenacity, quality control, handling large amounts of detail, analyzing data, building systems, competing to win, results-focused, striving to be the best", Uniqueness: "Attention to detail; tries innovative approaches using existing systems", Value_to_ORG: "Can bring positive change to the team by challenging them and raising the standards", Challenges: "Bored with routine work; gets lost in detail", Motivation: "Unique accomplishments and dominance" }]
  },
  {
    behaviours_name: "Assessor",
    behaviour_type_name: "(IC/DS) High Influence and Compliance",
    behaviour_desctiption: "Assessors are articulate, creative, organized, and well-researched individuals with a unique blend of contradicting traits. They seek the company of others but are also exhausted by them. On one hand, they are outgoing and impulsive in favorable conditions yet in formal situations, they are precise and rule-abiding. They are naturally skilled at influencing people with strong communication. They are imaginative, perceptive and strive for perfection. They elicit cooperation from others by being considerate. They have the desire to win and can overwork to the point of exhaustion. They are practical and ensure progressive results by developing a detailed plan of action.",
    suvcm: [{ Strengths: "Articulate, well-researched, produce quality results, self-disciplined, careful, expressive, enthusiastic, fun", Uniqueness: "Turning dreams into workable concepts; result-oriented and quality-driven", Value_to_ORG: "Brings new ideas to the table; team players that instigate action and activities", Challenges: "Not knowing when to stop; sensitive to criticism", Motivation: "Winning attention and approval; succeeding at all costs" }]
  },
  {
    behaviours_name: "Implementor",
    behaviour_type_name: "(SC/DI) High Steadiness and Compliance",
    behaviour_desctiption: "Implementors are stable, consistent, pragmatic, and accommodating individuals that are driven by patience, accuracy, and logic. They are precise thinkers and through precautions avoid the unexpected. They prefer traditional approaches. They question assumptions and require loads of information that they can analyze when exploring alternatives and before reaching conclusion. They enjoy overcoming challenges through persistence and intense focus. They are calm and rational folks, and they rarely provide input in a group.They hold themselves to high standards and desire to earn the respect of those around them.",
    suvcm: [{ Strengths: "Dependable, stable, careful, accurate, hard working, patient, diplomatic", Uniqueness: "Brings stability on board; sticks to “fail safe” options", Value_to_ORG: "Works diligently to get the job done; maintains quality and standards", Challenges: "Reluctant to change; takes time to adapt", Motivation: "Predictable and stable outcomes; recognition for work" }]
  },
  {
    behaviours_name: "Motivator",
    behaviour_type_name: "(DIS/C) High Dominance, Influence and Steadiness",
    behaviour_desctiption: "This is an extremely rare profile with radically different sets of values and motivations. Achievers are reliable, persistent, tenacious, and industrious individuals with a strong sense of personal accountability. They like to get things done in a friendly but thorough manner. They are focused on results with a strong inclination towards fair play and respect. Their careful planning allows them to complete tasks within realistic timescales. They tend to be thoughtful in favorable conditions and demanding at times of pressure. Achievers are usually cautious and only open up to a small set of people they completely trust. They function at peak efficiency and expect recognition equal to their contribution.",
    suvcm: [{ Strengths: "Dependable, socially skilled, patient, warm, interesting and fun, driven to achieve, self-reliant", Uniqueness: "Clarity on goals and ways to accomplish; control over circumstances", Value_to_ORG: "Confidently suggests innovative ideas; assigns tasks effectively", Challenges: "Being asked to investigate too much detail; routine and regimen", Motivation: "New opportunities; strong need to achieve" }]
  },
  {
    behaviours_name: "Mediator",
    behaviour_type_name: "(ISC/D) High Influence, Steadiness and Compliance",
    behaviour_desctiption: "Mediators are creative, well-spoken, and understanding individuals that enjoy being a team member and helping others succeed. They love being in a supportive role and can bring valuable insights if given the time needed to think. They are rational in problem-solving and adept at presenting arguments in a credible manner. Their insistence on taking things at their own pace might not be agreeable to all. They prefer a cooperative environment where people are trustworthy and pleasant. They thrive on their contribution to projects that require attention to detail. They have high expectations of themselves and others around them and might voice disapproval when their expectations are not met.",
    suvcm: [{ Strengths: "Productive, well-spoken, researching, harmonious, collaborative, co-operative, detail-oriented, patient", Uniqueness: "Accommodating and inspiring", Value_to_ORG: "Skilled and proficient in problem solving; highly skilled", Challenges: "Aversion to risks and being too predictable; not recognized as experts.", Motivation: "Supporting and interacting with others; learning from and teaching to others." }]
  },
  {
    behaviours_name: "Collaborator",
    behaviour_type_name: "(IS/DC) High Influence and Steadiness",
    behaviour_desctiption: "Collaborators are warm, empathetic, easygoing and relaxed individuals that socialize with ease. They tend to think of others first over themselves. They strive to maintain harmony and build long-term relationships. Being good listeners, they make others feel heard and offer suggestions gently. They are sympathetic in nature and fulfil supportive roles well. They often provide recognition to others and attribute less importance to task accomplishment. They love to work in team settings and appreciate environments that ensure stability with minimal change. While they generally avoid conflict and confrontation, they are willing to mediate with others to restore harmony.",
    suvcm: [{ Strengths: "Versatile, warm, responsive, upbeat, respectful, loyal, enthusiastic", Uniqueness: "Group acceptance and approval; friendliness", Value_to_ORG: "Effective listening skills; bring stability and harmony to the team", Challenges: "Conflicting situations; over-commitment; boredom; cannot confront or give direct orders.", Motivation: "Recognition from people around; peaceful environment where they can collaborate with others" }]
  },
  {
    behaviours_name: "Administrator",
    behaviour_type_name: "(DSC/I) High Dominance, Steadiness and Compliance",
    behaviour_desctiption: "Administrators are steady, objective, clear-minded and analytical individuals that get results and keep the team happy at the same time. They have a clear view of their aims in life. Their patience and thoughtfulness help them avoid risks. They guard their thoughts and reveal them only after careful thought and consideration. They choose their words carefully, make practical decisions, and rely upon logic rather than emotion. They possess the drive to track detail and the desire to build the harmony needed to run the team. While being good executors, they rarely bring in the imagination and vision needed for innovative initiatives.They can be both dominant and supportive based on the situation.",
    suvcm: [{ Strengths: "Productive, efficient, practical, pragmatic, thoughtful, detail-oriented, patient", Uniqueness: "Uses logic effectively to get results", Value_to_ORG: "Works with determination; can work individually or with others", Challenges: "Tendency to get overworked; being blunt; not creative", Motivation: "Achieving results by taking time to adapt to changing situations; attention to detail; avoiding risk" }]
  },
  {
    behaviours_name: "Leader",
    behaviour_type_name: "(DIC/S) High Dominance, Influence and Compliance",
    behaviour_desctiption: "Leaders are practical, innovative, self-reliant, and ambitious individuals that are always pushing to makethings better. They are friendly, charming, and enthusiastic in casual circumstances but tend to be direct,forthright, and assertive in formal setups. They like taking responsibility and taking credit for both wins and losses, as long as they have control of the results. They do not shy away from taking command when needed and may be impatient with the inefficiencies of others. They are sensitive to the needs of the team. They find a balance between personal ambitions and group goals. They are very clear thinkers, make good decisions and promote harmony in the team.",
    suvcm: [{ Strengths: "Driven, innovative, practical, self-reliant, leadership ability, confident, clear thinking", Uniqueness: "Accommodating and inspiring; drive to make things better", Value_to_ORG: "Persistently accomplishes goals with inclusivity of team", Challenges: "Impatience when things don’t go a certain way; being managed", Motivation: "Opportunity to get things done in their way; supporting the team" }]
  },
]

const BehaviourAssReport = ({ behaviourReportModel, setBehaviourReportModel }) => {
  const applcant = JSON.parse(localStorage.getItem("applicantProfileData"))
  const [selectedpersonality, setSelectedpersonality] = useState({
    modal_name: "",
    modal_data: {}
  })
  const [applicantPersonality, setApplicantPersonality] = useState();
  const handleClose = () => { setBehaviourReportModel(false) };
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
  const applicantDetailAPI = async () => {
    try {
      const res = await ApplicationDeatilsApi(applcant?.applcant?.user)
      if (res?.data?.success) {
        const personalityKeys = Object.values(res.data.response.applicant_personality_data);
        const updatedBehaviourResponse = behaviourResponse.map(item => ({
          ...item,
          personality_percentage: res.data.response.applicant_personality_data[item.behaviour_type_name] || 0 // Default to 0 if no match
        }));
        const matchedBehaviours = updatedBehaviourResponse.filter(item =>
          personalityKeys.includes(item.behaviour_type_name)
        );
        setApplicantPersonality(matchedBehaviours)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    applicantDetailAPI();
  }, [])
  console.log(applicantPersonality)
  return (
    <>
      <Modal
        show={behaviourReportModel}
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
              {Array.isArray(applicantPersonality) && applicantPersonality.map((item, index) => (
                <Col md={4}>
                  <div className="gray-card" onClick={() => handleCardClick(item)}>
                    <h6>{title[index]}</h6>
                    <p>{content[index]} </p>
                    {/* <p>{item?.behaviour_desctiption}</p> */}
                    <img className="mt-35" src={leaderLarge} />
                    <h2>{item?.behaviours_name}</h2>
                  </div>
                </Col>
              ))}
              {/* <Col md={4}>
                <div className="gray-card" onClick={() => handleCardClick(personality)}>
                  <h6>  Your Secondary Personality</h6>
                  <p>  The secondary personality is less visible and only shown in certain situations or to certain people. This could be aspects of ourselves that we keep more private or that only come out in specific contexts </p>
                  <img src={InfluencerLarge} />
                  <h2>Influencer</h2>
                </div>
              </Col> */}
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