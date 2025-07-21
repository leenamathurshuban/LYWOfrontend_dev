import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Qrcode from "../../images/icons/QR-code.svg";

import Applicants_mail from "../../images/icons/mail-04-primery.svg";
import Downloadprimery from "../../images/icons/download-01-primery.svg";
import logoIcon from "../../images/logo_icon.png";
import CompLogo from "../../images/comp_logo.png";
import Edit03 from "../../images/icons/edit-0303.svg";
import AchieverIcn from "../../images/icons/Achiever-icon.svg";
import LeaderIcn from "../../images/icons/Leader-icon.svg";
import InfluencerIcn from "../../images/icons/Influencer-icon.svg";
import PioneerIcn from "../../images/icons/Pioneer-icon.svg";
import flagODanger from "../../images/icons/flag-o-danger.svg";
import { GetcompanyDetailsApi, getJobDetailsApi, UpdateMultipleJobApi } from '../../services/provider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BehaviourResponse } from '../../utils/behaviour';
import UpdateJobs from '../../components/Jobs/UpdateJobs';

import { FaBold, FaItalic, FaUnderline, FaLink, FaUnlink, FaQrcode } from "react-icons/fa";

const JobSummary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useSelector((state) => state?.login?.loginUserInfo);
    const uid = userInfo?.default_company?.uid;


    const [show, setShow] = useState(true);
    const [inviteModalShow, setInviteModalShow] = useState(false);

    const [data, setData] = useState({})
    const [company, setCompany] = useState({})
    const [skills, setSkills] = useState()
    const [behaviour, setBehaviour] = useState([])

    const [recipients, setRecipients] = useState("");
    const [message, setMessage] = useState("");


    const handleClose = (modalName) => {
        setShow(false)
    };

     const handleInviteClose = () => setInviteModalShow(false);
    const handleInviteShow = () => setInviteModalShow(true);

    const GetCompanyDetails = () => {
        // handleShow();
        GetcompanyDetailsApi(uid)
            .then((res) => {
                // console.log("dispatch calll", res?.response);
                // dispatch(setCompanyProfileDetails(res?.response));
                setCompany(res?.response)
            })

            .catch((error) => {
                if (
                    error?.response?.status === 401 ||
                    error?.response?.data?.detail?.includes(
                        "Given token not valid for any token type"
                    )
                ) {
                    console.log("Token expired, redirecting to login");
                    //   removeToken();
                    //   navigate("/loginwithpassword");
                } else {

                    console.error("An error occurred:", error);
                }
            });
    };
    const getJobDetails = async () => {
        const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-api/${id}/`;
        try {
            const response = await getJobDetailsApi(url);
            if (response?.data?.success) {
                setData(response.data.response)
                const output = response?.data?.response?.skills?.reduce((acc, item) => {
                    acc[item.skill_group.skill_group_name] = acc[item.skill_group.skill_group_name]
                        ? `${acc[item.skill_group.skill_group_name]} ,${item.skill_name}`
                        : item.skill_name;
                    return acc;
                }, {});
                const formattedOutput = Object.entries(output)
                setSkills(formattedOutput)
                const filteredArray = BehaviourResponse.filter((item) => response.data.response.calculation_job[0].personality_data[item.behaviour_type_name]);
                setBehaviour(filteredArray)
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        getJobDetails()
        GetCompanyDetails()
    }, [])
    const handlePostJob = async () => {
        const formData = new FormData();
        formData.append('job_uids', JSON.stringify([id]))
        formData.append('job_status', 'Active')
        const res = await UpdateMultipleJobApi(formData)
        if (res.data.success) {
            navigate('/jobs')
        }
    }
    //<------------------------------------Edit job--------------------------------------------->
    const [modal, setModal] = useState({
        createModal: false,
        MoreFilterModal: false,
        createJobRevisedModal: false,
    });
    const handleShow = (modalName) => {
        setModal((prevModals) => ({
            ...prevModals,
            [modalName]: true,
        }));
        setShow(false)
    };
    const handleClose1 = (modalName) => {
        setModal((prevModals) => ({
            ...prevModals,
            [modalName]: false,
        }));
        setShow(true)
    };
    const handleCopy = (link) => {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                // setCopied(true);
                // setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch((err) => console.error("Failed to copy: ", err));
    };
    //<-----------------------------------End of code--------------------------------------------->
    console.log(data)
    console.log(behaviour)
    console.log(location)
    return (
        <>
            <div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    animation={false}
                    size="lg"
                    backdrop={false}
                    className="jobrevised_mdl"
                >
                    <Modal.Header closeButton>
                        <img src={logoIcon} className="me-4" />
                        <Modal.Title>
                            {/* Sr. Developer - Python */}
                            {data?.job_title}
                            <span className="subtitle">{data?.job_location?.location_name}, {data?.department?.department_name}, {data?.job_type}, {data?.workplace_type}</span>
                            {location?.state && (
                                <button type="button" className="edit-btnicon">
                                    <img src={Edit03} />
                                </button>
                            )}
                        </Modal.Title>
                        {/* {location?.state && (
                        <button type="button" className="view-btnicon" style={{ right: '65px' }}>
                            <img src={Edit03} />
                        </button>
                    )} */}
                    </Modal.Header>
                    <Modal.Body className="bg-lightgray job-summary-profile px-4">
                        <div className="jobrvsd_head d-flex justify-content-between align-items-center">
                            <h6>Job Summary</h6>
                            <ul className="list-inline">
                                <li>
                                    <a href='javascript:void(0);' onClick={handleInviteShow}><img src={Applicants_mail} />Invite Applicants</a>
                                </li>
                                <li>
                                    <a href="#"><img src={Downloadprimery} />Download</a>
                                </li>
                            </ul>
                        </div>
                        <Card className="card-light mt-3">
                            <Card.Body>
                                <Card.Title>Company Information</Card.Title>
                                <div className="compinfo_head">
                                    <span className="complogo">
                                        {/* <img src={CompLogo} /> */}
                                        <img src={'https://bittrend.shubansoftware.com' + company?.logo} />
                                    </span>
                                    <div className="compinfo-text">
                                        <h6>{company?.company_name}, <span className="text-lightgray"> {company?.location?.location_name}, India</span></h6>
                                        <ul className="list-inline">
                                            <li>{company?.website_url}</li>
                                            <li>{company?.industry?.industry_name}</li>
                                            <li>{company?.company_type}</li>
                                            <li>{company?.number_of_employees}</li>
                                        </ul>
                                    </div>
                                </div>
                                <Card.Text className="mt-3" dangerouslySetInnerHTML={{ __html: company?.description }}></Card.Text>
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col md={6}>
                                <Card className="card-light mt-3">
                                    <Card.Body>
                                        <Card.Title>Requirements</Card.Title>
                                        <table className="reqinfo_table">
                                            <tr>
                                                <td>Salary</td>
                                                <td><strong>
                                                    {data?.currency == "INR" ? 'Rs.' : data?.currency}{data?.min_salary ? data?.min_salary : ''} - {data?.max_salary ? data?.max_salary : ''} {data?.salary_type} <img src={flagODanger} /></strong></td>
                                                <td><span>{data?.display_salary ? 'Don’t Display' : ''}, {data?.non_negotiable_salary ? 'Non Negotiable' : ''}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Target Hire Date</td>
                                                <td><strong>{data?.targate_hire_date ? data?.targate_hire_date : 'Immediate'}</strong></td>
                                                <td><span>{data?.explore_buy_out_option && 'will explore buy out option'}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Experience</td>
                                                <td><strong>{data?.min_exp} - {data?.max_exp} Years <img src={flagODanger} /></strong></td>
                                                <td><span>
                                                    {data?.restricted_industries && (
                                                        <>Industries: {data?.shortlisted_industry?.length ? data?.shortlisted_industry?.map((val) => (
                                                            <>{val?.industry_name}</>
                                                        )) : ''}</>
                                                    )}<br />
                                                    {data?.define_current_role && (
                                                        <>Roles: {data?.restricted_roles?.length ? data?.restricted_roles?.map((val) => (
                                                            <>{val?.is_like_name}</>
                                                        )) : ''}</>
                                                    )}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Language</td>
                                                <td>{data?.no_specific_language_require && (
                                                    <>{data?.read_write_language?.length ? data?.read_write_language?.map((val) => (
                                                        <strong>{val?.language_name}</strong>
                                                    )) : ''}</>
                                                )}
                                                </td>
                                                <td><span>{data?.explore_buy_out_option && 'will explore buy out option'}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Education</td>
                                                <td><strong>{data?.minimum_education ? data?.minimum_education : ''}</strong></td>
                                                <td><span>{data?.area_of_education?.length ? data?.area_of_education?.map((val) => (
                                                    <>{val?.qualification_name}</>
                                                )) : ''}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Geography</td>
                                                <td><strong>{data?.preferred_geography?.length ? data?.preferred_geography?.map((val) => (
                                                    <>{val?.location_name}</>
                                                )) : ''}</strong></td>
                                                <td><span>{data?.explore_buy_out_option && 'will explore buy out option'}</span></td>
                                            </tr>
                                        </table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="card-light mt-3">
                                    <Card.Body>
                                        <Card.Title>Skills</Card.Title>
                                        <ul className="skills_list">
                                            {skills?.map(([skill_group_name, skill_name], index) => (
                                                <li><span>{skill_group_name}</span><strong>{skill_name}</strong></li>
                                            ))}
                                            {data?.must_have_skills?.map((item) => (
                                                <li><span>{item?.skill_group?.skill_group_name}</span><strong>{item?.skill_name}<i className="fa fa-star text-primery ms-1"></i></strong></li>
                                            ))}
                                            {/* <li><span>Software Languages</span><strong>Java,Python<i className="fa fa-star text-primery ms-1"></i></strong></li>
                                        <li><span>Art And Design</span><strong>Adobe Photoshop,Figma,<i className="fa fa-star text-primery ms-1"></i> CorelDRAW</strong></li>
                                        <li><span>Productivity Tools</span><strong>Powerpoint, Excel</strong></li> */}
                                        </ul>
                                        <h6 className="text-base mt-4">Custom Questions</h6>
                                        <ul className="customq_list">
                                            {/* <li>
                                            <p>Are there any constraints or considerations we should know about, such as location, work hours, or travel?</p>
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    id="custom-checkbox"
                                                    label="No"
                                                    checked
                                                    className="success-check"
                                                />
                                            </Form>
                                        </li> */}
                                            {data?.question_job?.map((Val) => (
                                                <li>
                                                    <p>{Val?.question_title} {Val?.is_mandatory && <i className="fa fa-star text-primery ms-1"></i>}</p>
                                                    <Form>
                                                        {Val?.questions_answer?.map((val) => (
                                                            <Form.Check
                                                                type="checkbox"
                                                                id="custom-checkbox"
                                                                checked
                                                                label={val}
                                                                className="success-check"
                                                            />
                                                        ))}
                                                    </Form>
                                                </li>
                                            ))}
                                        </ul>
                                        <a href="#" className="btn-scroll">Scroll for more</a>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Card className="card-light mt-3 mb-5">
                            <Card.Body>
                                <Card.Title>Ideal Behaviour and Personalities</Card.Title>
                                <div className="bsment_tag">
                                    <h6>Behaviour Assessment</h6>
                                    <div className="taglist">
                                        {data?.calculation_job?.[0]?.behaviour?.map((item) => (
                                            <span className="bs_tag">{item?.behaviour_name}</span>
                                        ))}
                                        {data?.calculation_job?.[0]?.important_behaviour?.map((item) => (
                                            <span className="bs_tag">{item?.behaviour_name}<i className="fa fa-star text-primery ms-1"></i></span>
                                        ))}
                                        {/* <span className="bs_tag">Accuracy<i className="fa fa-star text-primery ms-1"></i></span>
                                    <span className="bs_tag">Thoughtfulness</span>
                                    <span className="bs_tag">Cooperativeness</span>
                                    <span className="bs_tag">Self Motivation</span>
                                    <span className="bs_tag">Friendliness<i className="fa fa-star text-primery ms-1"></i></span>
                                    <span className="bs_tag">Patience</span> */}
                                    </div>
                                </div>
                                <Row className="mt-3">
                                    {behaviour?.map((Val) => (
                                        <Col md={3}>
                                            <div className="perlitymth-card">
                                                <div className="perlitymth-head">
                                                    <span className="prtmth_icon"><img src={LeaderIcn} /></span>
                                                    <div className="prtmth_title">
                                                        <h6>{Val?.behaviours_name}</h6>
                                                        <span>83%</span>
                                                    </div>
                                                </div>
                                                <div className="perlitymth-body">
                                                    <p className="m-0">{Val?.behaviour_desctiption}</p>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                    {/* <Col md={3}>
                                    <div className="perlitymth-card">
                                        <div className="perlitymth-head">
                                            <span className="prtmth_icon"><img src={InfluencerIcn} /></span>
                                            <div className="prtmth_title">
                                                <h6>Influencer</h6>
                                                <span>83%</span>
                                            </div>
                                        </div>
                                        <div className="perlitymth-body">
                                            <p className="m-0">They are in constant pursuit of innovative solutions and seek new horizons</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="perlitymth-card">
                                        <div className="perlitymth-head">
                                            <span className="prtmth_icon"><img src={PioneerIcn} /></span>
                                            <div className="prtmth_title">
                                                <h6>Pioneer</h6>
                                                <span>83%</span>
                                            </div>
                                        </div>
                                        <div className="perlitymth-body">
                                            <p className="m-0">They are in constant pursuit of innovative solutions and seek new horizons</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="perlitymth-card">
                                        <div className="perlitymth-head">
                                            <span className="prtmth_icon"><img src={AchieverIcn} /></span>
                                            <div className="prtmth_title">
                                                <h6>Achiever</h6>
                                                <span>83%</span>
                                            </div>
                                        </div>
                                        <div className="perlitymth-body">
                                            <p className="m-0">They are in constant pursuit of innovative solutions and seek new horizons</p>
                                        </div>
                                    </div>
                                </Col> */}
                                </Row>
                            </Card.Body>
                        </Card>
                        <Offcanvas 

                    show={inviteModalShow}
                    onHide={handleInviteClose}
                    placement="end" 

                    className="invite-people-modal"

                >

            <Offcanvas.Header className='justify-content-between' closeButton>
          <Offcanvas.Title>  {data?.job_title} </Offcanvas.Title>
        </Offcanvas.Header>


          <Offcanvas.Body>
            
            <Tabs
      defaultActiveKey="Link"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab className='link-tab' eventKey="Link" title="Link">
        <div className='sharing-link'>
<Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Link</Form.Label>
        <div className='d-flex'>
        <Form.Control type="email" placeholder="name@example.com" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit nam tempor est at consectetur sollicitudin" />
      <Button style={{width: '150px'}} className='ms-3' variant="primary">Copy Link</Button>
     </div>
      </Form.Group>


     <Form.Check aria-label="option 1" label="Shorten Link" />

    </Form>

            </div>
      </Tab>
      <Tab className='Qr-code-tab' eventKey="QRCode" title="QRCode">
        <img src={Qrcode} className='img-fluid' alt='Qr code'/> <br></br>
        <Button width="150" className='mt-3' variant="primary">Copy QR Code</Button>
      </Tab>
      <Tab className='main-tab' eventKey="Main" title="Main" >
        <Form>
        <Form.Group className="mb-3" controlId="formRecipients">
          <Form.Label><strong>Recipients</strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipient emails"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="for mMessage">
          <Form.Label><strong>Message</strong></Form.Label>

          <div
            className="border p-2 mb-2"
            style={{
              borderRadius: "6px",
              borderColor: "#ccc",
              display: "flex",
              gap: "10px",
            }}
          >
            <FaBold />
            <FaItalic />
            <FaUnderline />
            <FaLink />
            <FaUnlink />
          </div>

          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-2 mt-2 mb-3">
          <Button variant="outline-secondary">
            <FaLink className="me-1" />
            Insert Link
          </Button>
          <Button variant="outline-secondary">
            <FaQrcode className="me-1" />
            Insert QR
          </Button>
        </div>

        <Button variant="primary" type="submit">
          Send Mail
        </Button>
      </Form>

      
      </Tab>
    </Tabs>
            
            </Offcanvas.Body>



        </Offcanvas>

                    </Modal.Body>
                    {/* {location.state && ( */}
                    <Modal.Footer>
                        <Button className="me-3 btn btn-light" onClick={() => handleShow("createModal")} >
                            Edit Job
                        </Button>
                        <Button className="btn btn-primary" onClick={handlePostJob}>
                            Post Job
                        </Button>
                    </Modal.Footer>
                    {/* )} */}
                </Modal>
                {modal.createModal && (
                    <UpdateJobs
                        show={modal.createModal}
                        handleClose={() => handleClose1("createModal")}
                        editData={data}
                    />
                )}
            </div>
        </>
    )
}

export default JobSummary