import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Getstarted from "../GetStarted/GetStarted";
// import { setEmailValue } from '../Slice/Login/LoginSlice'; // Import your action
import { useSelector } from 'react-redux';




const OtpVerifyContainer = () => {
    // const [isLoading, setIsLoading] = useState(false); 
    // const [initialCount, setInitialCount] = useState(0);
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState(""); //ayanshaikh.shuban@gmail.com
    const [emailError, setEmailError] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const [otp, setOtp] = useState(""); 
    const [otpErrormsg, setOtpErrorMsg] = useState(""); 
    const [initialCount, setInitialCount] = useState(0);
  
    const [password, setPassword] = useState("");
    // const [confirm_password, setConfirmPassword] = useState("");
    const [passwordErrormsg, setPasswordErrormsg] = useState("");
    const [requirements, setRequirements] = useState({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const emailValue = useSelector((state) => state.login.emailValue);
    console.log("emailValue-----------",emailValue)

    const handleSubmitotp = (event) => {
        event.preventDefault();
    
        if (otp === "OTP verified successfully") {
          initialCount(2);
        }
      };


      const EmailVerifyApi = async () => {
        setIsLoading(true);
        await axios
          .post(
            "https://bittrend.shubansoftware.com/account-api/verify-email-view/",
            {
              emailValue,
            }
          )
          .then((response) => {
            if (response.data.response.is_first_time_user === false && response.data.response.is_password_set === false ) {
              // setInitialCount(1);
              navigate("/otp")

            }else if(response.data.response.is_password_set === true){
              // setInitialCount(4)
              navigate("/loginwithpassword")

            }
          })
          .catch((error) => {
            if (error.response) {
              if (
                error.response.data.response ===
                "Email not registered. Please contact administrator."
              ) {
                setEmailError(error.response.data.response);
              }
            } else if (error.request) {
              console.log("Request error:", error.request);
            } else {
              console.log("Error message:", error.message);
            }
            console.log("Error config:", error.config);
          })
          .finally(() => {
            setIsLoading(false); 
          });
      };
      

    return (
      <Container fluid className="p-0">
        <Row className="authentication-inner m-0 min-h-full">
          <Col
            md={4}
            className="justify-content-center align-items-center d-flex"
          >
            <Getstarted />
          </Col>
          <Col
            md={8}
            className="justify-content-center align-items-center d-flex bg-white authent-form"
          >
            <div className="w-px-400 mx-auto">
              <h3>Welcome to LYWO</h3>
              <p>Please enter your details.</p>
              <Form noValidate validated={validated} onSubmit={handleSubmitotp}>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                  className="form-group"
                >
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="emailValue"
                    placeholder="Enter your email"
                    value={emailValue}
                    required
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <p className="otp_msg m-0 text-xs">
                    OTP has been sent to your registered email {emailValue}
                  </p>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                  className="form-group"
                >
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={otp}
                    required
                    inputMode="numeric"
                    maxLength="4"
                    pattern="[0-9]*"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className="d-flex justify-content-between resend_otp">
                    {otpErrormsg == "" && (
                      <span>This OTP is valid for only 10 minutes.</span>
                    )}
                    <span
                      style={{
                        color:
                          otpErrormsg === "Incorrect OTP. Please try again."
                            ? "red"
                            : "#079455",
                      }}
                    >
                      {otpErrormsg}
                    </span>

                    <a
                      href="#"
                      className="re-otpbtn text-primery"
                      onClick={(e) => {
                        EmailVerifyApi();
                        e.preventDefault();  
                      }}
                    >
                      Re-send OTP
                    </a>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="btn-full mt-1"
                  disabled={otpErrormsg !== "OTP verified successfully."}
                  onClick={()=>navigate("/dashboard")}
                >
                  Login
                </Button>
                <a
                  href="#"
                  className={`font-weight-600 text-center mt-4 d-block text-base`}
                  style={{
                    color:
                      otpErrormsg === "OTP verified successfully." || otpErrormsg == "Incorrect OTP. Please try again."
                        ? "#3538CD"
                        : "#D0D5DD", 
                    // pointerEvents: otpErrormsg === "OTP verified successfully." ? 'auto' : 'none', // Disable pointer events if not verified
                    // cursor: otpErrormsg === "OTP verified successfully." ? 'pointer' : 'not-allowed' // Change cursor to show disabled state
                  }}
                  disabled={otpErrormsg !== "OTP verified successfully." }
                  // onClick={SetPasswordContainer}
                  onClick={(e) => {
                    e.preventDefault(); 
                    setInitialCount(2);
                  }}
                >
                  Set Password for future login
                </a>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };


  export default OtpVerifyContainer