export const storeToken = (token) => {
    localStorage.setItem('authToken', token);
};

export const removeToken = () => {
   localStorage.removeItem('authToken');
};

export const logoMaker = (companyName) =>{
   const LogoName =  companyName?.split(" ").slice(0,2).map((item)=>item[0]).join("")
   return LogoName

}

  export const getPlainText = (html) => {
   const doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
 };

 export const getTimeAgo = (statusTime) => {
   const currentTime = new Date();
   const statusTimeDate = new Date(statusTime); 

   const timeDiff = currentTime - statusTimeDate; 
   const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); 
   const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 

   if (days > 0) {
     return `${days} day${days > 1 ? 's' : ''} ago`;
   } else if (hours > 0) {
     return `Active ${hours} hour${hours > 1 ? 's' : ''} ago`;
   } else {
     return 'Just now'; 
   }
 };

 
 export const getStatusLabel = (status, statusTimeInterval) => {
  switch (status) {
    case "Logged-in":
      return "Online";
    case "Logged-out-active":
      return `${getTimeAgo(statusTimeInterval)}`; 
    case "logged_out_inactive":
      return "Logged out - Inactive";
    case "Deactivated":
      return "Disabled";
    case "Locked":
      return "Locked";
    case "Pending":
      return "Invitation sent";
    default:
      return "Unknown Status"; 
  }
}

