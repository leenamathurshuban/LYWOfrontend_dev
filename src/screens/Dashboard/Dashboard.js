import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";
import FileUploader from "../../components/FileUploader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompanyEditProfile from "../../components/CompanyEditProfile";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { logoMaker, removeToken } from "../../helpers/helper";
import { liwotextlogo } from "../../images/assest";
import { GetcompanyDetailsApi } from "../../services/provider";
import { setCompanyProfileDetails } from "../../Slice/Login/LoginSlice";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.login.loginUserInfo);

  const uid = userInfo?.default_company?.uid;

  const logoname = logoMaker(
    userInfo?.default_company?.company_name ?? "infograins techno"
  );

  const GetCompanyDetails = (uid) => {
    handleShow();
    GetcompanyDetailsApi(uid)
      .then((res) => {
        console.log("dispatch calll", res?.response);
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

  return (
    <>
      <Sidebar />
      <Header />
      <div className="page-body">
        <Container fluid>
          <Row>
            <Col md={12}>
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
            </Col>
          </Row>
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
                  <Button variant="primary">Create Job</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mdt_card">
                <Card.Body>
                  <span className="mdt_name">{logoname}</span>
                  <Card.Title>Complete Company Profile</Card.Title>
                  <Button
                    variant="primary"
                    onClick={() => GetCompanyDetails(uid)}
                  >
                    Start
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
        </Container>
      </div>

      <CompanyEditProfile show={show} handleClose={handleClose} />
    </>
  );
};

export default Dashboard;
