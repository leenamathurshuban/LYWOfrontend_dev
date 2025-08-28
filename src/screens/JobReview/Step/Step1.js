import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Step1 = ({ candidateDetails }) => {
    // debugger
    return (
        <>
            <Row className="apcnt_info">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Basic Details</h6>
                    <ul className='bulted_list inline-list'>
                        <li>{candidateDetails?.user?.username}</li>
                        <li>{candidateDetails?.user?.phone_number}</li>
                        <li>{candidateDetails?.user?.email}</li>
                    </ul>
                </Col>
            </Row>
            <Row className="apcnt_info availability">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Availability</h6>
                    <ul className='bulted_list inline-list'>
                        <li> Available by {candidateDetails?.availble_by}</li>
                        <li>{candidateDetails?.willing_to_relocate_to && 'Willing to travel for job'}</li>
                        <li>{candidateDetails?.currently_working && 'Currently working'}</li>
                        <li>Notice period {candidateDetails?.notice_period}</li>
                        <li> Notice buyout {!candidateDetails?.notice_buyout_available && 'not'} available</li>
                    </ul>
                </Col>
            </Row>
            <Row className="apcnt_info availability">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Salary</h6>
                    <p>Expected Salary {candidateDetails?.expected_salary}</p>
                </Col>
            </Row>
             <Row className="apcnt_info availability">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Education Details</h6>
                     <p>
                        {candidateDetails?.qualification_applicantprofile?.map((edu) => (
                            <>{edu?.level}</>
                        ))}
                    </p>
                </Col>
            </Row>
            <Row className="apcnt_info experience">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Work Experience</h6>
                    <ul>
                        {candidateDetails?.work_applicant?.map((exp) => (
                            <li>
                                {exp?.work_from} - {exp?.work_to} {exp?.role},{exp?.work_industry},{exp?.work_company}
                                <p>{exp?.note}</p>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
            <Row className="apcnt_info language">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Language</h6>
                    <div className='d-flex mt-2'>
                        <strong>Speak</strong> {candidateDetails?.spoken_language?.map((lang) => (
                            <ul className='bulted_list inline-list ms-2'>
                                <li><span>{lang?.language_name}</span></li>
                            </ul>
                        ))}
                    </div>
                    <div className='d-flex mt-2'>
                         <strong>Write</strong> {candidateDetails?.written_reading_language?.map((lang) => (
                             <ul className='bulted_list inline-list ms-2'>
                                <li><span>{lang?.language_name}</span></li>
                            </ul> 
                        ))}
                    </div>
                </Col>
            </Row>
             <Row className="apcnt_info skills">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Skills</h6>
                    <ul className='bulted_list inline-list mt-2'>
                        {candidateDetails?.applicant_profile_job?.[0]?.job_applicant_skill?.map((skl) => (
                            <li><span className="badge-gray">{skl?.skill_name}</span></li>
                        ))}
                    </ul>
                </Col>
            </Row>
             <Row className="apcnt_info availability">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Geography</h6>
                    <div>
                        Current City
                        {candidateDetails?.current_location}
                        {!candidateDetails?.willing_to_relocate_to && 'Not'} willing to relocate
                        {!candidateDetails?.require_company_assistance_for_relocation && 'Not'} require company assistance for relocation
                    </div>
                </Col>
            </Row>
             <Row className="apcnt_info availability">
                <Col md={12} className="border-b py-3">
                    <h6 className="h6-title">Custom Questions</h6>
                    <p>data</p>
                </Col>
            </Row> 
        </>
    )
}

export default Step1