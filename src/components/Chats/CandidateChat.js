import React, { useState, useRef, useEffect } from 'react';

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  InputGroup,
  Form,
  Spinner,
  Tab, Tabs,
  Offcanvas,
  Accordion
} from "react-bootstrap";

import Select from "react-select";

import Sendicon from "../../images/icons/send-01.svg"
import attachcon from "../../images/icons/paperclip.svg"
import filter from "../../images/icons/filter-lines.svg"
import { useParams } from 'react-router-dom';
import { chatDetailsAPI, chatPostAPI, getCandidateListAPI } from '../../services/provider';
import { monthDayFormat, TimeDisplay } from '../../utils/test';
import { useSelector } from 'react-redux';



import FileCloud from '../../images/icons/upload-cloud-02.svg';
import pdfIcon from '../../images/icons/file-pdf.svg'
import checkboxbase from '../../images/icons/_Checkbox base.svg'
import imagefile from '../../images/icons/img.png';
import ChatDocumentMessage from './ChatDocumnet';
import EmailChat from './EmailChat';

export default function CandidateChat({ jobDetails }) {

  const { id } = useParams();
  const user = useSelector((state) => state.login?.loginUserInfo);

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

  const [show, filterShow] = useState(false);
  const [candidateList, setCandidateList] = useState({
    AllList: [],
    Unread: [],
    Selected: [],
    aplUid: '',
    profileUser: '',
    job_title: ''
  });

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])

  const handleClose = () => filterShow(false);
  const handleShow = () => filterShow(true);

  // 

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

  // custom style react select box

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#deebff"
        : state.isFocused
          ? "#deebff" // Color on hover
          : "inherit",
      color: state.isSelected ? "#000" : "black",
      cursor: "pointer", // Optional: improves UX on hover
    }),
  };

  const options = [
    { value: 'Recentfirst', label: 'Recent First' },
    { value: 'Oldestfirst', label: 'Oldest First' },

  ]



  const [fileName, setFileName] = useState('No file chosen');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };



  const getCandiDateData = async () => {
    try {
      const res = await getCandidateListAPI(id)
      if (res?.data?.success) {
        setCandidateList((prev) => ({
          ...prev,
          AllList: res?.data?.response,
          // job_title: val?.job_title,
          profileUser: ''
        }))
        setMessages([])
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCandiDateData()
  }, [id])

  const getChatDetailsData = async (Val) => {
    try {
      const response = await chatDetailsAPI(Val?.uid, id);
      if (response?.data?.success) {
        setMessages(response?.data?.response)
        setCandidateList((prev) => ({
          ...prev,
          aplUid: Val?.uid,
          profileUser: Val.job_applicant_profile.user.username
        }))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const candidates = [
    { name: 'Alice Johnson', time: '3 days ago' },
    { name: 'Sandeep Kattamuri', time: '1 day ago' },
    { name: 'Alice Johnson', time: '5 hours ago' },
    { name: 'Sandeep Kattamuri', time: '1 day ago' },
    { name: 'John Smith', time: '1 day ago' },
    { name: 'Viarl Kattamuri', time: '2 day ago' },
    { name: 'David Kattamuri', time: '1 day ago' },
  ];

  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([
  //   { sender: 'Alice Johnson', time: '02:10 PM', text: 'Hi there, How are you?', isUser: false },
  //   { sender: 'You', time: '02:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non...', isUser: true },
  //   { sender: 'Alice Johnson', time: '02:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non...', isUser: false },
  //   { sender: 'Alice Johnson', time: '04:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non, euismod dignissim sapien. Praesent nisl sem, vestibulum vitae mollis in, ullamcorper et magna. ', isUser: false },
  // ]);



  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {

      setMessages([
        ...messages,
        {
          date: new Date(), chats: [{
            message: message,
            created_at: new Date(), sender: { email: user?.email }
          }]
        }
      ])
      const formData = new FormData();
      formData.append("sender", user?.uid)
      formData.append("job", id)
      formData.append("job_applicant", candidateList.aplUid)
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
            created_at: new Date(), sender: { email: user?.email }
          }]
        }
      ])
      const response = await chatPostAPI(formData)
      if (response.data.success) {
        setMessage('')
        setShowUpload(false)
        setFile(null)
      }
      // setShowUpload(false)
      // setFile(null)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      {/* Middle Sidebar - Candidates */}

      {/* Middle Sidebar - Candidates */}
      <Col md={3} className="bg-white " style={{ borderRight: "2px solid #F2F4F7" }}>
        <Card className="h-100 border-0 chat-module">
          <Card.Header className="border-bottom d-flex justify-content-between align-items-center" style={{ padding: "16px", paddingBottom: "0" }} >
            <Card.Title>Candidates</Card.Title>

            <Select
              options={options}
              //value={userOption.find((opt)=>opt.value===companyInfo)}
              // onChange={handleCompanyDropdown}
              className="react_selectbox"
              styles={customStyles}
            />

          </Card.Header>
          <Card.Body className="">

            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3 chat-tabs"
            >
              <Tab eventKey="home" title="All">
                <div className='filter-chats d-flex justify-content-between gap-2'>
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
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <Button
                    className="btn btn-light-outline"
                    onClick={handleShow}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      className="me-2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                        stroke="#344054"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    filters
                  </Button>
                </div>

                <div className='job-chat-form-card mt-2'>
                  {candidateList?.AllList.map((candidates, index) => (
                    <Card key={index} className="mb-2 cursor-pointer " onClick={() => getChatDetailsData(candidates?.job_applicant)}>
                      <Card.Body>
                        <Card.Title className="">{candidates.job_applicant.job_applicant_profile.user.username}</Card.Title>

                        <Card.Text className="text-muted fs-10 ">
                          {candidates.time}
                        </Card.Text>
                        <span className="badge bg-primary-outline" style={{ color: "#3538CD", background: "#EEF4FF", border: "1px solid #C7D7FE" }} >
                          {/* {job.status} */}
                          1
                        </span>
                      </Card.Body>
                    </Card>
                  ))}

                </div>


              </Tab>
              <Tab eventKey="profile" title="Unread">
                <div className='filter-chats  d-flex justify-content-between gap-2'>
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
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <Button
                    className="btn btn-light-outline"
                    onClick={handleShow}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      className="me-2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                        stroke="#344054"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    filters
                  </Button>
                </div>
                <div className='applicant-chats'>
                  <p>
                    There are no conversation for this job yet!
                  </p>
                </div>
              </Tab>
              <Tab eventKey="contact" title="Selected" >
                <div className='filter-chats d-flex justify-content-between gap-2'>
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
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <Button
                    className="btn btn-light-outline"
                    onClick={handleShow}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      className="me-2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                        stroke="#344054"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    filters
                  </Button>
                </div>

                <div className='applicant-chats'>
                  <p>
                    There are no conversation for this job yet!
                  </p>
                </div>

              </Tab>
            </Tabs>

          </Card.Body>
        </Card>
      </Col>

      {/* Chat Area */}

      <Col md={9} className="d-flex flex-column bg-light">
        <Card className="border-0 flex-grow-1 chat-box-global chat-board-indidual">
          <Card.Header className="border-bottom" style={{ padding: "16px" }} >
            <Card.Title>{candidateList.profileUser}</Card.Title>
            <Card.Text className="text-muted small">
              {candidateList.profileUser ? `Assignment for ${jobDetails?.job_title}` : ''} <span className='text-warning'>{candidateList.profileUser ? '• Incomplete' : ''} </span>
            </Card.Text>
          </Card.Header>
          <Card.Body className=" ">
            <div className='message-chat-body '>
              <div className='chat-inner-body overflow-auto'>
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
                {messages?.map((item, index) => (
                  <>
                    <p className='date-msg'><small>{monthDayFormat(item?.date == new Date() ? '' : item?.date)}</small></p>
                    {item.chats.map((msg) => (
                      <div key={index} className={`mb-3 ${msg?.sender?.email == user?.email ? 'text-end sender-bubble' : 'text-start'}`}>
                       
                     {msg.message && msg.message.trim() !== "" && (
                        <Card
                          className={`d-inline-block no-border ${msg?.sender?.email == user?.email ? 'bg-sender text-white' : 'bg-white'}`}
                        >
                          <Card.Body className="p-2">
                            <Card.Text>{msg.message}</Card.Text>
                            <Card.Text className={`small ${msg?.sender?.email == user?.email ? '' : 'text-muted'}`}>
                              {/* Timestamp */}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      )}

                        {(msg?.document || msg?.image) && <ChatDocumentMessage document={msg?.document ? msg?.document : msg?.image ? msg?.image : null} image={file} />}
                        {/* <EmailChat />  */}
                        <p className='time-msg' > <small> {TimeDisplay(msg.created_at)} </small></p>
                      </div>
                    ))}
                  </>
                ))}
              </div>
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
                      onChange={handleFileChange}
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
                    ) : (
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
                          <input type='file' id="fileattached" hidden />
                          <button className='attachment' > <img src={attachcon} className='img-fluid' alt='attach' /> </button>
                        </label>

                        <Button variant="primary" type="submit" >
                          <img src={Sendicon} className='img-fluid' alt='send' />
                        </Button>
                      </InputGroup>
                    </Form>
                  </div> */}
          </Card.Body>
        </Card>
      </Col>
      {/* filter */}
      <Offcanvas show={show} onHide={handleClose} placement='end' >
        <Offcanvas.Header className='d-flex justify-content-between' closeButton>
          <Offcanvas.Title className='d-flex align-items-center' > <img src={filter} className='img-fluid' /> Filters</Offcanvas.Title>
          <span class="applied_count">Applied (0)</span>
        </Offcanvas.Header>
        <Offcanvas.Body className='filter_warp ' >
          <div className='accordion'>
            <div className='filter_item'>
              <Accordion defaultActiveKey={["0", "1", "2"]} flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Match </Accordion.Header>
                  <Accordion.Body>
                    <ul className="filter_itemlist new-filter-chat">
                      <li>
                        <div className="custom-checkbox form-check">
                          <input name="Full-time" type="checkbox" className="form-check-input" />
                          <label title="" className="form-check-label">0% - 50%</label>
                        </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="Part-time" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">50% - 70%</label>
                      </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="More than" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">More than 70%</label>
                      </div>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Personality</Accordion.Header>
                  <Accordion.Body>
                    <ul className="filter_itemlist new-filter-chat">
                      <li>
                        <div className="custom-checkbox form-check">
                          <input name="Leader" type="checkbox" className="form-check-input" />
                          <label title="" className="form-check-label">Leader</label>
                        </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="Influencer" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Influencer</label>
                      </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="Team-Player" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Team Player</label>
                      </div>
                      </li>

                      <li><div className="custom-checkbox form-check">
                        <input name="Perfectionist" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Perfectionist</label>
                      </div>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Status</Accordion.Header>
                  <Accordion.Body>
                    <ul className="filter_itemlist new-filter-chat">
                      <li>
                        <div className="custom-checkbox form-check">
                          <input name="Shortlisted" type="checkbox" className="form-check-input" />
                          <label title="" className="form-check-label">Shortlisted</label>
                        </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="On-Hold" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">On Hold</label>
                      </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="Rejected" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Rejected</label>
                      </div>
                      </li>

                      <li><div className="custom-checkbox form-check">
                        <input name="Review-Pending" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Review Pending</label>
                      </div>
                      </li>

                      <li><div className="custom-checkbox form-check">
                        <input name="Reminder-Sent" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Reminder Sent</label>
                      </div>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </Offcanvas.Body>
        <div className="offcanvas-footer text-end">
          <Button variant="light" className="me-3" type="button" onClick={() => console.log('Clear all')}  >
            Clear All
          </Button>
          <Button variant="primary" type="button" onClick={() => console.log('Apply filters')} >
            Apply
          </Button>
        </div>
      </Offcanvas>
    </>
  )
}