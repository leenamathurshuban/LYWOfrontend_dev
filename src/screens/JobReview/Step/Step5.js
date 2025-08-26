import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import Sendicon from "../../../images/icons/send-01.svg";
import attachcon from "../../../images/icons/paperclip.svg";
import { chatDetailsAPI, chatPostAPI } from "../../../services/provider";
import { monthDayFormat, TimeDisplay } from "../../../utils/test";
import ChatDocumentMessage from "../../../components/Chats/ChatDocumnet";

import FileCloud from "../../../images/icons/upload-cloud-02.svg";
import pdfIcon from "../../../images/icons/file-pdf.svg";
import checkboxbase from "../../../images/icons/_Checkbox base.svg";
import imagefile from "../../../images/icons/img.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Step5 = ({ data, reviewModal }) => {
  const { id } = useParams();
  const user = useSelector((state) => state.login?.loginUserInfo);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);

  const isBinaryFile = (file) => {
    const binaryMimeTypes = [
      "application/pdf",
      "application/octet-stream",
      "application/zip",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/x-executable",
    ];
    return binaryMimeTypes.includes(file.type);
  };

  const isImageFile = (file) => {
    const imageMimeTypes = ["image/png", "image/jpeg", "image/gif"];
    return imageMimeTypes.includes(file.type);
  };

  const handleAttachmentClick = () => {
    setShowUpload(!showUpload); // toggle on each click
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

  const handleFiles = (files) => {
    if (files && files[0]) {
      const uploadedFile = files[0];
      setFile(uploadedFile);
      setImage(URL.createObjectURL(files[0]));
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

  const getChatDetailsData = async () => {
    try {
      const response = await chatDetailsAPI(data?.uid, id);
      if (response?.data?.success) {
        setMessages(response?.data?.response)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getChatDetailsData()
  }, [data])

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("sender", user?.uid);
      formData.append("job", id);
      formData.append("job_applicant",data?.uid);

      if (message.trim()) formData.append("message", message);
      if (file && isBinaryFile(file)) formData.append("document", file);
      if (file && isImageFile(file)) formData.append("image", file);

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

      const response = await chatPostAPI(formData);
      if (response.data.success) {
        setMessage("");
        setShowUpload(false);
        setFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="border-0 flex-grow-1 chat-box-global w-100">
        <Card.Body className="p-0">
          <div className="message-chat-body">
            <div className="chat-inner-body overflow-auto">              
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
          {/* Chat Form */}
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
        </Card.Body>
      </Card>
    </>
  );
};

export default Step5;
