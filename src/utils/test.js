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

export const TimeDisplay = (isoString) => {

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

export const monthDayFormat = (dateStr) => {
  const date = new Date(dateStr);

  // Format to "Month Day"
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return formattedDate
}

export const formatSize = (bytes) => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
