import React from "react";


const SideCard = ({ candidateDetails }) => {
    // debugger
    return (
        <div className="candidate-card">
            <div className="header">
                <div className="title-section">
                    <h2>Leader</h2>
                    <span className="score">83%</span>
                </div>
                <p className="description">
                    They are in constant pursuit of innovative solutions and seek new horizons
                </p>
            </div>

            <div className="match-section">
                <div className="match">
                    <p>Job Match</p>
                    <span className="excellent">Excellent ✅</span>
                </div>
                <div className="match">
                    <p>Behaviour Match</p>
                    <span className="good">Good 🙂</span>
                </div>
            </div>

            <div className="contact-info">
                <p>  {candidateDetails?.user?.phone_number}</p>
                <p> {candidateDetails?.user?.email}</p>
            </div>

            <div className="details">
                <p>
                    {candidateDetails?.qualification_applicantprofile?.map((edu) => (
                        <>{edu?.level}</>
                    ))}
                </p>
                <p>
                    {candidateDetails?.work_applicant?.map((exp) => (
                        <>
                            {exp?.total_work_experience}
                        </>
                    ))}

                </p>
                <p>{candidateDetails?.expected_salary} per annum</p>
                <p>{candidateDetails?.notice_period} notice period</p>
            </div>

            <div className="history">
                <p><strong>Previous Company:</strong> Selligion Technologies PVT ltd</p>
                <p><strong>Previous Designation:</strong> Senior Product Manager</p>
            </div>

            <div className="skills">
                <p><strong>Skills:</strong></p>
                <p>
                    {candidateDetails?.applicant_profile_job?.[0]?.job_applicant_skill?.map((skl) => (
                        <span className="badge-gray">{skl?.skill_name},</span>
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