// Store the token in localStorage
export const storeToken = (token) => {
    localStorage.setItem('authToken', token);
};

// remove the token from localStorage
export const removeToken = () => {
   localStorage.removeItem('authToken');
};

export const logoMaker = (companyName) =>{
   console.log("companynam-----",companyName)
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