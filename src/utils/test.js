export const isBinaryFile = (file) => {
    // List of common binary MIME types
    const binaryMimeTypes = [
      "application/pdf",
      "application/octet-stream", // Generic binary file
      "image/png",
      "image/jpeg",
      "image/gif",
      "application/zip",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
      "application/x-executable", // EXE
    ];

    return binaryMimeTypes.includes(file.type);
  };