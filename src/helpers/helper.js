// Store the token in localStorage
export const storeToken = (token) => {
    localStorage.setItem('authToken', token);
};

// remove the token from localStorage
export const removeToken = () => {
   localStorage.removeItem('authToken');
};

export const logoMaker = (companyName) =>{
   // console.log("companynam-----",companyName)
   // if(companyName){

   // }
   const LogoName =  companyName?.split(" ").slice(0,2).map((item)=>item[0]).join("")
   return LogoName

}

  // Helper function to get plain text
  export const getPlainText = (html) => {
   const doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
 };

 export const getTimeAgo = (statusTime) => {
   const currentTime = new Date();
   const statusTimeDate = new Date(statusTime); // Convert the status_time_interval string to a Date object

   const timeDiff = currentTime - statusTimeDate; // Time difference in milliseconds
   const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Days difference
   const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours difference

   // Determine the message based on the time difference
   if (days > 0) {
     return `${days} day${days > 1 ? 's' : ''} ago`;
   } else if (hours > 0) {
     return `Active ${hours} hour${hours > 1 ? 's' : ''} ago`;
   } else {
     return 'Just now'; // For cases where the user was active recently (less than 1 hour ago)
   }
 };

 
 export const getStatusLabel = (status, statusTimeInterval) => {
  switch (status) {
    case "Logged-in":
      return "Online";
    case "Logged-out-active":
      return `${getTimeAgo(statusTimeInterval)}`; // Assuming getTimeAgo is a function you already have
    case "logged_out_inactive":
      return "Logged out - Inactive";
    case "deactivated":
      return "Deactivated - Disabled";
    case "Locked":
      return "Locked";
    case "Pending":
      return "Invitation sent";
    default:
      return "Unknown Status"; // Fallback for any unrecognized status
  }
}

