// import React, { useState } from "react";
// import {
//   Breadcrumb,
//   Button,
//   Card,
//   Col,
//   Container,
//   Modal,
//   Row
// } from "react-bootstrap";
// import FileUploader from "../../components/FileUploader";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import CompanyEditProfile from "../../components/CompanyEditProfile";
// import Header from "../../components/Header";
// import Sidebar from "../../components/Sidebar";
// import { logoMaker, removeToken } from "../../helpers/helper";
// import { liwotextlogo } from "../../images/assest";
// import { GetcompanyDetailsApi } from "../../services/provider";
// import { setCompanyProfileDetails } from "../../Slice/Login/LoginSlice";
// import logoIcon from "../../images/logo_icon.png";
// import pink_brb from "../../images/icons/pink_brb.svg";
// import choice_brb from "../../images/icons/choice_brb.svg";
// import stack2_brb from "../../images/icons/stack 2_brb.svg";
// import option_brb from "../../images/icons/option_brb.svg";
// import infogray from "../../images/icons/info_gray.svg";
// import globgray from "../../images/icons/glob_gray.svg";
// import leaderLarge from "../../images/icons/Leader-icon.svg";
// import InfluencerLarge from "../../images/icons/Influencer-icon.svg";
// import QuizSlider from "../../components/QuizSlider";

// const Dashboard = () => {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userInfo = useSelector((state) => state.login.loginUserInfo);

//   const uid = userInfo?.uid;

//   const logoname = logoMaker(
//     userInfo?.default_company?.company_name ?? "Infograins Techno"
//   );


//  // console.log("logoname-----",logoname)
//   const GetCompanyDetails = (uid) => {
//     handleShow();
//     GetcompanyDetailsApi(uid)
//       .then((res) => {
//         console.log("dispatch calll", res?.response);
//         dispatch(setCompanyProfileDetails(res?.response));
//       })

//       .catch((error) => {

//         if (
//           error?.response?.status === 401 ||
//           error?.response?.data?.detail?.includes(
//             "Given token not valid for any token type"
//           )
//         ) {
//           console.log("Token expired, redirecting to login");
//           removeToken();
//           navigate("/loginwithpassword");
//         } else {

//           console.error("An error occurred:", error);
//         }
//       });
//   };

//   return (
//     <>
//       <Sidebar />
//       <Header />
//       <div className="page-body">
//         <Container fluid>
//           <Row>
//             <Col md={12}>
//               <Breadcrumb>
//                 {/* <Breadcrumb.Item href="#">login</Breadcrumb.Item> */}
//                 <Breadcrumb.Item active>
//                   <svg
//                     width="14"
//                     height="14"
//                     viewBox="0 0 14 14"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M7.99399 0.486544C7.34689 0.284433 6.65354 0.284433 6.00645 0.486544C5.60022 0.613424 5.2493 0.83726 4.88623 1.12924C4.53418 1.41235 4.13141 1.79274 3.63296 2.26351L1.82204 3.97381C1.38439 4.38689 1.08149 4.67279 0.860138 5.0183C0.664557 5.32359 0.520092 5.65874 0.432436 6.01055C0.333227 6.40872 0.333352 6.82523 0.333533 7.42704L0.333522 9.98707C0.333261 10.6153 0.333076 11.0602 0.435771 11.4434C0.713173 12.4787 1.52182 13.2874 2.55709 13.5648C2.94035 13.6675 3.38525 13.6673 4.01344 13.667C4.23508 13.6671 4.46264 13.6794 4.67864 13.6216C5.13876 13.4983 5.49816 13.1389 5.62145 12.6787C5.66804 12.5049 5.66745 12.313 5.66697 12.1565L5.66688 10.3337C5.66688 9.99851 5.66895 9.90855 5.67919 9.84388C5.74697 9.41599 6.08256 9.0804 6.51045 9.01263C6.57512 9.00239 6.66507 9.00032 7.00022 9.00032C7.33536 9.00032 7.42531 9.00239 7.48998 9.01263C7.91788 9.0804 8.25347 9.41599 8.32124 9.84388C8.33148 9.90855 8.33355 9.99851 8.33355 10.3337L8.33346 12.1565C8.33298 12.313 8.3324 12.5049 8.37898 12.6787C8.50227 13.1389 8.86167 13.4983 9.32179 13.6216C9.53778 13.6794 9.76534 13.6671 9.98698 13.667C10.6152 13.6673 11.0601 13.6675 11.4433 13.5648C12.4786 13.2874 13.2873 12.4787 13.5647 11.4434C13.6674 11.0602 13.6672 10.6153 13.6669 9.9871L13.6669 7.42703C13.6671 6.82524 13.6672 6.40871 13.568 6.01055C13.4803 5.65874 13.3359 5.32359 13.1403 5.0183C12.9189 4.67279 12.616 4.38689 12.1784 3.97382L10.3675 2.26353C9.86903 1.79275 9.46626 1.41235 9.11421 1.12924C8.75113 0.83726 8.40022 0.613424 7.99399 0.486544Z"
//                       fill="#6172F3"
//                     />
//                   </svg>
//                   Home
//                 </Breadcrumb.Item>
//               </Breadcrumb>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={12}>
//               <h1 className="h1_welcometext">
//                 Get started on your journey to{" "}
//                 <strong>build the dream team</strong>
//               </h1>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={4}>
//               <Card className="mdt_card">
//                 <Card.Body>
//                   <span className="mdt_icon">
//                     <svg
//                       width="34"
//                       height="34"
//                       viewBox="0 0 34 34"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fill-rule="evenodd"
//                         clip-rule="evenodd"
//                         d="M17.2293 0.333087C18.555 0.332369 19.5394 0.331836 20.3922 0.56033C22.6928 1.17678 24.4898 2.97376 25.1062 5.27437C25.2553 5.83088 25.3069 6.44347 25.3245 7.17038C25.8392 7.24227 26.3106 7.34438 26.7569 7.48938C29.8013 8.47856 32.1881 10.8654 33.1773 13.9098C33.4085 14.6213 33.5307 15.3968 33.5951 16.309C33.1455 19.3627 30.64 21.7344 27.5231 21.9797C27.2784 21.9989 26.9722 22.0002 26.1667 22.0002H18.6665V21.6674C18.6665 20.7469 17.9203 20.0007 16.9998 20.0007C16.0794 20.0007 15.3332 20.7469 15.3332 21.6674V22.0002H7.83337C7.02784 22.0002 6.72165 21.9989 6.47698 21.9797C3.36026 21.7344 0.854861 19.3629 0.405015 16.3095C0.469485 15.3971 0.591649 14.6214 0.82286 13.9098C1.81204 10.8654 4.19888 8.47856 7.24325 7.48938C7.68951 7.34439 8.16096 7.24228 8.67554 7.17039C8.69318 6.44348 8.74475 5.83089 8.89387 5.27437C9.51032 2.97376 11.3073 1.17678 13.6079 0.56033C14.4607 0.331836 15.4451 0.332369 16.7707 0.333087H17.2293ZM12.0164 7.00185C12.1696 7.00103 12.3261 7.00054 12.4862 7.00024H21.514C21.674 7.00054 21.8305 7.00103 21.9837 7.00185C21.9684 6.57128 21.9396 6.3354 21.8865 6.13711C21.5782 4.9868 20.6797 4.08831 19.5294 3.78008C19.159 3.68082 18.6573 3.6665 17 3.6665C15.3428 3.6665 14.8411 3.68082 14.4706 3.78008C13.3203 4.08831 12.4218 4.9868 12.1136 6.13711C12.0605 6.3354 12.0317 6.57128 12.0164 7.00185Z"
//                         fill="#6172F3"
//                       />
//                       <path
//                         d="M15.3332 25.6674V25.3336L7.75031 25.3336C7.05594 25.3336 6.60816 25.3337 6.21545 25.3027C3.96527 25.1257 1.92752 24.2097 0.34375 22.7965C0.371266 24.4373 0.470257 25.6716 0.82286 26.7568C1.81204 29.8012 4.19888 32.188 7.24325 33.1772C8.7535 33.6679 10.5525 33.6674 13.3341 33.6667H20.666C23.4477 33.6674 25.2467 33.6679 26.7569 33.1772C29.8013 32.188 32.1881 29.8012 33.1773 26.7568C33.5299 25.6716 33.6289 24.4373 33.6564 22.7964C32.0726 24.2097 30.0349 25.1257 27.7846 25.3027C27.3919 25.3337 26.9441 25.3336 26.2498 25.3336L18.6665 25.3336V25.6674C18.6665 26.5879 17.9203 27.3341 16.9998 27.3341C16.0794 27.3341 15.3332 26.5879 15.3332 25.6674Z"
//                         fill="#6172F3"
//                       />
//                     </svg>
//                   </span>
//                   <Card.Title>Start by creating your first job</Card.Title>
//                   <Button variant="primary"  onClick={()=>navigate('/jobs')}>Create Job</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card className="mdt_card">
//                 <Card.Body>
//                   <span className="mdt_name">{logoname}</span>
//                   <Card.Title>Complete Company Profile</Card.Title>
//                   <Button
//                     variant="primary"
//                     onClick={() => GetCompanyDetails(userInfo?.default_company?.uid)}
//                   >
//                     Start
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4} className="com_infotext">
//               <img src={liwotextlogo} alt="" />
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
//                 a orci nisl. Pellentesque a sem in lacus sodales tincidunt. Cras
//                 velit turpis, lobortis id dapibus id, feugiat eu arcu. Fusce
//                 nisl odio, varius vel nunc et, tristique dignissim justo. Sed
//                 blandit risus dolor, nec iaculis mi ultrices sed. Cras feugiat
//                 dui quis scelerisque consequat. Phasellus tempus sodales dolor,
//                 sit amet tristique velit volutpat non. Fusce efficitur pharetra
//                 ex quis mattis. Duis pellentesque ipsum id purus fringilla
//                 semper.
//               </p>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       <CompanyEditProfile show={show} handleClose={handleClose} />

//       {/* <Modal 
//         show={show} 
//         onHide={handleClose}
//         animation={false}
//         size="lg"
//         backdrop={false}
//         className="bsreport_mdl"
//         >
//         <Modal.Header closeButton>
//           <img src={logoIcon} className="me-4" />
//           <Modal.Title>Behavioral Assessment Report</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <div className="bg-white p-5 rounded text-center">
//                 <h5 className="mb-3">You have completed your assessment.</h5>
//                 <p className="disc-text"> You have completed the LYWO behavioral test, which is based on the classic DISC personality theory and assessment. This test helps us understand your natural tendencies, allowing us to tailor job roles and subsequent assessments to complement your traits. The test broadly categorizes all candidates into personality groups.</p>
//                 <Row className="mt-5 justify-content-center">
//                   <Col md={4}>
//                     <div className="gray-card">
//                       <h6> Your Dominant Personality</h6>
//                       <p> The dominant personality signifies the traits and behaviors that the you most closely associate with and are easily observable.</p>
//                       <img className="mt-35" src={leaderLarge}/>
//                       <h2>Leader</h2>
//                     </div>
//                   </Col>
//                   <Col md={4}>
//                     <div className="gray-card">
//                       <h6>  Your Secondary Personality</h6>
//                       <p>  The secondary personality is less visible and only shown in certain situations or to certain people. This could be aspects of ourselves that we keep more private or that only come out in specific contexts </p>
//                       <img src={InfluencerLarge}/>
//                       <h2>Influencer</h2>
//                     </div>
//                   </Col>
//                 </Row>
//             </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleClose}>
//             Re-take Test
//           </Button>
//         </Modal.Footer>
//       </Modal> */}
//       {/* <Modal 
//         show={show} 
//         onHide={handleClose}
//         animation={false}
//         size="lg"
//         backdrop={false}
//         className="beharquiz_mdl"
//         >
//         <Modal.Header closeButton>
//           <img src={logoIcon} className="me-4" />
//           <Modal.Title>Behavioural Assessment</Modal.Title>
//           <div className="score_panel">
//               <span className="att_count">Attempted <strong>00 / 28</strong></span>
//               <button type="button" className="outline_scorebtn me-3"><img src={infogray}/>Instructions</button>
//               <button type="button" className="outline_scorebtn me-3"><img src={globgray}/>Instructions</button>
//           </div>
//         </Modal.Header>
//         <Modal.Body>
//             <Row className="bg-white rounded px-6 py-5">
//               <QuizSlider/>
//               <Col md={12} className="text-center mt-4">
//                 <p className="mostlike">Pick one <strong>"Most Like”</strong> you and one <strong>"Least Like”</strong> you</p>
//               </Col>
//             </Row>
//         </Modal.Body>
//       </Modal> */}
//     </>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  InputGroup,
  Form,
} from "react-bootstrap";
import FileUploader from "../../components/FileUploader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CompanyEditProfile from "../../components/CompanyEditProfile";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { logoMaker, removeToken } from "../../helpers/helper";
import { liwotextlogo } from "../../images/assest";
import { dashboardListAPI, GetcompanyDetailsApi, JobList } from "../../services/provider";
import { setCompanyProfileDetails } from "../../Slice/Login/LoginSlice";
import logoIcon from "../../images/logo_icon.png";
import applicationstIcon from "../../images/icons/application_stIcon.svg";
import activejobIcon from "../../images/icons/active_jobIcon.svg";
import shortlistedstIcon from "../../images/icons/shortlisted_stIcon.svg";
import pendingrwstIcon from "../../images/icons/pendingrw_stIcon.svg";
import draftjobstIcon from "../../images/icons/draftjobs_stIcon.svg";
import listview from "../../images/icons/listview_Icon.svg";
import gridview from "../../images/icons/gridview_Icon.svg";
import LineChart02 from "../../images/line_chat01.svg";
import stack2_brb from "../../images/icons/stack 2_brb.svg";
import upArrow from "../../images/icons/arrow-up-green.svg";
import option_brb from "../../images/icons/option_brb.svg";
import infogray from "../../images/icons/info_gray.svg";
import globgray from "../../images/icons/glob_gray.svg";
import leaderLarge from "../../images/icons/Leader-icon.svg";
import InfluencerLarge from "../../images/icons/Influencer-icon.svg";
import QuizSlider from "../../components/QuizSlider";
import CreateJobs from "../../components/Jobs/CreateJobs";
import usersgroupicon from "../../images/icons/users-dark.svg";
import usersgroupwhite from "../../images/icons/users-01-w.svg";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false)
  const handleClose = () => setShow(false);
  const handleModalClose = () => setModal(false);
  const handleShow = () => setShow(true);
  const [dashboardList, setDashboardList] = useState({})
  const [firstTotalData, setFirstTotalData] = useState([])
  const [TotalData, setTotalData] = useState([])
  const [JobData, setJobData] = useState([]);
  const [pendingReview, setPendingReview] = useState([])
  const [visibleCount, setVisibleCount] = useState(10);
  const [countList, setCountList] = useState(10);
  const [VisiblejobData, setJVisiblejobData] = useState(dashboardList?.total_job_data?.slice(0, 10));
  const [VisiblejobList, setJVisiblejobList] = useState(dashboardList?.total_count_data?.hiring_pipeline?.slice(0, 10));
  const [tableShow, setTableShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchJob, setSearchJob] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.login.loginUserInfo);
  const companyInfo = useSelector((state) => state.login.CompanyProfileDetails)

  const uid = userInfo?.uid;

  const logoname = logoMaker(
    userInfo?.default_company?.company_name ?? "Infograins Techno"
  );

  const GetCompanyDetails = (uid) => {
    //console.log("uid------>>>",uid)
    handleShow();
    GetcompanyDetailsApi(uid)
      .then((res) => {
        //console.log("dispatch calll", res?.response);
        dispatch(setCompanyProfileDetails(res?.response));
      })

      .catch((error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.data?.detail?.includes(
            "Given token not valid for any token type"
          )
        ) {
          console.log("Token expired, redirecting to login");
          removeToken();
          navigate("/loginwithpassword");
        } else {
          console.error("An error occurred:", error);
        }
      });
  };

  const getDashboardListAPI = async () => {
    try {
      const res = await dashboardListAPI(companyInfo?.uid);
      if (res?.data?.success) {
        setDashboardList(res?.data?.response)
        setFirstTotalData(res?.data?.response?.total_count_data?.hiring_pipeline)
        setTotalData(res?.data?.response?.total_job_data);
        setPendingReview(res?.data?.response?.total_count_data?.pending_reviews)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const JobListApi = async () => {
    let url = `https://bittrend.shubansoftware.com/assets-api/job-list-api/?page=1&limit=2000&search=${""}`
    try {
      const response = await JobList(url);
      setJobData(response?.data?.response);
    } catch (error) {
      console.log("response  error-----", error);
    }
  };
  useEffect(() => {
    getDashboardListAPI()
    JobListApi()
  }, [])

  useEffect(() => {
    setJVisiblejobData(dashboardList?.total_job_data?.slice(0, 10));
    setVisibleCount(10);
  }, [dashboardList?.total_job_data]);

  useEffect(() => {
    setJVisiblejobList(dashboardList?.total_count_data?.hiring_pipeline?.slice(0, 10))
    setCountList(10)
  }, [dashboardList?.total_count_data?.hiring_pipeline])

  const handleLoadMore = () => {
    const nextData = dashboardList?.total_job_data?.slice(visibleCount, visibleCount + 10);
    setJVisiblejobData([...VisiblejobData, ...nextData]);
    setVisibleCount(prev => prev + 10);
  };

  const handleLoadList = () => {
    const nextData = dashboardList?.total_count_data?.hiring_pipeline?.slice(visibleCount, visibleCount + 10);
    setJVisiblejobList([...VisiblejobList, ...nextData]);
    setCountList(prev => prev + 10);
  };

  useEffect(() => {
    if (searchTerm != "") {
      if (tableShow) {
        const searchData = dashboardList?.total_job_data?.filter(val =>
          val?.job_title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
        setTotalData(searchData)
      } else {
        const searchData = dashboardList?.total_count_data?.hiring_pipeline?.filter(val =>
          val?.job_title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
        setFirstTotalData(searchData)
      }
    } else {
      setFirstTotalData(dashboardList?.total_count_data?.hiring_pipeline)
      setTotalData(dashboardList?.total_job_data)
    }
  }, [searchTerm])

  useEffect(() => {
    if (searchJob !== "") {
      const searchData = dashboardList?.total_count_data?.pending_reviews?.filter(Val =>
        Val?.jobcompany__job_title?.toLowerCase()?.includes(searchJob?.toLowerCase())
      )
      setPendingReview(searchData)
    } else {
      setPendingReview(dashboardList?.total_count_data?.pending_reviews)
    }
  }, [searchJob])

  const keyColumn = Array.from(
    new Set(dashboardList?.total_count_data?.hiring_pipeline?.flatMap(item => Object.keys(item)))
  );
  const totalPendingReviews = dashboardList?.total_count_data?.pending_reviews
    ?.reduce((sum, item) => sum + item.pending_review, 0);

  const checkStatus = (item) => {    
    const found = dashboardList?.total_count_data?.hiring_pipeline?.find((Val) =>Val?.job_title == item?.job_title);
    if (found) {
      if (found.final_shortlist > 0) return "Final Shortlist";;
      if (found.screening_count > 0) return "Screening";
    }
    return null;
  }

  console.log(dashboardList)
  return (
    <>
      <Sidebar />
      <Header />
      <div className="page-body">
        <Container fluid className="pt-3">
          <Row>
            {/* <Col md={12}>
              <Breadcrumb>
                <Breadcrumb.Item href="#">login</Breadcrumb.Item>
                <Breadcrumb.Item active>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99399 0.486544C7.34689 0.284433 6.65354 0.284433 6.00645 0.486544C5.60022 0.613424 5.2493 0.83726 4.88623 1.12924C4.53418 1.41235 4.13141 1.79274 3.63296 2.26351L1.82204 3.97381C1.38439 4.38689 1.08149 4.67279 0.860138 5.0183C0.664557 5.32359 0.520092 5.65874 0.432436 6.01055C0.333227 6.40872 0.333352 6.82523 0.333533 7.42704L0.333522 9.98707C0.333261 10.6153 0.333076 11.0602 0.435771 11.4434C0.713173 12.4787 1.52182 13.2874 2.55709 13.5648C2.94035 13.6675 3.38525 13.6673 4.01344 13.667C4.23508 13.6671 4.46264 13.6794 4.67864 13.6216C5.13876 13.4983 5.49816 13.1389 5.62145 12.6787C5.66804 12.5049 5.66745 12.313 5.66697 12.1565L5.66688 10.3337C5.66688 9.99851 5.66895 9.90855 5.67919 9.84388C5.74697 9.41599 6.08256 9.0804 6.51045 9.01263C6.57512 9.00239 6.66507 9.00032 7.00022 9.00032C7.33536 9.00032 7.42531 9.00239 7.48998 9.01263C7.91788 9.0804 8.25347 9.41599 8.32124 9.84388C8.33148 9.90855 8.33355 9.99851 8.33355 10.3337L8.33346 12.1565C8.33298 12.313 8.3324 12.5049 8.37898 12.6787C8.50227 13.1389 8.86167 13.4983 9.32179 13.6216C9.53778 13.6794 9.76534 13.6671 9.98698 13.667C10.6152 13.6673 11.0601 13.6675 11.4433 13.5648C12.4786 13.2874 13.2873 12.4787 13.5647 11.4434C13.6674 11.0602 13.6672 10.6153 13.6669 9.9871L13.6669 7.42703C13.6671 6.82524 13.6672 6.40871 13.568 6.01055C13.4803 5.65874 13.3359 5.32359 13.1403 5.0183C12.9189 4.67279 12.616 4.38689 12.1784 3.97382L10.3675 2.26353C9.86903 1.79275 9.46626 1.41235 9.11421 1.12924C8.75113 0.83726 8.40022 0.613424 7.99399 0.486544Z"
                      fill="#6172F3"
                    />
                  </svg>
                  Home
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col> */}
          </Row>
          {!JobData.length && (
            <>
              <Row>
                <Col md={12}>
                  <h1 className="h1_welcometext">
                    Get started on your journey to{" "}
                    <strong>build the dream team</strong>
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Card className="mdt_card">
                    <Card.Body>
                      {companyInfo?.logo ? (
                        <>
                          <img src={`https://bittrend.shubansoftware.com${companyInfo?.logo}`} width={60} height={60} />
                          <Card.Title>
                            <strong>{companyInfo?.company_name}</strong>
                          </Card.Title>
                          {companyInfo?.website_url}
                          {companyInfo?.location?.location_name}
                        </>
                      ) : (
                        <>
                          <span className="mdt_name">{logoname}</span>
                          <Card.Title>Complete Company Profile</Card.Title>
                          <Button
                            variant="primary"
                            onClick={() => GetCompanyDetails(companyInfo?.uid ? companyInfo?.uid : userInfo?.default_company?.uid)}
                          >
                            Start
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="mdt_card">
                    <Card.Body>
                      <span className="mdt_icon">
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.2293 0.333087C18.555 0.332369 19.5394 0.331836 20.3922 0.56033C22.6928 1.17678 24.4898 2.97376 25.1062 5.27437C25.2553 5.83088 25.3069 6.44347 25.3245 7.17038C25.8392 7.24227 26.3106 7.34438 26.7569 7.48938C29.8013 8.47856 32.1881 10.8654 33.1773 13.9098C33.4085 14.6213 33.5307 15.3968 33.5951 16.309C33.1455 19.3627 30.64 21.7344 27.5231 21.9797C27.2784 21.9989 26.9722 22.0002 26.1667 22.0002H18.6665V21.6674C18.6665 20.7469 17.9203 20.0007 16.9998 20.0007C16.0794 20.0007 15.3332 20.7469 15.3332 21.6674V22.0002H7.83337C7.02784 22.0002 6.72165 21.9989 6.47698 21.9797C3.36026 21.7344 0.854861 19.3629 0.405015 16.3095C0.469485 15.3971 0.591649 14.6214 0.82286 13.9098C1.81204 10.8654 4.19888 8.47856 7.24325 7.48938C7.68951 7.34439 8.16096 7.24228 8.67554 7.17039C8.69318 6.44348 8.74475 5.83089 8.89387 5.27437C9.51032 2.97376 11.3073 1.17678 13.6079 0.56033C14.4607 0.331836 15.4451 0.332369 16.7707 0.333087H17.2293ZM12.0164 7.00185C12.1696 7.00103 12.3261 7.00054 12.4862 7.00024H21.514C21.674 7.00054 21.8305 7.00103 21.9837 7.00185C21.9684 6.57128 21.9396 6.3354 21.8865 6.13711C21.5782 4.9868 20.6797 4.08831 19.5294 3.78008C19.159 3.68082 18.6573 3.6665 17 3.6665C15.3428 3.6665 14.8411 3.68082 14.4706 3.78008C13.3203 4.08831 12.4218 4.9868 12.1136 6.13711C12.0605 6.3354 12.0317 6.57128 12.0164 7.00185Z"
                            fill="#6172F3"
                          />
                          <path
                            d="M15.3332 25.6674V25.3336L7.75031 25.3336C7.05594 25.3336 6.60816 25.3337 6.21545 25.3027C3.96527 25.1257 1.92752 24.2097 0.34375 22.7965C0.371266 24.4373 0.470257 25.6716 0.82286 26.7568C1.81204 29.8012 4.19888 32.188 7.24325 33.1772C8.7535 33.6679 10.5525 33.6674 13.3341 33.6667H20.666C23.4477 33.6674 25.2467 33.6679 26.7569 33.1772C29.8013 32.188 32.1881 29.8012 33.1773 26.7568C33.5299 25.6716 33.6289 24.4373 33.6564 22.7964C32.0726 24.2097 30.0349 25.1257 27.7846 25.3027C27.3919 25.3337 26.9441 25.3336 26.2498 25.3336L18.6665 25.3336V25.6674C18.6665 26.5879 17.9203 27.3341 16.9998 27.3341C16.0794 27.3341 15.3332 26.5879 15.3332 25.6674Z"
                            fill="#6172F3"
                          />
                        </svg>
                      </span>
                      <Card.Title>Start by creating your first job</Card.Title>
                      <Button variant="primary"
                        // onClick={() => navigate('/jobs')}
                        onClick={() => setModal(true)}
                      >
                        Create Job
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="com_infotext">
                  <img src={liwotextlogo} alt="" />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                    a orci nisl. Pellentesque a sem in lacus sodales tincidunt. Cras
                    velit turpis, lobortis id dapibus id, feugiat eu arcu. Fusce
                    nisl odio, varius vel nunc et, tristique dignissim justo. Sed
                    blandit risus dolor, nec iaculis mi ultrices sed. Cras feugiat
                    dui quis scelerisque consequat. Phasellus tempus sodales dolor,
                    sit amet tristique velit volutpat non. Fusce efficitur pharetra
                    ex quis mattis. Duis pellentesque ipsum id purus fringilla
                    semper.
                  </p>
                </Col>
              </Row>
            </>
          )}
          <Row className="mt-3">
            <Col md={9}>
              <Row>
                <Col md={4}>
                  <Card className="border-active dbstatus_card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <span className="status_icon">
                          <img src={activejobIcon} />
                        </span>
                        <div className="dbst_info">
                          <h4><strong className="font-weight-600">{dashboardList?.total_count_data?.active_jobs?.active_jobs_count}</strong> Active Jobs</h4>
                          <p>{dashboardList?.total_count_data?.active_jobs?.open_position_count} Open Positions</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-applications dbstatus_card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <span className="status_icon">
                          <img src={applicationstIcon} />
                        </span>
                        <div className="dbst_info">
                          <h4><strong className="font-weight-600">{dashboardList?.total_count_data?.application_count}</strong> Applications</h4>
                          <p>in last 7 days</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-shortlist dbstatus_card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <span className="status_icon">
                          <img src={shortlistedstIcon} />
                        </span>
                        <div className="dbst_info">
                          <h4><strong className="font-weight-600">{dashboardList?.total_count_data?.application_shortlisted_count}</strong> Shortlisted</h4>
                          <p>in last 7 days</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Card className="border-0 hiring_pipeline mt-4">
                <Card.Header>
                  <Row>
                    <Col md={6} className="d-flex align-items-center">
                      <h4 className="title-md m-0">Hiring Pipeline</h4>
                      <InputGroup className="defult_serachbox">
                        <Button id="basic-addon1">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                              stroke="#667085"
                              stroke-width="1.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Button>
                        <Form.Control
                          placeholder="Search"
                          value={searchTerm}
                          aria-label="Search"
                          aria-describedby="basic-addon1"
                          onChange={e => setSearchTerm(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6} className="justify-content-end d-flex align-items-center">
                      <button className={`gray_iconbtn me-2 ${!tableShow && "active"}`} onClick={() => {
                        setTableShow(false);
                        setSearchTerm("")
                      }}><img src={gridview} /></button>
                      <button className={`gray_iconbtn ${tableShow && "active"}`} onClick={() => {
                        setTableShow(true);
                        setSearchTerm("")
                      }}><img src={listview} /></button>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body className="p-0 mt-3">
                  <div className="hiring_ppldata">
                    {tableShow ? (
                      <table className="m-0 table table-striped elv_datatable table-bordered">
                        <thead>
                          <tr>
                            <th>Job</th>
                            <th>Location</th>
                            <th>Department</th>
                            <th>Job Age</th>
                            <th>Total App.</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {TotalData?.slice(0, visibleCount)?.map((item, index) => (
                            <tr>
                              <td className="font-weight-600">{item?.job_title}<span className="count">({item?.total_applicant_count})</span></td>
                              <td>{item?.job_location?.location_name ? item?.job_location?.location_name : '-'}</td>
                              <td>{item?.department}</td>
                              <td>10 days</td>
                              <td>{item?.total_applicant_count}</td>
                              <td><span className="badge-primery">{checkStatus(item)}</span></td>
                            </tr>
                          ))}

                          {/* <tr>
                          <td className="font-weight-600">UI Designer<span className="count">(5)</span></td>
                          <td>Goa</td>
                          <td>Creative</td>
                          <td>5 days</td>
                          <td>513</td>
                          <td><span className="badge-sucess">Final Shortlist</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">Finance Manager<span className="count">(2)</span></td>
                          <td>Delhi</td>
                          <td>Finance</td>
                          <td>7 days </td>
                          <td>184</td>
                          <td><span className="badge-warning">Screening</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">Figma Designer<span className="count">(10)</span></td>
                          <td>Mumbai</td>
                          <td>Technology</td>
                          <td>10 days</td>
                          <td>2154</td>
                          <td><span className="badge-primery">Evaluation 1</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">Figma Designer<span className="count">(10)</span></td>
                          <td>Mumbai</td>
                          <td>Technology</td>
                          <td>10 days</td>
                          <td>2154</td>
                          <td><span className="badge-primery">Evaluation 1</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">Figma Designer<span className="count">(10)</span></td>
                          <td>Mumbai</td>
                          <td>Technology</td>
                          <td>10 days</td>
                          <td>2154</td>
                          <td><span className="badge-primery">Evaluation 1</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">Finance Manager<span className="count">(2)</span></td>
                          <td>Delhi</td>
                          <td>Finance</td>
                          <td>7 days </td>
                          <td>184</td>
                          <td><span className="badge-warning">Screening</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">UI Designer<span className="count">(5)</span></td>
                          <td>Goa</td>
                          <td>Creative</td>
                          <td>5 days</td>
                          <td>513</td>
                          <td><span className="badge-sucess">Final Shortlist</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">Figma Designer<span className="count">(10)</span></td>
                          <td>Mumbai</td>
                          <td>Technology</td>
                          <td>10 days</td>
                          <td>2154</td>
                          <td><span className="badge-primery">Evaluation 1</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">Figma Designer<span className="count">(10)</span></td>
                          <td>Mumbai</td>
                          <td>Technology</td>
                          <td>10 days</td>
                          <td>2154</td>
                          <td><span className="badge-primery">Evaluation 1</span></td>
                        </tr>
                        <tr>
                          <td className="font-weight-600">Finance Manager<span className="count">(2)</span></td>
                          <td>Delhi</td>
                          <td>Finance</td>
                          <td>7 days </td>
                          <td>184</td>
                          <td><span className="badge-warning">Screening</span></td>
                        </tr> */}
                        </tbody>
                        <tfoot>
                          {visibleCount < TotalData?.length && (
                            <tr>
                              <td colSpan={2}>
                                <Button
                                  className="btn-light-outline"
                                  onClick={handleLoadMore}
                                >
                                  Load More
                                </Button>
                              </td>
                              <td colSpan={9} className="text-end pe-3">
                                <span className="pagination_count">
                                  Showing {VisiblejobData?.length} items
                                </span>
                              </td>
                            </tr>
                          )}
                        </tfoot>
                      </table>
                    ) : (
                      <table className="m-0 table elv-thmnail-data-table">
                        <thead>

                          <tr>
                            {keyColumn?.map(key => (
                              <th key={key}>{key == "jobcompany__Job_title" ? "Jobs" : key == "screening_count" ? "Screening" : key}</th>
                            ))}

                            {/* <th>Jobs </th>
                              <th>Screening</th>
                                <th>Evaluation 1</th>   
                                  <th>Evaluation 2</th>
                                    <th>Evaluation 3</th>
                                      <th>Evaluation 4</th>
                                        <th>Final Shortlist</th> */}



                          </tr>

                        </thead>
                        <tbody>

                          {/* <tr>
                            <td className="font-weight-600">Frontend Developer <br></br>

                              <span>25 Openings</span>
                            </td>

                            <td className="screening-record"> <img src={usersgroupicon} alt="usericons" />  250</td>
                            <td className="evaluation-1-record"><img src={usersgroupicon} alt="usericons" /> 220</td>
                            <td className="evaluation-2-record"><img src={usersgroupicon} alt="usericons" /> 180</td>
                            <td className="evaluation-3-record">
                              <img src={usersgroupicon} alt="usericons" />   136
                            </td>
                            <td className="evaluation-4-record"><img src={usersgroupicon} alt="usericons" /> 91</td>
                            <td className="final-shortlist"><img src={usersgroupwhite} alt="usericons" />  24</td>

                          </tr>


                          <tr>
                            <td className="font-weight-600">Frontend Developer <br></br>

                              <span>25 Openings</span>
                            </td>

                            <td className="screening-record"> <img src={usersgroupicon} alt="usericons" />  250</td>
                            <td className="evaluation-1-record"><img src={usersgroupicon} alt="usericons" /> 220</td>
                            <td className="evaluation-2-record disabled-eval"></td>
                            <td className="evaluation-3-record disabled-eval">

                            </td>
                            <td className="evaluation-4-record disabled-eval"></td>
                            <td className="final-shortlist"><img src={usersgroupwhite} alt="usericons" />  24</td>

                          </tr>




                          <tr>
                            <td className="font-weight-600">Frontend Developer <br></br>

                              <span>25 Openings</span>
                            </td>

                            <td className="screening-record"> <img src={usersgroupicon} alt="usericons" />  250</td>
                            <td className="evaluation-1-record"><img src={usersgroupicon} alt="usericons" /> 220</td>
                            <td className="evaluation-2-record"><img src={usersgroupicon} alt="usericons" /> 180</td>
                            <td className="evaluation-3-record">

                            </td>
                            <td className="evaluation-4-record disabled-eval"></td>
                            <td className="final-shortlist disabled-shortlist">  </td>

                          </tr> */}
                          {/* {firstTotalData?.slice(0, countList)?.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {keyColumn.map(col => (
                                <td key={col}>{row[col] ?? ''}</td>
                              ))}
                            </tr>
                          ))} */}
                          {firstTotalData?.slice(0, countList)?.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {keyColumn.map(col => (

                                <td className={`${col == "job_title" ? "font-weight-600 height-50" : "screening-record"} `}>
                                  {row[col] ?? ''}
                                  <br></br>
                                  {col == "screening-record" && <span>25 Openings</span>}
                                </td>
                              ))}
                              {/* <td className="font-weight-600">Frontend Developer <br></br>

                                <span>25 Openings</span>
                              </td>

                  
                           
                              <td className="final-shortlist"><img src={usersgroupwhite} alt="usericons" />  24</td> */}

                            </tr>
                          ))}

                        </tbody>
                        <tfoot>
                          {countList < firstTotalData?.length && (
                            <tr>
                              <td colSpan={2}>
                                <Button
                                  className="btn-light-outline"
                                  onClick={handleLoadList}
                                >
                                  Load More
                                </Button>
                              </td>
                              <td colSpan={9} className="text-end pe-3">
                                <span className="pagination_count">
                                  Showing {VisiblejobList?.length} items
                                </span>
                              </td>
                            </tr>
                          )}
                        </tfoot>
                      </table>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="pending_reviews dbstatus_card">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <span className="status_icon">
                      <img src={pendingrwstIcon} />
                    </span>
                    <div className="dbst_info">
                      <h4>{dashboardList?.total_count_data?.total_pending_review_count} Pending Reviews</h4>
                      <p>{dashboardList?.total_count_data?.total_pending_review_seven_days} in last 7 days</p>
                    </div>
                  </div>
                  <InputGroup className="header_serach mt-3">
                    <InputGroup.Text id="basic-addon1">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                          stroke="#667085"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setSearchJob(e.target.value)}
                    />
                  </InputGroup>

                  <div className="table-list-scroll">

                    <table className="mt-3 mb-0 table">
                      <thead>
                        <tr>
                          <th>Active Jobs</th>
                          <th className="text-end">Oldest First <i className="fa fa-arrow-down"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingReview?.map((item) => (
                          <tr>
                            <td>{item?.jobcompany__job_title}</td>
                            <td className="text-end"><span className="badge-outline">{item?.pending_review} Pending</span></td>
                          </tr>
                        ))
                        }
                        {/* <tr>
                        <td>Full Stack Developer</td>
                        <td className="text-end"><span className="badge-outline">12 Pending</span></td>
                      </tr>
                      <tr>
                        <td>Mern Stack Developer</td>
                        <td className="text-end"><span className="badge-outline">27 Pending</span></td>
                      </tr>
                      <tr>
                        <td>Product Owner</td>
                        <td className="text-end"><span className="badge-outline">35 Pending</span></td>
                      </tr>
                      <tr>
                        <td>Product Manager - Design</td>
                        <td className="text-end"><span className="badge-outline">09 Pending</span></td>
                      </tr>
                      <tr>
                        <td>Product Manager - Marketing</td>
                        <td className="text-end"><span className="badge-outline">16 Pending</span></td>
                      </tr>
                      <tr>
                        <td>Full Stack Developer</td>
                        <td className="text-end"><span className="badge-outline">22 Pending</span></td>
                      </tr> */}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
              <Card className="draft_jobs dbstatus_card mt-3">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <span className="status_icon">
                      <img src={draftjobstIcon} />
                    </span>
                    <div className="dbst_info">
                      <h4 className="mb-0">5 Draft Jobs</h4>
                      <Link to="/jobs" className="btn-link btn-sm py-0">View All</Link>
                    </div>
                  </div>
                  <div className="table-list-scroll">
                    <table className="mt-3 mb-0 table">
                      <tbody>
                        {dashboardList?.total_count_data?.draft_jobs?.filter((_, index) => index <= 4)?.map((item) => (
                          <tr>
                            <td>{item?.job_title}</td>
                            <td className="text-end"><span>{item?.created_at}</span></td>
                          </tr>
                        ))
                        }
                        {/* <tr>
                        <td>Full Stack Developer</td>
                        <td className="text-end"><span>01/05/2025</span></td>
                      </tr>
                      <tr>
                        <td>Mern Stack Developer</td>
                        <td className="text-end"><span>01/05/2025</span></td>
                      </tr>
                      <tr>
                        <td>Product Owner</td>
                        <td className="text-end"><span>01/05/2025</span></td>
                      </tr> */}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col className="text-end py-2"><button className="btn btn-link btn-md">View All Favorite Jobs <i className="fa fa-angle-down"></i></button></Col>
          </Row>
          <Row>
            <Col md={12}>
              <h4 className="title-md"><i className="fa fa-briefcase text-primery me-2"></i>Quick Access to Jobs</h4>
            </Col>
             <Col md={12} className="mb-3">
              <Card className="shadow-sm border-light-2 radius-sm">
                <Card.Body className=" p-2">
                  <table className="m-0 table table-striped">
                    <thead>
                      <tr>
                        <th>Job</th>
                        <th>Details</th>
                        <th>Total Applicants</th>
                        <th>Pending Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Figma Designer</strong></td>
                        <td>Hyderabad, Automated Testing, 5 yrs Experience </td>
                        <td>2154</td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td><strong>UI Designer</strong></td>
                        <td>Hyderabad, Automated Testing, 5 yrs Experience </td>
                        <td>2154</td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td><strong>Finance Manager</strong></td>
                        <td>Hyderabad, Automated Testing, 5 yrs Experience </td>
                        <td>2154</td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td><strong>Python Developer</strong></td>
                        <td>Hyderabad, Automated Testing, 5 yrs Experience </td>
                        <td>2154</td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td><strong>Figma Designer</strong></td>
                        <td>Hyderabad, Automated Testing, 5 yrs Experience </td>
                        <td>2154</td>
                        <td>12</td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
             </Col>
          </Row> */}
        </Container>
      </div>

      <CompanyEditProfile show={show} handleClose={handleClose} />
      <CreateJobs
        show={modal}
        handleClose={() => handleModalClose()}
      />

      {/* <Modal 
        show={show} 
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
                    <div className="gray-card">
                      <h6> Your Dominant Personality</h6>
                      <p> The dominant personality signifies the traits and behaviors that the you most closely associate with and are easily observable.</p>
                      <img className="mt-35" src={leaderLarge}/>
                      <h2>Leader</h2>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="gray-card">
                      <h6>  Your Secondary Personality</h6>
                      <p>  The secondary personality is less visible and only shown in certain situations or to certain people. This could be aspects of ourselves that we keep more private or that only come out in specific contexts </p>
                      <img src={InfluencerLarge}/>
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
      </Modal> */}
      {/* <Modal 
        show={show} 
        onHide={handleClose}
        animation={false}
        size="lg"
        backdrop={false}
        className="beharquiz_mdl"
        >
        <Modal.Header closeButton>
          <img src={logoIcon} className="me-4" />
          <Modal.Title>Behavioural Assessment</Modal.Title>
          <div className="score_panel">
              <span className="att_count">Attempted <strong>00 / 28</strong></span>
              <button type="button" className="outline_scorebtn me-3"><img src={infogray}/>Instructions</button>
              <button type="button" className="outline_scorebtn me-3"><img src={globgray}/>Instructions</button>
          </div>
        </Modal.Header>
        <Modal.Body>
            <Row className="bg-white rounded px-6 py-5">
              <QuizSlider/>
              <Col md={12} className="text-center mt-4">
                <p className="mostlike">Pick one <strong>"Most Like”</strong> you and one <strong>"Least Like”</strong> you</p>
              </Col>
            </Row>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default Dashboard;