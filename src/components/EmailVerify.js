import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Getstarted from "../../src/screens/GetStarted/GetStarted"


const EmailVerify = ({setInitialCount}) => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const [validated, setValidated] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleSubmit = (event) => {
        event.preventDefault();
        if (emailError || !email || !emailRegex.test(email)) {
          setValidated(true);
          return;
        }
        EmailVerifyApi();
      };

    const EmailVerifyApi = async () => {
        setIsLoading(true);
        await axios
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
                  Verify
                </Button>
                {isLoading && (
                  <Spinner animation="border" role="status" className="ml-3" />
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  export default EmailVerify