import React, { useEffect, useState } from "react";

import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Nav,
  ProgressBar,
  Row,
  Spinner,
  Tab,
  Table,
} from "react-bootstrap";
import HomeIcon from "../../images/icons/HomeIcon.png";
import UserIcon from "../../images/icons/UserIcon.png";
import Logo from "../../images/logo_icon.png";
import Global from "../../images/Global.png";
import Share from "../../images/ShareIcon.png";
import Doc from "../../images/DocumentIcon.png";
import Download from "../../images/DownloadIcon.png";
import { getPostJobIdApi } from "../../services/provider";
import { useParams } from "react-router-dom";

const JobPosts = () => {
  const { id } = useParams();
  const [jobPostData, setJobPostData] = useState({});
  const GetJobPostWithId = async () => {
    try {
      const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/${id}`;
      // const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-by-encoded-uid/NDFhZGM5ZWQyZg/`;
      const data = await getPostJobIdApi(url);
      //console.log("dat----->>>>",data)
      setJobPostData(data?.data?.response);
      // console.log(
      //   "dat--sss---->>>>",
      //   JSON.stringify(data?.data?.response, null, 4)
      // );
    } catch (error) {
      console.log("error------>>>>", error);
    }
  };

  useEffect(() => {
    console.log("urlID----->>>>", id);

    GetJobPostWithId();
  }, [id]);

  // useEffect(() => {
  //   GetJobPostWithId();
  // }, []);

  const jobDetailsList = [
    {
      tittle: "Role",
      value: jobPostData?.job_title,
    },
    {
      tittle: "Is Like",
      value: jobPostData?.is_like?.[0]?.is_like_name,
    },
    {
      tittle: "Experience",
      value: `${jobPostData?.min_exp} - ${jobPostData?.max_exp} years `,
    },
    {
      tittle: "Division",
      value: "Technology",
    },
    {
      tittle: "Department",
      value: jobPostData?.department?.department_name,
    },
    {
      tittle: "Key Skills ",
      // value: jobPostData?.skills[0]?.skill_name,
      value: "skilll",
    },
    {
      tittle: "Education ",
      // value: jobPostData?.area_of_education[0],
      value: "Masters",
    },
    {
      tittle: "Focus Area",
      value: "Electronics/Telecommunication, Information Technology, Computers",
    },
    {
      tittle: "Job Type ",
      value: jobPostData?.job_type,
    },
    {
      tittle: "Workplace Type",
      value: jobPostData?.workplace_type,
    },
    {
      tittle: "Requires Travel",
      value: jobPostData?.requires_travel,
    },
    {
      tittle: "Language ",
      value: "English, Hindi, Marathi",
    },
  ];
  return (
    <Container fluid>
      <Row className="shadow-xs border-1 p-2 bg-grey">
        <Col className="d-flex align-items-center">
          <img src={Logo} alt="Logo Icon" />
          <h6 className="my-3 pagetitle">
            Job Application <strong>{jobPostData?.job_title}</strong>
          </h6>
        </Col>
        <Col className="d-flex justify-content-md-end">
          <img src={HomeIcon} alt="Home Icon" />
          <img src={UserIcon} alt="User Icon" />
        </Col>
      </Row>

      <Row>
        <Col md={10} className="bg-grey">
          <Row>
            <img
              src={Global}
              alt="Global"
              style={{ width: "60px", height: "40px" }}
            />
            <Col>
              <h5>{jobPostData?.job_title}</h5>
              <p>
                {jobPostData?.job_company?.company_name},{" "}
                {jobPostData?.job_company?.location}
              </p>
              <div className="d-flex flex-wrap">
                <p>{jobPostData?.job_location?.location_name}</p>
                <p>
                  {jobPostData?.currency} {jobPostData?.min_salary} -{" "}
                  {jobPostData?.max_salary}
                  {jobPostData?.salary_type}
                </p>
                <p>
                  {jobPostData?.min_exp} - {jobPostData?.max_exp} years
                </p>
                <p>{jobPostData?.job_company?.number_of_employees}</p>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-wrap">
                <img
                  src={Share}
                  alt="Global"
                  style={{ width: "60px", height: "40px" }}
                />
                <img
                  src={Download}
                  alt="Global"
                  style={{ width: "60px", height: "40px" }}
                />
                <img
                  src={Doc}
                  alt="Global"
                  style={{ width: "60px", height: "40px" }}
                />
                <div className="d-flex gap-2 mb-2">
                  <Button variant="light">Not for Me</Button>
                  <Button variant="primary">Apply Now</Button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            {/* <Col md={8} className="bg-danger">
              <h5>Job Description</h5>
              <p>
                Nunc elementum mi augue, nec pretium massa eleifend quis. Etiam
                mollis velit id sapien facilisis, eget feugiat felis maximus.
                Donec interdum tortor quis lorem sollicitudin, sed molestie dui
                rhoncus. Ut condimentum rutrum neque sit amet dictum. Duis
                commodo quam et dui malesuada mollis. Maecenas tristique, sapien
                id consectetur fermentum, diam velit vulputate ante, at
                imperdiet nisl risus id lorem. Integer semper mi nec
                sollicitudin pulvinar. Integer finibus feugiat odio quis
                accumsan.
              </p>

              <h6>Role & responsibilities</h6>
              <ul>
                <li>
                  Integration of user-facing elements developed by front-end
                  
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                  
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                 
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                 
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                 
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                 
                </li>
              </ul>

              <h6>Preferred candidate profile</h6>
              <ul>
                <li>
                  Integration of user-facing elements developed by front-end
                  
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                  
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                 
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                 
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                 
                </li>
                <li>
                  Integration of user-facing elements developed by front-end
                 
                </li>
              </ul>

            </Col> */}

            <Col md={8}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Job Description</h5>
                  <p className="card-text">
                    {/* Nunc elementum mi augue, nec pretium massa eleifend quis.
                    Etiam mollis velit id sapien facilisis, eget feugiat felis
                    maximus. Donec interdum tortor quis lorem sollicitudin, sed
                    molestie dui rhoncus. Ut condimentum rutrum neque sit amet
                    dictum. Duis commodo quam et dui malesuada mollis. Maecenas
                    tristique, sapien id consectetur fermentum, diam velit
                    vulputate ante, at imperdiet nisl risus id lorem. Integer
                    semper mi nec sollicitudin pulvinar. Integer finibus feugiat
                    odio quis accumsan. */}
                    {jobPostData?.detailed_description}
                  </p>

                  {/* <h6>Role & responsibilities</h6>
                  <ul>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                  </ul>

                  <h6>Preferred candidate profile</h6>
                  <ul>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                    <li>
                      Integration of user-facing elements developed by front-end
                    </li>
                  </ul> */}
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Job Details</h5>
                  {jobDetailsList.map((item) => {
                    return (
                      <div className="d-flex justify-content-between">
                        <p className="mb-0">{item.tittle}</p>
                        <p className="mb-0">{item.value}</p>{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col className="mt-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">About the Company</h5>
                  <Row>
                    <img
                      src={Global}
                      alt="Global"
                      style={{ width: "60px", height: "40px" }}
                    />
                    <Col>
                      <p>{jobPostData?.job_company?.company_name}</p>
                      <div className="d-flex flex-wrap">
                        <p>{jobPostData?.job_location?.location_name}</p>
                        <p>
                          {jobPostData?.currency} {jobPostData?.min_salary} -{" "}
                          {jobPostData?.max_salary}
                          {jobPostData?.salary_type}
                        </p>
                        <p>
                          {jobPostData?.min_exp} - {jobPostData?.max_exp} years
                        </p>
                        <p>{jobPostData?.job_company?.number_of_employees}</p>
                      </div>
                    </Col>
                  </Row>
                  <p>{jobPostData?.detailed_description}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={2} className="bg-white">
          <div className="d-flex justify-content-center mt-4">
            <Button variant="outline-dark">About our Process</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default JobPosts;
