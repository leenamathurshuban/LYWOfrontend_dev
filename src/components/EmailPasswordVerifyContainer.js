import React,{useState} from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Getstarted from "../../src/screens/GetStarted/GetStarted"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";



const EmailPasswordVerifyContainer = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState(""); //ayanshaikh.shuban@gmail.com
  // const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  // const [otp, setOtp] = useState(""); 
  // const [otpErrormsg, setOtpErrorMsg] = useState(""); 
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

    const handleSubmitEmailPassword = (event) => {
        event.preventDefault();
      }

      const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

      const LoginWithPasswordApi = async() =>{
        setIsLoading(true);
        await axios
          .post(
            "https://bittrend.shubansoftware.com/account-api/user-login-view/",
            {
              email,
              password
            }
          )
          .then((response) => {
            setIsLoading(false);
          //  console.log("response.data-------",response.data)
           setPasswordErrormsg("")
           navigate("dashboard")
          })
          .catch((error) => {
            setIsLoading(false);
          //  console.log("e----------",error.response.data.response)
           setPasswordErrormsg(error.response.data.response)
          })
         
      }


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


  export default EmailPasswordVerifyContainer