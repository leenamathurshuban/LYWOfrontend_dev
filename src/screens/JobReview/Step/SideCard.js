import React from "react";
import LeaderIcon from "../../../images/icons/Leader-icon.svg"
import phoneGray from "../../../images/icons/phone_gray.svg"
import gradHat from "../../../images/icons/graduation-hat-gray.svg"
import emailGray from "../../../images/icons/email_gray.svg"
import calendarGray from "../../../images/icons/calendar_gray.svg"
import briefcaseGray from "../../../images/icons/briefcase-01_gray.svg"
import walletGray from "../../../images/icons/wallet-04_gray.svg"
const title = ['Your Dominant Personality', 'Your Secondary Personality']
const content = ['The dominant personality signifies the traits and behaviors that the you most closely associate with and are easily observable.',
  'The secondary personality is less visible and only shown in certain situations or to certain people. This could be aspects of ourselves that we keep more private or that only come out in specific contexts'
]

const SideCard = ({ candidateDetails,applicantPersonality }) => {
    // debugger
    return (
        <div className="candidate-card">
            <div className="header">
                <img src={LeaderIcon} alt=""/>
                <div className="title-section ms-2 pt-1">
                    <h2>{applicantPersonality?.[0]?.behaviours_name}</h2>
                    <span className="score">{applicantPersonality?.[0]?.personality_percentage}%</span>
                </div>
                <p className="description">
                    {/* They are in constant pursuit of innovative solutions and seek new horizons */}
                    {applicantPersonality?.[0]?.behaviour_desctiption}
                </p>
            </div>

            <div className="match-section">
                <div className="match">
                    <p>Job Match</p>
                    <span className="good">Excellent ✅</span>
                </div>
                <div className="match">
                    <p>Behaviour Match</p>
                    <span className="excellent">Good 🙂</span>
                </div>
            </div>

            <div className="contact-info">
                <ul>
                    <li><img src={phoneGray} alt=""/>{candidateDetails?.user?.phone_number}</li>
                    <li><img src={emailGray} alt=""/>{candidateDetails?.user?.email}</li>
                    <li>
                        <img src={gradHat} alt=""/>
                        {candidateDetails?.qualification_applicantprofile?.map((edu) => (
                        <>{edu?.level}</>
                        ))}
                    </li>
                    <li>
                        <img src={briefcaseGray} alt=""/>
                        {candidateDetails?.work_applicant?.map((exp) => (
                        <>
                            {exp?.total_work_experience}
                        </>
                        ))}
                    </li>
                    <li><img src={walletGray} alt=""/>{candidateDetails?.expected_salary} per annum</li>
                    <li><img src={calendarGray} alt=""/>{candidateDetails?.notice_period} notice period</li>
                </ul>        
            </div>
            <div className="history">
                <h6>Previous Company</h6>
                <p>Selligion Technologies PVT ltd</p>
                <h6>Previous Designation</h6>
                <p className="mb-1">Senior Product Manager</p>
            </div>

            <div className="skills">
                <h6>Skills</h6>
                <p className="mb-0">
                    {candidateDetails?.applicant_profile_job?.[0]?.job_applicant_skill?.map((skl) => (
                        <span className="badge-gray">{skl?.skill_name}, </span>
                    ))}
                </p>
            </div>
            <div className="score-bar">
                <p>Candidate's Score vs Stage progress</p>
                <div className="progress">
                    <div className="filled" style={{ width: '21%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default SideCard;