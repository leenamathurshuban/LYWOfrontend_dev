import React, { useState } from 'react';
import { Col, Container, Row, Form,Button,InputGroup } from 'react-bootstrap';
import appbrand from '../images/LYWO_logo.png';
import passtrue from '../images/icons/check-tick-circle.svg';
import passfalse from '../images/icons/minus-circle.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Getstarted from './GetStarted';
const Login = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className='authentication-wrapper authcover-bg'>
      <a href='#' className='app-brand'>
        <img src={appbrand} alt="Logo" />
      </a>
      <Container fluid className='p-0'>
        <Row className='authentication-inner m-0 min-h-full'>
            <Col md={4} className='justify-content-center align-items-center d-flex'>
              <Getstarted/>
            </Col>
            <Col md={8} className='justify-content-center align-items-center d-flex bg-white authent-form'>
              <div className='w-px-400 mx-auto'>
                <h3>Welcome to LYWO</h3>
                <p>Please enter your details.</p>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Col} md="12" controlId="validationCustom03" className='form-group'>
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" required />
                      <Form.Control.Feedback type="invalid">
                        Email not registered. Please contact administrator. 
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                      <p className='otp_msg m-0 text-xs'>OTP has been sent to your registered email jav******21@companymail.com</p>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom03" className='form-group'>
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control type="text" placeholder="" required />
                       <div className='d-flex justify-content-between resend_otp'>
                        <span>
                            This OTP is valid for only 10 minutes.
                        </span>
                        <a href='#' className='re-otpbtn text-primery'>Re-send OTP</a>
                       </div>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom03" className='form-group relative'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password" required />
                      <span 
                        onClick={togglePasswordVisibility}
                        className="pass_eyeicon"
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </span>
                      <Form.Control.Feedback type="invalid">
                        Passwords do not match. 
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className='d-flex justify-content-between forgot_pass mb-3'>
                        {['checkbox'].map((type) => (
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
                        <a href='#' className='forgot_btn text-primery'>Forgot password</a>
                    </div>
                  <Button type="submit" className='btn-full mt-1'>Verify</Button>
                  <Button type="submit" className='btn-full mt-3' disabled>Verify OTP and Login</Button>
                  <a href='#' className='text-primery font-weight-600 text-center mt-4 d-block text-base'>Set Password for future login</a>
                  <div className='pass_instructor mt-4'>
                    <p>Password must have atleast</p>
                    <ul>
                      <li className='active'><img src={passtrue} alt="" />8 Characters</li>
                      <li className='active'><img src={passtrue} alt="" />1 Special Character</li>
                      <li><img src={passfalse} alt="" />1 Uppercase</li>
                      <li><img src={passfalse} alt="" />1 Lowercase</li>
                      <li><img src={passfalse} alt="" />1 Number</li>
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

export default Login;
