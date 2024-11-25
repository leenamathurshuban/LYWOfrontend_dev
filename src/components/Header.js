import React from "react";
import { Col, Form, InputGroup,Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoMaker, removeToken } from "../helpers/helper";
import UpdateDetailsIcon from '../images/icons/update-details-Hicon.svg';
import ResetPassIcon from '../images/icons/reset-pass-Hicon.svg';
import RemovePassIcon from '../images/icons/remove-pass-Hicon.svg';
import LogoutIcon from '../images/icons/log-out-Hicon.svg';
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../services/provider";
// import {persistor} from "../../src/Slice/Store"
// import { logout } from "../Slice/Login/LoginSlice";

const Header = () => {
  const userInfo = useSelector((state)=>state.login.loginUserInfo)
  const logoname = logoMaker(userInfo?.default_company?.company_name)
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleLogout = async() => {
    logoutApi()
    removeToken();
    navigate("/emailverify");
  };

  
  return (
    <header className="main_header">
      <div className="header-wrapper row">
        <Col md={4}>
          <div className="org_name">
            <span className="orgshort_text">{logoname}</span>
            <p>{userInfo?.default_company?.company_name}</p>
          </div>
        </Col>
        <Col md={4}>
          <InputGroup className="header_serach">
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
              placeholder="Serach"
              aria-label="Serach"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <div className="header_right">
            <button type="button" className="hed_notifaction">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_618_16365)">
                  <path
                    d="M18.4283 9.42885C20.7952 9.42885 22.714 7.51007 22.714 5.14314C22.714 2.7762 20.7952 0.857422 18.4283 0.857422C16.0614 0.857422 14.1426 2.7762 14.1426 5.14314C14.1426 7.51007 16.0614 9.42885 18.4283 9.42885Z"
                    stroke="#344054"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.0272 13.7144V16.3434C17.0272 17.0139 17.2935 17.6569 17.7677 18.1311C18.2417 18.6051 19.0436 18.8715 19.7141 18.8715H0.856934C1.52743 18.8715 2.3293 18.6051 2.80342 18.1311C3.27752 17.6569 3.54389 17.0139 3.54389 16.3434L3.54387 10.1703C3.54387 8.38236 4.25415 6.6676 5.51845 5.40329C6.78276 4.13899 8.49752 3.42871 10.2855 3.42871"
                    stroke="#344054"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.57129 23.1436H11.9999"
                    stroke="#344054"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_618_16365">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
       
            <Dropdown>
                            <Dropdown.Toggle className="hed_username" id="dropdown-basic">
                                or
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className="d-flex">
                                    <p className='hd_srtname mb-0'>or <span className='urg_stuts active'></span></p>
                                    <div className='usr_info'>
                                        <strong>Olivia Rhye</strong>
                                        <a href='#'>olivia@untitledui.com</a>
                                    </div>
                                </div>
                                <Dropdown.Item href="#/action-1"><img src={UpdateDetailsIcon}/>Update Details</Dropdown.Item>
                                <Dropdown.Item href="#/action-2"><img src={ResetPassIcon}/>Set / Reset Password</Dropdown.Item>
                                <Dropdown.Item href="#/action-3"><img src={RemovePassIcon}/>Remove Password</Dropdown.Item>
                                <Dropdown.Item  onClick={handleLogout}><img src={LogoutIcon}/>Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
          </div>
        </Col>
      </div>
    </header>
  );
};

export default Header;
