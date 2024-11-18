import React, { useState } from "react";
import "../FileUploader.css"; // Add your styles in this file
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome for icons

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      file,
      name: file.name,
      type: file.type,
      extension: file.name.split(".").pop().toLowerCase(),
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const getFileIconClass = (extension) => {
    const iconMap = {
      pdf: "fa-file-pdf",
      doc: "fa-file-word",
      docx: "fa-file-word",
      xls: "fa-file-excel",
      xlsx: "fa-file-excel",
      ppt: "fa-file-powerpoint",
      pptx: "fa-file-powerpoint",
      jpg: "fa-file-image",
      jpeg: "fa-file-image",
      png: "fa-file-image",
      gif: "fa-file-image",
      zip: "fa-file-archive",
      rar: "fa-file-archive",
      txt: "fa-file-alt",
    };

    return iconMap[extension] || "fa-file";
  };

  return (
    <div className="file-upload-wrapper">
        <label
          className="file-upload-box mb-0"
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="file-upload-input"
            multiple
            onChange={handleFileChange}
          />
          <div className="upload-content">
            <i className="fas fa-cloud-upload-alt upload-icon"></i>
            <h5><strong className="text-primery">Click to upload </strong>Drag & Drop</h5>
            <small className="text-muted mb-0">SVG, PNG, JPG or GIF (Recommended aspect ratio: 1:1 or 2:3)</small>
          </div>
        </label>
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <i
                className={`fas ${getFileIconClass(file.extension)} file-icon`}
              ></i>
              <span className="file-name" title={file.name}>
                {file.name}
              </span>
              <i
                className="fas fa-times remove-file"
                onClick={() => removeFile(index)}
              ></i>
              <div className="upload-progress"></div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default FileUploader;
