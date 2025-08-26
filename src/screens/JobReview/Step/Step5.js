import React, { useState, useRef } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import Sendicon from "../../../images/icons/send-01.svg";
import attachcon from "../../../images/icons/paperclip.svg";
import { chatPostAPI } from "../../../services/provider";
import { monthDayFormat, TimeDisplay } from "../../../utils/test";
import ChatDocumentMessage from "../../../components/Chats/ChatDocumnet";

import FileCloud from "../../../images/icons/upload-cloud-02.svg";
import pdfIcon from "../../../images/icons/file-pdf.svg";
import checkboxbase from "../../../images/icons/_Checkbox base.svg";
import imagefile from "../../../images/icons/img.png";

const Step5 = ({ show, handleClose, status, jobData, messages, setMessages, handleBtns }) => {
  const applicant = JSON.parse(localStorage.getItem("applicantData"));
  const sender = JSON.parse(localStorage.getItem("applicantProfileData"));

  const [message, setMessage] = useState("");
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

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("sender", sender?.user_login?.uid);
      formData.append("job", jobData?.uid);
      formData.append("job_applicant", applicant?.job_applicant_data?.uid);

      if (message.trim()) formData.append("message", message);
      if (file && isBinaryFile(file)) formData.append("document", file);
      if (file && isImageFile(file)) formData.append("image", file);

      setMessages([
        ...messages,
        {
          date: new Date(),
          chats: [
            {
              message: message || "",
              document: file,
              image: image || "",
              created_at: new Date(),
              sender: { email: sender?.user_login?.email },
            },
          ],
        },
      ]);

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
                  <React.Fragment key={index}>
                    <p className="date-msg">
                      <small>{monthDayFormat(item?.date)}</small>
                    </p>
                    {item.chats.map((msg, i) => (
                      <div
                        key={`${index}-${i}`}
                        className={`mb-3 ${
                          msg?.sender?.email === sender?.user_login?.email
                            ? "text-end sender-bubble"
                            : "text-start"
                        }`}
                      >
                        {msg.message && (
                          <Card
                            className={`d-inline-block no-border ${
                              msg?.sender?.email === sender?.user_login?.email
                                ? "bg-sender text-white"
                                : "bg-white"
                            }`}
                          >
                            <Card.Body className="p-2">
                              <Card.Text>{msg.message}</Card.Text>
                            </Card.Body>
                          </Card>
                        )}

                        {(msg?.document || msg?.image) && (
                          <ChatDocumentMessage
                            document={msg?.document || msg?.image || null}
                            image={msg?.image}
                          />
                        )}
                        <p className="time-msg">
                          <small>{TimeDisplay(msg.created_at)}</small>
                        </p>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Chat Form */}
            <div className="chat-form">
              <Form onSubmit={handleSendMessage}>
                <InputGroup>
                  <div className="chat-widget">
                    <Form.Control
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message here"
                      style={{minHeight:'41px'}}
                    />
                    <InputGroup.Text
                      className="attachment"
                      onClick={() => setShowUpload(!showUpload)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={attachcon} className="img-fluid" alt="attach" />
                    </InputGroup.Text>
                  </div>

                  <div className={`upload-container ${showUpload ? "active" : ""}`}>
                    {!file ? (
                      <div
                        className={`dropzone ${dragActive ? "dropzone--active" : ""}`}
                        onDragEnter={(e) => setDragActive(true)}
                        onDragLeave={(e) => setDragActive(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                      >
                        <input
                          ref={inputRef}
                          type="file"
                          className="dropzone__input"
                          id="fileUpload"
                          onChange={(e) => handleFiles(e.target.files)}
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
                          {file.name.toLowerCase().endsWith(".pdf") ? (
                            <img src={pdfIcon} alt="pdf" />
                          ) : /\.(jpg|jpeg|png|gif)$/i.test(file.name) ? (
                            <img src={imagefile} width={36} alt="image" />
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

                  <Button variant="primary" type="submit">
                    <img src={Sendicon} className="img-fluid" alt="send" />
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
