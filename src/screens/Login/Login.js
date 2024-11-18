// import React, { useState } from "react";
// import appbrand from "../../images/LYWO_logo.png";
// import {EmailVerify,OtpVerifyContainer,SetPassword,EmailPasswordVerifyContainer} from "../../components/Index";


// const Login = () => {

//   const [initialCount, setInitialCount] = useState(0);



//   return (
//     <div className="authentication-wrapper authcover-bg">
//       <a href="#" className="app-brand">
//         <img src={appbrand} alt="Logo" />
//       </a>
//       {initialCount === 0 && <EmailVerify setInitialCount={setInitialCount}/>}
//       {initialCount == 1 && <OtpVerifyContainer setInitialCount={setInitialCount}/> }
//       {initialCount == 3 && <SetPassword setInitialCount={setInitialCount}/> }
//       {initialCount == 4 && <EmailPasswordVerifyContainer setInitialCount={setInitialCount}/>}
      
//     </div>
//   );
// };

// export default Login;






















































































































// running code start

// import React, { useEffect, useState } from "react";
// import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
// import appbrand from "../../images/LYWO_logo.png";
// import passtrue from "../../images/icons/check-tick-circle.svg";
// import passfalse from "../../images/icons/minus-circle.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import Getstarted from "../GetStarted/GetStarted";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {EmailVerify,OtpVerifyContainer,SetPassword,EmailPasswordVerifyContainer} from "../../components/Index";


// const Login = () => {
//   const [validated, setValidated] = useState(false);
//   const [email, setEmail] = useState(""); //ayanshaikh.shuban@gmail.com
//   const [emailError, setEmailError] = useState("");
//   const [isLoading, setIsLoading] = useState(false); 
//   const [otp, setOtp] = useState(""); 
//   const [otpErrormsg, setOtpErrorMsg] = useState(""); 
//   const [initialCount, setInitialCount] = useState(0);

//   const [password, setPassword] = useState("");
//   const [confirm_password, setConfirmPassword] = useState("");
//   const [passwordErrormsg, setPasswordErrormsg] = useState("");
//   const [requirements, setRequirements] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//     specialChar: false,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const navigate = useNavigate();
  


//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);
//     checkRequirements(value);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const value = e.target.value;
//     setConfirmPassword(value);
//     checkRequirements(value);
//   };

//   const checkRequirements = (value) => {
//     setRequirements({
//       length: value.length >= 8,
//       uppercase: /[A-Z]/.test(value),
//       lowercase: /[a-z]/.test(value),
//       number: /[0-9]/.test(value),
//       specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
//     });
//   };

//   const handleEmail = (e) => {
//     const inputEmail = e.target.value;
//     setEmail(inputEmail);

//     // Validate email format
//     if (!emailRegex.test(inputEmail)) {
//       setEmailError("Please enter a valid email address.");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (emailError || !email || !emailRegex.test(email)) {
//       setValidated(true);
//       return;
//     }
//     EmailVerifyApi();
//   };

//   const handleSubmitotp = (event) => {
//     event.preventDefault();

//     if (otp == "OTP verified successfully") {
//       initialCount(2);
//     }
//   };

//   const handleSubmitSetPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmitEmailPassword = (event) => {
//     event.preventDefault();
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   const LoginWithPasswordApi = async() =>{
//     setIsLoading(true);
//     await axios
//       .post(
//         "https://bittrend.shubansoftware.com/account-api/user-login-view/",
//         {
//           email,
//           password
//         }
//       )
//       .then((response) => {
//         setIsLoading(false);
//       //  console.log("response.data-------",response.data)
//        setPasswordErrormsg("")
//        navigate("dashboard")
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       //  console.log("e----------",error.response.data.response)
//        setPasswordErrormsg(error.response.data.response)
//       })
     
//   }

//   const EmailVerifyApi = async () => {
//     setIsLoading(true);
//     await axios
//       .post(
//         "https://bittrend.shubansoftware.com/account-api/verify-email-view/",
//         {
//           email,
//         }
//       )
//       .then((response) => {
//         if (response.data.response.is_first_time_user == false && response.data.response.is_password_set == false ) {
//           setInitialCount(1);
//         }else if(response.data.response.is_password_set == true){
//           setInitialCount(4)
//         }
//       })
//       .catch((error) => {
//         if (error.response) {
//           if (
//             error.response.data.response ==
//             "Email not registered. Please contact administrator."
//           ) {
//             setEmailError(error.response.data.response);
//           }
//         } else if (error.request) {
//           console.log("Request error:", error.request);
//         } else {
//           console.log("Error message:", error.message);
//         }
//         console.log("Error config:", error.config);
//       })
//       .finally(() => {
//         setIsLoading(false); 
//       });
//   };

//   const callOtpApi = async() => {
//     setIsLoading(true);
//     await axios
//       .post("https://bittrend.shubansoftware.com/account-api/otp-verify-api/", {
//         email,
//         otp,
//       })
//       .then((response) => {
//         setIsLoading(false);
//         setOtpErrorMsg(response.data.response);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         setOtpErrorMsg(error.response.data.response);
//       });
//   };
//   const setPasswordApi = async() => {
//     setIsLoading(true);
//     await axios.put(
//         "https://bittrend.shubansoftware.com/account-api/set-user-password-api/",
//         {
//           email,
//           password,
//           confirm_password,
//         }
//       )
//       .then((response) => {
//         setIsLoading(false);
//         if (response.data.success) {
//           setPasswordErrormsg("");
//           navigate("/dashboard");
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         setPasswordErrormsg(error.response.data.response.error[0]);
//       });
//   };

//   const EmailVerify1 = () => {
//     return (
//       <Container fluid className="p-0">
//         <Row className="authentication-inner m-0 min-h-full">
//           <Col
//             md={4}
//             className="justify-content-center align-items-center d-flex"
//           >
//             <Getstarted />
//           </Col>
//           <Col
//             md={8}
//             className="justify-content-center align-items-center d-flex bg-white authent-form"
//           >
//             <div className="w-px-400 mx-auto">
//               <h3>Welcome to LYWO</h3>
//               <p>Please enter your details.</p>
//               <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom03"
//                   className="form-group"
//                 >
//                   <Form.Label>Email ID</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     onChange={(e) => handleEmail(e)}
//                     required
//                     value={email}
//                     isInvalid={emailError !== ""}
//                   />
//                   {/* <Form.Control.Feedback type="invalid">
//                     Email not registered. Please contact administrator.
//                   </Form.Control.Feedback> */}
//                   <Form.Control.Feedback type="invalid">
//                     {emailError ||
//                       "Email not registered. Please contact administrator."}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Button type="submit" className="btn-full mt-1">
//                   Verify
//                 </Button>
//                 {isLoading && (
//                   <Spinner animation="border" role="status" className="ml-3" />
//                 )}
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     );
//   };

//   const OtpVerify = () => {
//     return (
//       <Container fluid className="p-0">
//         <Row className="authentication-inner m-0 min-h-full">
//           <Col
//             md={4}
//             className="justify-content-center align-items-center d-flex"
//           >
//             <Getstarted />
//           </Col>
//           <Col
//             md={8}
//             className="justify-content-center align-items-center d-flex bg-white authent-form"
//           >
//             <div className="w-px-400 mx-auto">
//               <h3>Welcome to LYWO</h3>
//               <p>Please enter your details.</p>
//               <Form noValidate validated={validated} onSubmit={handleSubmitotp}>
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom03"
//                   className="form-group"
//                 >
//                   <Form.Label>Email ID</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     required
//                     readOnly
//                   />
//                 </Form.Group>
//                 <Form.Group className="form-group">
//                   <p className="otp_msg m-0 text-xs">
//                     OTP has been sent to your registered email {email}
//                   </p>
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom03"
//                   className="form-group"
//                 >
//                   <Form.Label>Enter OTP</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder=""
//                     value={otp}
//                     required
//                     inputMode="numeric"
//                     maxLength="4"
//                     pattern="[0-9]*"
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                   <div className="d-flex justify-content-between resend_otp">
//                     {otpErrormsg == "" && (
//                       <span>This OTP is valid for only 10 minutes.</span>
//                     )}
//                     <span
//                       style={{
//                         color:
//                           otpErrormsg === "Incorrect OTP. Please try again."
//                             ? "red"
//                             : "#079455",
//                       }}
//                     >
//                       {otpErrormsg}
//                     </span>

//                     <a
//                       href="#"
//                       className="re-otpbtn text-primery"
//                       onClick={(e) => {
//                         EmailVerifyApi();
//                         e.preventDefault();  
//                       }}
//                     >
//                       Re-send OTP
//                     </a>
//                   </div>
//                 </Form.Group>

//                 <Button
//                   type="submit"
//                   className="btn-full mt-1"
//                   disabled={otpErrormsg !== "OTP verified successfully."}
//                   onClick={()=>navigate("/dashboard")}
//                 >
//                   Login
//                 </Button>
//                 <a
//                   href="#"
//                   className={`font-weight-600 text-center mt-4 d-block text-base`}
//                   style={{
//                     color:
//                       otpErrormsg === "OTP verified successfully." || otpErrormsg == "Incorrect OTP. Please try again."
//                         ? "#3538CD"
//                         : "#D0D5DD", 
//                     // pointerEvents: otpErrormsg === "OTP verified successfully." ? 'auto' : 'none', // Disable pointer events if not verified
//                     // cursor: otpErrormsg === "OTP verified successfully." ? 'pointer' : 'not-allowed' // Change cursor to show disabled state
//                   }}
//                   disabled={otpErrormsg !== "OTP verified successfully." }
//                   // onClick={SetPasswordContainer}
//                   onClick={(e) => {
//                     e.preventDefault(); 
//                     setInitialCount(2);
//                   }}
//                 >
//                   Set Password for future login
//                 </a>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     );
//   };

//   const SetPasswordContainer = () => {
//     return (
//       <Container fluid className="p-0">
//         <Row className="authentication-inner m-0 min-h-full">
//           <Col
//             md={4}
//             className="justify-content-center align-items-center d-flex"
//           >
//             <Getstarted />
//           </Col>
//           <Col
//             md={8}
//             className="justify-content-center align-items-center d-flex bg-white authent-form"
//           >
//             <div className="w-px-400 mx-auto">
//               <h3>Set Password</h3>
//               <p>Once you set a password, you'll need it to login.</p>
//               <Form
//                 noValidate
//                 validated={validated}
//                 onSubmit={handleSubmitSetPassword}
//               >
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom03"
//                   className="form-group relative"
//                 >
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Password"
//                     required
//                   />
//                   <span
//                     onClick={togglePasswordVisibility}
//                     className="pass_eyeicon"
//                   >
//                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                   </span>
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom03"
//                   className="form-group relative"
//                 >
//                   <Form.Label>Confirm Password</Form.Label>
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     value={confirm_password}
//                     onChange={handleConfirmPasswordChange}
//                     placeholder="Confirm Password"
//                     required
//                   />
//                   <span
//                     onClick={togglePasswordVisibility}
//                     className="pass_eyeicon"
//                   >
//                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                   </span>

//                   <p className="error">{passwordErrormsg}</p>
                
//                 </Form.Group>

//                 <Button
//                   type="submit"
//                   className="btn-full mt-1"
//                   disabled={
//                     !(
//                       password &&
//                       confirm_password &&
//                      password === confirm_password &&
//                       requirements.length &&
//                       requirements.uppercase &&
//                       requirements.lowercase &&
//                       requirements.number &&
//                       requirements.specialChar
//                     )
//                   }
//                   onClick={setPasswordApi}
//                 >
//                   Save and Login
//                 </Button>
//                 <a
//                   href="#"
//                   className="text-primery font-weight-600 text-center mt-4 d-block text-base"
//                   onClick={() => setInitialCount(1)}
//                 >
//                   Continue without Setting Password
//                 </a>

//                 <div className="pass_instructor mt-4">
//                   <p>Password must have at least:</p>
//                   <ul>
//                     <li className={requirements.length ? "active" : ""}>
//                       <img
//                         src={requirements.length ? passtrue : passfalse}
//                         alt=""
//                       />{" "}
//                       8 Characters
//                     </li>
//                     <li className={requirements.specialChar ? "active" : ""}>
//                       <img
//                         src={requirements.specialChar ? passtrue : passfalse}
//                         alt=""
//                       />{" "}
//                       1 Special Character
//                     </li>
//                     <li className={requirements.uppercase ? "active" : ""}>
//                       <img
//                         src={requirements.uppercase ? passtrue : passfalse}
//                         alt=""
//                       />{" "}
//                       1 Uppercase
//                     </li>
//                     <li className={requirements.lowercase ? "active" : ""}>
//                       <img
//                         src={requirements.lowercase ? passtrue : passfalse}
//                         alt=""
//                       />{" "}
//                       1 Lowercase
//                     </li>
//                     <li className={requirements.number ? "active" : ""}>
//                       <img
//                         src={requirements.number ? passtrue : passfalse}
//                         alt=""
//                       />{" "}
//                       1 Number
//                     </li>
//                   </ul>
//                 </div>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     );
//   };

//   const EmailPasswordVerifyContainer = () => {
//     return (
//       <Container fluid className="p-0">
//         <Row className="authentication-inner m-0 min-h-full">
//           <Col
//             md={4}
//             className="justify-content-center align-items-center d-flex"
//           >
//             <Getstarted />
//           </Col>
//           <Col
//             md={8}
//             className="justify-content-center align-items-center d-flex bg-white authent-form"
//           >
//             <div className="w-px-400 mx-auto">
//               <h3>Welcome to LYWO</h3>
//               <Form noValidate validated={validated} onSubmit={handleSubmitEmailPassword}>
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom03"
//                   className="form-group"
//                 >
//                   <Form.Label>Email ID</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     required
//                     value={email}
//                     readOnly
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Email not registered. Please contact administrator.
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom03"
//                   className="form-group relative"
//                 >
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <span
//                     onClick={togglePasswordVisibility}
//                     className="pass_eyeicon"
//                   >
//                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                   </span>
//                   <p className="error">{passwordErrormsg}</p>
                 
//                 </Form.Group>
//                 <div className="d-flex justify-content-between forgot_pass mb-3">
//                   {["checkbox"].map((type) => (
//                     <div key={`inline-${type}`}>
//                       <Form.Check
//                         inline
//                         label="Remember me"
//                         name="group1"
//                         type={type}
//                         id={`inline-${type}-1`}
//                       />
//                     </div>
//                   ))}
//                   <a href="#" className="forgot_btn text-primery" onClick={()=> setInitialCount(3)}>
//                     Reset password
//                   </a>
//                 </div>
//                 <Button type="submit" className="btn-full mt-1" onClick={()=>LoginWithPasswordApi()}  disabled={password.length < 8}                >
//                   Login
//                 </Button>
//                 <a
//                   href="#"
//                   className="text-primery font-weight-600 text-center mt-4 d-block text-base"
//                  onClick={()=>setInitialCount(1)}
//                 >
//                   Use OTP for Login
//                 </a>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     );
//   };

 
//   useEffect(() => {
//     if (otp.length === 4) {
//       callOtpApi(otp);
//     }
//   }, [otp]);

//   useEffect(() => {
//     if (
//       password &&
//       confirm_password &&
//       // password === confirm_password &&
//       requirements.length &&
//       requirements.uppercase &&
//       requirements.lowercase &&
//       requirements.number &&
//       requirements.specialChar
//     ) {
//       setPasswordApi();
//     }
//   }, [password, confirm_password, requirements]);

//   return (
//     <div className="authentication-wrapper authcover-bg">
//       <a href="#" className="app-brand">
//         <img src={appbrand} alt="Logo" />
//       </a>
     
//       {initialCount === 0 && EmailVerify1()}
//       {initialCount == 1 &&  OtpVerify() }
//       {initialCount == 3 && SetPasswordContainer() }
//       {initialCount == 4 &&  EmailPasswordVerifyContainer()}
      
//     </div>
//   );
// };

// export default Login;


// running code end















// Dinesh Sir code 16th Nov start
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import appbrand from "../../images/LYWO_logo.png";
import passtrue from "../../images/icons/check-tick-circle.svg";
import passfalse from "../../images/icons/minus-circle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Getstarted from "../GetStarted/GetStarted";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState(""); //ayanshaikh.shuban@gmail.com
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [otp, setOtp] = useState(""); 
  const [otpErrormsg, setOtpErrorMsg] = useState(""); 
  const [initialCount, setInitialCount] = useState(0);

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [passwordErrormsg, setPasswordErrormsg] = useState("");
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();
  


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkRequirements(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    checkRequirements(value);
  };

  const checkRequirements = (value) => {
    setRequirements({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Validate email format
    if (!emailRegex.test(inputEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError || !email || !emailRegex.test(email)) {
      setValidated(true);
      return;
    }
    EmailVerifyApi();
  };

  const handleSubmitotp = (event) => {
    event.preventDefault();

    if (otp == "OTP verified successfully") {
      initialCount(2);
    }
  };

  const handleSubmitSetPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitEmailPassword = (event) => {
    event.preventDefault();
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const LoginWithPasswordApi = () =>{
    axios
      .post(
        "https://bittrend.shubansoftware.com/account-api/user-login-view/",
        {
          email,
          password
        }
      )
      .then((response) => {
      //  console.log("response.data-------",response.data)
       setPasswordErrormsg("")
       navigate("dashboard")
      })
      .catch((error) => {
      //  console.log("e----------",error.response.data.response)
       setPasswordErrormsg(error.response.data.response)
      })
     
  }

  const EmailVerifyApi = () => {
    setIsLoading(true);
    axios
      .post(
        "https://bittrend.shubansoftware.com/account-api/verify-email-view/",
        {
          email,
        }
      )
      .then((response) => {
        if (response.data.response.is_first_time_user == false && response.data.response.is_password_set == false ) {
          setInitialCount(1);
        }else if(response.data.response.is_password_set == true){
          setInitialCount(4)
        }
      })
      .catch((error) => {
        if (error.response) {
          if (
            error.response.data.response ==
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

  const callOtpApi = () => {
    
    axios
      .post("https://bittrend.shubansoftware.com/account-api/otp-verify-api/", {
        email,
        otp,
      })
      .then((response) => {
       
        setOtpErrorMsg(response.data.response);
      })
      .catch((error) => {
        setOtpErrorMsg(error.response.data.response);
      });
  };
  const setPasswordApi = () => {
    axios.put(
        "https://bittrend.shubansoftware.com/account-api/set-user-password-api/",
        {
          email,
          password,
          confirm_password,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setPasswordErrormsg("");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setPasswordErrormsg(error.response.data.response.error[0]);
      });
  };

  const EmailVerify1 = () => {
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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                  className="form-group"
                >
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => handleEmail(e)}
                    required
                    value={email}
                    isInvalid={emailError !== ""}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                    Email not registered. Please contact administrator.
                  </Form.Control.Feedback> */}
                  <Form.Control.Feedback type="invalid">
                    {emailError ||
                      "Email not registered. Please contact administrator."}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="btn-full mt-1">
                {isLoading && (
                  <Spinner animation="border" role="status" className="btn-loder" />
                )}
                Verify
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  const OtpVerify = () => {
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
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    required
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <p className="otp_msg m-0 text-xs">
                    OTP has been sent to your registered email {email}
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
                      otpErrormsg === "OTP verified successfully."
                        ? "#007bff"
                        : "#ccc", 
                    // pointerEvents: otpErrormsg === "OTP verified successfully." ? 'auto' : 'none', // Disable pointer events if not verified
                    // cursor: otpErrormsg === "OTP verified successfully." ? 'pointer' : 'not-allowed' // Change cursor to show disabled state
                  }}
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

  const SetPasswordContainer = () => {
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
              <h3>Set Password</h3>
              <p>Once you set a password, you'll need it to login.</p>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmitSetPassword}
              >
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                  className="form-group relative"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    required
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="pass_eyeicon"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                  className="form-group relative"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={confirm_password}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                    required
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="pass_eyeicon"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>

                  <p className="error">{passwordErrormsg}</p>
                
                </Form.Group>

                <Button
                  type="submit"
                  className="btn-full mt-1"
                  disabled={
                    !(
                      password &&
                      confirm_password &&
                     password === confirm_password &&
                      requirements.length &&
                      requirements.uppercase &&
                      requirements.lowercase &&
                      requirements.number &&
                      requirements.specialChar
                    )
                  }
                  onClick={setPasswordApi}
                >
                  Save and Login
                </Button>
                <a
                  href="#"
                  className="text-primery font-weight-600 text-center mt-4 d-block text-base"
                  onClick={() => setInitialCount(1)}
                >
                  Continue without Setting Password
                </a>

                <div className="pass_instructor mt-4">
                  <p>Password must have at least:</p>
                  <ul>
                    <li className={requirements.length ? "active" : ""}>
                      <img
                        src={requirements.length ? passtrue : passfalse}
                        alt=""
                      />{" "}
                      8 Characters
                    </li>
                    <li className={requirements.specialChar ? "active" : ""}>
                      <img
                        src={requirements.specialChar ? passtrue : passfalse}
                        alt=""
                      />{" "}
                      1 Special Character
                    </li>
                    <li className={requirements.uppercase ? "active" : ""}>
                      <img
                        src={requirements.uppercase ? passtrue : passfalse}
                        alt=""
                      />{" "}
                      1 Uppercase
                    </li>
                    <li className={requirements.lowercase ? "active" : ""}>
                      <img
                        src={requirements.lowercase ? passtrue : passfalse}
                        alt=""
                      />{" "}
                      1 Lowercase
                    </li>
                    <li className={requirements.number ? "active" : ""}>
                      <img
                        src={requirements.number ? passtrue : passfalse}
                        alt=""
                      />{" "}
                      1 Number
                    </li>
                  </ul>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  const EmailPasswordVerifyContainer = () => {
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
              <Form noValidate validated={validated} onSubmit={handleSubmitEmailPassword}>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                  className="form-group"
                >
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    readOnly
                  />
                  <Form.Control.Feedback type="invalid">
                    Email not registered. Please contact administrator.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                  className="form-group relative"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="pass_eyeicon"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                  <p className="error">{passwordErrormsg}</p>
                 
                </Form.Group>
                <div className="d-flex justify-content-between forgot_pass mb-3">
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}`}>
                      <Form.Check
                        inline
                        label="Remember me"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                    </div>
                  ))}
                  <a href="#" className="forgot_btn text-primery" onClick={()=> setInitialCount(3)}>
                    Reset password
                  </a>
                </div>
                <Button type="submit" className="btn-full mt-1" onClick={()=>LoginWithPasswordApi()}  disabled={password.length < 8}                >
                  Login
                </Button>
                <a
                  href="#"
                  className="text-primery font-weight-600 text-center mt-4 d-block text-base"
                 onClick={()=>setInitialCount(1)}
                >
                  Use OTP for Login
                </a>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

 
  useEffect(() => {
    if (otp.length === 4) {
      callOtpApi(otp);
    }
  }, [otp]);

  useEffect(() => {
    if (
      password &&
      confirm_password &&
      // password === confirm_password &&
      requirements.length &&
      requirements.uppercase &&
      requirements.lowercase &&
      requirements.number &&
      requirements.specialChar
    ) {
      setPasswordApi();
    }
  }, [password, confirm_password, requirements]);

  return (
    <div className="authentication-wrapper authcover-bg">
      <a href="#" className="app-brand">
        <img src={appbrand} alt="Logo" />
      </a>
      {initialCount == 0 && EmailVerify1() }
      {initialCount == 1 && OtpVerify() }
      {initialCount == 3 && SetPasswordContainer() }
      {initialCount == 4 && EmailPasswordVerifyContainer()}
      
    </div>
  );
};

export default Login;

// Dinesh Sir code 16th Nov end