import React, { useEffect, useState } from "react";
import { formatSize, getFileName, getFileSize, getFileType } from "../../utils/test";

import imagefile from '../../images/icons/img.png';
import trash from '../../images/icons/trash-01.svg'
import mail from '../../images/icons/mail-02.svg'

import logo1 from '../../images/LYWO_PrimaryLogo_RGB_Color1.svg';
import logo2 from '../../images/LYWO_PrimaryLogo_RGB_Color2.svg'

import pdfIcon from '../../images/icons/file-pdf.svg'

const ChatDocumentMessage = ({ document,image }) => {

  const [fileInfo, setFileInfo] = useState({
    name: "",
    type: "",
    size: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const fetchFileInfo = async () => {
    if (typeof document === "string") {
      const name = document.split("/").pop();
      const type = name.split(".").pop().toLowerCase();
      // Get size
      const url = `https://bittrend.shubansoftware.com${document}`;
      let size = "Unknown size";
      try {
        const res = await fetch(url, { method: "HEAD" });
        const length = res.headers.get("content-length");
        if (length) size = (length / (1024 * 1024)).toFixed(2) + " MB";
      } catch (e) {
        console.error(e);
      }
      setFileInfo({ name, type, size });
    } else {
      const name = document.name;
      const type = name.split(".").pop().toLowerCase();
      const size = formatSize(document.size)
      setFileInfo({ name, type, size });
    }
  };
  useEffect(() => {
    if (document) {
      fetchFileInfo();
    }
  }, [document]);
  console.log(fileInfo,document)
  console.log(image)
  return (
    <>
      <div className="chat-bubble mt-2">
        <div className="file-card-pdf">
          {/* File icon */}
          <div className="file-icon">
            {fileInfo.type === "pdf" && (
              <img src={pdfIcon} className="img-fluid" />

            )}
            {(fileInfo.type === "doc" || fileInfo.type === "docx" || fileInfo.type === "xls" ||
              fileInfo.type === "xlsx" || fileInfo.type === "zip") && (
                <img src={imagefile} className="img-fluid" />
              )}
          </div>

          {/* File Info */}
          {(fileInfo.type === "pdf" || fileInfo.type === "doc" || fileInfo.type === "docx" || fileInfo.type === "xls" ||
            fileInfo.type === "xlsx" || fileInfo.type === "zip") && (
              <div className="file-info">
                <p className="file-name">{fileInfo.name}</p>
                <p className="file-meta">
                  {fileInfo.size} • {fileInfo.type.toUpperCase()} File
                </p>
              </div>
            )}

          {/* Actions */}
              {(
              fileInfo.type === "doc" ||
              fileInfo.type === "docx" ||
              fileInfo.type === "pdf" ||
              fileInfo.type === "xls" ||
              fileInfo.type === "xlsx" ||
              fileInfo.type === "zip"
            ) && (
              <div className="file-actions">
                <a
                  href={`https://bittrend.shubansoftware.com${document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="open-btn"
                >
                  Open
                </a>
                <img src={trash} className="img-fluid" alt="delete" />
              </div>
            )}

          {(fileInfo.type==="jpg" || fileInfo.type==="jpeg" || fileInfo.type==="png" || fileInfo.type==="gif") && (
            <img src={`https://bittrend.shubansoftware.com${document}`} className="img-fluid" />
          )}  
        </div>
      </div>

      {/* <div
        className={`email-bubble mt-2 mb-2 ${isOpen ? "d-none" : "flex"}`}
      >
        <div className="open-mails">

          <div className="d-flex email-formward-open">
            <span><img src={mail} className="img-fluid" alt="mails" /></span>
            <p>Suspendisse purus quam, finibus ac lacus non, euismod dignissim sapien. </p>
          </div>

          <button className="open-mail-box mt-2" onClick={() => setIsOpen(true)}>
            Open
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? "flex" : "d-none"
          } bg-white email-expand-box min-h-screen bg-gray-100 justify-center items-center mt-2`}
      >
        <div className=" w-full max-w-2xl rounded-lg shadow-md overflow-hidden">
          
          <div className="bg-gray-50 border-b border-gray-200 p-4 text-center" style={{ background: '#F5F8FF', borderBottom: '1px solid #E0EAFF' }}>
            <img
              src={logo1}
              alt="LYWO Logo"
              className="mx-auto h-10"
            />
            
          </div>

          
          <div className="p-3 text-gray-800 leading-relaxed">
            <p className="mb-2">Hi Olivia,</p>
            <p className="mb-2">
              Maecenas venenatis nunc sed velit rhoncus imperdiet. Aenean vel tellus
              varius, molestie velit sit amet, malesuada enim.
            </p>
            <p className="mb-2">
              Ut neque sem, bibendum sit amet congue nec, gravida ac ligula. Cras
              lectus justo, finibus a est quis, ultricies tristique tellus. Integer
              eget egestas ipsum, nec commodo lorem. Cras eget ultricies dui, sit
              amet consequat nisi.
            </p>

            <button className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition btn btn-primary">
              Apply to Job
            </button>

            <p className="mt-2 mb-1">Thanks,</p>
            <p>The LYWO team</p>
          </div>

          
          <div className="bg-gray-50 border-t border-gray-200 p-6 text-center text-sm text-gray-600" style={{ background: '#F9FAFB', borderTop: ' 1px solid #F2F4F7', padding: '24px' }} >
            <img
              src={logo2}
              alt="LYWO Logo"
              className="mx-auto h-8 mb-2"
            />
            <p>
              This email was sent to <a href="mailto:olivia@email.com" className="text-indigo-600">olivia@email.com</a>.
              If you'd rather not receive this kind of email, you can{" "}
              <a href="#" className="text-indigo-600">unsubscribe</a> or{" "}
              <a href="#" className="text-indigo-600">manage your email preferences</a>.
            </p>
            <p className="mt-2">© 2024 LYWO Recruitment, 100 Smith Street, Melbourne VIC 3000</p>
          </div>

          

          <button className="open-mail-box bg-gray-200 hover:bg-gray-300 px-6 mt-2 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div> */}
    </>
  );
};

export default ChatDocumentMessage;
