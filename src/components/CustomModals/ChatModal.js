import React, { useState } from "react";
import { Offcanvas, Col, Row, Button, Card, Form, InputGroup } from "react-bootstrap";
import behavioral02 from "../../images/behavioral_02.svg";
import onlineSurvey01 from "../../images/online-survey_01.svg";
import TechnicalQuestions from "../../images/Technical_Questions.svg";
import Transparent01 from "../../images/Transparent01.svg";
import Sendicon from "../../images/icons/send-01.svg"
import attachcon from "../../images/icons/paperclip.svg"
import { chatPostAPI } from "../../services/provider";

const ChatModal = ({ show, handleClose, status, jobData }) => {
  const applicant = JSON.parse(localStorage.getItem("applicantData"))
  const sender = JSON.parse(localStorage.getItem("applicantProfileData"))
  const [message, setMessage] = useState('');
  const [fileData,setFileData] = useState(null)
  const [messages, setMessages] = useState([
    { sender: 'Alice Johnson', time: '02:10 PM', text: 'Hi there, How are you?', isUser: false },
    { sender: 'You', time: '02:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non...', isUser: true },
    { sender: 'Alice Johnson', time: '02:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non...', isUser: false },
    { sender: 'Alice Johnson', time: '04:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non, euismod dignissim sapien. Praesent nisl sem, vestibulum vitae mollis in, ullamcorper et magna. ', isUser: false },
  ]);
  const isBinaryFile = (file) => {
    const binaryMimeTypes = [
      "application/pdf",
      "application/octet-stream", // Generic binary file      
      "application/zip",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
      "application/x-executable", // EXE
    ];
    return binaryMimeTypes.includes(file.type);
  };
  const isImageFile = (file)=>{
    const imageMimeTypes=[
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    return imageMimeTypes.includes(file.type)
  }



  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileData(file)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (message.trim()) {        
        const formData = new FormData();
        formData.append("sender", sender?.user_login?.uid)
        formData.append("job", jobData?.uid)
        formData.append("job_applicant", applicant?.job_applicant_data?.uid)
        formData.append("message", message)
        // if(isBinaryFile(fileData)){
        //   formData.append("document",fileData)
        // }
        // if(isImageFile(fileData)){
        //   formData.append("image",fileData)
        // }     
        const response = await chatPostAPI(formData)
        debugger
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop={true}
      backdropClassName="custom-backdrop"
      placement="end"
      className="luwoprocess_drawer lg-drawer shadow-md border-0 chat-process-drawer"
    >
      <Offcanvas.Header closeButton> <h2>&nbsp;</h2></Offcanvas.Header>
      <Offcanvas.Body
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ height: "100%", padding:'15px' }}
      >
        {status === "View Form Btn" ? (
          <>
            <Card className="border-0 flex-grow-1 chat-box-global">
              {/* <Card.Header className="border-bottom" style={{ padding: "16px" }} >
                <Card.Title>Alice Johnson</Card.Title>
                <Card.Text className="text-muted small">
                  Assignment for Figma Designer  <span className='text-warning'> • Incomplete </span>
                </Card.Text>
              </Card.Header> */}
              <Card.Body className="p-0">
                <div className='message-chat-body overflow-auto'>
                  <p className='date-msg'><small>December 10</small></p>
                  {
                    messages.map((msg, index) => (
                      <div key={index} className={`mb-3 ${msg.isUser ? 'text-end' : 'text-start'}`}>
                        <Card
                          className={`d-inline-block no-border ${msg.isUser ? 'bg-sender text-white' : 'bg-white'}`}
                        >
                          <Card.Body className="p-2" >
                            <Card.Text>{msg.text} </Card.Text>
                            < Card.Text className={`small ${msg.isUser ? '' : 'text-muted'}`}>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <p className='time-msg' > <small> {msg.time} </small></p>
                      </div>
                    ))}
                </div>
                <div className='chat-form'>
                  <Form onSubmit={handleSendMessage}>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your Message here"
                      />
                      <label for="fileattached">
                        <input type='file' id="fileattached" onChange={handleFileUpload} />
                        <button className='attachment' > <img src={attachcon} className='img-fluid' alt='attach' /> </button>
                      </label>

                      <Button variant="primary" type="submit" >
                        <img src={Sendicon} className='img-fluid' alt='send' />
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </>
        ) : (
          <>
            <p>
              To begin the conversation with the company, start your application
              process. You can expect a response within 2-3 business days.
            </p>

            <Button variant="primary">Apply Now</Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatModal;
