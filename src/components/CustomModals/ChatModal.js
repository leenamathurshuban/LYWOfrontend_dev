import React, { useState, useRef, useEffect } from "react";
import { Offcanvas, Col, Row, Button, Card, Form, InputGroup } from "react-bootstrap";
import behavioral02 from "../../images/behavioral_02.svg";
import onlineSurvey01 from "../../images/online-survey_01.svg";
import TechnicalQuestions from "../../images/Technical_Questions.svg";
import Transparent01 from "../../images/Transparent01.svg";
import Sendicon from "../../images/icons/send-01.svg"
import attachcon from "../../images/icons/paperclip.svg"
import { chatDetailsAPI, chatPostAPI } from "../../services/provider";
import { monthDayFormat, TimeDisplay } from "../../utils/test";
import ChatDocumentMessage from "../Chats/ChatDocumnet";

import FileCloud from '../../images/icons/upload-cloud-02.svg';
import pdfIcon from '../../images/icons/file-pdf.svg'
import checkboxbase from '../../images/icons/_Checkbox base.svg'
import imagefile from '../../images/icons/img.png';
import EmailChat from "../Chats/EmailChat";

const ChatModal = ({ show, handleClose, status, jobData, messages, setMessages, handleBtns }) => {
  const applicant = JSON.parse(localStorage.getItem("applicantData"))
  const sender = JSON.parse(localStorage.getItem("applicantProfileData"))
  const [message, setMessage] = useState('');
  const [fileData, setFileData] = useState(null)
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
  const isImageFile = (file) => {
    const imageMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    return imageMimeTypes.includes(file.type)
  }


  const [fileName, setFileName] = useState('No file chosen');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };

  // const handleAttachmentClick = () => {
  //   fileInputRef.current.click();
  // };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileData(file)
  }

  const [showUpload, setShowUpload] = useState(false);

  const handleAttachmentClick = () => {
    setShowUpload(!showUpload); // toggle on each click
  };
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);

  const handleFiles = (files) => {
    if (files && files[0]) {
      const uploadedFile = files[0];
      setFile(uploadedFile);
      setImage(URL.createObjectURL(files[0]))
      setUploaded(false);
      setProgress(0);

      // Fake upload simulation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploaded(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleClear = () => {
    setFile(null);
    setProgress(0);
    setUploaded(false);
    inputRef.current.value = null;
  };

  // File extension → icon color
  const getFileBadge = (name) => {
    if (!name) return null;
    const ext = name.split(".").pop().toLowerCase();
    if (ext === "pdf")
      return <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">PDF</span>;
    if (["doc", "docx"].includes(ext))
      return <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-bold">DOC</span>;
    if (["jpg", "jpeg", "png"].includes(ext))
      return <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-bold">IMG</span>;
    return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">FILE</span>;
  };


  // 

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append("sender", sender?.user_login?.uid)
      formData.append("job", jobData?.uid)
      formData.append("job_applicant", applicant?.job_applicant_data?.uid)
      if (message.trim()) {
        formData.append("message", message)
      }
      if (file && isBinaryFile(file)) {
        formData.append("document", file)
      }
      if (file && isImageFile(file)) {
        formData.append("image", file)
      }
      setMessages([
        ...messages,
        {
          date: new Date(), chats: [{
            message: message ? message : '',
            // document: file ? file.name : '',
            document: file,
            image: image ? image : "",
            created_at: new Date(), sender: { email: sender?.user_login?.email }
          }]
        }
      ])
      const response = await chatPostAPI(formData);
      if (response.data.success) {
        setMessage('')
        setShowUpload(false)
        setFile(null)
      }
    } catch (error) {
      console.log(error)
    }
  };
  console.log(showUpload)
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
        style={{ height: "100%", padding: '15px' }}
      >
        {status === "View Form Btn" ? (
          <>
            <Card className="border-0 flex-grow-1 chat-box-global w-100">
              {/* <Card.Header className="border-bottom" style={{ padding: "16px" }} >
                <Card.Title>Alice Johnson</Card.Title>
                <Card.Text className="text-muted small">
                  Assignment for Figma Designer  <span className='text-warning'> • Incomplete </span>
                </Card.Text>
              </Card.Header> */}
              <Card.Body className="p-0">
                <div className='message-chat-body '>
                  {/* <p className='date-msg'><small>December 10</small></p>
                  {
                    messages.map((msg, index) => (
                      <div key={index} className={`mb-3 ${msg.isUser ? 'text-end' : 'text-start'}`}>
                        <Card
                          className={`d-inline-block no-border ${msg.isUser ? 'bg-sender text-white' : 'bg-white'}`}
                        >
                          <Card.Body className="p-2" >
                            <Card.Text>{msg.text} </Card.Text>
                            <Card.Text className={`small ${msg.isUser ? '' : 'text-muted'}`}>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <p className='time-msg' > <small> {msg.time} </small></p>
                      </div>
                    ))} */}
                  <div className='chat-inner-body overflow-auto'>
                    {messages?.map((item, index) => (
                      <>
                        <p className='date-msg'><small>{monthDayFormat(item?.date)}</small></p>
                        {item.chats.map((msg) => (
                          <div key={index} className={`mb-3 ${msg?.sender?.email == sender?.user_login?.email ? 'text-end sender-bubble' : 'text-start'}`}>
                            {msg.message && msg.message.trim() !== "" && (
                              <Card
                                className={`d-inline-block no-border ${msg?.sender?.email === sender?.user_login?.email
                                  ? "bg-sender text-white"
                                  : "bg-white"
                                  }`}
                              >
                                <Card.Body className="p-2">
                                  <Card.Text>{msg.message}</Card.Text>
                                  <Card.Text
                                    className={`small ${msg?.sender?.email === sender?.user_login?.email ? "" : "text-muted"
                                      }`}
                                  >
                                    {/* optional timestamp or metadata */}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            )}
                            {/* <EmailChat /> */}

                            {(msg?.document || msg?.image) && <ChatDocumentMessage document={msg?.document ? msg?.document : msg?.image ? msg?.image : null} image={file} />}
                            <p className='time-msg' > <small> {TimeDisplay(msg.created_at)} </small></p>
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                  {/* <div className='chat-form'>
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
                </div> */}
                </div>

                <div className='chat-form'>
                  <Form onSubmit={handleSendMessage}>
                    <InputGroup>
                      <div className='chat-widget'  >
                        <Form.Control
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Your Message here"
                        />
                        {/* <label for="fileattached">
                          <input type='file' id="fileattached" />
                          <button className='attachment' > <img src={attachcon} className='img-fluid' alt='attach' /> </button>
                        </label> */}

                        {/* Hidden file input */}
                        <Form.Control
                          type="file"
                          id="fileattached"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                        />

                        {/* Custom attachment button */}
                        <InputGroup.Text
                          className="attachment"
                          onClick={handleAttachmentClick}
                          style={{ cursor: 'pointer' }}
                        >
                          <img src={attachcon} className="img-fluid" alt="attach" />
                          {/* <span className="ms-2">{fileName}</span> */}
                        </InputGroup.Text>
                      </div>

                      <div className={`upload-container ${showUpload ? "active" : ""}`}>
                        {!file ? (
                          <div
                            className={`dropzone ${dragActive ? "dropzone--active" : ""}`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                          >
                            <input
                              ref={inputRef}
                              type="file"
                              className="dropzone__input"
                              id="fileUpload"
                              onChange={handleChange}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                            <div>
                              <img src={FileCloud} className="img-fluid" alt="uploadicon" />


                            </div>
                            <label htmlFor="fileUpload" className="dropzone__label">
                              <span className="highlight">Click to upload</span> or drag and drop
                            </label>
                            <p className="dropzone__hint">
                              Supported formats: PDF, Word, JPG, PNG
                            </p>
                          </div>
                        ) :
                          (
                            <div className="file-card">
                              <div className="file-card__badge">
                                {file && file.name.toLowerCase().endsWith(".pdf") ? (
                                  <img src={pdfIcon} className="img-fluid" alt="pdf" />
                                ) : file && /\.(jpg|jpeg|png|gif)$/i.test(file.name) ? (
                                  <img src={imagefile} width={36} className="img-fluid" alt="image" />
                                ) : null}
                              </div>

                              <div className="file-card__info">
                                <p className="file-card__name">{file.name}</p>
                                <p className="file-card__size">{(file.size / 1024).toFixed(1)} KB</p>

                                <div className="progress file-progress">
                                  <div
                                    className={`progress__bar ${uploaded ? "progress__bar--done" : ""}`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>

                                <span className="percent">{progress}%</span>
                              </div>

                              <div className="file-card__status">
                                {uploaded && (
                                  <span className="check">
                                    <img src={checkboxbase} alt="Uploaded" className="check__img" />
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
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

            <Button variant="primary" onClick={() => handleBtns(status)}>Apply Now</Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatModal;