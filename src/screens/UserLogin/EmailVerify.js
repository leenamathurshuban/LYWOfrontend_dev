// import React, { useEffect, useState } from "react";
// import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setEmailValue } from "../../Slice/Login/LoginSlice"; // Import your action
// import { IsEmailVerify } from "../../services/provider";
// import Getstarted from "../GetStarted/GetStarted";

// const EmailVerify = () => {
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [validated, setValidated] = useState(false);
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const loginUserInfo = useSelector(state => state.login.loginUserInfo);
//   const emailValue = useSelector((state) => state.login.emailValue); // Get email from Redux store
//   console.log("emailValue-----------", emailValue);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (emailError || !emailValue || !emailRegex.test(emailValue)) {
//       setValidated(true);
//       return;
//     }
//     EmailVerifyApi();
//   };

//   const EmailVerifyApi = async () => {
//     setIsLoading(true);

//     const data = {
//       email: emailValue,
//     };

//     IsEmailVerify(data)
//       .then((response) => {
//         setIsLoading(false);
//         if (
//           response.data.response.is_first_time_user === false &&
//           response.data.response.is_password_set === false
//         ) {
//           navigate("/otp");
//         } else if (response.data.response.is_password_set === true) {
//           navigate("/loginwithpassword");
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         if (error.response) {
//           if (
//             error.response.data.response ===
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
//       });
//   };

//   const handleEmail = (e) => {
//     const inputEmail = e.target.value;
//     dispatch(setEmailValue(inputEmail));
//     if (!emailRegex.test(inputEmail)) {
//       setEmailError("Please enter a valid email address.");
//     } else {
//       setEmailError("");
//     }
//   };

//   const checkIfUserIsLoggedIn = () => {
    
//     if (!loginUserInfo) {
//       console.log("User is logged out, Redux state cleared.");
//     } else {
//       console.log("User is logged in:", loginUserInfo);
//     }
//   };

//   useEffect(()=>{
//     checkIfUserIsLoggedIn()
//   })

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
//             <h3>Welcome to LYWO</h3>
//             <p>Please enter your details.</p>
//             <Form noValidate validated={validated} onSubmit={handleSubmit}>
//               <Form.Group
//                 as={Col}
//                 md="12"
//                 controlId="validationCustom03"
//                 className="form-group"
//               >
//                 <Form.Label>Email ID</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter your email"
//                   onChange={(e) => handleEmail(e)}
//                   required
//                   value={emailValue}
//                   isInvalid={emailError !== ""}
//                 />
//                 {/* <Form.Control.Feedback type="invalid">
//                     Email not registered. Please contact administrator.
//                   </Form.Control.Feedback> */}
//                 <Form.Control.Feedback type="invalid">
//                   {emailError ||
//                     "Email not registered. Please contact administrator."}
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* <Button type="submit" className="btn-full mt-1">
//                   Verify
//                 </Button>
//                 {isLoading && (
//                   <Spinner animation="border" role="status" className="ml-3" />
//                 )} */}
//               <Button type="submit" className="btn-full mt-1">
//                 Verify
//               </Button>
//               {isLoading && (
//                 <Spinner animation="border" role="status" className="ml-3" />
//               )}
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EmailVerify;


//Dinesh Sir code 4 dec

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmailValue } from "../../Slice/Login/LoginSlice"; 
import { IsEmailVerify } from "../../services/provider";
import Getstarted from "../GetStarted/GetStarted";

const EmailVerify = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUserInfo = useSelector(state => state.login.loginUserInfo);
  const emailValue = useSelector((state) => state.login.emailValue); 

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError || !emailValue || !emailRegex.test(emailValue)) {
      setValidated(true);
      return;
    }
    EmailVerifyApi();
  };

  const EmailVerifyApi = async () => {
    setIsLoading(true);

    const data = {
      email: emailValue,
    };

    IsEmailVerify(data)
      .then((response) => {
        setIsLoading(false);
        if (
          response.data.response.is_first_time_user === false &&
          response.data.response.is_password_set === false ||  response.data.response.is_first_time_user === true &&
          response.data.response.is_password_set === false
        ) {
          navigate("/otp");
        } else if (response.data.response.is_password_set === true) {
          navigate("/loginwithpassword");
        }
      })
      .catch((error) => {
        setIsLoading(false);
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
      });
  };

  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    dispatch(setEmailValue(inputEmail));
    if (!emailRegex.test(inputEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const checkIfUserIsLoggedIn = () => {
    
    if (!loginUserInfo) {
      console.log("User is logged out, Redux state cleared.");
    } else {
      console.log("User is logged in:", loginUserInfo);
    }
  };

  useEffect(()=>{
    checkIfUserIsLoggedIn()
  })

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
                  value={emailValue}
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

              {/* <Button type="submit" className="btn-full mt-1">
                  Verify
                </Button>
                {isLoading && (
                  <Spinner animation="border" role="status" className="ml-3" />
                )} */}
              <Button type="submit" className="btn-full mt-1">
                {isLoading && (
                  <Spinner animation="border" role="status" className="me-2" />
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

export default EmailVerify;
