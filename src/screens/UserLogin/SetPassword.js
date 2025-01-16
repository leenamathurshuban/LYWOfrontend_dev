// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import passtrue from "../../images/icons/check-tick-circle.svg";
// import passfalse from "../../images/icons/minus-circle.svg";
// import { setPasswordVerifyApi } from "../../services/provider";
// import Getstarted from "../GetStarted/GetStarted";
// import { useDispatch, useSelector } from "react-redux";


// const SetPassword = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [initialCount, setInitialCount] = useState(0);
//   // const [email, setEmail] = useState(""); 
//   const [validated, setValidated] = useState(false);

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
//   const navigate = useNavigate();

//   const email = useSelector((state) => state.login.emailValue);


//   const handleSubmitSetPassword = (event) => {
//     event.preventDefault();
//   };

//   const setPasswordApi = async () => {
//     setIsLoading(true);
//     const data = {
//           email,
//           password,
//           confirm_password
//     }
   
//     setPasswordVerifyApi(data)
//       .then((response) => {
//         setIsLoading(false);
//         if (response.data.success) {
//           setPasswordErrormsg("");
//           navigate("/");
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         setPasswordErrormsg(error.response.data.response.error[0]);
//       });
//   };

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

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

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
//     <Container fluid className="p-0">
//       <Row className="authentication-inner m-0 min-h-full">
//         <Col
//           md={4}
//           className="justify-content-center align-items-center d-flex"
//         >
//           <Getstarted />
//         </Col>
//         <Col
//           md={8}
//           className="justify-content-center align-items-center d-flex bg-white authent-form"
//         >
//           <div className="w-px-400 mx-auto">
//             <h3>Set Password</h3>
//             <p>Once you set a password, you'll need it to login.</p>
//             <Form
//               noValidate
//               validated={validated}
//               onSubmit={handleSubmitSetPassword}
//             >
//               <Form.Group
//                 as={Col}
//                 md="12"
//                 controlId="validationCustom03"
//                 className="form-group relative"
//               >
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={handlePasswordChange}
//                   placeholder="Password"
//                   required
//                 />
//                 <span
//                   onClick={togglePasswordVisibility}
//                   className="pass_eyeicon"
//                 >
//                   <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                 </span>
//               </Form.Group>

//               <Form.Group
//                 as={Col}
//                 md="12"
//                 controlId="validationCustom03"
//                 className="form-group relative"
//               >
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   type={showPassword ? "text" : "password"}
//                   value={confirm_password}
//                   onChange={handleConfirmPasswordChange}
//                   placeholder="Confirm Password"
//                   required
//                   // isInvalid={passwordErrormsg}
//                   className={passwordErrormsg ? 'error-border' : ''}
//                 />
//                 <span
//                   onClick={togglePasswordVisibility}
//                   className="pass_eyeicon"
//                 >
//                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                 </span>

//                 <p className="error">{passwordErrormsg}</p>
//               </Form.Group>

//               <Button
//                 type="submit"
//                 className="btn-full mt-1"
//                 disabled={
//                   !(
//                     password &&
//                     confirm_password &&
//                     password === confirm_password &&
//                     requirements.length &&
//                     requirements.uppercase &&
//                     requirements.lowercase &&
//                     requirements.number &&
//                     requirements.specialChar
//                   )
//                 }
//                 onClick={setPasswordApi}
//               >
//                 Save and Login
//               </Button>
//               <a
//                href="#"
//                 className="text-primery font-weight-600 text-center mt-4 d-block text-base"
//                 onClick={() => navigate("/otp")}
//               >
//                 Continue without Setting Password
//               </a>

//               <div className="pass_instructor mt-4">
//                 <p>Password must have at least:</p>
//                 <ul>
//                   <li className={requirements.length ? "active" : ""}>
//                     <img
//                       src={requirements.length ? passtrue : passfalse}
//                       alt=""
//                     />{" "}
//                     8 Characters
//                   </li>
//                   <li className={requirements.specialChar ? "active" : ""}>
//                     <img
//                       src={requirements.specialChar ? passtrue : passfalse}
//                       alt=""
//                     />{" "}
//                     1 Special Character
//                   </li>
//                   <li className={requirements.uppercase ? "active" : ""}>
//                     <img
//                       src={requirements.uppercase ? passtrue : passfalse}
//                       alt=""
//                     />{" "}
//                     1 Uppercase
//                   </li>
//                   <li className={requirements.lowercase ? "active" : ""}>
//                     <img
//                       src={requirements.lowercase ? passtrue : passfalse}
//                       alt=""
//                     />{" "}
//                     1 Lowercase
//                   </li>
//                   <li className={requirements.number ? "active" : ""}>
//                     <img
//                       src={requirements.number ? passtrue : passfalse}
//                       alt=""
//                     />{" "}
//                     1 Number
//                   </li>
//                 </ul>
//               </div>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SetPassword;


// 16 jan check


import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import passtrue from "../../images/icons/check-tick-circle.svg";
import passfalse from "../../images/icons/minus-circle.svg";
import { setPasswordVerifyApi } from "../../services/provider";
import Getstarted from "../GetStarted/GetStarted";
import appbrand from '../../images/LYWO_logo.png';
import { useDispatch, useSelector } from "react-redux";

const SetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialCount, setInitialCount] = useState(0);
  // const [email, setEmail] = useState(""); 
  const [validated, setValidated] = useState(false);

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
  const navigate = useNavigate();
  const email = useSelector((state) => state.login.emailValue);


  const handleSubmitSetPassword = (event) => {
    event.preventDefault();
  };

  const setPasswordApi = async () => {
    setIsLoading(true);
    const data = {
           email,
          password,
          confirm_password
    }
   
    setPasswordVerifyApi(data)
      .then((response) => {
        setIsLoading(false);
        if (response.data.success) {
          setPasswordErrormsg("");
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setPasswordErrormsg(error.response.data.response.error[0]);
      });
  };

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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
    <div className='authentication-wrapper authcover-bg'>
      <a href='#' className='app-brand'>
        <img src={appbrand} alt="Logo" />
      </a>
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
                   // isInvalid={passwordErrormsg}

                   className={passwordErrormsg ? 'error-border' : ''}
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
                onClick={() => navigate("/otp")}
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
    </div>
  );
};

export default SetPassword;
