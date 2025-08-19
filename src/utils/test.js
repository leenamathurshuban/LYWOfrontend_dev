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

export const calculateDays = (date) => {
  const pastDate = new Date(date);
  const currentDate = new Date();

  // Get the difference in milliseconds
  const diffInMs = currentDate - pastDate;

  // Convert milliseconds to days
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
};

export const TimeDisplay = () => {
  const isoString = "2025-08-18T16:49:05.239978Z";

  const date = new Date(isoString);

  // Format only hour:minute AM/PM
  let timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // ensures AM/PM format
  });

  timeString = timeString.replace("am", "AM").replace("pm", "PM");
  return timeString;
};